import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('family paths and screening example',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('heading',{level:1})).toContainText('Making complex prenatal science');
 await page.getByRole('button',{name:'Try the screening simulator',exact:true}).click();
 await expect(page.locator('#simulator-controls')).toBeFocused();
 await expect(page.getByText('49.77%',{exact:true}).first()).toBeVisible();
 await expect(page.getByText('90.91%',{exact:true})).toBeVisible();
 await page.getByLabel('Condition prevalence (%)',{exact:true}).fill('1');
 await expect(page.getByText('90.91%',{exact:true})).toHaveCount(2);
 await page.getByRole('link',{name:'Open appointment checklist and caregiver resources'}).click();
 await expect(page.getByRole('button',{name:'Download appointment checklist'})).toBeVisible();
 const audit=await new AxeBuilder({page}).analyze();
 expect(audit.violations.map(({id,nodes})=>({id,targets:nodes.map(node=>node.target)}))).toEqual([]);
});

test('phone actions, keyboard focus and larger text',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 await page.keyboard.press('Tab');
 const primary=await page.getByRole('link',{name:'Explore GENORA',exact:true}).boundingBox();
 expect(primary!.y+primary!.height).toBeLessThan(844);
 await page.getByRole('button',{name:'Toggle larger text'}).click();
 await page.getByRole('button',{name:'Understand inheritance',exact:true}).click();
 await expect(page.getByRole('heading',{level:1,name:'Genetics & Inheritance',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});

