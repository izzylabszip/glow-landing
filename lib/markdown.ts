// Small Markdown renderer for our own guide files (headings, paragraphs,
// lists, quotes, bold, italic, links). Rendered on the server, so the
// article text is in the HTML crawlers read.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function inline(s: string): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
      const external = /^https?:/.test(href) && !href.includes('gloww.dev')
      return `<a href="${href}"${external ? ' rel="noopener" target="_blank"' : ''}>${text}</a>`
    })
}

export function renderMarkdown(md: string): string {
  const out: string[] = []
  let list: 'ul' | 'ol' | null = null
  let para: string[] = []
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }
  const close = () => {
    if (list) out.push(`</${list}>`)
    list = null
  }

  for (const raw of md.split('\n')) {
    const line = raw.trim()
    const h = /^(#{2,4}) (.+)$/.exec(line)
    const ul = /^[-*] (.+)$/.exec(line)
    const ol = /^\d+\. (.+)$/.exec(line)
    if (!line) { flush(); close(); continue }
    if (h) { flush(); close(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue }
    if (ul || ol) {
      flush()
      const kind = ul ? 'ul' : 'ol'
      if (list !== kind) { close(); out.push(`<${kind}>`); list = kind }
      out.push(`<li>${inline((ul || ol)![1])}</li>`)
      continue
    }
    if (line.startsWith('> ')) { flush(); close(); out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); continue }
    close()
    para.push(line)
  }
  flush()
  close()
  return out.join('\n')
}
