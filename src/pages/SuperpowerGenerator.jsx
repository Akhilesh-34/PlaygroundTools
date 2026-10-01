import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { superpowers } from '../data/superpowers';
import { Zap, RefreshCw, Share2, ArrowLeft } from 'lucide-react';

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
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡ Superpower Generator</h2>
        <p style={{ color: 'var(--text-secondary)' }}>What is your hidden ability?</p>
      </div>

      <div className="tool-card" style={{ backgroundColor: 'var(--surface)', padding: '3rem', marginBottom: '2rem' }}>
        
        <form onSubmit={generatePower} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <label style={{ fontWeight: 600, fontSize: '1.2rem', textAlign: 'left' }}>WHAT'S YOUR NAME?</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            style={{ 
              padding: '1rem', 
              fontSize: '1.2rem', 
              borderRadius: 'var(--radius-md)', 
              border: '2px solid var(--border)',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <button type="submit" className="primary-btn" disabled={!name.trim() || analyzing} style={{ padding: '1rem', fontSize: '1.1rem' }}>
            {analyzing ? 'ANALYZING...' : 'REVEAL MY POWER'}
          </button>
        </form>

        {analyzing && (
          <div className="animate-pop" style={{ padding: '2rem 0' }}>
            <Zap className="spin" size={48} style={{ color: 'var(--primary)', margin: '0 auto', animation: 'pulse 1s infinite' }} />
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>SCANNING DNA...</p>
          </div>
        )}

        {power && !analyzing && (
          <div className="animate-pop" style={{ textAlign: 'left', background: 'var(--bg-color)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Zap size={24} style={{ color: 'var(--primary)' }} />
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary)' }}>{power.name.toUpperCase()}</h3>
            </div>
            
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{power.desc}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div><strong>POWER LEVEL:</strong> {power.powerLevel}/100</div>
              <div><strong>FATAL WEAKNESS:</strong> {power.weakness}</div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
               <button type="button" onClick={randomize} className="secondary-btn" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                 <RefreshCw size={16} /> Randomize Power
               </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          We use a deterministic hashing algorithm. This means if you type the same name, you will consistently get the same superpower! No AI, completely local.
        </p>
      </div>
    </div>
  );
};

export default SuperpowerGenerator;
