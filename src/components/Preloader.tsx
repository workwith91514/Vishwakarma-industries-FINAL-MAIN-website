import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPreloader] = useState(() => {
        return !sessionStorage.getItem('vkw_preloader_done');
    });

    useEffect(() => {
        // Deliberately NOT gated on every <img> on the page finishing (querySelectorAll('img')
        // + waiting on all their load events): on a content-heavy page that forces dozens of
        // below-the-fold images into eager, high-priority fetches that compete with the actual
        // hero/LCP image for bandwidth — the direct cause of a 15s+ mobile LCP. The progress bar
        // below is a visual animation only; real completion is window 'load' (fires once the
        // initially-requested resources are done — it does not force not-yet-triggered
        // loading="lazy" images to fetch) with a hard cap so a slow connection never holds the
        // reveal open indefinitely.
        let p = 0;
        const tick = window.setInterval(() => {
            p = Math.min(p + Math.random() * 18 + 6, 92);
            setProgress(Math.floor(p));
        }, 90);

        const finish = () => {
            window.clearInterval(tick);
            setProgress(100);
            setIsLoaded(true);
        };

        if (document.readyState === 'complete') {
            finish();
        } else {
            window.addEventListener('load', finish, { once: true });
        }
        const maxWait = window.setTimeout(finish, 3500);

        return () => {
            window.clearInterval(tick);
            window.clearTimeout(maxWait);
            window.removeEventListener('load', finish);
        };
    }, [showPreloader]);

    const hasFinished = useRef(false);

    useEffect(() => {
        if (isLoaded && !hasFinished.current) {
            hasFinished.current = true;
            const tl = gsap.timeline();
            
            tl.to('.preloader-bar-fill', {
                width: '100%',
                duration: 0.5,
                ease: 'power4.out'
            })
            .to('.preloader-wrapper', {
                yPercent: -100,
                duration: 1.4,
                ease: 'expo.inOut',
                delay: 0.1,
                onStart: () => {
                   // Reveal site underneath as preloader slides up
                   gsap.fromTo('.main-container', 
                       { y: 50, opacity: 0 },
                       { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }
                   );
                },
                onComplete: () => {
                    sessionStorage.setItem('vkw_preloader_done', 'true');
                    if (onComplete) onComplete();
                }
            })
            .set('.preloader-wrapper', { display: 'none' });
        }
    }, [isLoaded, onComplete, showPreloader]);

    useEffect(() => {
        if (!showPreloader) {
            if (onComplete) onComplete();
        }
    }, [showPreloader, onComplete]);

    if (!showPreloader) return null;

    return (
        <div className="preloader-wrapper">
            <div className="preloader-overlay" />
            
            <div className="preloader-content">
                <div className="preloader-logo">
                    VISHWAKARMA
                </div>
                
                <div className="preloader-bar">
                    <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                
                <div className="percent-container">
                    <div className="preloader-percent">
                        {progress < 100 ? `Crafting Excellence ${progress}%` : "Ready to Discover"}
                    </div>
                </div>
            </div>

            <style>{`
                .preloader-wrapper {
                    position: fixed;
                    inset: 0;
                    z-index: 1000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background-color: #1a1a1a;
                }
                .preloader-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #0c0c0c;
                    z-index: -1;
                }
                .preloader-content {
                    text-align: center;
                    color: #fff;
                    z-index: 1;
                    width: 100%;
                    padding: 0 1.5rem;
                }
                .preloader-logo {
                    font-family: var(--font-display);
                    font-size: clamp(1.2rem, 7vw, 2.5rem);
                    letter-spacing: 0.4em;
                    font-weight: 300;
                    margin-bottom: 2.5rem;
                    width: 100%;
                    text-align: center;
                }
                .preloader-bar {
                    width: 80%;
                    max-width: 300px;
                    height: 1px;
                    background: rgba(255,255,255,0.05);
                    position: relative;
                    margin: 0 auto;
                }
                .preloader-bar-fill {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background-color: var(--gold-primary);
                    transition: width 0.4s cubic-bezier(0.1, 0, 0, 1);
                }
                .percent-container {
                    overflow: hidden;
                    marginTop: 1.5rem;
                }
                .preloader-percent {
                    font-family: var(--font-body);
                    font-size: 0.6rem;
                    letter-spacing: 0.3em;
                    opacity: 0.6;
                    text-transform: uppercase;
                    margin-top: 1.5rem;
                }
                @media (max-width: 480px) {
                    .preloader-logo {
                        letter-spacing: 0.3em;
                        margin-bottom: 2rem;
                    }
                    .preloader-bar {
                        max-width: 240px;
                    }
                }
            `}</style>
        </div>
    );
};
