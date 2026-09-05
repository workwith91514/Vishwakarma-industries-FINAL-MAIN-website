import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBg1 from '../assets/Homexyz.webp';
import heroBg2 from '../assets/seesham1.webp';
import heroBg3 from '../assets/mangowood.webp';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Particles } from '../components/Particles';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { LuxuryAbout } from '../components/LuxuryAbout';
import { ElasticGrid } from '../components/ElasticGrid';
import { ManufacturingExcellence } from '../components/ManufacturingExcellence';
import { Exhibitions } from '../components/Exhibitions';
import { ScrollingBanner } from '../components/ScrollingBanner';
import { MaterialPalette } from '../components/MaterialPalette';
import { Footer } from '../components/Footer';
import { Preloader } from '../components/Preloader';
import '../index.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentBg, setCurrentBg] = useState(0);
  // Only the first hero background is eligible to load immediately (it's the LCP element).
  // The other two are only allowed to fetch once the browser is idle, so they never compete
  // with the actual hero image's bandwidth/priority on the initial load.
  const [warmedBg, setWarmedBg] = useState<boolean[]>([true, false, false]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const bgImages = [heroBg1, heroBg2, heroBg3];

  // Warm the remaining hero backgrounds during idle time, well ahead of the 6s/12s marks
  // they're actually needed at, without contending with the critical initial page load.
  useEffect(() => {
    const warm = () => setWarmedBg([true, true, true]);
    const supportsIdle = typeof window.requestIdleCallback === 'function';
    const ric = supportsIdle
      ? window.requestIdleCallback(warm, { timeout: 4000 })
      : window.setTimeout(warm, 2000);
    return () => {
      if (supportsIdle) window.cancelIdleCallback(ric);
      else window.clearTimeout(ric);
    };
  }, []);

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.5 });

      heroTl
        .from('.hero-bg-image', {
          filter: 'blur(20px)',
          opacity: 0,
          duration: 2.5,
          ease: 'power3.inOut',
        })
        .to('.hero-title .line-inner', {
          y: '0%',
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
        }, '-=1.5')
        .to('.hero-subtitle', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.8')
        .to('.hero-cta', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6')
        .to('.scroll-indicator', {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.4');

      // Hero parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to('.hero-bg-image', {
          x: -xPos,
          y: -yPos,
          duration: 1.5,
          ease: 'power3.out',
        });

        gsap.to('.hero-content', {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1.5,
          ease: 'power3.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Hero scroll fade out
      const heroTrigger = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set('.hero-content', {
            opacity: 1 - progress * 1.5,
            y: progress * 100,
          });
          gsap.set('.hero-bg', {
            y: progress * 200,
          });
        },
      });
      triggersRef.current.push(heroTrigger);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <SEO
        title="Bespoke Furniture Manufacturer & Exporter from Jodhpur, India"
        description="Vishwakarma Industries — Vriksh-certified furniture manufacturer &amp; global exporter from Jodhpur, India. 30+ years crafting premium wooden &amp; iron furniture for hotels, retailers &amp; wholesalers worldwide."
        keywords="furniture manufacturer Jodhpur, furniture exporter India, bespoke wooden furniture manufacturer, iron furniture exporter, hotel furniture supplier India, wholesale furniture manufacturer Rajasthan"
      />
      <Preloader onComplete={() => ScrollTrigger.refresh()} />
      <Navbar />

      <div ref={containerRef} className="main-container">
        <div className="noise-overlay" />
        <Particles />

        {/* Hero Section */}
        <section ref={heroRef} className="hero">
          <div className="hero-bg">
            {bgImages.map((img, index) => (
              <div
                key={index}
                className="hero-bg-image"
                style={{
                  backgroundImage: warmedBg[index] ? `url(${img})` : 'none',
                  opacity: currentBg === index ? 1 : 0,
                  transition: 'opacity 2s ease-in-out',
                }}
              />
            ))}
          </div>
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="line">
                <span className="line-inner">{splitText('VISHWAKARMA')}</span>
              </span>
              <span className="line">
                <span className="line-inner gold-text">{splitText('INDUSTRIES')}</span>
              </span>
            </h1>
            <p className="hero-subtitle">Your Desire , We Design.</p>
            <Link to="/products" className="hero-cta interactive magnetic">
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="scroll-indicator">
            <span className="scroll-text">Scroll to Discover</span>
            <div className="scroll-line" />
          </div>
        </section>

        <LuxuryAbout />
        <MaterialPalette />
        <ElasticGrid />
        <ManufacturingExcellence />
        <Exhibitions />
        <ScrollingBanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
