export interface Interaction {
  status: string;
  level: 'Low' | 'Moderate' | 'Major';
  severity: 'safe' | 'caution' | 'danger';
  icon: string;
  text: string;
  mechanism?: string;
  recommendation: string;
}

export const interactions: Record<string, Interaction> = {
  "Metformin|Insulin": {
    status: "Safe Interaction",
    level: "Low",
    severity: "safe",
    icon: "✅",
    text: "Metformin and Insulin work synergistically to provide better glucose control.",
    mechanism: "Metformin improves insulin sensitivity while Insulin directly lowers blood sugar.",
    recommendation: "Regular blood glucose monitoring is recommended to avoid hypoglycemia."
  },
  "Metformin|Glimepiride": {
    status: "Caution Required",
    level: "Moderate",
    severity: "caution",
    icon: "⚠️",
    text: "Both medications lower blood sugar through different mechanisms, increasing hypoglycemia risk.",
    mechanism: "Glimepiride stimulates insulin release while Metformin reduces glucose production.",
    recommendation: "Monitor blood glucose closely, especially during dose adjustments."
  },
  "Metformin|Alcohol": {
    status: "Unsafe Combination",
    level: "Major",
    severity: "danger",
    icon: "🚫",
    text: "Dangerous interaction that increases lactic acidosis risk.",
    mechanism: "Alcohol impairs liver function and can enhance Metformin's lactic acid production.",
    recommendation: "Avoid alcohol completely while taking Metformin."
  },
  "Paracetamol|Alcohol": {
    status: "Severe Risk",
    level: "Major",
    severity: "danger",
    icon: "🚫",
    text: "Extremely dangerous combination causing severe liver toxicity.",
    mechanism: "Both substances are metabolized by the liver, potentially causing acute liver failure.",
    recommendation: "Never combine these substances. Seek medical help if ingested together."
  },
  "Insulin|Alcohol": {
    status: "Unsafe Combination",
    level: "Major",
    severity: "danger",
    icon: "⚠️",
    text: "Can cause severe, delayed hypoglycemia.",
    mechanism: "Alcohol masks hypoglycemia symptoms and prevents the liver from releasing glucose.",
    recommendation: "Do not consume alcohol while on insulin therapy."
  }
};

export const drugs = [
  { id: 'Metformin', icon: '💊', category: 'Antidiabetic' },
  { id: 'Insulin', icon: '💉', category: 'Hormone' },
  { id: 'Glimepiride', icon: '💊', category: 'Antidiabetic' },
  { id: 'Paracetamol', icon: '💊', category: 'Analgesic' },
  { id: 'Alcohol', icon: '🍷', category: 'Lifestyle' },
  { id: 'Vitamin B-Complex', icon: '💊', category: 'Supplement' }
];
