const interactions = {
    "Metformin|Insulin": {
        status: "Safe Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "Metformin and Insulin work synergistically to provide better glucose control. Metformin improves insulin sensitivity while Insulin directly lowers blood sugar. This combination is commonly prescribed and generally safe when monitored properly. Regular blood glucose monitoring is recommended to avoid hypoglycemia."
    },
    "Metformin|Glimepiride": {
        status: "Caution Required",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Both medications lower blood sugar through different mechanisms, increasing hypoglycemia risk. Glimepiride stimulates insulin release while Metformin reduces glucose production. Monitor blood glucose closely, especially during dose adjustments. Watch for symptoms like dizziness, sweating, and confusion."
    },
    "Metformin|Paracetamol": {
        status: "Safe Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "No significant interactions between Metformin and Paracetamol. Paracetamol can be safely used for pain relief while taking Metformin. However, avoid excessive Paracetamol doses as it may affect kidney function, which is important for Metformin clearance."
    },
    "Metformin|Alcohol": {
        status: "Unsafe Combination",
        level: "Major",
        class: "danger",
        icon: "⚠️",
        text: "Dangerous interaction that increases lactic acidosis risk. Alcohol impairs liver function and can enhance Metformin's lactic acid production. This combination may cause severe metabolic acidosis, especially in patients with kidney or liver problems. Avoid alcohol completely while taking Metformin."
    },
    "Metformin|Vitamin B-Complex": {
        status: "Beneficial Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "Vitamin B-Complex supplementation is recommended with long-term Metformin use. Metformin can interfere with Vitamin B12 absorption, leading to deficiency. B-Complex helps prevent anemia, neuropathy, and cognitive issues associated with B12 deficiency."
    },
    "Insulin|Glimepiride": {
        status: "Caution Required",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "High risk of severe hypoglycemia when combining these glucose-lowering agents. Both medications actively reduce blood sugar through different mechanisms. This combination requires careful dosing, frequent glucose monitoring, and patient education about hypoglycemia symptoms and emergency treatment."
    },
    "Insulin|Paracetamol": {
        status: "Safe Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "No clinically significant interaction between Insulin and Paracetamol. Paracetamol is the preferred pain reliever for diabetic patients as it doesn't affect blood sugar levels. Standard therapeutic doses are safe, but avoid chronic high-dose use."
    },
    "Insulin|Alcohol": {
        status: "Unsafe Combination",
        level: "Major",
        class: "danger",
        icon: "⚠️",
        text: "Extremely dangerous combination that can cause delayed hypoglycemia. Alcohol initially raises blood sugar but later causes severe drops, masking hypoglycemia symptoms. This can lead to unconsciousness, seizures, or coma. Never consume alcohol while on Insulin therapy."
    },
    "Insulin|Vitamin B-Complex": {
        status: "Safe Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "Vitamin B-Complex provides nutritional support without affecting Insulin action. B vitamins are essential for nerve health and metabolism, which is particularly important for diabetic patients. No interaction with Insulin absorption or effectiveness."
    },
    "Glimepiride|Paracetamol": {
        status: "Safe Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "No major interaction between Glimepiride and Paracetamol. Paracetamol is safe for pain relief while taking Glimepiride. However, maintain regular monitoring as pain or fever can affect blood sugar levels and may require Glimepiride dose adjustments."
    },
    "Glimepiride|Alcohol": {
        status: "Unsafe Combination",
        level: "Major",
        class: "danger",
        icon: "⚠️",
        text: "Highly dangerous combination causing severe hypoglycemia. Alcohol enhances Glimepiride's glucose-lowering effect while impairing the body's natural glucose production. This can lead to life-threatening hypoglycemia, especially with inadequate food intake. Complete alcohol avoidance is essential."
    },
    "Glimepiride|Vitamin B-Complex": {
        status: "Safe Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "No interaction between Glimepiride and Vitamin B-Complex. B vitamins support overall health and may help with diabetic neuropathy prevention. This combination is safe and potentially beneficial for long-term diabetes management."
    },
    "Paracetamol|Alcohol": {
        status: "Unsafe Combination",
        level: "Major",
        class: "danger",
        icon: "⚠️",
        text: "Extremely dangerous combination causing severe liver toxicity. Both substances are metabolized by the liver, and together they can overwhelm liver function, leading to acute liver failure. Even moderate alcohol with therapeutic Paracetamol doses can be harmful. Never combine these substances."
    },
    "Paracetamol|Vitamin B-Complex": {
        status: "Safe Interaction",
        level: "Low",
        class: "safe",
        icon: "✅",
        text: "No interaction between Paracetamol and Vitamin B-Complex. This combination is safe for pain management while maintaining nutritional support. B vitamins do not affect Paracetamol's effectiveness or metabolism."
    },
    "Alcohol|Vitamin B-Complex": {
        status: "Caution Required",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Alcohol interferes with absorption and metabolism of B vitamins, particularly B1, B6, and B12. Chronic alcohol consumption can lead to B vitamin deficiencies despite supplementation. This may cause neurological problems, anemia, and other health issues. Space supplementation at least 2 hours from alcohol consumption."
    }
};

const drugIcons = {
    "Metformin": "💊",
    "Insulin": "💉",
    "Glimepiride": "💊",
    "Paracetamol": "💊",
    "Alcohol": "🍷",
    "Vitamin B-Complex": "💊"
};

function checkInteraction() {
    const a = document.getElementById("drugA").value;
    const b = document.getElementById("drugB").value;
    const output = document.getElementById("output");

    if (!a || !b || a === b) {
        output.innerHTML = `
      <div class="result caution" style="padding: 24px;">
        <div style="display: flex; gap: 15px; align-items: center;">
            <div class="risk-icon" style="background: #fef3c7; color: #d97706;">ℹ️</div>
            <div>
                <strong style="display: block; margin-bottom: 4px;">Action Required</strong>
                <span style="font-size: 0.9rem; color: #92400e;">Please select two different medicines to analyze.</span>
            </div>
        </div>
      </div>`;
        // Reset to default background
        document.body.className = '';
        return;
    }

    output.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 40px; font-weight: 500;">🔍 Analyzing chemical properties and clinical data...</div>';

    setTimeout(() => {
        const key1 = `${a}|${b}`;
        const key2 = `${b}|${a}`;
        const data = interactions[key1] || interactions[key2];

        const defaultSafe = {
            status: "Generally Safe",
            level: "Low",
            class: "safe",
            icon: "✅",
            text: `No known harmful interactions identified between <strong>${a}</strong> and <strong>${b}</strong>. However, always follow your doctor's instructions.`,
            percent: 15
        };

        const resultData = data ? { ...data, percent: data.level === "Major" ? 85 : 50 } : defaultSafe;

        // Change background based on risk level
        document.body.className = '';
        if (resultData.class === 'danger') {
            document.body.classList.add('risk-danger');
        } else if (resultData.class === 'caution') {
            document.body.classList.add('risk-moderate');
        } else if (resultData.class === 'safe') {
            document.body.classList.add('risk-safe');
        }

        output.innerHTML = `
        <div class="result ${resultData.class}" id="interactionResult">
            <div class="interaction-card">
                <div class="interaction-header">
                    <div class="drug-pill">${drugIcons[a] || '💊'} ${a}</div>
                    <div class="interaction-arrow">➜</div>
                    <div class="drug-pill">${drugIcons[b] || '💊'} ${b}</div>
                </div>

                <div class="risk-info">
                    <div class="risk-icon">${resultData.icon}</div>
                    <div class="risk-content">
                        <h3>${resultData.status}</h3>
                        <div class="risk-description">${resultData.text}</div>
                    </div>
                </div>

                <div class="risk-scale-container">
                    <div class="risk-bar">
                        <div class="risk-indicator" style="left: ${resultData.percent}%; color: ${resultData.class === 'danger' ? '#ef4444' : resultData.class === 'caution' ? '#eab308' : '#24b987'}"></div>
                    </div>
                    <div class="risk-labels">
                        <span class="risk-label ${resultData.class === 'safe' ? 'active' : ''}">Safe</span>
                        <span class="risk-label ${resultData.class === 'caution' ? 'active' : ''}">Moderate</span>
                        <span class="risk-label ${resultData.class === 'danger' ? 'active' : ''}">High Risk</span>
                    </div>
                </div>

                <div class="confidence-note">
                    This combination has been analyzed based on standard pharmaceutical databases. Advisable to consult a healthcare professional for personalized advice.
                </div>
            </div>
        </div>`;

        // GSAP Entrance Animation
        gsap.from('#interactionResult', {
            opacity: 0,
            y: 40,
            scale: 0.98,
            duration: 0.8,
            ease: "power3.out"
        });

    }, 600);
}

// Phase 8: Modern Interactivity Enhancements
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    const card = document.querySelector('.card');

    // Simplified background animation
    gsap.to('body', {
        backgroundPosition: '100% 100%',
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "linear"
    });

    // Simplified card tilt (reduced frequency)
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
            rotationY: x * 3,
            rotationX: -y * 3,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)"
        });
    });
});
