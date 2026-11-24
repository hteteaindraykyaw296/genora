'use client';
import {publicAsset} from '../../lib/public-asset';

import {useState} from 'react';

const lessons = [
  {
    id:'screening',
    title:'What does a positive NIPT result mean?',
    summary:'Follow true and false positives through a hypothetical screening population.',
    transcript:[
      'Start with a hypothetical population of 10,000. Assume 1% have the condition: 100 people with it and 9,900 without it.',
      'At 99% sensitivity and 99.9% specificity, expect 99 true positives and 9.9 false positives. Fractional counts describe mathematical expectations.',
      'Among all positive results, the expected fraction of true positives is 99 divided by 108.9, or about 91%. This example uses assumed inputs. A screen estimates likelihood, and a positive result can be discussed with a clinician or genetic counselor.',
    ],
    scenario:'A fictional lab models two populations using the same sensitivity and specificity. The second population has lower prevalence. What usually happens to positive predictive value for an imperfect test?',
    options:[
      ['It generally decreases.', 'Correct. With fewer affected people, there are fewer true positives relative to false positives. The test settings stayed the same.'],
      ['It stays the same because test settings match.', 'Sensitivity and specificity stayed the same. Positive predictive value also depends on the prevalence in the screened population.'],
      ['Every positive result confirms the condition.', 'The model includes false positives. A screen-positive result can prompt counseling and discussion of diagnostic testing.'],
    ],
    source:'https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests',
    credit:'ACOG prenatal genetic screening guidance',
  },
  {
    id:'development',
    title:'Why measurement landmarks matter',
    summary:'See how two length conventions describe different distances.',
    transcript:[
      'Crown–rump length is a measurement between the top of the head and the rump. The animation represents the landmarks schematically.',
      'A head-to-heel length uses the heel as its second endpoint. The distances can differ even when the drawing stays the same size.',
      'Compare like measurements with like. A change in endpoints can produce an apparent jump when growth figures are placed next to one another.',
    ],
    scenario:'A fictional student plots a head-to-rump estimate next to a head-to-heel estimate from another guide. The chart seems to jump. What should the student check first?',
    options:[
      ['Whether the measurements use the same landmarks.', 'Correct. Changing endpoints changes the length being described. Compare measurements made using the same definition.'],
      ['Whether the jump proves sudden growth.', 'A change in landmarks can account for part or all of the apparent difference. The two numbers alone cannot establish a growth rate.'],
      ['Whether the measurements can be averaged.', 'Averaging different measurement conventions does not produce a comparable growth measurement. Check the method and units first.'],
    ],
    source:'https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/',
    credit:'NHS week-by-week development guide',
  },
  {
    id:'microscopy',
    title:'How overexposure hides details',
    summary:'Watch separate signal levels flatten at a detector’s maximum.',
    transcript:[
      'Within a detector’s recording range, different input signals can be recorded as different pixel intensities.',
      'When the signal exceeds the detector’s maximum, bright values can clip to the same recorded intensity.',
      'Display contrast adjusts existing pixel values. Recovering the clipped signal would require another acquisition with suitable exposure, when the sample and protocol allow it.',
    ],
    scenario:'In a fictional LED-illuminated microscope exercise, several bright features all reach the same maximum pixel value. What would help test whether the detector clipped the signal?',
    options:[
      ['Acquire another frame at a lower exposure.', 'Correct. Compare the new image and histogram with the original. Lower exposure may bring the bright signals back within the detector’s range.'],
      ['Increase display contrast on the original file.', 'Display contrast changes how recorded values appear. It cannot distinguish different signals that were stored at the same maximum.'],
      ['Count every bright patch as a chromosome.', 'The simulated pixels contain no specimen information. Even real microscopy requires documented preparation and expert interpretation.'],
    ],
    source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC2712964/',
    credit:'Journal of Cell Biology on quantitative microscopy and saturation',
  },
] as const;

export default function AnimatedLessons() {
  const [selected,setSelected]=useState(0);
  const [answers,setAnswers]=useState<Record<string,number>>({});
  const lesson=lessons[selected];
  const answer=answers[lesson.id];

  return <section className="panel animated-lessons" aria-labelledby="lesson-title">
    <div className="button-row" role="group" aria-label="Choose an animated lesson">
      {lessons.map((item,index)=><button className={selected===index?'primary':'secondary'} aria-pressed={selected===index} key={item.id} onClick={()=>setSelected(index)}>{['NIPT screening','Prenatal measurements','LED microscopy'][index]}</button>)}
    </div>
    <h2 id="lesson-title">{lesson.title}</h2>
    <p>{lesson.summary} Each clip is a silent animation. The explanation below covers the same content.</p>
    <video key={lesson.id} controls playsInline preload="metadata" width={960} height={540} aria-label={lesson.title}>
      <source src={publicAsset(`/videos/${lesson.id}.webm`)} type="video/webm"/>
      <a href={publicAsset(`/videos/${lesson.id}.webm`)}>Download this animation</a>
    </video>
    <details key={lesson.id+'-transcript'}><summary>Read the video explanation</summary><ol>{lesson.transcript.map(line=><li key={line}>{line}</li>)}</ol></details>
    <div className="lesson-case">
      <h3>Fictional case study</h3>
      <p>{lesson.scenario}</p>
      <div className="lesson-answers" role="group" aria-label="Choose an answer">
        {lesson.options.map(([choice],index)=><button className={answer===index?'primary':'secondary'} aria-pressed={answer===index} key={choice} onClick={()=>setAnswers({...answers,[lesson.id]:index})}>{choice}</button>)}
      </div>
      <p className="lesson-feedback" role="status">{answer===undefined?'Select an answer to see the reasoning.':lesson.options[answer][1]}</p>
    </div>
    <p className="small">Simulated learning activity. <a href={lesson.source}>{lesson.credit} ↗</a></p>
  </section>;
}
