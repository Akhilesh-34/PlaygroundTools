import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { quotes } from '../data/quotes';
import { Quote, Copy, Download, ArrowLeft } from 'lucide-react';

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
    <div className="container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💬 Random Quote</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Instant inspiration when you need it.</p>
      </div>

      <div 
        className="tool-card" 
        style={{ 
          minHeight: '300px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '2rem',
          backgroundColor: 'var(--surface)',
          marginBottom: '2rem',
          padding: '3rem'
        }}
      >
        {!quote ? (
           <div style={{ fontSize: '4rem', opacity: 0.2 }}><Quote size={64} /></div>
        ) : (
          <div className="animate-pop" style={{ width: '100%', position: 'relative' }}>
             <Quote size={48} style={{ color: 'var(--primary)', opacity: 0.2, position: 'absolute', top: '-20px', left: '-10px' }} />
             <p style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.4, position: 'relative', zIndex: 1 }}>
               "{quote.text}"
             </p>
             <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
               — {quote.author}
             </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="primary-btn" onClick={generateQuote} style={{ padding: '0.75rem 2rem' }}>
            {quote ? 'GIVE ME ANOTHER' : 'GIVE ME A QUOTE'}
          </button>
          {quote && (
            <button className="secondary-btn" onClick={copyToClipboard} style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Copy size={18} /> Copy
            </button>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Quotes are selected randomly from a local dataset. Everything happens right here in your browser.
        </p>
      </div>
    </div>
  );
};

export default QuoteGenerator;
