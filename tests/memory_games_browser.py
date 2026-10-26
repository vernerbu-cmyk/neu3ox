"""Run with Python Playwright and Chromium at /usr/bin/chromium."""
from pathlib import Path
import functools
import http.server
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
        errors, missing = [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: missing.append(r.url) if r.status >= 400 and r.url.startswith(origin + '/') else None)
        page.clock.install()
        page.set_default_timeout(5000)

        page.goto(origin + '/memory/chain.html', wait_until='load')
        for reverse in [False, True]:
            target = page.evaluate('''reverse => {
                chainCfg.reverse = reverse;
                const chain = ALL_WORDS.slice(0, 4);
                chainStep(chain);
                return reverse ? chain.reverse() : chain;
            }''', reverse)
            options = page.locator('#optionsRow .option-text').all_text_contents()
            assert len(options) == 4 and target[1] in options
            wrong = next(word for word in options if word != target[1])
            page.get_by_text(wrong, exact=True).click()
            page.clock.run_for(800)
            for word in target[2:]:
                options = page.locator('#optionsRow .option-text').all_text_contents()
                assert len(options) == 4 and word in options, (reverse, word, options)
                page.get_by_text(word, exact=True).click()
                page.clock.run_for(800)
            page.clock.run_for(1100)
            assert '3 из 4' in page.locator('#game').inner_text()
            assert page.locator('#retry').count() == 1
        print('CHAIN: subsequent correct answers survive a mistake, forward and reverse', flush=True)

        page.goto(origin + '/memory/history.html', wait_until='load')
        timeline = page.evaluate('''() => {
            historyCfg.category = 'world'; historyCfg.count = 5;
            historyCfg.showTime = 30; Math.random = () => 0.999999;
            historyShow(); return generateTimeline();
        }''')
        assert [e['year'] for e in timeline] == [-3000, -776, -753, -586, -490]
        assert page.locator('.timeline-year').all_text_contents() == [
            '3000 до н. э.', '776 до н. э.', '753 до н. э.', '586 до н. э.', '490 до н. э.']
        page.evaluate('timeline => historyYears([timeline[1]])', timeline)
        years = page.locator('#opts .option-text').evaluate_all('es => es.map(e => e.dataset.year)')
        assert len(years) == len(set(years)) == 4
        assert page.locator('[data-year="-776"]').inner_text() == '776 до н. э.'
        wrong_year = next(year for year in years if year != '-776')
        page.locator(f'[data-year="{wrong_year}"]').click()
        assert page.locator('[data-year="-776"]').evaluate('e => e.classList.contains("correct")')
        assert page.locator(f'[data-year="{wrong_year}"]').evaluate('e => e.classList.contains("wrong")')
        page.clock.run_for(1200)
        assert page.locator('.item-year').inner_text() == '776 до н. э.'
        print('HISTORY: BCE ordering, labels, distinct year options and answer highlighting', flush=True)

        events = page.evaluate('''() => {
            const a = ALL_EVENTS.find(e => e.event === 'Раскол христианской церкви');
            const b = ALL_EVENTS.find(e => e.event === 'Смерть Ярослава Мудрого');
            const c = ALL_EVENTS.find(e => e.event === 'Нормандское завоевание Англии');
            return [a, b, c];
        }''')
        page.evaluate('events => historyBefore(events)', events)
        for _ in range(2):
            labels = page.locator('#opts .option-text').all_text_contents()
            offered = [e for e in events if any(e['event'] in label for label in labels)]
            assert len(offered) == 2 and offered[0]['year'] != offered[1]['year']
            earlier = min(offered, key=lambda e: e['year'])
            page.get_by_text(earlier['event'], exact=True).click()
            page.clock.run_for(1300)
        assert 'Правильно: 2 из 2' in page.locator('#game').inner_text()
        score = page.locator('#globalScore').inner_text()
        page.evaluate('events => historyBefore(events.slice(0, 2))', events)
        assert 'События одного года' in page.locator('#game').inner_text()
        assert 'NaN' not in page.locator('#game').inner_text()
        assert page.locator('#globalScore').inner_text() == score
        print('HISTORY: no equal-year comparisons or zero-question awards', flush=True)

        page.evaluate('''events => {
            clearTimeouts(); globalScore = 0; $('globalScore').textContent = '0';
            historyOrder(events);
        }''', events)
        # Swap the two events of 1054: this is still a valid chronology.
        for event in [events[1], events[0], events[2]]:
            page.locator('#pool .pool-item').filter(has_text=event['event']).click()
        page.locator('#checkBtn').click()
        assert page.locator('#checkBtn').is_disabled()
        assert page.locator('.slot.result-correct').count() == 3
        assert page.locator('#globalScore').inner_text() == '0'
        # Even a dispatched second click cannot schedule another award.
        page.evaluate("$('checkBtn').dispatchEvent(new Event('click'))")
        page.clock.run_for(1500)
        assert 'Идеальный порядок!' in page.locator('h2').inner_text()
        assert '+50 очков' in page.locator('#game').inner_text()
        assert page.locator('#globalScore').inner_text() == '50'
        page.clock.run_for(2000)
        assert page.locator('#globalScore').inner_text() == '50'
        print('HISTORY: equivalent same-year order accepted; exactly one +50 award', flush=True)

        for width in [390, 320]:
            page.set_viewport_size({'width': width, 'height': 844})
            page.evaluate('timeline => historyResult({emoji:"🏆", title:"Проверка", text:"Готово", stars:3, points:0, timeline, history:timeline.map(()=>true)})', timeline)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert not missing, missing
        assert not errors, errors
        browser.close()
        print('PASS: mobile BCE results; no JavaScript errors or local 404s', flush=True)
finally:
    server.shutdown()
    server.server_close()
