const API_BASE = '/api';

export async function generateWebsite(prompt, framework = 'html') {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, framework }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Generation failed' }));
    throw new Error(err.detail || 'Generation failed');
  }

  return res.json();
}

export async function generateWebsiteStream(prompt, framework = 'html', onChunk) {
  const res = await fetch(`${API_BASE}/generate/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, framework }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Generation failed' }));
    throw new Error(err.detail || 'Generation failed');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    result += chunk;
    onChunk(result);
  }

  if (!result.trim()) {
    throw new Error('No content was generated. The AI returned an empty response.');
  }

  if (result.includes('<!-- STREAM_ERROR:')) {
    const match = result.match(/<!-- STREAM_ERROR: (.*?) -->/);
    const errorMsg = match ? match[1] : 'An error occurred during generation';
    throw new Error(errorMsg);
  }

  return result;
}
