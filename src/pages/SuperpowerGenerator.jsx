import React, { useState } from 'react';
import { superpowers } from '../data/superpowers';
import { Zap, RefreshCw } from 'lucide-react';

const SuperpowerGenerator = () => {
  const [name, setName] = useState('');
  const [power, setPower] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Deterministic hash function for string
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const generatePower = (e) => {
    e.preventDefault();
    if (!name.trim() || analyzing) return;

    setAnalyzing(true);
    setPower(null);

    setTimeout(() => {
      const hash = hashCode(name.trim().toLowerCase());
      const powerIndex = hash % superpowers.length;
      setPower(superpowers[powerIndex]);
      setAnalyzing(false);
    }, 1200);
  };

  const randomize = () => {
    setName('');
    setPower(superpowers[Math.floor(Math.random() * superpowers.length)]);
  };

  return (
    <div className="container page-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡ Superpower Generator</h2>
        <p className="page-subtitle" style={{ color: 'var(--text-secondary)' }}>What is your hidden ability?</p>
      </div>

      <div className="tool-card tool-card-body" style={{ backgroundColor: 'var(--surface)', padding: '2.5rem 1.5rem', marginBottom: '2rem' }}>
        
        <form onSubmit={generatePower} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', width: '100%' }}>
          <label style={{ fontWeight: 600, fontSize: '1.1rem', textAlign: 'left' }}>WHAT'S YOUR NAME?</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            style={{ 
              padding: '0.9rem', 
              fontSize: '1.1rem', 
              borderRadius: 'var(--radius-md)', 
              border: '2px solid var(--border)',
              outline: 'none',
              fontFamily: 'inherit',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <button type="submit" className="primary-btn" disabled={!name.trim() || analyzing} style={{ padding: '0.9rem', fontSize: '1.05rem', width: '100%' }}>
            {analyzing ? 'ANALYZING...' : 'REVEAL MY POWER'}
          </button>
        </form>

        {analyzing && (
          <div className="animate-pop" style={{ padding: '2rem 0' }}>
            <Zap size={44} style={{ color: 'var(--primary)', margin: '0 auto', animation: 'pulse 1s infinite' }} />
            <p style={{ marginTop: '1rem', fontWeight: 600, letterSpacing: '1px' }}>SCANNING DNA...</p>
          </div>
        )}

        {power && !analyzing && (
          <div className="animate-pop" style={{ textAlign: 'left', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--primary)', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <Zap size={22} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <h3 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--primary)' }}>{power.name.toUpperCase()}</h3>
            </div>
            
            <p style={{ fontSize: '1.05rem', marginBottom: '1.25rem', lineHeight: 1.5, wordBreak: 'break-word' }}>{power.desc}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--surface)', padding: '0.9rem', borderRadius: 'var(--radius-md)' }}>
              <div><strong>POWER LEVEL:</strong> {power.powerLevel}/100</div>
              <div><strong>FATAL WEAKNESS:</strong> {power.weakness}</div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center' }}>
               <button type="button" onClick={randomize} className="secondary-btn" style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem', width: 'auto' }}>
                 <RefreshCw size={16} /> Randomize Power
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="info-box" style={{ textAlign: 'left', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
          We use a deterministic hashing algorithm. This means if you type the same name, you will consistently get the same superpower! No AI, completely local.
        </p>
      </div>
    </div>
  );
};

export default SuperpowerGenerator;
