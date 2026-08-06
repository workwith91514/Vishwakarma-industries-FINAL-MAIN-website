import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Particles } from '../components/Particles';
import { SEO } from '../components/SEO';
import heroImage from '../assets/oemodm.webp';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.new-contact-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.new-contact-image',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
      );

      // Info Cards Animation
      gsap.fromTo('.contact-info-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info-grid',
            start: 'top 85%'
          }
        }
      );

      // Form Animation
      gsap.fromTo('.contact-form-container',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-section',
            start: 'top 80%'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok || form.action.includes('your-id-here')) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Submission failed. Please try again or contact us via email.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 8000);
    }
  };

  return (
    <div ref={containerRef} className="new-contact-page">
      <SEO 
        title="Contact Us" 
        description="Connect with Vishwakarma Industries. Global partners in manufacturing bespoke furniture and large-scale exports." 
      />
      <div className="noise-overlay" />
      <Particles />
      <Navbar />

      <main className="new-contact-main">
        {/* HERO SPLIT SECTION */}
        <section className="new-contact-hero">
          <div className="new-contact-hero-content">
            <span className="eyebrow">GLOBAL PARTNER IN MANUFACTURING</span>
            <h1 className="title">Let's Build <br />Something <i>Exceptional.</i></h1>
            <p className="description">
              Vishwakarma Industries specializes in bespoke furniture manufacturing and large-scale global export. Connect with our Jodhpur headquarters to discuss your retail or hospitality outfitting requirements.
            </p>
            <div className="contact-hero-actions">
              <a href="#inquiry-form" className="btn-primary">Start Inquiry <ArrowRight size={18} /></a>
              <a href="mailto:info@thevishwakarmaindustries.com" className="btn-secondary">Email Us Directly</a>
            </div>
          </div>
          <div className="new-contact-hero-visual">
            <div className="image-wrapper">
              <img src={heroImage} alt="Furniture Manufacturing" className="new-contact-image" />
              <div className="image-overlay" />
            </div>
          </div>
        </section>

        {/* INFO CARDS SECTION */}
        <section className="contact-info-section">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="card-icon"><MapPin size={24} /></div>
              <h3>Headquarters & Factory</h3>
              <p>Unit-1: H-355, Sangaria RIICO 2nd Phase<br />Unit 2: Plot No. 18, Sanagaria<br />Jodhpur, Rajasthan 342013, India</p>
            </div>

            <div className="contact-info-card">
              <div className="card-icon"><Phone size={24} /></div>
              <h3>Direct Export Line</h3>
              <p className="highlight"><a href="tel:+919166631034">+91-9166631034</a></p>
              <p className="sub-text">Available Mon-Sat, 9am - 7pm IST</p>
            </div>

            <div className="contact-info-card">
              <div className="card-icon"><Mail size={24} /></div>
              <h3>Email Division</h3>
              <p className="highlight"><a href="mailto:info@thevishwakarmaindustries.com">info@thevishwakarmaindustries.com</a></p>
              <p className="sub-text">We aim to respond within 24 hours.</p>
            </div>
          </div>
        </section>

        {/* FORM SECTION */}
        <section id="inquiry-form" className="contact-form-section">
          <div className="contact-form-container">
            <div className="form-header">
              <h2>Send an Inquiry</h2>
              <p>Provide details about your project, and our export team will get back to you with timelines and manufacturing capabilities.</p>
            </div>

            {isSubmitted ? (
              <div className="form-success">
                <h3>Inquiry Successfully Received</h3>
                <p>Thank you for reaching out to Vishwakarma Industries. Our team will review your requirements and contact you shortly.</p>
              </div>
            ) : (
              <form className="modern-form" onSubmit={handleSubmit} action="https://formspree.io/f/xjglqzqa" method="POST">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization</label>
                    <input type="text" name="company" placeholder="Your Company Ltd." />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="john@company.com" required />
                  </div>
                  <div className="form-group">
                    <label>Inquiry Type</label>
                    <select name="type" required defaultValue="">
                      <option value="" disabled hidden>Select Inquiry Type</option>
                      <option value="wholesale">Wholesale Export</option>
                      <option value="hospitality">Hospitality & Hotel Outfitting</option>
                      <option value="retail">Bespoke Retail Production</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Project Details / Requirements</label>
                  <textarea name="message" placeholder="Please describe your requirements, expected volumes, or specific manufacturing needs..." required></textarea>
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'} <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
