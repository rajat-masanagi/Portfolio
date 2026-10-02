import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
const base = process.env.TEST_URL || 'http://127.0.0.1:3000';
await mkdir('test-results',{recursive:true});
const basePath = new URL(base).pathname.replace(/\/$/, '');
const failures=[];
const projectRepositories = {
 'event-booking': 'Event-Booking',
 'lunar-navigation': null,
 'workflow-generator': null,
 'healthcare-crm': 'Healthcare-CRM',
 'adaptive-quiz-platform': 'Gamified_Learning',
 'crop-recommendation-engine': 'Crop-Reccomendation',
 'smart-waste-management': 'Waste_Management',
 'text-social': 'Social-Media',
 'repoatlas': 'GitHub-Repository-Analyzer',
};
for (const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844],['small-mobile',320,740]]) {
 const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 assert.doesNotMatch(await page.locator('body').innerText(), /[↗↑↓←→]|\p{Extended_Pictographic}/u, 'UI should not contain emoji or font arrows');
 assert.ok(await page.locator('.ui-icon svg').count() > 10, 'Interface uses vector icons');
 assert.equal(await page.locator('.art-lunar svg').count(), 1);

 assert.equal(await page.locator('h1').textContent(),'Rajat Masanagi');
 assert.equal(await page.locator('.archive-year').count(),0);
 assert.ok(!/WeaveAI|RepoAtlas|Text Social|EcoSaathi|1of1|case study/i.test(await page.locator('main').innerText()));
 assert.equal(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(16, 21, 18)', 'Theme CSS must load');
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
 await page.waitForFunction(()=>document.querySelector('.gallery-controls > span[aria-live]').textContent.startsWith('2 /'));
 await previous.click();
 await page.waitForFunction(()=>document.querySelector('.gallery-controls > span[aria-live]').textContent.startsWith('1 /'));
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
 await gallery.getByRole('button',{name:'Close'}).click();
 assert.ok(await enlarge.evaluate(el=>el===document.activeElement));
 await gallery.locator('.gallery-track').evaluate(el=>{el.scrollLeft=el.scrollWidth;});
 await page.waitForFunction(()=>document.querySelector('.gallery-controls button:last-child').disabled);
 assert.ok(await next.isDisabled());
 await gallery.locator('.gallery-track').evaluate(el=>{el.scrollLeft=0;});
 await page.waitForFunction(()=>document.querySelector('.gallery-controls > span[aria-live]').textContent.startsWith('1 /'));
 const broken=await gallery.locator('img').evaluateAll(images=>images.filter(img=>img.complete && img.naturalWidth===0).map(img=>img.src));
 assert.deepEqual(broken,[]);
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/${name}.png`,fullPage:true});
 assert.equal(await page.getByRole('link',{name:/GitHub repository/,includeHidden:true}).count(),7);
 for (const removed of ['geospatial-tourism-analysis','automatic-ad-optimization']) assert.equal(await page.locator(`a[href="${basePath}/projects/${removed}/"]`).count(),0);
 assert.equal(await page.locator('.project-card .project-art').count(),3);
 assert.equal(await page.getByRole('link',{name:/View certificates on Google Drive/}).count(),1);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name}: horizontal overflow`);
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 for(const v of results.violations)failures.push({viewport:name,id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))});
 await page.getByRole('link',{name:'Work',exact:true}).click();
 await page.waitForURL(url => url.hash === '#work');
 assert.ok(new URL(page.url()).hash==='#work');
 await page.locator('.archive summary').first().click();
 assert.ok(await page.locator('.archive details').first().getAttribute('open')!==null);
 await page.locator('.archive summary').first().click();
 const pdf=await page.request.get(`${base}/Rajat-Masanagi-Resume.pdf`);assert.equal(pdf.status(),200);
 assert.equal(await page.locator('.contact-link').getAttribute('href'),'mailto:r.masanagi26@gmail.com');
 assert.deepEqual(errors,[],`${name}: browser errors`);
 const badImages=await page.locator('img').evaluateAll(imgs=>imgs.filter(img=>img.complete && !img.naturalWidth).map(img=>img.src));
 assert.deepEqual(badImages,[]);
 if(name==='desktop'){
   await page.keyboard.press('Control+Home');await page.goto(base);await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to content');
   for(const slug of Object.keys(projectRepositories)){
    const response=await page.goto(`${base}/projects/${slug}/`,{waitUntil:'networkidle'});assert.equal(response.status(),200);
    assert.equal(await page.getByRole('heading', {name: 'Getting started'}).count(), 0);
    await page.screenshot({path:`test-results/${slug}.png`,fullPage:true});
    assert.equal(await page.locator('h1').count(),1);
    assert.ok(!/WeaveAI|RepoAtlas|Text Social|EcoSaathi|1of1|case study/i.test(await page.locator('main').innerText()));
    const socialImage=await page.locator('meta[property="og:image"]').getAttribute('content');
    assert.ok(new URL(socialImage).pathname.startsWith(basePath+'/images/'));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    for (const heading of ['The problem','Features','My contribution','The approach','The outcome']) assert.equal(await page.getByRole('heading',{name:heading,exact:true}).count(),1,`${slug}: ${heading}`);
    const repository=projectRepositories[slug];
    const repoLink=page.getByRole('link',{name:/GitHub repository/});
    if(repository) {
      assert.equal(await repoLink.getAttribute('href'),`https://github.com/rajat-masanagi/${repository}`);
      assert.equal(await page.getByRole('link',{name:/Read the README/}).getAttribute('href'),`https://github.com/rajat-masanagi/${repository}#readme`);
    } else assert.equal(await repoLink.count(),0);
    if(slug==='workflow-generator') assert.equal(await page.locator('.repository-note').textContent(),'Private repository');
    const nextHref=await page.locator('.next-project').getAttribute('href');
    assert.ok(Object.keys(projectRepositories).some(slug=>nextHref===`${basePath}/projects/${slug}/`));
    const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();for(const v of a.violations)failures.push({page:slug,id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))});
    assert.equal(await page.locator('meta[property="og:image"]').count(),1);
   }
   for (const removed of ['geospatial-tourism-analysis','automatic-ad-optimization']) { const response=await page.goto(`${base}/projects/${removed}/`);assert.equal(response.status(),404); }
   const missing=await page.goto(`${base}/not-a-page/`);assert.equal(missing.status(),404);await page.getByRole('link',{name:/Return to the landscape/}).click();await page.waitForURL(base+'/');assert.equal(new URL(page.url()).pathname,basePath+'/');
 }
 if(name==='mobile'){
  for(const slug of ['lunar-navigation','workflow-generator','text-social','repoatlas','healthcare-crm']) { await page.goto(`${base}/projects/${slug}/`,{waitUntil:'networkidle'});await page.screenshot({path:`test-results/${slug}-mobile.png`,fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)); }
 }
 await context.close();console.log(`${name}: layout, links, interactions, and accessibility checked`);
}
await browser.close();
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exitCode=1;}else console.log('All UI checks passed.');
