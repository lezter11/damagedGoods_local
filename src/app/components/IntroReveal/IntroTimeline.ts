import gsap from 'gsap';

export const createIntroTimeline = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  onComplete: () => void
) => {
  if (!containerRef.current) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    // Selectors
    const damagedText = document.querySelector('.intro-text-damaged');
    const goodsText = document.querySelector('.intro-text-goods');
    const centerTextWrapper = document.querySelector('.centerTextWrapper');
    const leftPanel = document.querySelector('.intro-panel-left');
    const rightPanel = document.querySelector('.intro-panel-right');
    // Simply make the text visible before the split starts
    gsap.set([damagedText, goodsText], { opacity: 1, visibility: 'visible', transform: 'translateY(0px)' });
    gsap.set(centerTextWrapper, { opacity: 1 });

    tl.to({}, { duration: 0.1 }); // Short initial buffer

    // Simple smooth fade in (Phase 2 & 3 combined)
    tl.fromTo(
      [damagedText, goodsText],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out' },
      0.1
    );

    // PHASE 4: PORTAL REACTION
    tl.to(
      'canvas',
      {
        filter: 'brightness(1.5) contrast(1.2)',
        scale: 1.05,
        duration: 1.2,
        ease: 'power2.inOut',
      },
      2.5
    );

    // PHASE 5: CINEMATIC SPLIT
    tl.to(
      leftPanel,
      {
        x: '-100%',
        duration: 1.4,
        ease: 'expo.inOut',
      },
      2.7
    );
    tl.to(
      damagedText,
      {
        x: '-18vw',
        opacity: 0,
        transformOrigin: 'center center',
        duration: 1.4,
        ease: 'expo.inOut',
      },
      2.7
    );

    tl.to(
      rightPanel,
      {
        x: '100%',
        duration: 1.4,
        ease: 'expo.inOut',
      },
      2.7
    );
    tl.to(
      goodsText,
      {
        x: '18vw',
        opacity: 0,
        transformOrigin: 'center center',
        duration: 1.4,
        ease: 'expo.inOut',
      },
      2.7
    );

    // PHASE 6: CLEANUP
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      4.1
    );

  }, containerRef);

  return ctx;
};
