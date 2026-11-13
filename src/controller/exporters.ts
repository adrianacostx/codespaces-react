import { TimelineData, ThemeKey } from '../model/types';

const COLOR_MAP_HEX: Record<string, string> = {
  indigo: "#6366f1", violet: "#8b5cf6", blue: "#3b82f6", cyan: "#06b6d4",
  teal: "#14b8a6", emerald: "#10b981", amber: "#f59e0b", orange: "#f97316",
  rose: "#f43f5e", fuchsia: "#d946ef"
};

export function downloadJSON(timeline: TimelineData): void {
  const dataStr = JSON.stringify(timeline, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `linea-de-tiempo-datos.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadHTML(timeline: TimelineData, themeKey: ThemeKey, isDark: boolean): void {
  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${timeline.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: ${isDark ? '#020617' : themeKey === 'vintagePaper' ? '#f4efe6' : '#f8fafc'};
      color: ${isDark ? '#f1f5f9' : '#0f172a'};
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 50px; }
    h1 { font-size: 2.25rem; margin-bottom: 10px; }
    p.subtitle { font-size: 1.1rem; opacity: 0.8; max-width: 650px; margin: 0 auto; }
    .timeline { position: relative; padding-left: 36px; border-left: 3px solid ${isDark ? '#334155' : '#cbd5e1'}; }
    .event {
      position: relative;
      background: ${isDark ? '#0f172a' : '#ffffff'};
      border: 1px solid ${isDark ? '#1e293b' : '#e2e8f0'};
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 28px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .dot {
      position: absolute;
      left: -46px;
      top: 24px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid ${isDark ? '#020617' : '#f8fafc'};
    }
    .meta { display: flex; gap: 10px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
    .date { font-weight: 700; font-size: 0.95rem; }
    .badge { font-size: 0.75rem; padding: 2px 10px; border-radius: 999px; background: rgba(99,102,241,0.12); font-weight: 600; }
    h2 { margin: 0 0 8px 0; font-size: 1.25rem; }
    p.desc { margin: 0; opacity: 0.85; font-size: 0.95rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${timeline.title}</h1>
      <p class="subtitle">${timeline.subtitle}</p>
    </header>
    <div class="timeline">
      ${timeline.events.map(ev => `
        <div class="event">
          <div class="dot" style="background-color: ${COLOR_MAP_HEX[ev.color] || '#6366f1'}"></div>
          <div class="meta">
            <span class="date" style="color: ${COLOR_MAP_HEX[ev.color] || '#6366f1'}">${ev.date}</span>
            <span class="badge">${ev.category}</span>
          </div>
          <h2>${ev.title}</h2>
          <p class="desc">${ev.description}</p>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `linea-de-tiempo.html`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function printPDF(): void {
  setTimeout(() => {
    window.print();
  }, 150);
}