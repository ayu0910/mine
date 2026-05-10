import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { Copy, Check, Download } from 'lucide-react';
import { downloadFiles } from '../utils/download';

const LANG_MAP = {
  html: [html()],
  css: [css()],
  javascript: [javascript()],
  jsx: [javascript({ jsx: true })],
  js: [javascript()],
};

export default function CodePanel({ files }) {
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) return null;

  const file = files[activeFile];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex gap-1 overflow-x-auto scrollbar-thin">
          {files.map((f, i) => (
            <button
              key={f.filename}
              onClick={() => setActiveFile(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                i === activeFile
                  ? 'bg-primary text-white'
                  : 'text-slate-400 hover:text-white hover:bg-surface-lighter'
              }`}
            >
              {f.filename}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-surface-lighter transition-all"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => downloadFiles(files)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-surface-lighter transition-all"
            title="Download files"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <CodeMirror
          value={file.content}
          extensions={LANG_MAP[file.language] || [html()]}
          theme={oneDark}
          readOnly
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: false,
          }}
          style={{ fontSize: '13px' }}
        />
      </div>
    </div>
  );
}
