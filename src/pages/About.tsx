import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Globe, Users, TrendingUp } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import woodcarvingImg from '../assets/woodcarving.webp';
import exportImg from '../assets/export.webp';
import delhiFairImg from '../assets/delhifair2.webp';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo('.new-about-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.new-about-image',
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
      );

      // Section Content Animation (Staggered Cards & Text)
      const sections = gsap.utils.toArray('.new-about-fade-up');
      sections.forEach((section: any) => {
        gsap.fromTo(section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%'
            }
          }
        );
      });

      // Grid Cards Animation
      gsap.fromTo('.about-value-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-values-grid',
            start: 'top 85%'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="new-about-page">
      <Navbar />

      <main className="new-about-main">
        {/* HERO SECTION */}
        <section className="new-about-hero">
          <div className="new-about-hero-content">
            <div className="hero-eyebrow-luxe">OUR LEGACY</div>
            <h1 className="hero-title-luxe">
              <span className="line">
                <span className="line-inner">A 30-Year History</span>
              </span>
              <span className="line">
                <span className="line-inner">Of Mastery.</span>
              </span>
            </h1>
            <p className="hero-description-luxe">
              Vishwakarma Industries stands at the convergence of ancestral craft and modern manufacturing dominance. From Jodhpur to the world, we don't just build furniture; we curate global heritage.
            </p>
          </div>
          <div className="new-about-hero-visual">
            <div className="image-wrapper">
              <img src={woodcarvingImg} alt="Woodcarving Craftsmanship" className="new-about-image" />
            </div>
          </div>
        </section>

        {/* THE VISIONARY SECTION */}
        <section className="new-about-section alt-bg">
          <div className="about-split-container">
            <div className="about-split-image new-about-fade-up">
              <img src={delhiFairImg} alt="MalaRam Suthar Vision" />
            </div>
            <div className="about-split-text new-about-fade-up">
              <div className="section-eyebrow">THE VISIONARY</div>
              <h2 className="section-title">Mr. MalaRam Suthar</h2>
              <p className="section-quote">“Allow your passion to become your purpose, and it will one day become your profession.”</p>
              <div className="section-body">
                <p>Establishing Vishwakarma Industries 30 years ago, Mr. MalaRam Suthar's story is one of relentless passion. Coming from a traditional Suthar (Carpenter) family, he was captivated by furniture-making techniques from a young age.</p>
                <p>After honing his skills for over a decade in the Jodhpur handicrafts industry, he founded his own manufacturing company. Today, his vision continues to drive our growth, providing best-in-class furniture to the global market.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES & PHILOSOPHY */}
        <section className="new-about-section">
          <div className="section-header new-about-fade-up">
            <div className="section-eyebrow">PHILOSOPHY</div>
            <h2 className="section-title">The Principles We Stand By</h2>
            <p className="section-subtitle">Excellence in every detail, sustainability in every action, and commitment to every buyer.</p>
          </div>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="icon-wrapper"><Globe size={24} /></div>
              <h3>Global Reach</h3>
              <p>Proudly fulfilling promises of quality across Germany, the UK, Saudi Arabia, and the USA, growing constantly with our dedicated buyers.</p>
            </div>
            <div className="about-value-card">
              <div className="icon-wrapper"><TrendingUp size={24} /></div>
              <h3>Sustainable Growth</h3>
              <p>Meeting today's needs without compromising tomorrow. We exclusively source Vriksh Certified timber guided by EPCH standards.</p>
            </div>
            <div className="about-value-card">
              <div className="icon-wrapper"><Users size={24} /></div>
              <h3>Buyer Engagement</h3>
              <p>Our development team collaborates deeply with buyers, customizing material, structure, and finish until every detail meets perfection.</p>
            </div>
            <div className="about-value-card">
              <div className="icon-wrapper"><CheckCircle size={24} /></div>
              <h3>Unmatched Detail</h3>
              <p>We believe the difference between average and stunning lies in minute details. Every order receives our full focus to achieve perfect woodwork.</p>
            </div>
          </div>
        </section>

        {/* EXPORT CAPABILITY */}
        <section className="new-about-section alt-bg">
          <div className="about-split-container reverse">
            <div className="about-split-image new-about-fade-up">
              <img src={exportImg} alt="Global Export Operations" />
            </div>
            <div className="about-split-text new-about-fade-up">
              <div className="section-eyebrow">SCALE & CAPACITY</div>
              <h2 className="section-title">Built for Global Volume</h2>
              <div className="section-body">
                <p>Our state-of-the-art facilities in Jodhpur are engineered to handle high-volume export demands without compromising on the artisanal quality that defines Indian craftsmanship.</p>
                <p>Whether you require wholesale retail collections, complete hospitality outfitting, or bespoke luxury pieces, Vishwakarma Industries possesses the infrastructure, workforce, and logistical expertise to deliver on a massive scale.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
