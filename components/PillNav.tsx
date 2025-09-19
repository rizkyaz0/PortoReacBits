'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

  // Initialize animations and handle component lifecycle
  useEffect(() => {
    if (!initialLoadAnimation) return;

    const tl = gsap.timeline();
    
    if (logoImgRef.current) {
      gsap.set(logoImgRef.current, {
        scale: 0,
        rotation: -180
      });
      tl.to(logoImgRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: ease
      });
    }

    if (navItemsRef.current) {
      gsap.set(navItemsRef.current, {
        scale: 0,
        opacity: 0
      });
      tl.to(navItemsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: ease
      }, "-=0.4");
    }

    return () => {
      tl.kill();
    };
  }, [ease, initialLoadAnimation]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      
      if (mobileMenuRef.current) {
        if (newState) {
          gsap.fromTo(mobileMenuRef.current, 
            { 
              scaleY: 0,
              opacity: 0
            },
            { 
              scaleY: 1,
              opacity: 1,
              duration: 0.3,
              ease: ease
            }
          );
        } else {
          gsap.to(mobileMenuRef.current, {
            scaleY: 0,
            opacity: 0,
            duration: 0.2,
            ease: ease
          });
        }
      }

      // Animate hamburger lines
      if (hamburgerRef.current) {
        const lines = hamburgerRef.current.querySelectorAll('.hamburger-line');
        if (newState) {
          gsap.to(lines[0], { rotation: 45, y: 6, duration: 0.3, ease: ease });
          gsap.to(lines[1], { rotation: -45, y: -6, duration: 0.3, ease: ease });
        } else {
          gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: ease });
          gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: ease });
        }
      }

      if (onMobileMenuClick) {
        onMobileMenuClick();
      }

      return newState;
    });
  };

  // Handle mouse enter for pill hover animation
  const handleEnter = (index: number) => {
    const circle = circleRefs.current[index];
    if (!circle) return;

    // Kill any existing timeline for this index
    if (tlRefs.current[index]) {
      tlRefs.current[index]?.kill();
    }

    const tl = gsap.timeline();
    tlRefs.current[index] = tl;

    tl.set(circle, {
      scale: 0,
      x: '-50%',
      y: '0%'
    })
    .to(circle, {
      scale: 1.2,
      duration: 0.4,
      ease: ease
    });

    // Animate text
    const pillElement = circle.closest('a');
    if (pillElement) {
      const hoverLabel = pillElement.querySelector('.pill-label-hover') as HTMLElement;
      const normalLabel = pillElement.querySelector('.pill-label') as HTMLElement;
      
      if (hoverLabel && normalLabel) {
        tl.set(hoverLabel, { y: '100%', opacity: 0 }, 0)
          .to(normalLabel, { y: '-100%', duration: 0.3, ease: ease }, 0.1)
          .to(hoverLabel, { y: '0%', opacity: 1, duration: 0.3, ease: ease }, 0.1);
      }
    }
  };

  // Handle mouse leave for pill hover animation
  const handleLeave = (index: number) => {
    const circle = circleRefs.current[index];
    if (!circle) return;

    // Kill any existing timeline for this index
    if (tlRefs.current[index]) {
      tlRefs.current[index]?.kill();
    }

    const tl = gsap.timeline();
    tlRefs.current[index] = tl;

    tl.to(circle, {
      scale: 0,
      duration: 0.3,
      ease: ease
    });

    // Animate text back
    const pillElement = circle.closest('a');
    if (pillElement) {
      const hoverLabel = pillElement.querySelector('.pill-label-hover') as HTMLElement;
      const normalLabel = pillElement.querySelector('.pill-label') as HTMLElement;
      
      if (hoverLabel && normalLabel) {
        tl.to(normalLabel, { y: '0%', duration: 0.3, ease: ease }, 0)
          .to(hoverLabel, { y: '100%', opacity: 0, duration: 0.3, ease: ease }, 0);
      }
    }
  };

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      // Cleanup all timelines
      tlRefs.current.forEach(tl => tl?.kill());
      activeTweenRefs.current.forEach(tween => tween?.kill());
      logoTweenRef.current?.kill();
    };
  }, []);

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  } as React.CSSProperties;

  return (
    <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto">
      <nav
        className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            href={items[0].href}
            aria-label="Home"
            role="menuitem"
            ref={el => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #000)'
            }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || '#'}
            aria-label="Home"
            ref={el => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #000)'
            }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
          </a>
        )}

        {/* daftar menu desktop */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: 'var(--base, #000)',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text, #fff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                      style={{ background: 'var(--base, #000)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0';

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"
        style={{
          ...cssVars,
          background: 'var(--base, #f0f0f0)'
        }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map(item => {
            const defaultStyle: React.CSSProperties = {
              background: 'var(--pill-bg, #fff)',
              color: 'var(--pill-text, #fff)'
            };
            const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = 'var(--base)';
              e.currentTarget.style.color = 'var(--hover-text, #fff)';
            };
            const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = 'var(--pill-bg, #fff)';
              e.currentTarget.style.color = 'var(--pill-text, #fff)';
            };

            const linkClasses =
              'block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';

            return (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
