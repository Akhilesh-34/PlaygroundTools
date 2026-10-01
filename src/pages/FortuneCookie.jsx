import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fortunes } from '../data/fortunes';
import { Cookie, Copy, Share2, ArrowRight, ArrowLeft } from 'lucide-react';

const FortuneCookie = () => {
  const [fortune, setFortune] = useState(null);
  const [cracked, setCracked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const crackCookie = () => {
    if (animating) return;
    setAnimating(true);
    setCracked(false);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      setFortune(fortunes[randomIndex]);
      setCracked(true);
      setAnimating(false);
    }, 600); // Wait for animation
  };

  const copyToClipboard = () => {
    if (fortune) {
      navigator.clipboard.writeText(fortune);
      alert('Fortune copied to clipboard!');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🥠 Fortune Cookie</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Just for fun — your random fortune.</p>
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
          marginBottom: '2rem'
        }}
      >
        <div 
          style={{ 
            fontSize: '5rem', 
            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: animating ? 'scale(1.2) rotate(15deg)' : (cracked ? 'scale(0)' : 'scale(1)'),
            opacity: cracked ? 0 : 1,
            position: cracked ? 'absolute' : 'relative',
            pointerEvents: 'none'
          }}
        >
          🥠
        </div>

        {cracked && fortune && (
          <div className="animate-pop" style={{ padding: '2rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', width: '100%' }}>
            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              "{fortune}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="secondary-btn" onClick={copyToClipboard} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                <Copy size={16} /> Copy
              </button>
            </div>
          </div>
        )}

        <button 
          className="primary-btn" 
          onClick={crackCookie}
          disabled={animating}
          style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
        >
          {cracked ? 'ANOTHER FORTUNE' : 'CRACK THE COOKIE'}
        </button>
      </div>

      <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Fortunes are generated completely locally in your browser from a fun curated list. No APIs, no tracking, just instant entertainment.
        </p>
      </div>
    </div>
  );
};

export default FortuneCookie;
