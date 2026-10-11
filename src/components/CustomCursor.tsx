import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check for touch device or reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reducedMotion) {
      setIsDisabled(true);
      return;
    }

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input, textarea, select, .group, [data-interactive]')
        );
        const isInputField = Boolean(
          target.closest('input[type="text"], input[type="email"], input[type="search"], textarea')
        );

        setIsHovered(isInteractive && !isInputField);
        setIsInput(isInputField);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Easing loop (LERP) using requestAnimationFrame for 60fps performance without React re-renders
    const loop = () => {
      // Lerp ring towards mouse with gentle delay
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      // Dot follows faster
      dot.x += (mouse.x - dot.x) * 0.4;
      dot.y += (mouse.y - dot.y) * 0.4;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isDisabled) return null;

  return (
    <>
      {/* Subtle background spotlight following cursor */}
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-0 transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(200, 255, 77, 0.04) 0%, rgba(200, 255, 77, 0.01) 40%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* Center Electric Lime Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C8FF4D] pointer-events-none z-[9999] transition-all duration-200 ease-out shadow-[0_0_8px_rgba(200,255,77,0.8)] ${
          !isVisible || isInput ? 'opacity-0 scale-0' : isHovered ? 'scale-150 bg-[#C8FF4D]' : 'opacity-100 scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-[#C8FF4D]/40 pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          !isVisible || isInput
            ? 'opacity-0 scale-0'
            : isHovered
            ? 'w-12 h-12 border-[#C8FF4D]/80 bg-[#C8FF4D]/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(200,255,77,0.2)]'
            : 'w-8 h-8 opacity-100 scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
