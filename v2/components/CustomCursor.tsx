import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        // Main dot moves instantly
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Follower ring moves with slight delay (handled via CSS transition or JS interpolation)
        // Using direct JS for smoother interpolation would be better, but for simplicity and performance
        // we use a requestAnimationFrame loop or just a simple duration.
        followerRef.current.animate({
            transform: `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`
        }, { duration: 500, fill: "forwards" });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || 
          (e.target as HTMLElement).tagName === 'A' ||
          (e.target as HTMLElement).closest('button') ||
          (e.target as HTMLElement).closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-neon-blue rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ marginTop: '-4px', marginLeft: '-4px' }} 
      />
      
      {/* Follower Ring */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-neon-purple rounded-full pointer-events-none z-[99] transition-all duration-300 ease-out ${
            isHovering ? 'scale-150 bg-neon-purple/20 border-transparent' : 'scale-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;