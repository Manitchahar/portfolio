import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      
      if (followerRef.current) {
        anime({
          targets: followerRef.current,
          translateX: e.clientX,
          translateY: e.clientY,
          duration: 500,
          easing: 'easeOutCubic',
          elasticity: 500
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      {/* Main Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-screen mt-[-4px] ml-[-4px]"
      />
      {/* Trailing Glow */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-40 mix-blend-screen mt-[-16px] ml-[-16px] opacity-60 blur-[1px]"
      />
    </>
  );
};

export default CustomCursor;
