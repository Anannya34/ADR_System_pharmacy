import { motion } from 'framer-motion';

export const AnalysisSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass glass-card spotlight-wrapper"
      style={{ marginTop: '2rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="skeleton" style={{ width: '64px', height: '64px', borderRadius: '16px' }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ width: '60%', height: '24px', marginBottom: '8px' }} />
          <div className="skeleton" style={{ width: '30%', height: '16px' }} />
        </div>
      </div>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div>
          <div className="skeleton" style={{ width: '40%', height: '20px', marginBottom: '12px' }} />
          <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
          <div className="skeleton" style={{ width: '90%', height: '16px', marginBottom: '8px' }} />
          <div className="skeleton" style={{ width: '95%', height: '16px' }} />
        </div>
        
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
          <div className="skeleton" style={{ width: '20%', height: '14px', marginBottom: '12px' }} />
          <div className="skeleton" style={{ width: '100%', height: '18px' }} />
        </div>
      </div>
    </motion.div>
  );
};
