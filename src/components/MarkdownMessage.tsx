import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Terminal } from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
}

// ---------------------------------------------------------------------------
// Security: URL Scheme Whitelist Sanitizer
// Rejects dangerous protocols like javascript:, data:, vbscript:, etc.
// ---------------------------------------------------------------------------
function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  );
}

// ---------------------------------------------------------------------------
// Syntax Highlighter for Code Blocks
// Lightweight, pure React tokenization for cyber-industrial dark aesthetic
// ---------------------------------------------------------------------------
const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'class', 'interface', 'type', 'import',
  'export', 'from', 'default', 'return', 'if', 'else', 'for', 'while', 'switch',
  'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'this',
  'async', 'await', 'extends', 'implements', 'def', 'self', 'public', 'private',
  'protected', 'static', 'void', 'int', 'float', 'double', 'bool', 'boolean',
  'string', 'null', 'undefined', 'true', 'false'
]);

function highlightCodeLine(line: string): React.ReactNode[] {
  // Regex tokenizes comments, strings, words, numbers, and operators
  const tokenRegex = /(\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[^\s\w]+|\s+)/g;
  const parts: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    const token = match[0];
    keyIdx++;

    // Comments: // or #
    if (token.startsWith('//') || token.startsWith('#')) {
      parts.push(
        <span key={keyIdx} className="text-zinc-500 italic">
          {token}
        </span>
      );
    }
    // Strings: "...", '...', `...`
    else if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith('`') && token.endsWith('`'))
    ) {
      parts.push(
        <span key={keyIdx} className="text-[#aae02e]">
          {token}
        </span>
      );
    }
    // Numbers
    else if (/^\d+(?:\.\d+)?$/.test(token)) {
      parts.push(
        <span key={keyIdx} className="text-[#f472b6]">
          {token}
        </span>
      );
    }
    // Keywords
    else if (KEYWORDS.has(token)) {
      parts.push(
        <span key={keyIdx} className="text-[#38bdf8] font-semibold">
          {token}
        </span>
      );
    }
    // Standard text or whitespace
    else {
      parts.push(<span key={keyIdx}>{token}</span>);
    }
  }

  return parts.length > 0 ? parts : [line];
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'code' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback if clipboard permission is restricted
    }
  };

  const lines = code.split('\n');

  return (
    <div className="my-2.5 rounded-xl bg-[#070b11] border border-outline-variant/30 overflow-hidden shadow-md max-w-full">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container-high/60 border-b border-outline-variant/20 text-outline">
        <div className="flex items-center gap-1.5 font-mono-code text-[10px] uppercase tracking-wider text-secondary">
          <Terminal className="w-3 h-3 text-secondary" />
          <span>{language || 'CODE'}</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono-code text-on-surface hover:text-secondary hover:bg-surface-container-highest transition-colors active:scale-95 cursor-pointer select-none"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-secondary" />
              <span className="text-secondary font-bold">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Horizontal Scroll */}
      <pre className="p-3 overflow-x-auto font-mono-code text-[11px] sm:text-xs text-[#e2e8f0] leading-relaxed whitespace-pre scrollbar-thin">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="table-row">
              <span className="table-cell pr-3 select-none text-zinc-600 text-[10px] text-right font-mono-code">
                {idx + 1}
              </span>
              <span className="table-cell whitespace-pre">
                {highlightCodeLine(line)}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Inline Markdown Tokenizer & Renderer
// ---------------------------------------------------------------------------
type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; text: string; url: string };

function tokenizeInlines(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  // Matches inline code (`...`), bold (**...**), italic (*...*), markdown link ([...](...)), or raw URL (https?://...)
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|(?<!\*)\*[^*]+\*(?!\*)|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }

    const raw = match[0];
    if (raw.startsWith('`') && raw.endsWith('`')) {
      tokens.push({ type: 'code', text: raw.slice(1, -1) });
    } else if (raw.startsWith('**') && raw.endsWith('**')) {
      tokens.push({ type: 'bold', text: raw.slice(2, -2) });
    } else if (raw.startsWith('*') && raw.endsWith('*')) {
      tokens.push({ type: 'italic', text: raw.slice(1, -1) });
    } else if (raw.startsWith('[') && raw.includes('](')) {
      const splitIdx = raw.indexOf('](');
      const linkText = raw.slice(1, splitIdx);
      const url = raw.slice(splitIdx + 2, -1);
      tokens.push({ type: 'link', text: linkText, url });
    } else if (raw.startsWith('http://') || raw.startsWith('https://')) {
      tokens.push({ type: 'link', text: raw, url: raw });
    } else {
      tokens.push({ type: 'text', text: raw });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return tokens;
}

function renderInlineText(text: string): React.ReactNode {
  const tokens = tokenizeInlines(text);

  return (
    <>
      {tokens.map((token, idx) => {
        switch (token.type) {
          case 'bold':
            return (
              <strong key={idx} className="font-bold text-on-surface">
                {token.text}
              </strong>
            );
          case 'italic':
            return (
              <em key={idx} className="italic text-on-surface-variant">
                {token.text}
              </em>
            );
          case 'code':
            return (
              <code
                key={idx}
                className="px-1.5 py-0.5 rounded bg-surface-container-highest/90 border border-secondary/25 text-secondary font-mono-code text-[11px] sm:text-xs break-words [word-break:break-word]"
              >
                {token.text}
              </code>
            );
          case 'link':
            if (isSafeUrl(token.url)) {
              return (
                <a
                  key={idx}
                  href={token.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-[#d4ff59] underline underline-offset-2 break-words [word-break:break-word] inline-flex items-center gap-1 font-mono-code text-[11px] sm:text-xs transition-colors"
                >
                  <span>{token.text}</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                </a>
              );
            }
            // If URL fails whitelist (e.g. javascript:), render as safe plain text
            return <span key={idx}>{token.text}</span>;
          case 'text':
          default:
            return <span key={idx}>{token.text}</span>;
        }
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Block Level Parser & Renderer
// ---------------------------------------------------------------------------
type Block =
  | { type: 'code_block'; language: string; code: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'unordered_list'; items: string[] }
  | { type: 'ordered_list'; items: { number: number; text: string }[] }
  | { type: 'paragraph'; text: string };

function parseMarkdownBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 1. Fenced Code Block: ```lang ... ```
    const codeMatch = line.match(/^```(\w*)\s*$/);
    if (codeMatch) {
      const language = codeMatch[1] || 'code';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].match(/^```\s*$/)) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      blocks.push({
        type: 'code_block',
        language,
        code: codeLines.join('\n')
      });
      continue;
    }

    // 2. Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // 3. Explicit Headings (#, ##, ###)
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      blocks.push({ type: 'heading', level: 3, text: h3Match[1].trim() });
      i++;
      continue;
    }
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      blocks.push({ type: 'heading', level: 2, text: h2Match[1].trim() });
      i++;
      continue;
    }
    const h1Match = line.match(/^#\s+(.+)$/);
    if (h1Match) {
      blocks.push({ type: 'heading', level: 1, text: h1Match[1].trim() });
      i++;
      continue;
    }

    // 4. Standalone Bold heading e.g. **EcoPlugify — IoT Smart Energy Management System**
    const boldHeadingMatch = line.match(/^\*\*([^*]+)\*\*:?$/);
    if (boldHeadingMatch) {
      blocks.push({ type: 'heading', level: 2, text: boldHeadingMatch[1].trim() });
      i++;
      continue;
    }

    // 5. Unordered List (- or * or •)
    const ulMatch = line.match(/^[-*•]\s+(.+)$/);
    if (ulMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^[-*•]\s+(.+)$/);
        if (itemMatch) {
          items.push(itemMatch[1].trim());
          i++;
        } else if (
          lines[i].trim() === '' &&
          i + 1 < lines.length &&
          lines[i + 1].match(/^[-*•]\s+(.+)$/)
        ) {
          i++; // allow blank line between list items
        } else {
          break;
        }
      }
      blocks.push({ type: 'unordered_list', items });
      continue;
    }

    // 6. Ordered List (1. 2. etc.)
    const olMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      const items: { number: number; text: string }[] = [];
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^(\d+)\.\s+(.+)$/);
        if (itemMatch) {
          items.push({
            number: parseInt(itemMatch[1], 10),
            text: itemMatch[2].trim()
          });
          i++;
        } else if (
          lines[i].trim() === '' &&
          i + 1 < lines.length &&
          lines[i + 1].match(/^(\d+)\.\s+(.+)$/)
        ) {
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: 'ordered_list', items });
      continue;
    }

    // 7. Paragraph Block
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].match(/^```/) &&
      !lines[i].match(/^#{1,3}\s+/) &&
      !lines[i].match(/^\*\*([^*]+)\*\*:?$/) &&
      !lines[i].match(/^[-*•]\s+/) &&
      !lines[i].match(/^\d+\.\s+/)
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paraLines.join(' ') });
    }
  }

  return blocks;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-2 text-xs sm:text-body-sm leading-relaxed break-words text-on-surface">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'code_block':
            return (
              <CodeBlock
                key={idx}
                code={block.code}
                language={block.language}
              />
            );

          case 'heading': {
            if (block.level === 1) {
              return (
                <h3
                  key={idx}
                  className="font-heading-md text-sm sm:text-base font-bold text-on-surface tracking-tight mt-3 mb-1.5 flex items-center gap-1.5 border-b border-outline-variant/20 pb-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>{renderInlineText(block.text)}</span>
                </h3>
              );
            }
            if (block.level === 2) {
              return (
                <h4
                  key={idx}
                  className="font-heading-md text-xs sm:text-sm font-bold text-on-surface tracking-tight mt-2.5 mb-1 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                  <span>{renderInlineText(block.text)}</span>
                </h4>
              );
            }
            return (
              <h5
                key={idx}
                className="font-mono-label text-[11px] sm:text-xs font-bold text-secondary uppercase tracking-wider mt-2 mb-1"
              >
                {renderInlineText(block.text)}
              </h5>
            );
          }

          case 'unordered_list':
            return (
              <ul key={idx} className="my-1.5 space-y-1 pl-0.5">
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-2 text-xs sm:text-body-sm text-on-surface leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                    <span className="flex-1 break-words">
                      {renderInlineText(item)}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case 'ordered_list':
            return (
              <ol key={idx} className="my-1.5 space-y-1.5 pl-0.5">
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-2 text-xs sm:text-body-sm text-on-surface leading-relaxed"
                  >
                    <span className="font-mono-code text-[10px] text-secondary font-bold bg-secondary/15 px-1.5 py-0.5 rounded border border-secondary/30 shrink-0 mt-0.5 leading-none">
                      {item.number}
                    </span>
                    <span className="flex-1 break-words">
                      {renderInlineText(item.text)}
                    </span>
                  </li>
                ))}
              </ol>
            );

          case 'paragraph':
          default:
            return (
              <p
                key={idx}
                className="leading-relaxed mb-2 last:mb-0 break-words text-on-surface text-xs sm:text-body-sm"
              >
                {renderInlineText(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
};

export default MarkdownMessage;
