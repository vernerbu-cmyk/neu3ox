function formatHistoryYear(year) {
  return year < 0 ? `${Math.abs(year)} до н. э.` : String(year);
}

function prepareHistoryTimeline(events, pool, mode) {
  const timeline = [...events];
  if (mode === 'before' && timeline.length >= 2 && new Set(timeline.map(e => e.year)).size === 1) {
    const replacement = shuffle(pool.filter(e => e.year !== timeline[0].year))[0];
    if (replacement) timeline[timeline.length - 1] = replacement;
  }
  return timeline.sort((a, b) => a.year - b.year);
}

function buildHistoryPairs(timeline, limit) {
  const pairs = [];
  for (let i = 0; i < timeline.length; i++) {
    for (let j = i + 1; j < timeline.length; j++) {
      if (timeline[i].year !== timeline[j].year) pairs.push([timeline[i], timeline[j]]);
    }
  }
  return shuffle(pairs).slice(0, limit);
}

function getHistoryYearOptions(year, pool) {
  const years = [...new Set(pool.map(e => e.year))].filter(y => y !== year);
  const close = shuffle(years.filter(y => Math.abs(y - year) <= 150));
  const far = shuffle(years.filter(y => Math.abs(y - year) > 150));
  return shuffle([year, ...close.concat(far).slice(0, 3)]);
}

function isHistoryPositionCorrect(item, expected) {
  return !!item && !!expected && item.year === expected.year;
}
