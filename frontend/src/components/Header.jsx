import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-surface-light/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">AI Website Builder</h1>
            <p className="text-xs text-slate-400">Prompt to production in seconds</p>
          </div>
        </div>
        <a
          href="https://github.com/ayu0910/mine"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-slate-400 hover:text-accent transition-colors"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
