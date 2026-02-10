const interactions = {
  "Paracetamol|Ibuprofen": { status: "Needs Caution", level: "Medium", class: "caution", icon: "⚠️", text: "Stomach and liver strain if overused. Avoid long-term combined use." },
  "Ibuprofen|Aspirin": { status: "Dangerous", level: "High", class: "danger", icon: "❌", text: "High risk of stomach bleeding. Do NOT take together without doctor advice." },
  "Metformin|Atenolol": { status: "Needs Caution", level: "Medium", class: "caution", icon: "⚠️", text: "Atenolol may hide low blood sugar symptoms. Monitor glucose." },
  "Ibuprofen|Amlodipine": { status: "Needs Caution", level: "Medium", class: "caution", icon: "⚠️", text: "May reduce BP control. Monitor blood pressure." },
  "Aspirin|Amoxicillin": { status: "Needs Caution", level: "Medium", class: "caution", icon: "⚠️", text: "Increased bleeding tendency. Inform doctor." }
};

function checkInteraction() {
  const a = document.getElementById("drugA").value;
  const b = document.getElementById("drugB").value;
  const output = document.getElementById("output");

  if (!a || !b || a === b) {
    output.innerHTML = '<div class="card">Please select two different medicines.</div>';
    return;
  }

  const key1 = `${a}|${b}`;
  const key2 = `${b}|${a}`;
  const data = interactions[key1] || interactions[key2];

  if (!data) {
    output.innerHTML = `
      <div class="result safe">
        <div class="icon">✅</div>
        <strong>Status:</strong> Safe<br>
        <strong>Risk Level:</strong> Low<br><br>
        No known harmful interaction for most users.
      </div>`;
  } else {
    output.innerHTML = `
      <div class="result ${data.class}">
        <div class="icon">${data.icon}</div>
        <strong>Status:</strong> ${data.status}<br>
        <strong>Risk Level:</strong> ${data.level}<br><br>
        ${data.text}
      </div>`;
  }
}
