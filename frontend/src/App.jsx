import { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ResultView from './components/ResultView';
import LoadingState from './components/LoadingState';
import { generateWebsite, generateWebsiteStream } from './utils/api';

function App() {
  const [state, setState] = useState('idle'); // idle | loading | streaming | done | error
  const [result, setResult] = useState(null);
  const [streamHtml, setStreamHtml] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async (prompt, framework) => {
    setError('');
    setResult(null);
    setStreamHtml('');

    if (framework === 'html') {
      setState('streaming');
      try {
        const html = await generateWebsiteStream(prompt, framework, (partial) => {
          setStreamHtml(partial);
        });

        setResult({
          files: [{ filename: 'index.html', content: html, language: 'html' }],
          preview_html: html,
          summary: `Generated website from: "${prompt.slice(0, 80)}..."`,
        });
        setState('done');
      } catch (err) {
        setError(err.message);
        setState('error');
      }
    } else {
      setState('loading');
      try {
        const data = await generateWebsite(prompt, framework);
        setResult(data);
        setState('done');
      } catch (err) {
        setError(err.message);
        setState('error');
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    setState('idle');
    setResult(null);
    setStreamHtml('');
    setError('');
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        {state === 'idle' && (
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <PromptInput onGenerate={handleGenerate} isLoading={false} />
          </div>
        )}

        {state === 'loading' && <LoadingState />}

        {state === 'streaming' && (
          <ResultView
            result={null}
            isStreaming
            streamHtml={streamHtml}
            onReset={handleReset}
          />
        )}

        {state === 'done' && (
          <ResultView
            result={result}
            isStreaming={false}
            streamHtml=""
            onReset={handleReset}
          />
        )}

        {state === 'error' && (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center space-y-4 animate-fade-in max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto">
                <span className="text-3xl">!</span>
              </div>
              <p className="text-white font-medium">Generation failed</p>
              <p className="text-sm text-slate-400">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
