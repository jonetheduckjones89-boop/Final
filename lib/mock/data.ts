
export const SAMPLE_RESULTS = {
  jobId: "job_abc123",
  filename: "clinic-visit-2025-11-01.pdf",
  uploadedAt: "2025-12-05T08:21:00Z",
  summary: "58-year-old male presenting with chest pain. The patient describes the pain as a pressure-like sensation in the center of the chest, radiating to the left arm and jaw. Onset was approximately 2 hours ago while gardening. He reports associated shortness of breath and diaphoresis. No nausea or vomiting. Past medical history is significant for hypertension and hyperlipidemia. He is a former smoker (quit 10 years ago). Vital signs show elevated BP (160/95) and tachycardia (HR 105). EKG shows ST depression in leads V4-V6.",
  topActions: [
    { id: "a1", title: "Order troponin tests", priority: "Critical", details: "Obtain troponin I and repeat in 3 hrs to rule out NSTEMI.", effort: "Low" },
    { id: "a2", title: "Schedule follow-up with cardiology", priority: "High", details: "Refer within 72 hours for stress testing or angiogram.", effort: "Medium" },
    { id: "a3", title: "Administer Aspirin", priority: "High", details: "Give 325mg Aspirin immediately if not already taken.", effort: "Low" },
    { id: "a4", title: "Monitor Vitals", priority: "Medium", details: "Check BP and HR every 15 minutes.", effort: "Medium" }
  ],
  patientDetails: {
    name: "John Doe",
    dob: "1967-03-15",
    encounterDates: ["2025-11-01"],
    medications: ["Aspirin 81mg daily", "Lisinopril 10mg"],
    diagnoses: ["Unspecified chest pain", "Hypertension", "Hyperlipidemia"],
    labs: [
      { name: "Troponin I", value: "0.04", unit: "ng/mL", normalRange: "0.00-0.04" },
      { name: "Creatinine", value: "1.1", unit: "mg/dL", normalRange: "0.7-1.3" }
    ],
    attending: "Dr. Sarah Lee"
  },
  riskFlags: [
    { id: "r1", severity: "Critical", message: "Missing allergy list" },
    { id: "r2", severity: "High", message: "Conflicting medication doses (Lisinopril)" },
    { id: "r3", severity: "Medium", message: "BP elevated compared to baseline" }
  ],
  suggestions: [
    "Add allergy history to the intake form",
    "Clarify medication dosage times for Lisinopril",
    "Document response to nitroglycerin if administered"
  ],
  stats: {
    wordCount: 1450,
    sections: 7,
    readingScore: 38.5,
    confidence: 0.87
  }
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_CHATS = [
  {
    reply: "The most urgent issue is the missing allergy list; recommend contacting patient for allergy history. The troponin level is borderline; repeat and correlate clinically.",
    sources: ["page 2, paragraph 3", "lab report"]
  },
  {
    reply: "Based on the guidelines, a cardiology consultation is recommended within 72 hours given the EKG changes and risk factors.",
    sources: ["clinical guidelines", "page 1, assessment"]
  }
];
