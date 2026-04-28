import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Info, FlaskConical, Stethoscope } from 'lucide-react';
import type { Interaction } from '../data/interactions';

interface Props {
  interaction: Interaction;
}

export const InteractionReport: React.FC<Props> = ({ interaction }) => {
  const getSeverityColor = () => {
    switch (interaction.severity) {
      case 'danger': return 'var(--danger)';
      case 'caution': return 'var(--caution)';
      default: return 'var(--safe)';
    }
  };

  const getStatusIcon = () => {
    switch (interaction.severity) {
      case 'danger': return <AlertTriangle size={32} />;
      case 'caution': return <Info size={32} />;
      default: return <ShieldCheck size={32} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass glass-card"
      style={{ marginTop: '2rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
        <div style={{ 
          backgroundColor: `${getSeverityColor()}20`, 
          color: getSeverityColor(),
          padding: '1rem',
          borderRadius: '16px'
        }}>
          {getStatusIcon()}
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{interaction.status}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Risk Level:</span>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              backgroundColor: getSeverityColor(), 
              padding: '2px 8px', 
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              {interaction.level}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--primary-light)' }}>
            <Stethoscope size={20} />
            <h3 style={{ fontSize: '1.1rem' }}>Clinical Summary</h3>
          </div>
          <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            {interaction.text}
          </p>
        </section>

        {interaction.mechanism && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--accent)' }}>
              <FlaskConical size={20} />
              <h3 style={{ fontSize: '1.1rem' }}>Mechanism of Action</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {interaction.mechanism}
            </p>
          </section>
        )}

        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.03)', 
          padding: '1.5rem', 
          borderRadius: '16px',
          borderLeft: `4px solid ${getSeverityColor()}`
        }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recommendation
          </h4>
          <p style={{ fontWeight: 500 }}>{interaction.recommendation}</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
        Data verified against international pharmaceutical standards. Always consult your physician.
      </div>
    </motion.div>
  );
};
