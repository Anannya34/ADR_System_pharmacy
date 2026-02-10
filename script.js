const interactions = {
    "Paracetamol|Ibuprofen": {
        status: "Moderate (Monitor)",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Combined use for a short time is usually safe. However, regular long-term use can increase the risk of stomach irritation and kidney strain. Use the lowest effective dose for the shortest time."
    },
    "Ibuprofen|Aspirin": {
        status: "Major (Avoid)",
        level: "Major",
        class: "danger",
        icon: "❌",
        text: "Ibuprofen can interfere with the blood-thinning effects of low-dose aspirin, making it less effective for heart protection. Combined use also significantly increases the risk of serious stomach bleeding."
    },
    "Metformin|Atenolol": {
        status: "Moderate (Monitor)",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Atenolol may mask early warning signs of low blood sugar (hypoglycemia), such as a fast heartbeat or tremors. Monitor blood glucose levels more closely."
    },
    "Ibuprofen|Amlodipine": {
        status: "Moderate (Monitor)",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "NSAIDs like Ibuprofen can reduce the effectiveness of Amlodipine in controlling blood pressure. Long-term combined use should be monitored by a healthcare professional."
    },
    "Aspirin|Amoxicillin": {
        status: "Minor (Inform)",
        level: "Minor",
        class: "safe",
        icon: "✅",
        text: "No major harmful interaction detected. Both are generally safe to take together, though minor changes in bleeding time or antibiotic levels can occur in rare cases."
    },
    "Metformin|Ibuprofen": {
        status: "Moderate (Monitor)",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Ibuprofen can affect kidney function, which may lead to higher Metformin levels, slightly increasing the risk of lactic acidosis. Monitor kidney health."
    },
    "Amlodipine|Atenolol": {
        status: "Moderate (Monitor)",
        level: "Moderate",
        class: "caution",
        icon: "⚠️",
        text: "Combining these blood pressure medications can significantly lower heart rate and blood pressure. Monitor for dizziness or a very slow pulse."
    }
};

function checkInteraction() {
    const a = document.getElementById("drugA").value;
    const b = document.getElementById("drugB").value;
    const output = document.getElementById("output");

    if (!a || !b || a === b) {
        output.innerHTML = `
      <div class="result caution">
        <div class="icon">ℹ️</div>
        <div class="result-content">
          <div class="result-header">
            <strong>Action Required</strong>
            <span class="status-badge">Selection Incomplete</span>
          </div>
          Please select two different medicines to analyze their interactions.
        </div>
      </div>`;
        return;
    }

    // Visual feedback: clear current result while "checking"
    output.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 20px;">Analyzing chemical interactions...</div>';

    setTimeout(() => {
        const key1 = `${a}|${b}`;
        const key2 = `${b}|${a}`;
        const data = interactions[key1] || interactions[key2];

        if (!data) {
            output.innerHTML = `
        <div class="result safe" id="interactionResult">
          <div class="icon">✅</div>
          <div class="result-content">
            <div class="result-header">
              <strong>General Safety</strong>
              <span class="status-badge">Low Risk</span>
            </div>
            No known harmful interactions identified between <strong>${a}</strong> and <strong>${b}</strong> for most individuals.
          </div>
        </div>`;
        } else {
            output.innerHTML = `
        <div class="result ${data.class}" id="interactionResult">
          <div class="icon">${data.icon}</div>
          <div class="result-content">
            <div class="result-header">
              <strong>${data.status}</strong>
              <span class="status-badge">${data.level} Risk</span>
            </div>
            ${data.text}
          </div>
        </div>`;
        }

        // GSAP Entrance Animation for the result
        gsap.from('#interactionResult', {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.8,
            ease: "back.out(1.7)"
        });

    }, 400); // 400ms delay for perceived value
}

// Phase 8: Modern Interactivity Enhancements
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    const card = document.querySelector('.card');

    // 1. Magnetic Button Effect
    document.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);

        if (distance < 100) {
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.6,
                ease: "power2.out"
            });
        } else {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        }
    });

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
