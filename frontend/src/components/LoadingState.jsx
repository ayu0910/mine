import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto" style={{ animation: 'pulse-glow 2s infinite' }}>
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div>
          <p className="text-white font-medium">Generating your website...</p>
          <p className="text-sm text-slate-400 mt-1">This usually takes 10-30 seconds</p>
        </div>
        <div className="w-64 h-1.5 bg-surface-lighter rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full shimmer-bg" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}
