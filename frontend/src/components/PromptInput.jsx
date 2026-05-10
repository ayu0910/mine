import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const EXAMPLES = [
  'A modern portfolio website for a photographer with a dark theme and image gallery',
  'A SaaS landing page with pricing table, feature cards, and testimonials',
  'A restaurant website with menu, reservation form, and photo gallery',
  'A personal blog with clean typography, sidebar, and newsletter signup',
  'A fitness app landing page with workout plans and trainer profiles',
];

export default function PromptInput({ onGenerate, isLoading }) {
  const [prompt, setPrompt] = useState('');
  const [framework, setFramework] = useState('html');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onGenerate(prompt.trim(), framework);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          Describe your dream website
        </h2>
        <p className="text-slate-400 text-lg">
          Type a description and get a complete, production-ready website instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the website you want to build..."
            rows={4}
            className="w-full bg-surface-light border border-border rounded-2xl px-5 py-4 pr-14 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Framework:</span>
          {['html', 'react'].map((fw) => (
            <button
              key={fw}
              type="button"
              onClick={() => setFramework(fw)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                framework === fw
                  ? 'bg-primary text-white'
                  : 'bg-surface-lighter text-slate-400 hover:text-white hover:bg-surface-lighter/80'
              }`}
            >
              {fw === 'html' ? 'HTML/CSS/JS' : 'React'}
            </button>
          ))}
        </div>
      </form>

      <div className="mt-8">
        <p className="text-sm text-slate-500 mb-3">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              className="text-xs px-3 py-2 rounded-lg bg-surface-lighter text-slate-400 hover:text-white hover:bg-surface-lighter/80 transition-all text-left"
            >
              {ex.length > 60 ? ex.slice(0, 60) + '...' : ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
