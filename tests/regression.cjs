// Run with node tests/regression.cjs. No packages or external calls.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
const context=vm.createContext({window:{},Intl,Date});
for(const f of ['assets/plan-v7.js','assets/core-v7.js','assets/app-v7.js','sw.js'])new vm.Script(read(f),{filename:f});
for(const f of ['assets/plan-v7.js','assets/core-v7.js'])vm.runInContext(read(f),context);
const {NordCore:c,NORD_PLAN:p}=context.window;
assert.equal(p.length,14);
assert.equal(c.n(null),null);assert.equal(c.n(''),null);assert.equal(c.n(0),0);assert.equal(c.n('0'),0);assert.equal(c.n('bad'),null);
assert.equal(c.addDays('2027-01-31',1),'2027-02-01');
const items=[{id:1,key:'a'},{id:2,key:'b'},{id:3,key:'a'}];
assert.equal(c.prioritise(items,2)[0].id,2);assert.equal(items[0].id,1);
assert.equal(c.uniqueBy(items,x=>x.key).length,2);assert.equal(c.groupBy(items,x=>x.key)[0].length,2);
const html=read('index.html'),sw=read('sw.js');
for(const m of html.matchAll(/(?:href|src)="\.\/(assets\/[^"]+)"/g)){
  assert.ok(fs.existsSync(path.join(__dirname,'..',m[1])),m[1]);
  assert.ok(sw.includes('./'+m[1]),'offline asset '+m[1]);
}
assert.ok(!html.includes('data:image/png;base64,'));
console.log('Nord regression checks passed');
