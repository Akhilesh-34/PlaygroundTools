import React, { useState } from 'react';
import { quotes } from '../data/quotes';
import { Quote, Copy } from 'lucide-react';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const copyToClipboard = () => {
    if (quote) {
      navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      alert('Quote copied to clipboard!');
    }
  };

  return (
    <div className="container page-container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💬 Random Quote</h2>
        <p className="page-subtitle" style={{ color: 'var(--text-secondary)' }}>Instant inspiration when you need it.</p>
      </div>

      <div 
        className="tool-card tool-card-body" 
        style={{ 
          minHeight: '280px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '1.5rem',
          backgroundColor: 'var(--surface)',
          marginBottom: '2rem',
          padding: '2.5rem 1.5rem'
        }}
      >
        {!quote ? (
           <div style={{ fontSize: '3.5rem', opacity: 0.2 }}><Quote size={56} /></div>
        ) : (
          <div className="animate-pop" style={{ width: '100%', position: 'relative' }}>
             <Quote size={36} style={{ color: 'var(--primary)', opacity: 0.2, position: 'absolute', top: '-15px', left: '-5px' }} />
             <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.4, position: 'relative', zIndex: 1, wordBreak: 'break-word' }}>
               "{quote.text}"
             </p>
             <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
               — {quote.author}
             </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="primary-btn" onClick={generateQuote} style={{ padding: '0.85rem 1.75rem', flex: '1 1 auto', minWidth: '160px' }}>
            {quote ? 'GIVE ME ANOTHER' : 'GIVE ME A QUOTE'}
          </button>
          {quote && (
            <button className="secondary-btn" onClick={copyToClipboard} style={{ padding: '0.85rem 1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flex: '0 1 auto' }}>
              <Copy size={18} /> Copy
            </button>
          )}
        </div>
      </div>

      <div className="info-box" style={{ textAlign: 'left', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
          Quotes are selected randomly from a local dataset. Everything happens right here in your browser.
        </p>
      </div>
    </div>
  );
};

export default QuoteGenerator;
