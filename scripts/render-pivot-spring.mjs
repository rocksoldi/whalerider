import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const source = JSON.parse(readFileSync(new URL('examples/pivot-spring/recorded-results.json', root), 'utf8'));
const summary = source.summary.summary;
const rows = readFileSync(new URL('examples/pivot-spring/annual-returns.csv', root), 'utf8').trim().split('\n').slice(1)
  .map(line => line.split(',').map(Number));
const annual = source.annual.series;
if (source.summary.metadata.run !== source.annual.metadata.run || rows.length !== annual.year.length
    || rows.some(([year, value], index) => year !== annual.year[index] || value !== annual.value[index])) {
  throw new Error('Annual CSV and recorded result snapshot must describe the same run.');
}
const number = value => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const partial = index => annual.partial.includes(index);
const description = `January 2016 through June 2026. Total realized return ${number(summary.totalReturnPercent)} percent, CAGR ${number(summary.cagrPercent)} percent, maximum drawdown ${number(summary.maxDrawdownPercent)} percent, and ${summary.completedTrades.toLocaleString('en-US')} completed trades. Annual bars use recorded returns; 2026 is partial through June 30. Open-position valuations are excluded.`;

for (const dark of [false, true]) {
  const c = dark ? { bg: '#0b1420', border: '#2c4057', text: '#f4f7fc', muted: '#b2c0d3', blue: '#5ba4ff', red: '#ff8796' }
    : { bg: '#ffffff', border: '#dbe5f1', text: '#18243a', muted: '#596d88', blue: '#066adf', red: '#c53e50' };
  const text = (x, y, size, value, color = c.text, weight = 400, anchor = 'start') =>
    `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${value}</text>`;
  const line = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c.border}"/>`;
  const svg = (width, height, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">\n<title id="title">PIVOT_SPRING recorded historical simulation</title><desc id="description">${description}</desc>\n<rect width="${width}" height="${height}" rx="18" fill="${c.bg}"/><rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="18" fill="none" stroke="${c.border}"/>\n<style>text{font-family:Manrope,"Segoe UI",Arial,sans-serif}</style>\n${content}\n</svg>\n`;

  const y = value => 305 - value * 2.4;
  const grid = [0, 20, 40, 60, 80].map(value => line(402, y(value), 1154, y(value)) + text(390, y(value) + 4, 11, `${value}%`, c.muted, 400, 'end')).join('\n');
  const bars = rows.map(([year, value], index) => {
    const x = 419 + index * 68;
    const color = value >= 0 ? c.blue : c.red;
    return `<rect x="${x}" y="${Math.min(y(value), y(0)).toFixed(2)}" width="38" height="${Math.abs(y(value) - y(0)).toFixed(2)}" rx="3" fill="${color}"/>`
      + text(x + 19, value >= 0 ? y(value) - 10 : y(value) + 18, 10.5, `${value >= 0 ? '+' : ''}${value.toFixed(2)}`, color, 700, 'middle')
      + text(x + 19, 333, 11, `${year}${partial(index) ? '*' : ''}`, c.muted, 500, 'middle');
  }).join('\n');
  const desktop = text(36, 50, 12, 'REAL RESEARCH SESSION', c.muted, 800)
    + text(36, 96, 27, 'PIVOT_SPRING', c.text, 800)
    + text(36, 126, 15, 'NASDAQ-100 · Jan 2016–Jun 2026', c.muted)
    + text(36, 192, 34, `+${number(summary.totalReturnPercent)}%`, c.blue, 800)
    + text(37, 218, 14, 'Total realized return', c.muted)
    + text(36, 274, 35, `${number(summary.maxDrawdownPercent)}%`, c.text, 800)
    + text(37, 300, 14, 'Maximum drawdown', c.muted)
    + text(36, 354, 35, summary.completedTrades.toLocaleString('en-US'), c.text, 800)
    + text(37, 379, 14, 'Completed trades', c.muted)
    + line(338, 37, 338, 384)
    + text(381, 54, 18, 'Annual realized returns', c.text, 700)
    + text(1154, 54, 12, `CAGR ${number(summary.cagrPercent)}%`, c.muted, 600, 'end')
    + grid + bars
    + text(402, 367, 12, '*2026 through June 30 · Excludes open-position valuations.', c.muted)
    + line(36, 390, 1164, 390)
    + text(36, 413, 12, 'Historical simulation. Results do not guarantee future performance.', c.muted)
    + text(1163, 413, 13, 'Read the full session →', c.blue, 700, 'end');
  const mobile = text(34, 48, 17, 'REAL RESEARCH SESSION', c.muted, 800)
    + text(32, 98, 35, 'PIVOT_SPRING', c.text, 800)
    + text(34, 135, 21, 'NASDAQ-100 · Jan 2016–Jun 2026', c.muted)
    + text(34, 213, 42, `+${number(summary.totalReturnPercent)}%`, c.blue, 800)
    + text(34, 245, 21, 'Total realized return', c.muted)
    + text(354, 213, 43, `${number(summary.maxDrawdownPercent)}%`, c.text, 800)
    + text(354, 245, 21, 'Max drawdown', c.muted)
    + text(34, 320, 43, summary.completedTrades.toLocaleString('en-US'), c.text, 800)
    + text(34, 352, 21, 'Completed trades', c.muted)
    + text(354, 320, 43, `${number(summary.cagrPercent)}%`, c.text, 800)
    + text(354, 352, 21, 'CAGR', c.muted)
    + line(34, 380, 606, 380)
    + text(34, 421, 19, '2026 is partial · Excludes open-position valuations.', c.muted)
    + text(34, 461, 21, 'Historical simulation · Read the full session →', c.blue, 600);
  const theme = dark ? 'dark' : 'light';
  writeFileSync(new URL(`assets/pivot-spring-${theme}.svg`, root), svg(1200, 430, desktop));
  writeFileSync(new URL(`assets/pivot-spring-mobile-${theme}.svg`, root), svg(640, 500, mobile));
}
console.log('Rendered four Pivot Spring SVGs from the recorded summary and annual CSV.');
