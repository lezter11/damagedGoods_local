import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade upward into view
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          },
        }
      );

      // Subtle parallax on massive typography
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a] px-2 sm:px-4 md:px-6 pb-2 sm:pb-4 md:pb-6 pt-24 relative z-20">
      <footer 
        ref={footerRef}
        className="relative w-full bg-[#4A0D12] text-[#F4F1EC] font-sans selection:bg-[#F4F1EC] selection:text-[#4A0D12] overflow-hidden rounded-[30px] md:rounded-[40px] min-h-[85vh] flex flex-col justify-between pt-16 px-6 sm:px-10 md:pt-20 md:px-16 lg:px-24"
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 relative z-10 w-full">
          
          {/* Brand Left */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Logo Graphic Placeholder (Inspired by screenshot's 2x2 grid) */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-transparent grid grid-cols-2 grid-rows-2 gap-[2px] flex-shrink-0">
              <div className="bg-[#F4F1EC]"></div>
              <div className="bg-[#F4F1EC] rounded-full"></div>
              <div className="bg-transparent border-[3px] border-[#F4F1EC] rounded-bl-full"></div>
              <div className="bg-[#F4F1EC] rounded-br-[10px] bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#4A0D12_3px,#4A0D12_6px)]"></div>
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1 text-white">
                Damaged Goods
              </h2>
              <p className="text-sm md:text-[15px] text-[#F4F1EC] font-medium leading-snug max-w-[280px]">
                A premium curated vintage marketplace built for people who value history over hype.
              </p>
            </div>
          </div>

          {/* Links Right */}
          <div className="grid grid-cols-2 gap-x-12 md:gap-x-24 gap-y-4 text-[13px] font-medium text-[#F4F1EC]">
            {/* Column 1 */}
            <ul className="flex flex-col gap-3.5">
              {['Shop', 'New Arrivals', 'Collections', 'Archive', 'Brands', 'Journal', 'Gift Cards'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
            {/* Column 2 */}
            <ul className="flex flex-col gap-3.5">
              {['Track Order', 'Shipping & Returns', 'Size Guide', 'Contact', 'Support', 'Collaborating with us'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section (Contact Strip & Massive Text) */}
        <div className="flex flex-col w-full relative z-10 mt-auto pt-24 md:pt-32">
          
          {/* Contact Strip */}
          <div className="flex flex-col md:flex-row justify-between items-baseline w-full text-[11px] md:text-xs font-mono mb-4 text-[#F4F1EC] opacity-80 gap-4 md:gap-0">
            <a href="#" className="hover:text-white hover:opacity-100 transition-all">@damagedgoods.in</a>
            <a href="mailto:support@damagedgoods.in" className="hover:text-white hover:opacity-100 transition-all">support@damagedgoods.in</a>
            <span className="hidden md:inline">India</span>
          </div>

          {/* Massive Typography */}
          <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none border-b border-[#F4F1EC]/10 px-2 md:px-4 pb-2 pt-4">
            <h1 
              ref={parallaxRef}
              className="text-[55px] sm:text-[90px] md:text-[11vw] font-black uppercase leading-[0.85] tracking-tighter m-0 p-0 text-transparent w-full text-center whitespace-nowrap"
              style={{ WebkitTextStroke: '1.2px #F4F1EC' }}
            >
              DAMAGED GOODS
            </h1>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full pb-8 pt-5 text-[9px] md:text-[10px] font-mono uppercase text-[#F4F1EC] opacity-80">
            <p className="mb-4 md:mb-0">© 2026 DAMAGED GOODS. ALL RIGHTS RESERVED.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy Policy', 'Terms of Use', 'Consent Preferences'].map((item) => (
                <a key={item} href="#" className="hover:text-white hover:opacity-100 transition-all underline decoration-[0.5px] underline-offset-[5px]">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}