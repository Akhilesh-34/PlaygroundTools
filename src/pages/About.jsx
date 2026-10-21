import React from 'react';

const About = () => {
  return (
    <div className="container page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>About Timepass Playground</h2>
        <p className="page-subtitle" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          A local, serverless environment designed purely for having fun when you're bored.
        </p>
      </div>

      <div className="tool-card tool-card-body" style={{ padding: '2.5rem 1.5rem', background: 'var(--surface-color)', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', width: '100%' }}>Our Philosophy</h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-color)', marginBottom: '2rem', lineHeight: 1.7, textAlign: 'left' }}>
          Modern web apps are often heavy, require accounts, track your data, and rely on external APIs. 
          The <strong>Timepass Playground</strong> breaks those rules. It's a suite of 7 interactive tools built entirely for client-side performance. 
          Everything runs natively in your browser—no databases, no logins, no loading screens.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', width: '100%' }}>Privacy First</h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-color)', lineHeight: 1.7, textAlign: 'left', margin: 0 }}>
          What happens in the playground, stays in the playground. Even the Secret Vault saves data only to your browser's local storage. You have complete control over your data.
        </p>
      </div>
    </div>
  );
};

export default About;
