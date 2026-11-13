import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const root = resolve('dist');
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const path = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
  if (!path.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const data = await readFile(path);
    const ext = path.split('.').pop();
    res.setHeader('Content-Type', ({html:'text/html',js:'text/javascript',css:'text/css',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg'})[ext] || 'application/octet-stream');
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(8451, '127.0.0.1', r));

const browser = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--remote-debugging-port=9231',
  `--user-data-dir=${resolve('.tmp-kishan-chrome-qa')}`, '--no-first-run', '--no-default-browser-check',
  '--disable-background-networking', 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
let socket;
try {
  let tab;
  for (let i = 0; i < 40; i++) {
    try { tab = (await (await fetch('http://127.0.0.1:9231/json')).json()).find(t => t.type === 'page'); if (tab) break; } catch {}
    await new Promise(r => setTimeout(r, 250));
  }
  if (!tab) throw new Error('Headless browser did not start');
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((res, rej) => { socket.onopen = res; socket.onerror = rej; });
  let nextId = 0;
  const pending = new Map();
  const errors = [];
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (message.id) {
      const handler = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) handler.reject(message.error); else handler.resolve(message.result);
    }
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 15000);
    pending.set(id, { resolve: value => { clearTimeout(timeout); resolve(value); }, reject: error => { clearTimeout(timeout); reject(error); } });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => (await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
  await call('Runtime.enable');
  await call('Page.enable');
  for (const width of [390, 1440, 320]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await call('Page.navigate', { url: 'http://127.0.0.1:8451' });
    await new Promise(r => setTimeout(r, 1700));
    await evaluate('Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]).then(()=>true)');
    if (width === 390) {
      const shot = await call('Page.captureScreenshot', { format: 'png' });
      writeFileSync('.tmp/opening-mobile.png', Buffer.from(shot.data, 'base64'));
    }
    await evaluate('document.querySelector(".opening-logo-button").click()');
    await new Promise(r => setTimeout(r, 2200));
    // Reveal the sections as a guest scrolls through them.
    await evaluate('(async()=>{for(const el of document.querySelectorAll("main > section, .event-card, footer")){el.scrollIntoView({behavior:"instant"});await new Promise(r=>setTimeout(r,250));}window.scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,900));})()');
    await evaluate('Promise.race([Promise.all([...document.images].map(i=>{i.loading="eager";return i.decode().catch(()=>{});})),new Promise(r=>setTimeout(r,5000))]).then(()=>true)');
    console.log(JSON.stringify(await evaluate(`({width:innerWidth,title:document.title,lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth>innerWidth,englishOnly:!/[\\u0900-\\u097f]/.test(document.body.innerText),oldNames:/Shristi|Harsh|Indirapuram/.test(document.body.innerText),events:document.querySelectorAll('.event-card').length,contacts:[...document.querySelectorAll('a[href^="tel:"]')].map(a=>a.textContent),brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),clippedEventContents:[...document.querySelectorAll('.event-content')].filter(el=>{const a=el.getBoundingClientRect(),b=el.parentElement.getBoundingClientRect();return a.top<b.top||a.bottom>b.bottom;}).length})`)));
    if (width !== 320) {
      await evaluate('document.querySelector("#reception").scrollIntoView({behavior:"instant",block:"center"})');
      await new Promise(r=>setTimeout(r,1000));
      const shot = await call('Page.captureScreenshot', { format: 'png' });
      writeFileSync(`.tmp/reception-${width}.png`, Buffer.from(shot.data, 'base64'));
    }
  }
  console.log(JSON.stringify({ runtimeErrors: errors }));
} finally {
  socket?.close();
  browser.kill();
  server.closeAllConnections();
  server.close();
}
