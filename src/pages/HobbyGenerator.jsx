import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { hobbies } from '../data/hobbies';
import { Target, RefreshCw, ArrowLeft } from 'lucide-react';

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
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯 I'm Bored</h2>
        <p style={{ color: 'var(--text-secondary)' }}>What should you try next?</p>
      </div>

      <div className="tool-card" style={{ backgroundColor: 'var(--surface)', padding: '3rem', marginBottom: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {!hobby && !animating && (
          <div>
            <Target size={64} style={{ opacity: 0.2, margin: '0 auto 2rem auto' }} />
            <button className="primary-btn" onClick={surpriseMe} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
              SURPRISE ME
            </button>
          </div>
        )}

        {animating && (
           <Target size={48} style={{ opacity: 0.5, margin: '0 auto', animation: 'spin 1s linear infinite' }} />
        )}

        {hobby && !animating && (
          <div className="animate-pop" style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
              {hobby.name.toUpperCase()}
            </h3>
            
            <div style={{ marginBottom: '1.5rem', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Your Challenge:</p>
              <p style={{ fontSize: '1.1rem' }}>{hobby.challenge}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ background: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Difficulty:</strong> {hobby.difficulty}
              </div>
              <div style={{ background: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Cost:</strong> {hobby.cost}
              </div>
              <div style={{ background: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Time:</strong> {hobby.time}
              </div>
              <div style={{ background: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Type:</strong> {hobby.type}
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
               <button onClick={surpriseMe} className="primary-btn" style={{ padding: '0.75rem 2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                 <RefreshCw size={18} /> I don't like this one
               </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hobby suggestions are curated randomly from a lightweight local dataset. Find something new to do instantly without logging in.
        </p>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default HobbyGenerator;
