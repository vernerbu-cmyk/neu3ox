"""Regression scenarios for memory trainer scoring, generated tasks, and mobile layout."""
from pathlib import Path
import functools
import http.server
import re
import threading
from playwright.sync_api import sync_playwright


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


root = Path(__file__).resolve().parents[1]
server = http.server.ThreadingHTTPServer(
    ('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(root)))
threading.Thread(target=server.serve_forever, daemon=True).start()
origin = f'http://127.0.0.1:{server.server_port}'
try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
        context = browser.new_context()
        context.route('**/*', lambda r: r.continue_() if r.request.url.startswith(origin + '/') else r.abort())
        page = context.new_page()
        page.set_default_timeout(5000)
        errors, missing = [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: missing.append(r.url) if r.status >= 400 and r.url.startswith(origin + '/') else None)
        page.clock.install()

        def visit(name):
            page.goto(f'{origin}/memory/{name}.html', wait_until='load')

        def fits():
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), page.url

        # All trainer entry screens: narrow phones and desktop.
        for path in sorted((root / 'memory').glob('*.html')):
            visit(path.stem)
            for width in [320, 390, 1280]:
                page.set_viewport_size({'width': width, 'height': 844})
                fits()
        print('LOAD: all 14 trainers and menu fit 320, 390, and 1280px', flush=True)

        visit('dual')
        for mode in ['digit', 'letter', 'both']:
            for good in [False, True]:
                page.evaluate('mode => { dualCfg.inputMode=mode; dualInput([{digit:1,letter:"А"},{digit:2,letter:"Б"},{digit:3,letter:"В"}]); }', mode)
                if page.locator('#digitsIn').count():
                    page.locator('#digitsIn').fill('123' if good else '999')
                if page.locator('#lettersIn').count():
                    page.locator('#lettersIn').fill('абв' if good else 'ЯЯЯ')
                page.locator('#checkBtn').click()
                assert page.locator('.stars').inner_text() == ('⭐⭐⭐' if good else '☆☆☆'), mode
        # Partial credit in the actual two-stream mode still works.
        page.evaluate('dualInput([{digit:1,letter:"А"},{digit:2,letter:"Б"},{digit:3,letter:"В"}])')
        page.locator('#digitsIn').fill('123')
        page.locator('#lettersIn').fill('ЯЯЯ')
        page.locator('#checkBtn').click()
        assert page.locator('.stars').inner_text() == '⭐☆☆'
        print('DUAL: wrong, correct, and partial answers graded by requested streams', flush=True)

        visit('mirror')
        pattern = [[True, False, False], [False, False, False], [False, False, False]]
        for kind in ['blank', 'direct', 'extra', 'perfect']:
            page.evaluate('pattern => {reflectionCfg.cols=3; reflectionCfg.rows=3; reflectionCfg.filled=1; reflectionShow(); reflectionPlay(pattern);}', pattern)
            if kind == 'direct':
                page.locator('#rightGrid .mirror-cell').nth(0).click()
            elif kind == 'extra':
                for cell in page.locator('#rightGrid .mirror-cell').all():
                    cell.click()
            elif kind == 'perfect':
                page.locator('#rightGrid .mirror-cell').nth(2).click()
            page.locator('#checkBtn').click()
            assert page.locator('.stars').inner_text() == ('⭐⭐⭐' if kind == 'perfect' else '☆☆☆'), kind
            if kind == 'direct':
                assert 'Забыл про зеркало' in page.locator('.result-screen').inner_text()
            if kind == 'blank':
                assert '0 из 1' in page.locator('.result-screen').inner_text()
                assert page.locator('.result-missed').count() == 1
        for width in [320, 390]:
            page.set_viewport_size({'width': width, 'height': 844})
            page.evaluate('startReflection()')
            fits()
            page.evaluate('reflectionCfg.cols=5; reflectionCfg.rows=6; reflectionShow()')
            fits()
            page.clock.run_for(20000)
            fits()
            page.locator('#checkBtn').click()
            fits()
        page.set_viewport_size({'width': 1280, 'height': 844})
        print('MIRROR: no empty-cell credit; direct-copy hint; missing cells; phone gameplay', flush=True)

        visit('simon')
        for start in [1, 3, 8]:
            page.evaluate('n => {simonCfg.startLevel=n; simonCfg.reverseEvery=2; simonCfg.doubleShowEvery=0; simonCfg.distractors=false; simonCfg.speedUp=false; simonCfg.speed=200; simonPlay();}', start)
            page.clock.run_for(4000)
            assert page.evaluate('simonState.sequence.length') == start
            assert page.evaluate('simonState.accepting')
            page.evaluate('simonState.sequence.forEach(i=>simonClick(i))')
            page.clock.run_for(4000)
            state = page.evaluate('({seq:simonState.sequence, reverse:simonState.reverse, accepting:simonState.accepting})')
            assert len(state['seq']) == start + 1 and state['reverse'] and state['accepting']
            expected = page.evaluate('simonState.sequence.toReversed().map(i=>SIMON_CHARS[i].emoji).join(" ")')
            page.evaluate('simonClick((simonState.sequence.at(-1)+1)%simonState.btnCount)')
            page.clock.run_for(1300)
            result = page.locator('.result-screen').inner_text()
            assert f'Длина последней последовательности: {start + 1}' in result
            assert expected in result
            assert 'Пройдено раундов: 1' in result
        print('SIMON: start lengths 1/3/8, growing sequence, reverse answer and actual result length', flush=True)

        visit('newtimes')
        context_keys = {'Место':'place','Герой':'creature','Действие':'action','Время':'time',
                        'Обстоятельства':'circumstance','Свидетель':'witness','Цитата свидетеля':'witnessQuote',
                        'Эксперт':'expert','Цитата эксперта':'expertQuote','Последствия':'consequence',
                        'Концовка':'ending','Детали':'detail'}
        context_keys = {label.casefold(): key for label, key in context_keys.items()}
        for size, count in [('short',7), ('medium',10), ('long',12)]:
            for syllables in [False, True]:
                news = page.evaluate('''args => {
                    newsCfg.questions=12; newsCfg.syllables=args.syllables;
                    const news=generateNews(args.size); newsAsk(news); return news;
                }''', {'size': size, 'syllables': syllables})
                assert len(news['factKeys']) == count
                seen = set()
                for _ in range(count):
                    key = context_keys[page.locator('.question-context').inner_text().casefold()]
                    assert key in news['factKeys'] and key not in seen, (size, key)
                    seen.add(key)
                    answer = news['facts'][key]
                    if syllables:
                        answer = page.evaluate('text=>syllableTransform(text)', answer)
                    options = page.locator('#opts .option-text').all_text_contents()
                    assert len(options) == len(set(options)) == 4
                    page.locator('#opts .option-text').filter(has_text=re.compile('^'+re.escape(answer)+'$')).click()
                    page.clock.run_for(1200)
                assert seen == set(news['factKeys'])
                assert page.locator('.stars').inner_text() == '⭐⭐⭐'
                assert {'place','time','witness'}.issubset(seen)
                if size == 'short':
                    assert not {'expert','expertQuote','circumstance','consequence','detail'} & seen
        print('NEWS: all 7/10/12 available facts tested, including syllables; omitted facts excluded', flush=True)

        visit('dungeon')
        assert page.evaluate('new Set(DUNGEON_ITEMS).size === DUNGEON_ITEMS.length')
        for mode in ['click', 'choice']:
            data = page.evaluate('''mode => {
                dungeonCfg.cols=4; dungeonCfg.rows=4; dungeonCfg.items=9; dungeonCfg.mode=mode;
                dungeonShow();
                const rooms=[...document.querySelectorAll('#grid .room')];
                const roomEmojis=rooms.map(r=>r.querySelector('.room-emoji').textContent);
                const roomItems=rooms.map(r=>r.querySelector('.room-item')?.textContent || null);
                const itemIndices=roomItems.map((x,i)=>x?i:-1).filter(i=>i>=0);
                const items=roomItems.filter(Boolean);
                const data={cols:4,rows:4,total:16,roomEmojis,roomItems,itemIndices,items};
                dungeonAsk(data);return data;
            }''', mode)
            assert len(set(data['items'])) == 9
            for _ in range(9):
                status = page.locator('.status').inner_text()
                if mode == 'click':
                    target = next(i for i, item in enumerate(data['roomItems']) if item and item in status)
                    assert page.locator('#grid .room-number').all_text_contents() == [f'№{i}' for i in range(1,17)]
                    page.locator('#grid .room').nth(target).click()
                else:
                    target = int(re.search(r'№(\d+)', status).group(1)) - 1
                    options = page.locator('#opts .option-btn').all_text_contents()
                    assert len(options) == len(set(options)) == 4
                    page.locator('#opts .option-btn').filter(has_text=data['roomItems'][target]).click()
                page.clock.run_for(1400)
            assert page.locator('.stars').inner_text() == '⭐⭐⭐'
        # One treasure still gives a real choice; a wrong answer earns no stars.
        page.evaluate('''() => {dungeonCfg.mode='choice'; dungeonAsk({cols:3,rows:3,total:9,roomEmojis:DUNGEON_ROOMS.slice(0,9),roomItems:['⚔️',null,null,null,null,null,null,null,null],itemIndices:[0],items:['⚔️']});}''')
        assert page.locator('#opts .option-btn').count() == 4
        wrong = next(option for option in page.locator('#opts .option-btn').all_text_contents() if option != '⚔️')
        page.locator('#opts .option-btn').filter(has_text=wrong).click()
        page.clock.run_for(1200)
        assert page.locator('.stars').inner_text() == '☆☆☆'
        print('DUNGEON: distinct treasures, numbered rooms, four choices, correct and incorrect rounds', flush=True)

        visit('vzlom')
        # Stress generation across types/rules with and without repeats.
        page.evaluate('''() => {
            for(const repeats of [true,false]) for(const rule of ['off','reverse','shift','random']) {
                settings={...DEFAULTS,typesOn:{...DEFAULTS.typesOn},dependencies:true,count:5,codeLength:10,
                    allowRepeats:repeats,rulesMode:rule,showAllAtOnce:true,sound:false,vibration:false};
                for(let run=0;run<20;run++) {
                    startGame();stopAllTimers();
                    locks.forEach((lock,i)=>{
                        const max=repeats?10:Math.min(10,lock.type.pool.length);
                        if(lock.code.length!==max || lock.code.some(c=>!lock.type.pool.includes(c)) || lock.target.some(c=>!lock.type.pool.includes(c))) throw Error('Invalid lock');
                        if(!repeats && new Set(lock.code).size!==lock.code.length) throw Error('Repeated symbol');
                        if(i) {
                            const prev=locks[i-1];
                            const seeds=prev.code.map(c=>lock.type.pool[prev.type.pool.indexOf(c)%lock.type.pool.length]);
                            if(!seeds.includes(lock.code[0])) throw Error('Lost dependency');
                        }
                    });
                }
            }
        }''')
        # Complete actual games through the offered buttons, including color comparison.
        for reverse in [False, True]:
            page.evaluate('''reverse => {
                settings={...DEFAULTS,typesOn:{...DEFAULTS.typesOn},dependencies:true,count:5,codeLength:8,
                    rulesMode:'random',reverseMode:reverse,showAllAtOnce:true,sound:false,vibration:false};
                startGame();stopAllTimers();startHackPhase();
            }''', reverse)
            for _ in range(5):
                page.evaluate('''() => {
                    const lock=locks[hackOrder[hackIdx]], expected=settings.reverseMode?lock.code:lock.target;
                    for(const v of expected){
                        const button=[...document.querySelectorAll('.panel-row')].find(r=>r.dataset.type===lock.type.id)
                            .querySelectorAll('.opt-btn');
                        [...button].find(b=>b.dataset.value===v).click();
                    }
                }''')
                page.clock.run_for(1300)
            assert page.evaluate('solvedCount===5 && failedCount===0 && currentPhase==="result"')
        for width in [320,390]:
            page.set_viewport_size({'width': width, 'height': 844})
            page.evaluate('settingsOpen=true;renderSelect()')
            fits()
            page.evaluate('startGame();stopAllTimers()')
            fits()
            page.evaluate('startHackPhase()')
            fits()
        print('VZLOM: 800 generated locks, dependencies across all types, full normal/reverse games, phone screens', flush=True)

        assert not errors, errors
        assert not missing, missing
        browser.close()
        print('PASS: no JavaScript errors or missing local assets', flush=True)
finally:
    server.shutdown()
    server.server_close()
