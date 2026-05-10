import { useState } from 'react';
import { Monitor, Smartphone, Tablet, Maximize2, Minimize2 } from 'lucide-react';

const VIEWPORTS = [
  { id: 'desktop', icon: Monitor, width: '100%', label: 'Desktop' },
  { id: 'tablet', icon: Tablet, width: '768px', label: 'Tablet' },
  { id: 'mobile', icon: Smartphone, width: '375px', label: 'Mobile' },
];

export default function PreviewPanel({ html, isStreaming }) {
  const [viewport, setViewport] = useState('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!html) return null;

  const currentViewport = VIEWPORTS.find((v) => v.id === viewport);

  const containerClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-surface p-4'
    : 'w-full';

  return (
    <div className={containerClass}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {VIEWPORTS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setViewport(id)}
              title={label}
              className={`p-2 rounded-lg transition-all ${
                viewport === id
                  ? 'bg-primary text-white'
                  : 'text-slate-500 hover:text-white hover:bg-surface-lighter'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {isStreaming && (
            <span className="text-xs text-accent animate-pulse">Streaming...</span>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-surface-lighter transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div
        className="bg-white rounded-xl overflow-hidden transition-all duration-300 mx-auto"
        style={{
          maxWidth: currentViewport.width,
          height: isFullscreen ? 'calc(100vh - 100px)' : '600px',
        }}
      >
        <iframe
          srcDoc={html}
          title="Website Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
