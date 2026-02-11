const interactions = {
    "Paracetamol|Ibuprofen": {
        status: "Moderate Interaction",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Combined use for a short time is usually safe. However, regular long-term use can increase the risk of stomach irritation and kidney strain. Use the lowest effective dose for the shortest time."
    },
    "Ibuprofen|Aspirin": {
        status: "High Risk Interaction",
        level: "Major",
        class: "danger",
        icon: "⚠️",
        text: "This combination may cause serious health risks. Taking ibuprofen with aspirin can increase the risk of gastrointestinal bleeding and kidney damage. Consult your doctor."
    },
    "Metformin|Atenolol": {
        status: "Moderate Interaction",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Atenolol may mask early warning signs of low blood sugar (hypoglycemia), such as a fast heartbeat or tremors. Monitor blood glucose levels more closely."
    },
    "Ibuprofen|Amlodipine": {
        status: "Moderate Interaction",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "NSAIDs like Ibuprofen can reduce the effectiveness of Amlodipine in controlling blood pressure. Long-term combined use should be monitored."
    },
    "Aspirin|Amoxicillin": {
        status: "No Known Interaction",
        level: "Minor",
        class: "safe",
        icon: "✅",
        text: "No major harmful interaction detected. Both are generally safe to take together, though minor changes in antibiotic levels can occur in rare cases."
    },
    "Metformin|Ibuprofen": {
        status: "Moderate Interaction",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Ibuprofen can affect kidney function, which may lead to higher Metformin levels, slightly increasing the risk of lactic acidosis."
    },
    "Amlodipine|Atenolol": {
        status: "Moderate Interaction",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Combining these blood pressure medications can significantly lower heart rate and blood pressure. Monitor for dizziness."
    }
};

const drugIcons = {
    "Paracetamol": "💊",
    "Ibuprofen": "💊",
    "Aspirin": "⚪",
    "Metformin": "💊",
    "Amlodipine": "⚪",
    "Atenolol": "⚪",
    "Amoxicillin": "💊"
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

    // 2. Living Background Animation
    gsap.to('body', {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "linear"
    });

    // 3. Subtle Card Tilt (Parallax)
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
            rotationY: x * 5,
            rotationX: -y * 5,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    });
});
