import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { randomImages } from '../data/images';
import { Download, RefreshCw, Image as ImageIcon, ArrowLeft } from 'lucide-react';

const RandomPic = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [animating, setAnimating] = useState(false);

  const surpriseMe = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentImage(null);
    
    setTimeout(() => {
      // Pick a random image
      const randomIndex = Math.floor(Math.random() * randomImages.length);
      setCurrentImage(randomImages[randomIndex]);
      setAnimating(false);
    }, 400); 
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const a = document.createElement('a');
    a.href = currentImage.src;
    a.download = `${currentImage.title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🖼️ Random Pic</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Curated weirdness and visual treats.</p>
      </div>

      <div className="tool-card" style={{ backgroundColor: 'var(--surface)', padding: '2rem', marginBottom: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {!currentImage && !animating && (
          <div>
            <ImageIcon size={64} style={{ opacity: 0.2, margin: '0 auto 2rem auto', color: 'var(--primary)' }} />
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
              Ready to see something strange, cute, or completely absurd?
            </p>
            <button className="primary-btn" onClick={surpriseMe} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
              SURPRISE ME
            </button>
          </div>
        )}

        {animating && (
           <ImageIcon size={48} style={{ opacity: 0.5, margin: '0 auto', animation: 'pulse 1s ease-in-out infinite' }} />
        )}

        {currentImage && !animating && (
          <div className="animate-pop">
            <div style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--border)',
              marginBottom: '1.5rem',
              background: '#000'
            }}>
              <img 
                src={currentImage.src} 
                alt={currentImage.title} 
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
            
            <div style={{ textAlign: 'left', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.5rem' }}>{currentImage.title}</h3>
                <span style={{ fontSize: '0.8rem', background: 'var(--surface)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontWeight: 700 }}>
                  {currentImage.type.toUpperCase()}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>{currentImage.desc}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
               <button onClick={surpriseMe} className="primary-btn" style={{ padding: '0.75rem 2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                 <RefreshCw size={18} /> Another One
               </button>
               <button onClick={handleDownload} className="secondary-btn" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                 <Download size={18} /> Download
               </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Images are served from a local bundle right inside your browser to keep things incredibly fast. No external APIs used!
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default RandomPic;
