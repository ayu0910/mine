import { useState } from 'react';
import { Eye, Code2, Download, RotateCcw } from 'lucide-react';
import PreviewPanel from './PreviewPanel';
import CodePanel from './CodePanel';
import { downloadFiles } from '../utils/download';

export default function ResultView({ result, isStreaming, streamHtml, onReset }) {
  const [activeTab, setActiveTab] = useState('preview');

  const previewHtml = isStreaming ? streamHtml : result?.preview_html;
  const files = result?.files || [];

  return (
    <div className="flex-1 flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-primary text-white'
                : 'text-slate-400 hover:text-white hover:bg-surface-lighter'
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-primary text-white'
                : 'text-slate-400 hover:text-white hover:bg-surface-lighter'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Code
          </button>
        </div>

        <div className="flex items-center gap-2">
          {result && (
            <button
              onClick={() => downloadFiles(files)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-success/20 text-success hover:bg-success/30 transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-surface-lighter transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            New
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {activeTab === 'preview' ? (
          <PreviewPanel html={previewHtml} isStreaming={isStreaming} />
        ) : (
          <div className="h-full bg-surface-light rounded-xl border border-border overflow-hidden">
            <CodePanel files={files} />
          </div>
        )}
      </div>

      {result?.summary && (
        <div className="px-4 py-3 border-t border-border">
          <p className="text-sm text-slate-400">{result.summary}</p>
        </div>
      )}
    </div>
  );
}
