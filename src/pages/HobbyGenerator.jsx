import React, { useState } from 'react';
import { hobbies } from '../data/hobbies';
import { Target, RefreshCw } from 'lucide-react';

const HobbyGenerator = () => {
  const [hobby, setHobby] = useState(null);
  const [animating, setAnimating] = useState(false);

  const surpriseMe = () => {
    if (animating) return;
    setAnimating(true);
    setHobby(null);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hobbies.length);
      setHobby(hobbies[randomIndex]);
      setAnimating(false);
    }, 400); 
  };

  return (
    <div className="container page-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯 I'm Bored</h2>
        <p className="page-subtitle" style={{ color: 'var(--text-secondary)' }}>What should you try next?</p>
      </div>

      <div className="tool-card tool-card-body" style={{ backgroundColor: 'var(--surface)', padding: '2.5rem 1.5rem', marginBottom: '2rem', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {!hobby && !animating && (
          <div style={{ width: '100%' }}>
            <Target size={56} style={{ opacity: 0.2, margin: '0 auto 1.5rem auto' }} />
            <button className="primary-btn" onClick={surpriseMe} style={{ padding: '0.9rem 2rem', fontSize: '1.1rem' }}>
              SURPRISE ME
            </button>
          </div>
        )}

        {animating && (
           <Target size={44} style={{ opacity: 0.5, margin: '0 auto', animation: 'spin 1s linear infinite' }} />
        )}

        {hobby && !animating && (
          <div className="animate-pop" style={{ textAlign: 'left', width: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.75rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', wordBreak: 'break-word' }}>
              {hobby.name.toUpperCase()}
            </h3>
            
            <div style={{ marginBottom: '1.25rem', background: 'var(--bg-color)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.95rem' }}>Your Challenge:</p>
              <p style={{ fontSize: '1.05rem', margin: 0, lineHeight: 1.5, wordBreak: 'break-word' }}>{hobby.challenge}</p>
            </div>
            
            <div className="stat-grid-2x2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ background: 'var(--bg-color)', padding: '0.65rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Difficulty:</strong> {hobby.difficulty}
              </div>
              <div style={{ background: 'var(--bg-color)', padding: '0.65rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Cost:</strong> {hobby.cost}
              </div>
              <div style={{ background: 'var(--bg-color)', padding: '0.65rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Time:</strong> {hobby.time}
              </div>
              <div style={{ background: 'var(--bg-color)', padding: '0.65rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Type:</strong> {hobby.type}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
               <button onClick={surpriseMe} className="primary-btn" style={{ padding: '0.85rem 1.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                 <RefreshCw size={18} /> I don't like this one
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="info-box" style={{ textAlign: 'left', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
          Hobby suggestions are curated randomly from a lightweight local dataset. Find something new to do instantly without logging in.
        </p>
      </div>
    </div>
  );
};

export default HobbyGenerator;
