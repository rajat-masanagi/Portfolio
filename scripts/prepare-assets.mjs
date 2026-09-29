import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
if (!process.argv.includes('--social-only')) {
await sharp('assets/source/landscape.png').resize({width:1920,withoutEnlargement:true}).webp({quality:88}).toFile('public/images/landscape.webp');
// Mirror adjacent tiles so the repeated texture meets at identical edge pixels.
const source = await sharp('assets/source/charcoal-pastel.png').resize(840,470).png().toBuffer();
const mirrored = await sharp(source).flip().png().toBuffer();
await sharp({create:{width:840,height:940,channels:3,background:'#101512'}}).composite([{input:source,top:0,left:0},{input:mirrored,top:470,left:0}]).webp({quality:82}).toFile('public/images/charcoal-pastel.webp');
}
const previews = [
 ['preview','Rajat Masanagi','Software Developer'],
 ['event-booking','Scalable Event Booking','Distributed systems · Java & Spring Boot'],
 ['lunar-navigation','Lunar Surface Navigation','Geospatial intelligence · Chandrayaan-2'],
 ['workflow-generator','No-Code Workflow Generator','Agentic AI · From intent to execution'],
];
for(const [slug,title,subtitle] of previews){
 const escape=s=>s.replaceAll('&','&amp;');
 const svg=Buffer.from(`<svg width="1200" height="630"><rect width="1200" height="630" fill="#07120d" opacity=".32"/><text x="600" y="295" text-anchor="middle" font-family="Georgia" font-size="63" fill="#fff9e9">${escape(title)}</text><text x="600" y="355" text-anchor="middle" font-family="Arial" font-size="20" letter-spacing="3" fill="#f5f2df">${escape(subtitle)}</text><text x="600" y="560" text-anchor="middle" font-family="Arial" font-size="14" fill="#d2dbc1">RAJAT MASANAGI · SELECTED WORK</text></svg>`);
 await sharp(await readFile('assets/source/landscape.png')).resize(1200,630,{fit:'cover'}).composite([{input:svg}]).jpeg({quality:88}).toFile(`public/images/social-${slug}.jpg`);
}
console.log(process.argv.includes('--social-only') ? 'Four social previews created.' : 'Optimized landscape, matching texture, and four social previews created.');
