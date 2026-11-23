import {test,expect} from '@playwright/test';

test('homepage paths and existing topic links',async({page})=>{
  for(const [action,title] of [
    ['Understand inheritance','Genetics & Inheritance'],
    ['Understand testing','Prenatal Testing Lab'],
    ['Explore family support','Choices & Care'],
  ]){
    await page.goto('/');
    await page.getByRole('button',{name:action,exact:true}).click();
    await expect(page.getByRole('heading',{level:1,name:title,exact:true})).toBeVisible();
  }
  for(const [hash,title] of [
    ['prenatal-development','Prenatal Development'],
    ['chromosome-microscopy','Chromosome Microscopy'],
    ['fetal-neuroimaging','Fetal Neuroimaging'],
    ['epigenetics-explorer','Epigenetics Explorer'],
    ['research-lab','Research Lab'],
    ['scientific-references','Scientific References'],
  ]){
    await page.goto('/#'+hash);
    await expect(page.getByRole('heading',{level:1,name:title,exact:true})).toBeVisible();
  }
  await page.goto('/#how-genora-was-built');
  await expect(page.getByRole('heading',{name:'Turning a screening result into understandable information'})).toBeVisible();
  for(const image of await page.locator('.research-triptych img').all()){
    await expect.poll(()=>image.evaluate((node:HTMLImageElement)=>node.naturalWidth)).toBeGreaterThan(0);
  }
});

test('screening boundaries, uncertainty and exported values',async({page})=>{
  await page.goto('/#prenatal-testing-lab?focus=simulator-controls');
  await expect(page.locator('#simulator-controls')).toBeFocused();
  await page.getByLabel('Condition prevalence (%)',{exact:true}).fill('0');
  await page.getByLabel('Specificity (%)',{exact:true}).fill('100');
  await expect(page.getByText('Positive predictive value is undefined because the model predicts no positive results.',{exact:true})).toBeVisible();
  await page.getByLabel('Condition prevalence (%)',{exact:true}).fill('100');
  await page.getByLabel('Sensitivity (%)',{exact:true}).fill('100');
  await expect(page.getByText('Negative predictive value is undefined because the model predicts no negative results.',{exact:true})).toBeVisible();
  await page.getByLabel('Population size',{exact:true}).fill('0');
  await expect(page.getByLabel('Population size',{exact:true})).toHaveValue('1');
  await page.getByLabel('Population size',{exact:true}).fill('1000001');
  await expect(page.getByLabel('Population size',{exact:true})).toHaveValue('1000000');
  await page.getByLabel('Population size',{exact:true}).fill('10000');
  await page.getByLabel('Condition prevalence (%)',{exact:true}).fill('.1');
  await page.getByLabel('Sensitivity (%)',{exact:true}).fill('99');
  await page.getByLabel('Specificity (%)',{exact:true}).fill('99.9');
  const [download]=await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button',{name:'Export CSV',exact:true}).click(),
  ]);
  const stream=await download.createReadStream();
  let csv='';
  for await(const chunk of stream!)csv+=chunk.toString();
  const cells=csv.trim().split('\n')[1].split(',').map(Number);
  expect(cells[4]).toBeCloseTo(9.9);
  expect(cells[5]).toBeCloseTo(9.99);
  expect(cells[8]).toBeCloseTo(9.9/19.89,10);
  await page.getByText('How this was calculated',{exact:true}).click();
  await expect(page.getByText('True positives = N × p × s',{exact:true})).toBeVisible();
  await page.getByRole('link',{name:'Open appointment checklist and caregiver resources'}).click();
  const [checklist]=await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button',{name:'Download appointment checklist'}).click(),
  ]);
  expect(checklist.suggestedFilename()).toBe('genora-appointment-checklist.txt');
});

test('animations, written explanations and case feedback',async({page})=>{
  await page.goto('/#animated-lessons-cases');
  for(const name of ['NIPT screening','Prenatal measurements','LED microscopy']){
    await page.getByRole('button',{name,exact:true}).click();
    const result=await page.locator('video').evaluate(async(video:HTMLVideoElement)=>{
      video.muted=true;
      await video.play();
      await new Promise(resolve=>setTimeout(resolve,300));
      const result={width:video.videoWidth,time:video.currentTime,duration:video.duration};
      video.pause();
      return result;
    });
    expect(result.width).toBe(960);
    expect(result.time).toBeGreaterThan(0);
    expect(Number.isFinite(result.duration)).toBe(true);
    await page.getByText('Read the video explanation',{exact:true}).click();
    await expect(page.locator('details[open] ol li')).toHaveCount(3);
    await page.getByRole('group',{name:'Choose an answer'}).getByRole('button').first().click();
    await expect(page.getByRole('status')).toContainText('Correct');
  }
});

test('theme, visible keyboard focus and personal passage',async({page})=>{
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip=page.getByRole('link',{name:'Skip to content'});
  await expect(skip).toBeFocused();
  expect(await skip.evaluate(node=>getComputedStyle(node).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Tab');
  await page.getByRole('button',{name:'Toggle theme'}).click();
  await expect(page.locator('.dark')).toHaveCount(1);
  await page.getByRole('button',{name:'Toggle larger text'}).click();
  await expect(page.locator('.large')).toHaveCount(1);
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('button',{name:'About',exact:true}).click();
  await expect(page.getByText(/My motivation comes from living with cerebral palsy/)).toBeVisible();
  await expect(page.getByRole('heading',{name:'Mission',exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:'My curiosity about biomedical engineering'})).toBeVisible();
});
