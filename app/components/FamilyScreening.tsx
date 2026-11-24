'use client';
import {useState} from 'react';
import {screening} from '../../lib/science';
import {formatProbability,screeningCSV} from '../../lib/screening-output';
const labels=['Population size','Condition prevalence (%)','Sensitivity (%)','Specificity (%)'];
const number=(value:number)=>value.toLocaleString('en',{maximumFractionDigits:3});
export default function FamilyScreening(){
  const [values,setValues]=useState([10000,.1,99,99.9]);
  const [compare,setCompare]=useState(true);
  const r=screening(values[0],values[1]/100,values[2]/100,values[3]/100);
  const scenarios=[.1,1].map(p=>({p,...screening(10000,p/100,.99,.999)}));
  function update(index:number,value:number){
    if(!Number.isFinite(value))return;
    const safe=Math.max(index===0?1:0,Math.min(index===0?1000000:100,index===0?Math.round(value):value));
    setValues(current=>current.map((item,i)=>i===index?safe:item));
  }
  function download(){
    const url=URL.createObjectURL(new Blob([screeningCSV(values)],{type:'text/csv'}));
    const link=document.createElement('a');link.href=url;link.download='genora-simulation.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <section className="panel simulator" id="screening-simulator">
    <h2>What does a positive screening result mean?</h2>
    <p><strong>Fictional example.</strong> Sam reads “positive” on a prenatal screening report and wonders if it confirms a diagnosis. A positive screen indicates a higher chance of a selected condition. The next conversation can clarify what the test measured and what options fit the family’s wishes.</p>
    <p>The model starts with 10,000 hypothetical people. Prevalence is how common the condition is, sensitivity is the share of people with the condition who screen positive, and specificity is the share without the condition who screen negative.</p>
    <fieldset id="simulator-controls" tabIndex={-1}><legend>Simulator controls</legend>{labels.map((label,i)=><div className="control" key={label}>
      <label htmlFor={'screen-'+i}>{label}</label><input id={'screen-'+i} type="number" min={i===0?1:0} max={i===0?1000000:100} step={i===0?1:.01} value={values[i]} onChange={event=>update(i,event.target.valueAsNumber)}/>
      <input aria-label={label+' slider'} type="range" min={i===0?1:0} max={i===0?1000000:100} step={i===0?1:.01} value={values[i]} onChange={event=>update(i,+event.target.value)}/>
    </div>)}</fieldset>
    <div aria-live="polite">
      <h3>Among expected positive results</h3>
      <div className="matrix"><div className="correct"><span>True positives — condition present</span><strong>{number(r.tp)}</strong></div><div className="incorrect"><span>False positives — condition absent</span><strong>{number(r.fp)}</strong></div></div>
      {r.ppv!==null&&<figure className="screening-chart">
        <div className="result-chart" aria-hidden="true"><span className="true-positive-share" style={{width:(r.ppv*100)+'%'}}/><span className="false-positive-share" style={{width:((1-r.ppv)*100)+'%'}}/></div>
        <figcaption>Among expected positive results, {formatProbability(r.ppv)} are true positives and {formatProbability(1-r.ppv)} are false positives. The solid segment represents true positives.</figcaption>
      </figure>}
      <p>These are population-level expectations. A value such as 9.99 represents an average expected across hypothetical groups, so it can be fractional.</p>
      <div className="predictive"><div><span>Positive predictive value</span><strong>{formatProbability(r.ppv)}</strong></div><div><span>Negative predictive value</span><strong>{formatProbability(r.npv)}</strong></div></div>
      {r.ppv===null&&<p>Positive predictive value is undefined because the model predicts no positive results.</p>}
      {r.npv===null&&<p>Negative predictive value is undefined because the model predicts no negative results.</p>}
      <p>Of the expected negative screens, {number(r.tn)} are true negatives (condition absent) and {number(r.fn)} are false negatives (condition present). Negative predictive value is the share of expected negative screens that are true negatives.</p>
    </div>
    <button className="secondary" onClick={()=>setCompare(!compare)} aria-expanded={compare}>{compare?'Hide':'Compare'} prevalence scenarios</button>
    {compare&&<section aria-label="Worked population comparison"><h3>Same hypothetical test, two populations</h3><p>Each population has 10,000 people. Sensitivity is 99% and specificity is 99.9% in both.</p>
      <div className="family-paths">{scenarios.map(row=><article className="panel" key={row.p}><h4>Prevalence {row.p}%</h4><p>Expected true positives <strong>{number(row.tp)}</strong></p><p>Expected false positives <strong>{number(row.fp)}</strong></p><p>Of all expected positive results, <strong>{formatProbability(row.ppv)}</strong> are true positives.</p><p>Negative predictive value {formatProbability(row.npv)}.</p></article>)}</div>
      <p>A lower prevalence means fewer affected people relative to the number without the condition. False positives can therefore make up a larger share of all positive results even with the same test performance.</p>
    </section>}
    <details><summary>How this was calculated</summary><p>Percentages are divided by 100 before calculation. N is population, p is prevalence, s is sensitivity, and c is specificity.</p><ul>
      <li>True positives = N × p × s</li><li>False positives = N × (1 − p) × (1 − c)</li><li>True negatives = N × (1 − p) × c</li><li>False negatives = N × p × (1 − s)</li><li>PPV = true positives ÷ all positives</li><li>NPV = true negatives ÷ all negatives</li>
    </ul><p>A zero denominator makes the corresponding predictive value undefined. Very high values below 100% are shown with extra precision or bounded wording. A model result of 100% applies only to its exact illustrative assumptions.</p></details>
    <button className="secondary" onClick={download}>Export CSV</button>
    <h3>Questions for your care team</h3><ul><li>What did this test look for?</li><li>What does my result leave uncertain?</li><li>What options can we discuss next?</li></ul>
    <p><a href="#choices-care">Open appointment checklist and caregiver resources</a></p>
    <p className="small"><a href="https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests">ACOG explains prenatal screening</a>. Screening estimates likelihood. The model assumes a single set of test characteristics and a single prevalence. Real performance can vary by population and clinical context, and some methods require more complex models. The results are for learning about probability and cannot estimate an individual pregnancy’s risk or guide medical decisions.</p>
  </section>;
}
