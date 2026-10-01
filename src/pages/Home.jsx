import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const tools = [
  { id: 'falling-sand', name: 'Falling Sand', action: 'PLAY NOW', desc: 'Physics sandbox' },
  { id: 'fortune-cookie', name: 'Fortune Cookie', action: 'OPEN', desc: 'Crack for a surprise' },
  { id: 'secret-vault', name: 'Secret Vault', action: 'WRITE', desc: 'Private local confessions' },
  { id: 'quote-generator', name: 'Quote Generator', action: 'GENERATE', desc: 'Instant inspiration' },
  { id: 'random-pic', name: 'Random Pic', action: 'SURPRISE ME', desc: 'Curated visual treats' },
  { id: 'name-superpower', name: 'Superpower Generator', action: 'REVEAL', desc: 'What is your hidden ability?' },
  { id: 'hobby-generator', name: 'Hobby Finder', action: 'I\'M BORED', desc: 'Discover something new to do' },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero">
        <h2>BORED? Let's fix that.</h2>
        <p>Fun little things to do when you have nothing better to do. No signups, no tracking, just instant interaction.</p>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <div key={tool.id} className="tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.desc}</p>
            <button className="primary-btn" onClick={() => navigate(`/${tool.id}`)}>{tool.action}</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
