// i18n tool: extract Persian string literals from src/*.js, and apply (replace literals by table lookups).
// usage: node i18n/tool.js extract  |  node i18n/tool.js apply <in.js> <out.js> <lang-table.json>
const acorn=require('acorn'),fs=require('fs'),crypto=require('crypto');
const R=/[؀-ۿ]/;
const id=s=>crypto.createHash('sha1').update(s).digest('base64url').slice(0,7);
function lits(src){
  const ast=acorn.parse(src,{ecmaVersion:2022});const out=[];
  (function w(n,parent,key){
    if(!n||typeof n.type!=='string')return;
    if(n.type==='Literal'&&typeof n.value==='string'&&R.test(n.value)&&!(parent&&parent.type==='Property'&&key==='key'&&!parent.computed))out.push(n);
    for(const k in n){const v=n[k];if(Array.isArray(v))v.forEach(c=>c&&c.type&&w(c,n,k));else if(v&&typeof v.type==='string')w(v,n,k)}
  })(ast,null,null);
  return out;
}
const mode=process.argv[2];
if(mode==='extract'){
  const dir=process.argv[3]||'.';const m={};
  for(const f of ['src/app.js','src/practice.js']){
    const src=fs.readFileSync(dir+'/'+f,'utf8').replace('/*@@PRACTICE@@*/','');
    for(const n of lits(src))m[id(n.value)]=n.value;
  }
  fs.writeFileSync(dir+'/i18n/fa.json',JSON.stringify(m,null,0));
  console.log('unique',Object.keys(m).length);
}else if(mode==='apply'){
  // apply <in.js> <out.js> <dir>: replaces Persian literals with _L("id"); writes table of [fa,en]
  const [,, , inp,outp,dir]=process.argv;
  const src=fs.readFileSync(inp,'utf8');
  const en={};for(const f of fs.readdirSync(dir+'/i18n/en'))Object.assign(en,JSON.parse(fs.readFileSync(dir+'/i18n/en/'+f,'utf8')));
  const ns=lits(src);let out='',last=0;const tbl={};let missing=0;
  for(const n of ns){const k=id(n.value);out+=src.slice(last,n.start)+'_L("'+k+'")';last=n.end;
    if(!(k in en)){missing++;en[k]=n.value}
    tbl[k]=[n.value,en[k]]}
  out+=src.slice(last);
  if(missing)console.error('WARN untranslated:',missing);
  fs.writeFileSync(outp,'var _S='+JSON.stringify(tbl)+';\n'+out);
}
