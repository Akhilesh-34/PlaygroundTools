import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Trash2, Brush, ArrowLeft } from 'lucide-react';

// Elements and their properties
const ELEMENTS = {
  EMPTY: 0,
  SAND: 1,
  WATER: 2,
  STONE: 3,
  WOOD: 4,
  FIRE: 5,
  SMOKE: 6,
  OIL: 7,
  LAVA: 8,
  PLANT: 9,
  SALT: 10
};

const COLORS = {
  [ELEMENTS.EMPTY]: [0, 0, 0, 0], // Transparent
  [ELEMENTS.SAND]: [226, 192, 132],
  [ELEMENTS.WATER]: [59, 130, 246],
  [ELEMENTS.STONE]: [100, 116, 139],
  [ELEMENTS.WOOD]: [120, 53, 15],
  [ELEMENTS.FIRE]: [239, 68, 68],
  [ELEMENTS.SMOKE]: [156, 163, 175],
  [ELEMENTS.OIL]: [67, 56, 202],
  [ELEMENTS.LAVA]: [249, 115, 22],
  [ELEMENTS.PLANT]: [34, 197, 94],
  [ELEMENTS.SALT]: [241, 245, 249]
};

// Add slight color variation
const varyColor = (baseColor) => {
  if (!baseColor || baseColor[3] === 0) return baseColor;
  const variance = Math.floor(Math.random() * 20) - 10;
  return [
    Math.max(0, Math.min(255, baseColor[0] + variance)),
    Math.max(0, Math.min(255, baseColor[1] + variance)),
    Math.max(0, Math.min(255, baseColor[2] + variance)),
    255
  ];
};

const FallingSand = () => {
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const [colorGrid, setColorGrid] = useState(null);
  const [currentElement, setCurrentElement] = useState(ELEMENTS.SAND);
  const [brushSize, setBrushSize] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  
  // Interaction state
  const isDrawing = useRef(false);
  const requestRef = useRef();

  // Grid dimensions
  const cols = 150;
  const rows = 100;
  const cellSize = 4; // Visual size of each particle

  // Initialize grid
  useEffect(() => {
    const newGrid = Array(cols).fill().map(() => Array(rows).fill(ELEMENTS.EMPTY));
    const newColorGrid = Array(cols).fill().map(() => Array(rows).fill(COLORS[ELEMENTS.EMPTY]));
    
    // Add some initial ground
    for(let i=0; i<cols; i++) {
      for(let j=rows-10; j<rows; j++) {
        newGrid[i][j] = ELEMENTS.STONE;
        newColorGrid[i][j] = varyColor(COLORS[ELEMENTS.STONE]);
      }
    }
    
    setGrid(newGrid);
    setColorGrid(newColorGrid);
  }, []);

  const clearCanvas = () => {
    const newGrid = Array(cols).fill().map(() => Array(rows).fill(ELEMENTS.EMPTY));
    const newColorGrid = Array(cols).fill().map(() => Array(rows).fill(COLORS[ELEMENTS.EMPTY]));
    setGrid(newGrid);
    setColorGrid(newColorGrid);
  };

  // Physics rules
  const updateGrid = () => {
    if (!grid || isPaused) return;

    let nextGrid = grid.map(col => [...col]);
    let nextColorGrid = colorGrid.map(col => [...col]);

    const isEmpty = (x, y) => x >= 0 && x < cols && y >= 0 && y < rows && nextGrid[x][y] === ELEMENTS.EMPTY;
    const swap = (x1, y1, x2, y2) => {
      nextGrid[x2][y2] = grid[x1][y1];
      nextColorGrid[x2][y2] = colorGrid[x1][y1];
      nextGrid[x1][y1] = ELEMENTS.EMPTY;
      nextColorGrid[x1][y1] = COLORS[ELEMENTS.EMPTY];
    };
    
    const isLiquid = (id) => id === ELEMENTS.WATER || id === ELEMENTS.OIL || id === ELEMENTS.LAVA;

    // Process from bottom to top
    for (let y = rows - 2; y >= 0; y--) {
      // Process left to right or right to left randomly to prevent bias
      const dir = Math.random() > 0.5 ? 1 : -1;
      const startX = dir === 1 ? 0 : cols - 1;
      const endX = dir === 1 ? cols : -1;

      for (let x = startX; x !== endX; x += dir) {
        const id = grid[x][y];
        if (id === ELEMENTS.EMPTY || id === ELEMENTS.STONE || id === ELEMENTS.WOOD || id === ELEMENTS.PLANT) continue;

        const down = isEmpty(x, y + 1);
        const downLeft = isEmpty(x - 1, y + 1);
        const downRight = isEmpty(x + 1, y + 1);

        // Falling solids (Sand, Salt)
        if (id === ELEMENTS.SAND || id === ELEMENTS.SALT) {
          if (down) { swap(x, y, x, y + 1); }
          else if (downLeft && downRight) { swap(x, y, x + (Math.random() > 0.5 ? 1 : -1), y + 1); }
          else if (downLeft) { swap(x, y, x - 1, y + 1); }
          else if (downRight) { swap(x, y, x + 1, y + 1); }
          
          // Interactions
          if (id === ELEMENTS.SALT && y < rows-1 && grid[x][y+1] === ELEMENTS.WATER) {
            nextGrid[x][y] = ELEMENTS.EMPTY; // Salt dissolves
          }
        }

        // Liquids (Water, Oil, Lava)
        else if (isLiquid(id)) {
          if (down) { swap(x, y, x, y + 1); }
          else if (downLeft && downRight) { swap(x, y, x + (Math.random() > 0.5 ? 1 : -1), y + 1); }
          else if (downLeft) { swap(x, y, x - 1, y + 1); }
          else if (downRight) { swap(x, y, x + 1, y + 1); }
          else {
            // Flow horizontally
            const left = isEmpty(x - 1, y);
            const right = isEmpty(x + 1, y);
            if (left && right) { swap(x, y, x + (Math.random() > 0.5 ? 1 : -1), y); }
            else if (left) { swap(x, y, x - 1, y); }
            else if (right) { swap(x, y, x + 1, y); }
          }
          
          // Lava interactions
          if (id === ELEMENTS.LAVA) {
            const neighbors = [[x,y+1], [x,y-1], [x+1,y], [x-1,y]];
            neighbors.forEach(([nx, ny]) => {
              if (nx>=0 && nx<cols && ny>=0 && ny<rows) {
                const nId = nextGrid[nx][ny];
                if (nId === ELEMENTS.WATER) {
                  nextGrid[nx][ny] = ELEMENTS.STONE;
                  nextColorGrid[nx][ny] = varyColor(COLORS[ELEMENTS.STONE]);
                  nextGrid[x][y] = ELEMENTS.SMOKE;
                } else if (nId === ELEMENTS.WOOD || nId === ELEMENTS.PLANT || nId === ELEMENTS.OIL) {
                  nextGrid[nx][ny] = ELEMENTS.FIRE;
                  nextColorGrid[nx][ny] = varyColor(COLORS[ELEMENTS.FIRE]);
                }
              }
            });
          }
        }

        // Gases (Smoke, Fire)
        else if (id === ELEMENTS.SMOKE || id === ELEMENTS.FIRE) {
          const up = isEmpty(x, y - 1);
          const upLeft = isEmpty(x - 1, y - 1);
          const upRight = isEmpty(x + 1, y - 1);

          if (up) { swap(x, y, x, y - 1); }
          else if (upLeft && upRight) { swap(x, y, x + (Math.random() > 0.5 ? 1 : -1), y - 1); }
          else if (upLeft) { swap(x, y, x - 1, y - 1); }
          else if (upRight) { swap(x, y, x + 1, y - 1); }
          else {
             const left = isEmpty(x - 1, y);
             const right = isEmpty(x + 1, y);
             if (left && right) { swap(x, y, x + (Math.random() > 0.5 ? 1 : -1), y); }
             else if (left) { swap(x, y, x - 1, y); }
             else if (right) { swap(x, y, x + 1, y); }
          }

          // Disappear over time
          if (Math.random() < 0.05) {
            nextGrid[x][y] = ELEMENTS.EMPTY;
            nextColorGrid[x][y] = COLORS[ELEMENTS.EMPTY];
          }
          
          // Fire burning interactions
          if (id === ELEMENTS.FIRE) {
            const neighbors = [[x,y+1], [x,y-1], [x+1,y], [x-1,y]];
            neighbors.forEach(([nx, ny]) => {
              if (nx>=0 && nx<cols && ny>=0 && ny<rows) {
                const nId = nextGrid[nx][ny];
                if (nId === ELEMENTS.WOOD || nId === ELEMENTS.PLANT || nId === ELEMENTS.OIL) {
                  if (Math.random() < 0.1) {
                    nextGrid[nx][ny] = ELEMENTS.FIRE;
                    nextColorGrid[nx][ny] = varyColor(COLORS[ELEMENTS.FIRE]);
                  }
                } else if (nId === ELEMENTS.WATER) {
                  nextGrid[x][y] = ELEMENTS.SMOKE;
                  nextColorGrid[x][y] = varyColor(COLORS[ELEMENTS.SMOKE]);
                }
              }
            });
          }
        }
      }
    }

    setGrid(nextGrid);
    setColorGrid(nextColorGrid);
  };

  // Draw to canvas
  useEffect(() => {
    if (!grid || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#1e293b'; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Use ImageData for much faster rendering
    const imgData = ctx.createImageData(cols * cellSize, rows * cellSize);
    
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (grid[x][y] !== ELEMENTS.EMPTY) {
          const color = colorGrid[x][y];
          // Draw a cellSize x cellSize block
          for(let cx = 0; cx < cellSize; cx++) {
            for(let cy = 0; cy < cellSize; cy++) {
              const px = (x * cellSize) + cx;
              const py = (y * cellSize) + cy;
              const index = (py * (cols * cellSize) + px) * 4;
              imgData.data[index] = color[0];
              imgData.data[index + 1] = color[1];
              imgData.data[index + 2] = color[2];
              imgData.data[index + 3] = 255;
            }
          }
        }
      }
    }
    
    ctx.putImageData(imgData, 0, 0);
  }, [grid, colorGrid]);

  // Main loop
  useEffect(() => {
    const loop = () => {
      updateGrid();
      requestRef.current = requestAnimationFrame(loop);
    };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [grid, isPaused]);

  // Interaction handlers
  const handlePointerDown = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const handlePointerMove = (e) => {
    if (isDrawing.current) draw(e);
  };

  const draw = (e) => {
    if (!canvasRef.current || !grid) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    
    // Support both mouse and touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    
    const x = Math.floor(((clientX - rect.left) * scaleX) / cellSize);
    const y = Math.floor(((clientY - rect.top) * scaleY) / cellSize);

    let nextGrid = [...grid];
    let nextColorGrid = [...colorGrid];
    let changed = false;

    // Draw circle brush
    for (let i = -brushSize; i <= brushSize; i++) {
      for (let j = -brushSize; j <= brushSize; j++) {
        if (i * i + j * j <= brushSize * brushSize) {
          const nx = x + i;
          const ny = y + j;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            // If erasing, overwrite anything. If placing, only overwrite empty (unless erasing)
            if (currentElement === ELEMENTS.EMPTY || nextGrid[nx][ny] === ELEMENTS.EMPTY || currentElement === ELEMENTS.STONE || currentElement === ELEMENTS.WOOD) {
               // Add 10% randomness to brush placement to make it look natural, unless solid
               if (currentElement === ELEMENTS.EMPTY || Math.random() > 0.1 || currentElement === ELEMENTS.STONE || currentElement === ELEMENTS.WOOD) {
                 nextGrid[nx][ny] = currentElement;
                 nextColorGrid[nx][ny] = varyColor(COLORS[currentElement]);
                 changed = true;
               }
            }
          }
        }
      }
    }

    if (changed) {
      setGrid(nextGrid);
      setColorGrid(nextColorGrid);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(45deg, var(--primary), #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🌊 Falling Sand</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>A fully local physics sandbox. Play god.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem', alignItems: 'start' }}>
        
        {/* CANVAS CONTAINER */}
        <div style={{ 
          background: 'var(--surface)', 
          padding: '1rem', 
          borderRadius: '24px', 
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            background: '#0f172a', 
            borderRadius: '16px', 
            overflow: 'hidden',
            border: '2px solid #1e293b',
            boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.5)'
          }}>
            <canvas
              ref={canvasRef}
              width={cols * cellSize}
              height={rows * cellSize}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerUp}
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block', 
                touchAction: 'none',
                cursor: 'crosshair'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Brush size={16} color="var(--primary)" /> Draw</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>{isPaused ? <Pause size={16} color="#ef4444" /> : <Play size={16} color="#22c55e" />} {isPaused ? 'Paused' : 'Running'}</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="tool-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'sticky', top: '2rem' }}>
          
          <div>
            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
              Materials
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {Object.keys(ELEMENTS).map((key) => {
                const el = ELEMENTS[key];
                const isActive = currentElement === el;
                return (
                  <button 
                    key={key}
                    onClick={() => setCurrentElement(el)}
                    style={{ 
                      padding: '0.6rem 0.5rem', 
                      background: isActive ? 'var(--primary)' : 'var(--bg-color)',
                      color: isActive ? '#fff' : 'var(--text-primary)',
                      border: `2px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: isActive ? '0 4px 12px rgba(255, 155, 81, 0.3)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ 
                      width: '14px', 
                      height: '14px', 
                      borderRadius: '4px', 
                      backgroundColor: key === 'EMPTY' ? '#1e293b' : `rgba(${COLORS[el][0]},${COLORS[el][1]},${COLORS[el][2]}, 1)`,
                      border: key === 'EMPTY' ? '1px dashed #94a3b8' : '1px solid rgba(0,0,0,0.1)'
                    }}></div>
                    {key === 'EMPTY' ? 'ERASER' : key}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
              <h4 style={{ margin: 0 }}>Brush Size</h4>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', background: 'var(--bg-color)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{brushSize}px</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))} 
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
            <button 
              className={isPaused ? "primary-btn" : "secondary-btn"} 
              onClick={() => setIsPaused(!isPaused)}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1rem' }}
            >
              {isPaused ? <><Play size={18}/> Resume Physics</> : <><Pause size={18}/> Freeze Time</>}
            </button>
            <button 
              onClick={clearCanvas}
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '1rem', 
                fontSize: '1rem',
                background: 'transparent',
                color: '#ef4444',
                border: '2px solid #ef4444',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.target.style.background = '#ef4444'; e.target.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ef4444'; }}
            >
              <Trash2 size={18}/> Nuke Everything
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FallingSand;
