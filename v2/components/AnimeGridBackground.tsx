import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimeGridBackground: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const container = gridRef.current;
    if (!container) return;

    container.innerHTML = '';

    const tileSize = 50;
    const columns = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);
    const totalTiles = columns * rows;
    const maxTiles = 1500; // Performance limit

    if (totalTiles > maxTiles) {
       // On very large screens, we could increase tile size, but keeping simple for now
    }

    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < Math.min(totalTiles, maxTiles); i++) {
      const el = document.createElement('div');
      el.classList.add('grid-tile');
      el.style.backgroundColor = 'transparent';
      el.style.border = '1px solid rgba(255,255,255,0.03)';
      el.dataset.index = i.toString();
      fragment.appendChild(el);
    }

    container.appendChild(fragment);

    // 1. Initial Grid Reveal
    (anime as any)({
      targets: '.grid-tile',
      opacity: [0, 1],
      delay: anime.stagger(1, { grid: [columns, rows], from: 'center' }),
      duration: 1000,
      easing: 'easeOutQuad',
      complete: () => {
         startDataStreams(columns, rows);
      }
    });

    function startDataStreams(cols: number, rows: number) {
        const tiles = Array.from(document.querySelectorAll('.grid-tile'));
        
        // Randomly fire "data packets" traversing the grid
        const firePacket = () => {
            const startIdx = Math.floor(Math.random() * tiles.length);
            // We want a short path of tiles
            const pathLength = 5 + Math.floor(Math.random() * 10);
            
            // Simple linear path horizontal or vertical
            const isHorizontal = Math.random() > 0.5;
            const pathIndices: number[] = [];
            
            let currentIdx = startIdx;
            for(let k=0; k<pathLength; k++) {
                pathIndices.push(currentIdx);
                if(isHorizontal) {
                     if((currentIdx + 1) % cols === 0) break; // End of row
                     currentIdx++;
                } else {
                     if(currentIdx + cols >= tiles.length) break; // End of grid
                     currentIdx += cols;
                }
            }

            const pathElements = pathIndices.map(idx => tiles[idx]).filter(Boolean);

            (anime as any)({
                targets: pathElements,
                backgroundColor: [
                    { value: 'rgba(0, 212, 255, 0.3)', duration: 100 }, // Flash
                    { value: 'transparent', duration: 500 } // Fade out
                ],
                delay: anime.stagger(50),
                easing: 'linear'
            });

            setTimeout(firePacket, Math.random() * 300 + 100); // Fire often
        }

        firePacket();
        firePacket(); // Start a couple of streams
    }

  }, []);

  return (
    <div 
      ref={gridRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden opacity-40"
    />
  );
};

export default AnimeGridBackground;