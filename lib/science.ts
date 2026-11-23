type ScreeningProbabilities = {prevalence:number;sensitivity:number;specificity:number};

/** Joint population proportions. Inputs are probabilities (0–1), not percentages. */
export function calculateScreeningMetrics({prevalence,sensitivity,specificity}:ScreeningProbabilities){
 const values=[prevalence,sensitivity,specificity];
 if(values.some(value=>typeof value!=='number'||!Number.isFinite(value)||value<0||value>1)){
  throw new RangeError('Inputs must be finite probabilities between 0 and 1.');
 }
 const truePositive=prevalence*sensitivity;
 const falsePositive=(1-prevalence)*(1-specificity);
 const trueNegative=(1-prevalence)*specificity;
 const falseNegative=prevalence*(1-sensitivity);
 const positiveTotal=truePositive+falsePositive;
 const negativeTotal=trueNegative+falseNegative;
 return {ppv:positiveTotal===0?null:truePositive/positiveTotal,npv:negativeTotal===0?null:trueNegative/negativeTotal,truePositive,falsePositive,trueNegative,falseNegative};
}

/** Population-count adapter shared by the simulator and CSV export. */
export function screening(n:number,p:number,sensitivity:number,specificity:number){
 if(!Number.isFinite(n)||n<1||n>1e9)throw new RangeError('Use a population from 1 to 1 billion.');
 const r=calculateScreeningMetrics({prevalence:p,sensitivity,specificity});
 return {tp:n*r.truePositive,fp:n*r.falsePositive,tn:n*r.trueNegative,fn:n*r.falseNegative,ppv:r.ppv,npv:r.npv};
}
export function offspring(a:string,b:string){return [...a].flatMap(x=>[...b].map(y=>[x,y].sort().join('')))}
