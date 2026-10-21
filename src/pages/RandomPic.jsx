import React, { useState } from 'react';
import { randomImages } from '../data/images';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

const RandomPic = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [animating, setAnimating] = useState(false);

  const surpriseMe = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentImage(null);
    
    setTimeout(() => {
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
    <div className="container page-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🖼️ Random Pic</h2>
        <p className="page-subtitle" style={{ color: 'var(--text-secondary)' }}>Curated weirdness and visual treats.</p>
      </div>

      <div className="tool-card tool-card-body" style={{ backgroundColor: 'var(--surface)', padding: '2rem 1.25rem', marginBottom: '2rem', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {!currentImage && !animating && (
          <div style={{ width: '100%' }}>
            <ImageIcon size={56} style={{ opacity: 0.2, margin: '0 auto 1.5rem auto', color: 'var(--primary)' }} />
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Ready to see something strange, cute, or completely absurd?
            </p>
            <button className="primary-btn" onClick={surpriseMe} style={{ padding: '0.9rem 2rem', fontSize: '1.1rem' }}>
              SURPRISE ME
            </button>
          </div>
        )}

        {animating && (
           <ImageIcon size={44} style={{ opacity: 0.5, margin: '0 auto', animation: 'pulse 1s ease-in-out infinite' }} />
        )}

        {currentImage && !animating && (
          <div className="animate-pop" style={{ width: '100%' }}>
            <div style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--border)',
              marginBottom: '1.25rem',
              background: '#000'
            }}>
              <img 
                src={currentImage.src} 
                alt={currentImage.title} 
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '450px', objectFit: 'contain' }}
              />
            </div>
            
            <div style={{ textAlign: 'left', background: 'var(--bg-color)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.35rem', wordBreak: 'break-word' }}>{currentImage.title}</h3>
                <span style={{ fontSize: '0.75rem', background: 'var(--surface)', padding: '0.25rem 0.6rem', borderRadius: '99px', fontWeight: 700, flexShrink: 0 }}>
                  {currentImage.type.toUpperCase()}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{currentImage.desc}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
               <button onClick={surpriseMe} className="primary-btn" style={{ padding: '0.85rem 1.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flex: '1 1 auto', minWidth: '150px' }}>
                 <RefreshCw size={18} /> Another One
               </button>
               <button onClick={handleDownload} className="secondary-btn" style={{ padding: '0.85rem 1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flex: '0 1 auto' }}>
                 <Download size={18} /> Download
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="info-box" style={{ textAlign: 'left', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>How does it work?</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
          Images are served from a local bundle right inside your browser to keep things incredibly fast. No external APIs used!
        </p>
      </div>
    </div>
  );
};

export default RandomPic;
