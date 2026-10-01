import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const About = () => {
  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>About Timepass Playground</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
          A local, serverless environment designed purely for having fun when you're bored.
        </p>
      </div>

      <div className="tool-card" style={{ padding: '3rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>Our Philosophy</h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Modern web apps are often heavy, require accounts, track your data, and rely on external APIs. 
          The <strong>Timepass Playground</strong> breaks those rules. It's a suite of 7 interactive tools built entirely for client-side performance. 
          Everything runs natively in your browser—no databases, no logins, no loading screens.
        </p>

        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>Privacy First</h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
          What happens in the playground, stays in the playground. Even the Secret Vault saves data only to your browser's local storage. You have complete control over your data.
        </p>
      </div>
    </div>
  );
};

export default About;
