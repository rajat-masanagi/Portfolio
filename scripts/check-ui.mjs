import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
const base = process.env.TEST_URL || 'http://127.0.0.1:3000';
await mkdir('test-results',{recursive:true});
const failures=[];
for (const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844],['small-mobile',320,740]]) {
 const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});

 assert.equal(await page.locator('h1').textContent(),'Rajat Masanagi');
 assert.equal(await page.locator('.hero-subtitle').textContent(),'Software Developer');
 for (const href of ['https://github.com/rajat-masanagi', 'https://www.linkedin.com/in/rajat-masanagi/', 'https://leetcode.com/u/rajat_masanagi/', 'https://codolio.com/profile/lyses', 'https://reference-global.com/article/10.2478/ijssis-2026-0063']) assert.ok(await page.locator(`a[href="${href}"]`).count() > 0);
 assert.equal(await page.locator('.education-entry').count(),1);
 assert.equal(await page.locator('#about .skill-group').count(),0);
 assert.equal(await page.locator('#skills .skill-group').count(),4);
 assert.ok((await page.locator('.coursework').textContent()).includes('Operating Systems'));
 assert.equal(await page.locator('#experience .gallery').count(),0, 'Missing experience photos must not render empty galleries');
 const gallery=page.locator('.certificates .gallery');
 const count=await gallery.locator('.gallery-slide').count();
 assert.ok(count>1);
 const dimensions=await gallery.locator('.gallery-slide').first().boundingBox();
 assert.ok(dimensions.width < width * .85, 'Certificate previews should be compact');
 assert.ok(dimensions.height < 330, 'Certificate strip should not dominate the page');
 const previous=gallery.getByRole('button',{name:/Previous image/});
 const next=gallery.getByRole('button',{name:/Next image/});
 assert.ok(await previous.isDisabled());
 await next.click();
 await page.waitForFunction(()=>document.querySelector('.gallery-controls span').textContent.startsWith('2 /'));
 await previous.click();
 await page.waitForFunction(()=>document.querySelector('.gallery-controls span').textContent.startsWith('1 /'));
 const enlarge=gallery.getByRole('button',{name:/Enlarge/}).first();
 await enlarge.click();
 assert.ok(await gallery.locator('dialog').evaluate(el=>el.open));
 const modalA11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 assert.deepEqual(modalA11y.violations.map(v=>v.id),[]);
 await page.keyboard.press('Tab');
 assert.ok(await page.locator(':focus').evaluate(el=>!!el.closest('dialog')));
 await page.keyboard.press('Escape');
 assert.equal(await gallery.locator('dialog').evaluate(el=>el.open),false);
 assert.ok(await enlarge.evaluate(el=>el===document.activeElement));
 await enlarge.click();
 await gallery.getByRole('button',{name:'Close ×'}).click();
 assert.ok(await enlarge.evaluate(el=>el===document.activeElement));
 await gallery.locator('.gallery-track').evaluate(el=>{el.scrollLeft=el.scrollWidth;});
 await page.waitForFunction(()=>document.querySelector('.gallery-controls button:last-child').disabled);
 assert.ok(await next.isDisabled());
 await gallery.locator('.gallery-track').evaluate(el=>{el.scrollLeft=0;});
 await page.waitForFunction(()=>document.querySelector('.gallery-controls span').textContent.startsWith('1 /'));
 const broken=await gallery.locator('img').evaluateAll(images=>images.filter(img=>img.complete && img.naturalWidth===0).map(img=>img.src));
 assert.deepEqual(broken,[]);
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/${name}.png`,fullPage:true});
 assert.equal(await page.locator('.repository-link').count(),0, 'Unknown repositories must not produce links');
 assert.equal(await page.getByRole('link',{name:/View certificates on Google Drive/}).count(),1);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name}: horizontal overflow`);
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 for(const v of results.violations)failures.push({viewport:name,id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))});
 await page.getByRole('link',{name:'Work',exact:true}).click();
 await page.waitForURL('**/#work');
 assert.ok(new URL(page.url()).hash==='#work');
 await page.locator('.archive summary').first().click();
 assert.ok(await page.locator('.archive details').first().getAttribute('open')!==null);
 await page.locator('.archive summary').first().click();
 const pdf=await page.request.get(`${base}/rajat-masanagi-resume-draft.pdf`);assert.equal(pdf.status(),200);
 assert.equal(await page.locator('.contact-link').getAttribute('href'),'mailto:r.masanagi26@gmail.com');
 assert.deepEqual(errors,[],`${name}: browser errors`);
 if(name==='desktop'){
   await page.keyboard.press('Control+Home');await page.goto(base);await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to content');
   for(const slug of ['event-booking','lunar-navigation','workflow-generator','healthcare-crm','geospatial-tourism-analysis','automatic-ad-optimization','adaptive-quiz-platform','crop-recommendation-engine','smart-waste-management']){
    const response=await page.goto(`${base}/projects/${slug}/`,{waitUntil:'networkidle'});assert.equal(response.status(),200);
    await page.screenshot({path:`test-results/${slug}.png`,fullPage:true});
    assert.equal(await page.locator('h1').count(),1);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    assert.equal(await page.getByRole('heading',{name:'Getting started',exact:true}).count(),0);
    const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();for(const v of a.violations)failures.push({page:slug,id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))});
    assert.equal(await page.locator('meta[property="og:image"]').count(),1);
   }
   const missing=await page.goto(`${base}/not-a-page/`);assert.equal(missing.status(),404);await page.getByRole('link',{name:/Return to the landscape/}).click();await page.waitForURL(base+'/');assert.equal(new URL(page.url()).pathname,'/');
 }
 if(name==='mobile'){
  await page.goto(`${base}/projects/lunar-navigation/`,{waitUntil:'networkidle'});await page.screenshot({path:'test-results/case-mobile.png',fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 await context.close();console.log(`${name}: layout, links, interactions, and accessibility checked`);
}
await browser.close();
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exitCode=1;}else console.log('All UI checks passed.');
