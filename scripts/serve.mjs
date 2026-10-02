import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('out');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.woff2':'font/woff2','.txt':'text/plain'};
createServer(async(req,res)=>{
 try {
  // Read the build's own prefix so a preview cannot accidentally use a different one.
  const {basePath=''}=JSON.parse(await readFile(resolve(root,'site-config.json'),'utf8'));
  const url=new URL(req.url,'http://localhost');
  const pathname=decodeURIComponent(url.pathname);
  if(basePath && (pathname==='/' || pathname===basePath)) {
   res.writeHead(302,{Location:basePath+'/'+url.search});res.end();return;
  }
  let path;
  if(basePath && !pathname.startsWith(basePath+'/')) path=resolve(root,'404.html');
  else path=resolve(root,'.'+(pathname.slice(basePath.length)||'/'));
  if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  if(path===resolve(root,'404.html')) res.statusCode=404;
  try{if((await stat(path)).isDirectory())path=resolve(path,'index.html');}catch{}
  let content;
  try{content=await readFile(path);}catch{path=resolve(root,'404.html');content=await readFile(path);res.statusCode=404;}
  res.setHeader('Content-Type',types[extname(path)]||'application/octet-stream');res.end(content);
 } catch {res.writeHead(400);res.end('Bad request');}
}).listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('Static portfolio: http://127.0.0.1:'+(process.env.PORT||3000)));
