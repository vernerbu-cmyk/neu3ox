"""Browser regressions. Requires Python Playwright and Chromium at /usr/bin/chromium."""
from pathlib import Path
import functools,http.server,threading
from playwright.sync_api import sync_playwright
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(Path(__file__).resolve().parents[1])));threading.Thread(target=server.serve_forever,daemon=True).start();origin=f'http://127.0.0.1:{server.server_port}'
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);ctx=browser.new_context();ctx.route('**/*',lambda r:r.continue_() if r.request.url.startswith(origin+'/') else r.abort());p=ctx.new_page();errors=[];missing=[];p.on('pageerror',lambda e:errors.append(str(e)));p.on('response',lambda r:missing.append(r.url) if r.status>=400 and r.url.startswith(origin+'/') else None);p.clock.install();p.goto(origin+'/memory/statement.html',wait_until='load');p.set_default_timeout(5000)
  for title in ['Как мальчик рассказывал о грозе','Враги змей']:
   keys=p.evaluate("title=>{retellCfg.planMode='strict';const t=TEXTS.find(t=>t.title===title);retellPlan(t,getParagraphs(t.text));return t.planKeys}",title)
   for i,k in enumerate(keys):p.locator('.plan-input').nth(i).fill(' '.join(k))
   p.locator('#checkBtn').click();assert p.locator('.plan-block.wrong').count()==0;assert p.locator('.plan-block.correct').count()==3
   p.locator('#checkBtn').click();assert p.locator('.result-screen').count()==1
   print('STRICT full marks:',title,flush=True)
  questions=p.evaluate("()=>{retellCfg.mode='questions';retellCfg.textLength='short';retellCfg.timerMode=false;Math.random=()=>0;retellShow();return getRetellExercise(TEXTS[0],'short').questions}")
  assert p.locator('.text-body p').count()==2 and len(questions)==4
  p.locator('#readyBtn').click()
  for q in questions:p.get_by_text(q['correct'],exact=True).click();p.clock.run_for(1200)
  assert 'Все ответы верны' in p.locator('h2').inner_text();assert '4 из 4' in p.locator('#game').inner_text()
  print('SHORT questions: only 4 supported questions, perfect result',flush=True)
  keys=p.evaluate("()=>{retellCfg.mode='keys';retellShow();return getRetellExercise(TEXTS[0],'short').keysFor3}");p.locator('#readyBtn').click();assert p.locator('.key-tile').filter(has_text='птенчики').count()==0
  for key in keys:p.locator('.key-tile').get_by_text(key,exact=True).click()
  p.locator('#checkBtn').click();assert p.locator('.key-tile.wrong').count()==0;p.locator('#checkBtn').click();assert 'Идеально!' in p.locator('h2').inner_text()
  print('SHORT keywords: omitted paragraph excluded; all correct choices accepted',flush=True)
  words=p.evaluate("()=>{retellCfg.mode='retell';retellCfg.textLength='medium';retellShow();return TEXTS[0].keysForRetell.join(' ')}");p.locator('#readyBtn').click();p.locator('#retell').fill(words);p.locator('#checkBtn').click();assert p.locator('#retell').count()==1;assert 'хотя бы 3' in p.locator('#retellFeedback').inner_text()
  p.locator('#retell').fill('Ласточка гнездо. Глина яйца. Птенчики родители.');p.locator('#checkBtn').click();assert 'списка' in p.locator('#retellFeedback').inner_text()
  p.locator('#retell').fill('Ласточка строит гнездо из глины. Потом она откладывает яйца. Родители кормят птенчиков мошками.');p.locator('#checkBtn').click();assert 'Опорные слова найдены' in p.locator('h2').inner_text();assert 'Отличный пересказ' not in p.locator('#game').inner_text()
  print('RETELL: lists rejected; genuine draft receives honest keyword feedback',flush=True)
  p.evaluate("()=>retellWrite(getRetellExercise(TEXTS[0],'short'))");p.locator('#retell').fill('Ласточка строит гнездо под крышей. Самец носит корм самке. <b>цитата</b>');p.locator('#checkBtn').click();assert p.locator('.review-block b').count()==0;assert '<b>цитата</b>' in p.locator('#game').inner_text()
  print('RETELL: short two-sentence draft accepted; typed markup remains text',flush=True)
  p.evaluate('startRetelling()');p.locator('[data-mode="questions"]').first.click();p.locator('.segment-btn[data-len="medium"]').click();p.locator('.segment-btn[data-timer="0"]').click();p.locator('#startBtn').click();assert p.locator('.text-body p').count()==3;p.locator('#readyBtn').click();assert '/ 5' in p.locator('.subtitle').inner_text()
  print('FULL questions: normal start controls still show all 3 paragraphs and 5 questions',flush=True)
  for width in [390,320]:
   p.set_viewport_size({'width':width,'height':844});p.evaluate("()=>retellWrite(getRetellExercise(TEXTS[0],'short'))");assert p.evaluate('document.documentElement.scrollWidth<=innerWidth')
  assert not errors,errors;assert not missing,missing;browser.close();print('PASS: mobile layouts; no local 404s or JavaScript errors',flush=True)
finally:server.shutdown();server.server_close()
