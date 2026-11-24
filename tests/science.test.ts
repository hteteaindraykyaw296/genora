import {describe,it,expect} from 'vitest';
import {screening,offspring,calculateScreeningMetrics} from '../lib/science';
import {formatProbability,screeningCSV} from '../lib/screening-output';

describe('family worked examples',()=>{
 it('agrees with an exact-count reference at imperfect sensitivity and specificity',()=>{
  const result=screening(1000,.2,.75,.875);
  expect(result.tp).toBeCloseTo(150,10);
  expect(result.fp).toBeCloseTo(100,10);
  expect(result.tn).toBeCloseTo(700,10);
  expect(result.fn).toBeCloseTo(50,10);
  expect(result.ppv).toBeCloseTo(3/5,12);
  expect(result.npv).toBeCloseTo(14/15,12);
 });
 it('matches independently worked expected counts',()=>{
  const a=screening(10000,.001,.99,.999),b=screening(10000,.01,.99,.999);
  expect(a.tp).toBeCloseTo(9.9);expect(a.fp).toBeCloseTo(9.99);
  expect(a.tn).toBeCloseTo(9980.01);expect(a.fn).toBeCloseTo(.1);
  expect(a.ppv).toBeCloseTo(9.9/19.89,12);
  expect(b.tp).toBeCloseTo(99);expect(b.fp).toBeCloseTo(9.9);
  expect(b.tn).toBeCloseTo(9890.1);expect(b.fn).toBeCloseTo(1);
  expect(b.ppv).toBeCloseTo(99/108.9,12);
  expect(formatProbability(a.ppv)).toBe('49.77%');
  expect(formatProbability(b.ppv)).toBe('90.91%');
 });
 it('covers empty positive and negative result groups',()=>{
  expect(screening(100,.5,0,1).ppv).toBeNull();
  expect(screening(100,.5,1,0).npv).toBeNull();
  expect(formatProbability(null)).toBe('Undefined');
  expect(formatProbability(.999999)).toBe('Over 99.99%');
 });
 it('conserves counts at all endpoint probabilities and population limits',()=>{
  for(const n of [1,1e6,1e9])for(const p of [0,.001,.01,1])for(const s of [0,1])for(const c of [0,1]){
   const r=screening(n,p,s,c);expect(r.tp+r.fp+r.tn+r.fn).toBeCloseTo(n,5);
  }
  for(const args of [[1e9+1,0,1,1],[1,NaN,1,1],[1,0,1,-.1],[1,0,1,1.01],[Infinity,0,1,1]])expect(()=>screening(...args as [number,number,number,number])).toThrow();
 });
 it('exports proportions and expected counts from the same calculation',()=>{
  const lines=screeningCSV([10000,.1,99,99.9]).split('\n');
  const values=lines[1].split(',').map(Number);
  expect(values[4]).toBeCloseTo(9.9);expect(values[5]).toBeCloseTo(9.99);
  expect(values[8]).toBeCloseTo(9.9/19.89);
  expect(screeningCSV([100,0,100,100]).split('\n')[1].split(',')[8]).toBe('');
 });
});
describe('population screening',()=>{
 it('computes expected counts and predictive values',()=>{const r=screening(10000,.01,.99,.99);expect(r.tp).toBeCloseTo(99,10);expect(r.fn).toBeCloseTo(1);expect(r.fp).toBeCloseTo(99);expect(r.tn).toBeCloseTo(9801,10);expect(r.ppv).toBeCloseTo(.5);expect(r.npv).toBeCloseTo(9801/9802)});
 it('conserves population across probabilities',()=>{for(const p of [0,.001,.5,1])for(const s of [0,.3,1]){const r=screening(200,p,s,.9);expect(r.tp+r.fp+r.tn+r.fn).toBeCloseTo(200)}});
 it('handles undefined predictive values',()=>{expect(screening(100,0,1,1).ppv).toBeNull();expect(screening(100,1,1,1).npv).toBeNull()});
 it('shows prevalence effect on PPV',()=>expect(screening(10000,.01,.99,.999).ppv!).toBeGreaterThan(screening(10000,.001,.99,.999).ppv!));
 it('rejects invalid inputs',()=>{for(const args of [[0,.1,.9,.9],[10,-1,.9,.9],[10,.1,2,.9],[NaN,.1,.9,.9]])expect(()=>screening(...args as [number,number,number,number])).toThrow()});
});
it('generates the four Mendelian combinations',()=>expect(offspring('Aa','Aa')).toEqual(['AA','Aa','Aa','aa']));


describe('probability-only screening API',()=>{
 it('matches an independently worked example and conserves probability',()=>{
  const r=calculateScreeningMetrics({prevalence:.01,sensitivity:.9,specificity:.95});
  expect(r.truePositive).toBeCloseTo(.009,12);
  expect(r.falsePositive).toBeCloseTo(.0495,12);
  expect(r.trueNegative).toBeCloseTo(.9405,12);
  expect(r.falseNegative).toBeCloseTo(.001,12);
  expect(r.ppv).toBeCloseTo(2/13,12);
  expect(r.npv).toBeCloseTo(1881/1883,12);
  // Decimal reference values supplied for the screening example.
  expect(Math.abs(r.ppv! - 0.1538461538)).toBeLessThan(1e-8);
  expect(Math.abs(r.npv! - 0.9989378655)).toBeLessThan(1e-8);
  expect(r.truePositive+r.falsePositive+r.trueNegative+r.falseNegative).toBeCloseTo(1,12);
 });
 it('returns null for empty result groups, including both prevalence endpoints',()=>{
  expect(calculateScreeningMetrics({prevalence:0,sensitivity:1,specificity:1}).ppv).toBeNull();
  expect(calculateScreeningMetrics({prevalence:1,sensitivity:1,specificity:1}).npv).toBeNull();
  expect(calculateScreeningMetrics({prevalence:.5,sensitivity:0,specificity:1}).ppv).toBeNull();
  expect(calculateScreeningMetrics({prevalence:.5,sensitivity:1,specificity:0}).npv).toBeNull();
 });
 it('rejects invalid runtime values in every probability field',()=>{
  for(const field of ['prevalence','sensitivity','specificity'])for(const value of [NaN,Infinity,-Infinity,-.1,-.01,1.01,'0.5',null,undefined,true]){
   const input={prevalence:.1,sensitivity:.9,specificity:.95,[field]:value};
   expect(()=>calculateScreeningMetrics(input as Parameters<typeof calculateScreeningMetrics>[0])).toThrow(RangeError);
  }
 });
});
