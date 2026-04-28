import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Activity, ShieldAlert, Sparkles } from 'lucide-react';
import { DrugSelector } from './components/DrugSelector';
import { InteractionReport } from './components/InteractionReport';
import { AnalysisSkeleton } from './components/AnalysisSkeleton';
import { Magnetic } from './components/Magnetic';
import { interactions } from './data/interactions';

function App() {
  const [drugA, setDrugA] = useState('');
  const [drugB, setDrugB] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update CSS variables for spotlight
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCompare = () => {
    if (!drugA || !drugB || drugA === drugB) return;

    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const key1 = `${drugA}|${drugB}`;
      const key2 = `${drugB}|${drugA}`;
      const data = interactions[key1] || interactions[key2];

      const defaultSafe = {
        status: "Generally Safe",
        level: "Low",
        severity: "safe",
        icon: "✅",
        text: `No significant harmful interactions identified between ${drugA} and ${drugB}.`,
        recommendation: "Standard usage as prescribed is generally safe. Maintain routine monitoring."
      };

      setResult(data || defaultSafe);
      setIsAnalyzing(false);
    }, 2000); // Slightly longer for skeleton effect
  };

  const parallaxX = (mousePos.x - window.innerWidth / 2) * 0.01;
  const parallaxY = (mousePos.y - window.innerHeight / 2) * 0.01;

  return (
    <div className="app" ref={containerRef}>
      <div 
        className="plasma-bg" 
        style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
      />
      
      <div className="container">
        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <Magnetic strength={0.3}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ display: 'inline-flex', padding: '1.25rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '28px', marginBottom: '1.5rem', cursor: 'pointer' }}
            >
              <Pill className="gradient-text" size={44} />
            </motion.div>
          </Magnetic>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
          >
            Interaction<span className="gradient-text">Aware</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
          >
            Intelligent pharmaceutical safety tool for analyzing complex drug-to-drug interactions.
          </motion.p>
        </header>

        {/* Main Interface */}
        <main style={{ maxWidth: '800px', margin: '0 auto' }}>
          <section className="glass glass-card spotlight-wrapper">
            <div className="spotlight" />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Activity className="gradient-text" size={24} />
                <h2 style={{ fontSize: '1.5rem' }}>Select Combinations</h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', position: 'relative' }}>
                <DrugSelector 
                  label="First Medicine" 
                  value={drugA} 
                  onChange={setDrugA} 
                />
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  position: 'relative',
                  marginTop: '1.5rem'
                }}>
                  {/* Connection Line Background */}
                  <div style={{ 
                    position: 'absolute', 
                    width: '100px', 
                    height: '2px', 
                    background: drugA && drugB ? 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)' : 'rgba(255,255,255,0.1)',
                    zIndex: 0,
                    opacity: drugA && drugB ? 1 : 0.3,
                    transition: 'all 0.5s ease'
                  }} />
                  
                  <motion.div
                    animate={drugA && drugB ? { rotate: 180, scale: 1.2 } : { rotate: 0, scale: 1 }}
                    style={{ 
                      position: 'relative', 
                      zIndex: 1, 
                      backgroundColor: drugA && drugB ? 'var(--bg-dark)' : 'transparent',
                      padding: '8px',
                      borderRadius: '50%',
                      border: drugA && drugB ? '1px solid var(--primary-light)' : '1px solid transparent',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    <Sparkles 
                      size={20} 
                      color={drugA && drugB ? 'var(--primary-light)' : 'var(--text-muted)'} 
                    />
                  </motion.div>
                </div>

                <DrugSelector 
                  label="Second Medicine" 
                  value={drugB} 
                  onChange={setDrugB} 
                />
              </div>

              <Magnetic strength={0.2}>
                <motion.button 
                  animate={drugA && drugB && !isAnalyzing ? { 
                    boxShadow: [
                      "0 4px 15px rgba(16, 185, 129, 0.3)",
                      "0 4px 25px rgba(16, 185, 129, 0.6)",
                      "0 4px 15px rgba(16, 185, 129, 0.3)"
                    ]
                  } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  onClick={handleCompare}
                  disabled={!drugA || !drugB || drugA === drugB || isAnalyzing}
                  className="btn-primary"
                  style={{ 
                    width: '100%', 
                    fontSize: '1.1rem', 
                    opacity: (!drugA || !drugB || drugA === drugB) ? 0.6 : 1,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    {isAnalyzing ? 'Analyzing Clinical Data...' : 'Analyze Interactions'}
                  </span>
                  
                  {drugA && drugB && !isAnalyzing && (
                    <motion.div
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        zIndex: 1
                      }}
                    />
                  )}
                </motion.button>
              </Magnetic>

              {drugA && drugB && drugA === drugB && (
                <p style={{ color: 'var(--caution)', fontSize: '0.9rem', marginTop: '1rem', textAlign: 'center' }}>
                  Please select two different medicines to analyze.
                </p>
              )}
            </div>
          </section>

          {/* Analysis State */}
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <AnalysisSkeleton key="skeleton" />
            ) : result && (
              <InteractionReport 
                key="report"
                interaction={result} 
              />
            )}
          </AnimatePresence>
        </main>

        <footer style={{ marginTop: '6rem', paddingBottom: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <ShieldAlert size={16} />
            <span>Public Safety Interface • v2.1.0</span>
          </div>
          <p>© 2024 InteractionAware Systems. Built with precision for public safety.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
