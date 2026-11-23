import {screening} from './science';
export function formatProbability(value:number|null){
  if(value===null)return 'Undefined';
  if(value>0.9999&&value<1)return 'Over 99.99%';
  if(value>0&&value<0.0001)return 'Under 0.01%';
  return (value*100).toFixed(2)+'%';
}
export function screeningCSV(values:number[]){
  const [n,p,s,c]=values;
  const r=screening(n,p/100,s/100,c/100);
  return 'population,prevalence_percent,sensitivity_percent,specificity_percent,TP,FP,TN,FN,PPV_proportion,NPV_proportion\n'+[...values,r.tp,r.fp,r.tn,r.fn,r.ppv??'',r.npv??''].join(',');
}
