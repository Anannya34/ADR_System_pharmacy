import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check } from 'lucide-react';
import { drugs } from '../data/interactions';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DrugSelector = ({ label, value, onChange, placeholder = "Select drug..." }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDrugs = drugs.filter(d => 
    d.id.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDrug = drugs.find(d => d.id === value);

  return (
    <div className="dropdown-container" style={{ position: 'relative', flex: 1 }}>
      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', marginLeft: '0.25rem', fontWeight: 600 }}>
        {label}
      </label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="glass"
        style={{ 
          padding: '1rem', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          border: isOpen ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
          transition: 'all 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.25rem' }}>{selectedDrug?.icon || '💊'}</span>
          <span style={{ color: value ? 'var(--text-main)' : 'var(--text-muted)' }}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          style={{ 
            color: 'var(--text-muted)', 
            transform: isOpen ? 'rotate(180deg)' : 'none', 
            transition: 'transform 0.3s ease' 
          }} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass"
            style={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              right: 0, 
              marginTop: '0.5rem', 
              zIndex: 100, 
              maxHeight: '300px', 
              overflowY: 'auto',
              padding: '0.5rem'
            }}
          >
            <div style={{ position: 'relative', marginBottom: '0.5rem', padding: '0.5rem' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                autoFocus
                type="text"
                placeholder="Search drugs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  width: '100%', 
                  background: 'rgba(0,0,0,0.2)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: '8px', 
                  padding: '0.5rem 1rem 0.5rem 2.25rem', 
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            {filteredDrugs.map((drug) => (
              <motion.div
                key={drug.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(drug.id);
                  setIsOpen(false);
                  setSearch('');
                }}
                style={{ 
                  padding: '0.75rem 1rem', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{drug.icon}</span>
                  <div>
                    <div style={{ fontWeight: 500 }}>{drug.id}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{drug.category}</div>
                  </div>
                </div>
                {value === drug.id && <Check size={16} className="gradient-text" style={{ color: 'var(--primary)' }} />}
              </motion.div>
            ))}

            {filteredDrugs.length === 0 && (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No drugs found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
