import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Trash2, Send, ArrowRight, EyeOff, ArrowLeft } from 'lucide-react';
import { fakeConfessions } from '../data/confessions';

const SecretVault = () => {
  const [secret, setSecret] = useState('');
  const [localSecrets, setLocalSecrets] = useState([]);
  const [feed, setFeed] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewingWall, setViewingWall] = useState(true); // Default to viewing secrets
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('timepass_secrets') || '[]');
    setLocalSecrets(saved);
  }, []);

  useEffect(() => {
    // Combine fake confessions and user's local secrets
    const combined = [
      ...localSecrets.map(s => ({ id: s.id, text: s.text, isUser: true })),
      ...fakeConfessions.map((text, i) => ({ id: `fake-${i}`, text, isUser: false }))
    ];
    
    // Shuffle the feed so it feels organic
    const shuffled = combined.sort(() => 0.5 - Math.random());
    setFeed(shuffled);
    setCurrentIndex(0);
  }, [localSecrets]);

  const lockSecret = () => {
    if (!secret.trim()) return;
    
    const newSecret = { id: Date.now(), text: secret, date: new Date().toISOString() };
    const updated = [newSecret, ...localSecrets];
    
    localStorage.setItem('timepass_secrets', JSON.stringify(updated));
    setLocalSecrets(updated);
    setSecret('');
    setViewingWall(true);
  };

  const clearVault = () => {
    if (confirm('Are you sure you want to permanently delete your secrets from this device?')) {
      localStorage.removeItem('timepass_secrets');
      setLocalSecrets([]);
    }
  };

  const nextSecret = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % feed.length);
      setAnimating(false);
    }, 300); // 300ms fade transition
  };

  const currentConfession = feed.length > 0 ? feed[currentIndex] : null;

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤫 Secret Vault</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Read others' secrets, or leave your own.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <button 
          className={viewingWall ? "primary-btn" : "secondary-btn"} 
          onClick={() => setViewingWall(true)}
        >
          Read Secrets
        </button>
        <button 
          className={!viewingWall ? "primary-btn" : "secondary-btn"} 
          onClick={() => setViewingWall(false)}
        >
          Confess
        </button>
      </div>

      <div className="tool-card" style={{ backgroundColor: 'var(--surface)', padding: '3rem', marginBottom: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {viewingWall ? (
          /* READ SECRETS VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            {!currentConfession ? (
              <p>No secrets to read.</p>
            ) : (
              <>
                <div 
                  className="animate-pop"
                  style={{ 
                    width: '100%',
                    padding: '3rem 2rem', 
                    background: currentConfession.isUser ? 'rgba(255, 155, 81, 0.1)' : 'var(--bg-color)', 
                    border: currentConfession.isUser ? '2px solid var(--primary)' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    transition: 'opacity 0.3s ease',
                    opacity: animating ? 0 : 1,
                    position: 'relative'
                  }}
                >
                  <EyeOff size={32} style={{ color: currentConfession.isUser ? 'var(--primary)' : 'var(--border)', position: 'absolute', top: '1.5rem', opacity: 0.5 }} />
                  <p style={{ fontSize: '1.5rem', lineHeight: 1.6, fontWeight: 500, margin: '2rem 0' }}>
                    "{currentConfession.text}"
                  </p>
                  {currentConfession.isUser && (
                    <div style={{ position: 'absolute', bottom: '1.5rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1px' }}>
                      (YOUR SECRET)
                    </div>
                  )}
                </div>

                <button 
                  className="primary-btn" 
                  onClick={nextSecret}
                  disabled={animating}
                  style={{ padding: '1rem 2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  NEXT SECRET <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>
        ) : (
          /* CONFESS VIEW */
          <div className="animate-pop" style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
              Get it off your chest. It's completely anonymous.
            </div>
            <textarea 
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="I secretly..."
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '1.5rem',
                fontSize: '1.2rem',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--border)',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical',
                marginBottom: '1.5rem',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)'
              }}
            />
            <button 
              className="primary-btn" 
              onClick={lockSecret}
              disabled={!secret.trim()}
              style={{ padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              <Send size={20} /> SUBMIT ANONYMOUSLY
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
              Your confession is saved locally and mixed into the wall.
            </p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'left' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Privacy Guarantee</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            No servers. No databases. Your secrets stay strictly on this device and are mixed with fake ones.
          </p>
        </div>
        
        {localSecrets.length > 0 && (
          <button onClick={clearVault} className="secondary-btn" style={{ borderColor: '#ef4444', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <Trash2 size={16} /> Wipe My Secrets ({localSecrets.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default SecretVault;
