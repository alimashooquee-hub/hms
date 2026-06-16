/**
 * MediFlow - Medical Records Management System
 * Core Javascript Application File
 */

// ==========================================================================
// STATE MANAGEMENT & DB INITIALIZATION
// ==========================================================================
const MOCK_PATIENTS = [
  {
    id: "PAT-2026-0001",
    name: "Rahul Sharma",
    dob: "1998-05-14",
    gender: "Male",
    phone: "9876543210",
    email: "rahul.sharma@example.com",
    bloodGroup: "O+",
    emergencyContact: "Priya Sharma (Wife)",
    address: "123 Green Avenue, New Delhi, Delhi - 110001",
    history: "Penicillin allergy, mild asthma in childhood",
    joinedDate: "2026-06-10"
  },
  {
    id: "PAT-2026-0002",
    name: "Priya Patel",
    dob: "1992-11-23",
    gender: "Female",
    phone: "8765432109",
    email: "priya.patel@example.com",
    bloodGroup: "B+",
    emergencyContact: "Ramesh Patel (Father)",
    address: "Flat 405, Heights Residency, Mumbai, MH - 400001",
    history: "None reported",
    joinedDate: "2026-06-12"
  },
  {
    id: "PAT-2026-0003",
    name: "Amit Verma",
    dob: "1981-08-05",
    gender: "Male",
    phone: "7654321098",
    email: "amit.verma@example.com",
    bloodGroup: "A-",
    emergencyContact: "Suman Verma (Wife)",
    address: "Plot 12, Sector 15, Noida, UP - 201301",
    history: "Hypertension (controlled), Dust allergy",
    joinedDate: "2026-06-14"
  }
];

const MOCK_RECORDS = [
  {
    id: "REC-2026-1001",
    patientId: "PAT-2026-0001",
    type: "Regular Checkup",
    doctor: "Dr. Rajesh Kumar",
    date: "2026-06-15T10:30:00",
    bp: "120/80",
    pulse: "72",
    temp: "98.6",
    diagnosis: "Acute allergic rhinitis",
    prescription: "Tab Cetirizine 10mg OD x 5 days\nNasal Fluticasone spray 1 puff BD x 10 days",
    notes: "Patient complained of seasonal sneezing and runny nose. Clear lungs on auscultation. Advised to avoid pollen exposure."
  },
  {
    id: "REC-2026-1002",
    patientId: "PAT-2026-0001",
    type: "Specialist Follow-up",
    doctor: "Dr. Rajesh Kumar",
    date: "2026-06-11T14:15:00",
    bp: "135/88",
    pulse: "78",
    temp: "97.9",
    diagnosis: "Mild gastritis",
    prescription: "Cap Pantoprazole 40mg OD AC x 14 days\nSyp Sucralfate 10ml TDS PC x 7 days",
    notes: "Follow-up regarding acid reflux. Advised dietary modifications: avoid spicy foods, maintain caffeine constraints."
  },
  {
    id: "REC-2026-1003",
    patientId: "PAT-2026-0002",
    type: "Diagnostic Review",
    doctor: "Dr. Rajesh Kumar",
    date: "2026-06-13T09:00:00",
    bp: "110/70",
    pulse: "64",
    temp: "98.4",
    diagnosis: "Routine health screening",
    prescription: "Tab Multivitamin OD x 30 days",
    notes: "Annual physical review. Blood profiles are entirely normal. Patient active in jogging and sports."
  }
];

const MOCK_ACTIVITIES = [
  { text: "System database initialized with mock data", time: "2026-06-16T00:00:00" },
  { text: "Patient <strong>Amit Verma (PAT-2026-0003)</strong> registered by administrative officer", time: "2026-06-14T15:30:00" },
  { text: "Medical encounter record added for <strong>Priya Patel (PAT-2026-0002)</strong>", time: "2026-06-13T10:45:00" },
  { text: "Patient <strong>Priya Patel (PAT-2026-0002)</strong> registered by administrative officer", time: "2026-06-12T11:20:00" }
];

// App Local Database state variables
let patients = [];
let medicalRecords = [];
let activityLogs = [];
let selectedPatientId = null;
let users = [];
// Pagination state
let currentPage = 1;
const patientsPerPage = 5;

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================
function getDb(key, defaultData) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultData;
}

function saveDb(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Push toast alert
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === "success" ? "check-circle" : "alert-triangle";
  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  lucide.createIcons();
  
  // Slide auto remove
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 200);
  }, 4000);
}

function calculateAge(dobString) {
  if (!dobString) return "N/A";
  const birthDate = new Date(dobString);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDateTime(dateTimeStr) {
  const dateObj = new Date(dateTimeStr);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function logActivity(text) {
  const time = new Date().toISOString();
  activityLogs.unshift({ text, time });
  saveDb("mrms_activities", activityLogs);
  renderDashboardActivities();
}

// ==========================================================================
// ROUTER & NAVIGATION CONTROLLER
// ==========================================================================
function switchView(viewName) {
  // Hide all sections
  document.querySelectorAll(".app-view").forEach(section => {
    section.classList.remove("active");
  });
  
  // Show target section
  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) {
    targetSection.classList.add("active");
  }
  
  // Update sidebar active status
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-view") === viewName) {
      item.classList.add("active");
    }
  });

  // Dynamic headings
  const title = document.getElementById("current-view-title");
  const subtitle = document.getElementById("current-view-subtitle");
  
  switch (viewName) {
    case "dashboard":
      title.textContent = "Clinical Dashboard";
      subtitle.textContent = "Overview of current operations";
      renderDashboardStats();
      renderDashboardActivities();
      break;
    case "patients":
      title.textContent = "Patient Directory";
      subtitle.textContent = "Manage clinical and demographic patient list";
      currentPage = 1;
      renderPatientsTable();
      break;
    case "register":
      title.textContent = "Patient Registration";
      subtitle.textContent = "Add a new patient details profile";
      document.getElementById("patient-registration-form").reset();
      clearFormErrors("patient-registration-form");
      break;
    case "records":
      title.textContent = "Medical Records Terminal";
      subtitle.textContent = "Patient clinical encounter history";
      renderMedicalRecordsView();
      break;
  }
  
  // Re-generate icons
  lucide.createIcons();
}

// Clear input validation classes
function clearFormErrors(formId) {
  const form = document.getElementById(formId);
  form.querySelectorAll(".form-group").forEach(group => {
    group.classList.remove("invalid");
  });
}

// ==========================================================================
// MODULE: LOGIN & AUTH SESSION
// ==========================================================================
function handleLogin(e) {
  e.preventDefault();
  
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const authCard = document.querySelector(".auth-card");
  
  let valid = true;
  
  // Reset errors
  document.getElementById("username-error").style.display = "none";
  document.getElementById("password-error").style.display = "none";
  usernameInput.closest(".input-group").classList.remove("invalid");
  passwordInput.closest(".input-group").classList.remove("invalid");
  
  if (!usernameInput.value.trim()) {
    usernameInput.closest(".input-group").classList.add("invalid");
    document.getElementById("username-error").style.display = "block";
    valid = false;
  }
  
  if (!passwordInput.value.trim()) {
    passwordInput.closest(".input-group").classList.add("invalid");
    document.getElementById("password-error").style.display = "block";
    valid = false;
  }
  
  if (!valid) return;
  
  // Verify credentials (admin/admin or registered users)
  const users = getDb("mrms_users", []);
  const isAdmin = usernameInput.value.trim() === "admin" && passwordInput.value.trim() === "admin";
  const matchedUser = users.find(u => u.username === usernameInput.value.trim() && u.password === passwordInput.value.trim());

  if (isAdmin || matchedUser) {
    // Save session state
    localStorage.setItem("mrms_session", "active");
    // UI transitions
    document.getElementById("auth-view").classList.remove("active");
    document.getElementById("app-shell").classList.add("active");
    const userDisplay = isAdmin ? "Dr. Rajesh Kumar" : matchedUser.name;
    showToast("Session authenticated successfully.", "success");
    logActivity(`User <strong>${userDisplay}</strong> signed in to terminal`);
    switchView("dashboard");
  } else {
    // Shake animation error
    authCard.classList.add("shake");
    showToast("Invalid security credentials. Access Denied.", "danger");
    setTimeout(() => authCard.classList.remove("shake"), 400);
  }
}
function showSignup() {
  const modal = document.getElementById("signup-modal");
  modal.classList.add("active");
  const form = document.getElementById("signup-auth-form");
  form.reset();
  if (typeof clearFormErrors === "function") clearFormErrors("signup-auth-form");
}

function showLogin() {
  // Hide signup modal and ensure login view is visible
  document.getElementById("signup-modal").classList.remove("active");
  // Show auth view (login form)
  document.getElementById("auth-view").classList.add("active");
}

function handleSignup(e) {
  e.preventDefault();
  const fields = [
    { id: "signup-fullname", errorId: "signup-fullname-error", rule: val => val.trim().length >= 3 },
    { id: "signup-username", errorId: "signup-username-error", rule: val => val.trim().length >= 3 },
    { id: "signup-email", errorId: "signup-email-error", rule: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { id: "signup-dob", errorId: "signup-dob-error", rule: val => val.trim() !== "" },
    { id: "signup-password", errorId: "signup-password-error", rule: val => val.trim().length >= 6 },
    { id: "signup-confirm-password", errorId: "signup-confirm-error", rule: val => val === document.getElementById("signup-password").value },
    { id: "signup-role", errorId: "signup-role-error", rule: val => val !== "" }
  ];
  let valid = true;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errorId);
    const group = el.closest(".form-group");
    const isValid = f.rule(el.value);
    if (!isValid) {
      group.classList.add("invalid");
      err.style.display = "block";
      valid = false;
    } else {
      group.classList.remove("invalid");
      err.style.display = "none";
    }
  });
  if (!valid) {
    showToast("Please correct the highlighted fields.", "danger");
    return;
  }
  const users = getDb("mrms_users", []);
  const username = document.getElementById("signup-username").value.trim();
  if (users.find(u => u.username === username)) {
    showToast("Username already exists.", "danger");
    return;
  }
  const newUser = {
    name: document.getElementById("signup-fullname").value.trim(),
    username,
    email: document.getElementById("signup-email").value.trim(),
    dob: document.getElementById("signup-dob").value,
    password: document.getElementById("signup-password").value,
    role: document.getElementById("signup-role").value
  };
  users.push(newUser);
  saveDb("mrms_users", users);
  showToast("Account created successfully. Please log in.", "success");
  document.getElementById("signup-auth-form").reset();
  document.getElementById("signup-modal").classList.remove("active");
  showLogin();
}


function handleLogout() {
  if (confirm("Are you sure you want to end this clinical session?")) {
    localStorage.removeItem("mrms_session");
    document.getElementById("app-shell").classList.remove("active");
    document.getElementById("auth-view").classList.add("active");
    document.getElementById("login-form").reset();
    showToast("Session closed.", "success");
  }
}

// ==========================================================================
// MODULE: DASHBOARD RENDERS
// ==========================================================================
function renderDashboardStats() {
  document.getElementById("stat-total-patients").textContent = patients.length;
  document.getElementById("stat-total-records").textContent = medicalRecords.length;
  
  // Calculate today encounters
  const todayStr = new Date().toDateString();
  const todayVisits = medicalRecords.filter(rec => {
    return new Date(rec.date).toDateString() === todayStr;
  }).length;
  
  document.getElementById("stat-today-visits").textContent = todayVisits;
}

function renderDashboardActivities() {
  const container = document.getElementById("dashboard-activity-list");
  if (activityLogs.length === 0) {
    container.innerHTML = `
      <div class="activity-empty">
        <i data-lucide="inbox"></i>
        <p>No recent activities found.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = activityLogs.slice(0, 5).map(act => `
    <div class="activity-item">
      <div class="activity-icon-node">
        <i data-lucide="activity"></i>
      </div>
      <div class="activity-details">
        <span class="activity-text">${act.text}</span>
        <div class="activity-meta">
          <span class="activity-time">${formatDateTime(act.time)}</span>
        </div>
      </div>
    </div>
  `).join("");
  
  lucide.createIcons();
}

// ==========================================================================
// MODULE: PATIENT REGISTRATION
// ==========================================================================
function handlePatientRegistration(e) {
  e.preventDefault();
  
  const fields = [
    { id: "reg-name", errorId: "reg-name-error", rule: val => val.trim().length >= 3 },
    { id: "reg-dob", errorId: "reg-dob-error", rule: val => val !== "" && new Date(val) <= new Date() },
    { id: "reg-gender", errorId: "reg-gender-error", rule: val => val !== "" },
    { id: "reg-phone", errorId: "reg-phone-error", rule: val => /^\d{10}$/.test(val.trim()) },
    { id: "reg-blood", errorId: "reg-blood-error", rule: val => val !== "" }
  ];
  
  let valid = true;
  
  fields.forEach(field => {
    const el = document.getElementById(field.id);
    const errorEl = document.getElementById(field.errorId);
    const value = el.value;
    const group = el.closest(".form-group");
    
    if (!field.rule(value)) {
      group.classList.add("invalid");
      errorEl.style.display = "block";
      valid = false;
    } else {
      group.classList.remove("invalid");
      errorEl.style.display = "none";
    }
  });
  
  if (!valid) {
    showToast("Please correct invalid registration fields", "danger");
    return;
  }
  
  // Generate sequence-based counter
  const patientCounter = patients.length + 1;
  const padNum = String(patientCounter).padStart(4, "0");
  const generatedId = `PAT-2026-${padNum}`;
  
  const newPatient = {
    id: generatedId,
    name: document.getElementById("reg-name").value.trim(),
    dob: document.getElementById("reg-dob").value,
    gender: document.getElementById("reg-gender").value,
    phone: document.getElementById("reg-phone").value.trim(),
    email: document.getElementById("reg-email").value.trim() || "N/A",
    bloodGroup: document.getElementById("reg-blood").value,
    emergencyContact: document.getElementById("reg-emergency-name").value.trim() || "None",
    address: document.getElementById("reg-address").value.trim() || "None provided",
    history: document.getElementById("reg-history").value.trim() || "None reported",
    joinedDate: new Date().toISOString().split("T")[0]
  };
  
  patients.push(newPatient);
  saveDb("mrms_patients", patients);
  
  logActivity(`Registered new patient: <strong>${newPatient.name} (${newPatient.id})</strong>`);
  showToast(`Patient ${newPatient.name} registered successfully. ID: ${newPatient.id}`, "success");
  
  document.getElementById("patient-registration-form").reset();
  
  // Navigate to list view
  switchView("patients");
}

// ==========================================================================
// MODULE: PATIENT LIST, SEARCH & FILTRATION
// ==========================================================================
function renderPatientsTable() {
  const tbody = document.getElementById("patients-table-body");
  const searchQuery = document.getElementById("patient-search-input").value.toLowerCase();
  const selectedBlood = document.getElementById("filter-blood-group").value;
  
  // Filter core array
  const filtered = patients.filter(pat => {
    const matchesSearch = pat.name.toLowerCase().includes(searchQuery) ||
                          pat.id.toLowerCase().includes(searchQuery) ||
                          pat.phone.includes(searchQuery);
                          
    const matchesBlood = selectedBlood === "" || pat.bloodGroup === selectedBlood;
    
    return matchesSearch && matchesBlood;
  });
  
  // Pagination indexes
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / patientsPerPage) || 1;
  
  if (currentPage > totalPages) currentPage = totalPages;
  
  const startIdx = (currentPage - 1) * patientsPerPage;
  const endIdx = Math.min(startIdx + patientsPerPage, totalItems);
  
  // Slice rendering page
  const pageItems = filtered.slice(startIdx, endIdx);
  
  if (totalItems === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">
          No matching patient records found.
        </td>
      </tr>
    `;
    document.getElementById("pagination-text").textContent = "Showing 0 of 0 patients";
    document.getElementById("btn-prev-page").disabled = true;
    document.getElementById("btn-next-page").disabled = true;
    return;
  }
  
  tbody.innerHTML = pageItems.map(pat => {
    const initials = pat.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    return `
      <tr>
        <td><strong class="pid-tag">${pat.id}</strong></td>
        <td>
          <div class="patient-info-cell">
            <div class="patient-avatar-small">${initials}</div>
            <div class="patient-name-block">
              <span class="p-name-txt">${pat.name}</span>
              <span class="p-id-txt">${pat.email}</span>
            </div>
          </div>
        </td>
        <td>${calculateAge(pat.dob)} / ${pat.gender}</td>
        <td>${pat.phone}</td>
        <td><span class="blood-pill">${pat.bloodGroup}</span></td>
        <td>${pat.joinedDate}</td>
        <td>
          <div class="action-buttons-cell">
            <button class="action-icon-btn primary" title="View Medical Timeline" onclick="viewPatientRecords('${pat.id}')">
              <i data-lucide="folder-heart"></i>
            </button>
            <button class="action-icon-btn primary" title="Add Consultation Record" onclick="openAddRecordForPatient('${pat.id}')">
              <i data-lucide="file-plus-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
  
  // Update pagination footer
  document.getElementById("pagination-text").textContent = `Showing ${startIdx + 1}-${endIdx} of ${totalItems} patients`;
  document.getElementById("btn-prev-page").disabled = currentPage === 1;
  document.getElementById("btn-next-page").disabled = currentPage === totalPages;
  
  lucide.createIcons();
}

// Navigation links from within list
window.viewPatientRecords = function(patientId) {
  selectedPatientId = patientId;
  switchView("records");
};

window.openAddRecordForPatient = function(patientId) {
  selectedPatientId = patientId;
  openRecordModal();
};

// ==========================================================================
// MODULE: MEDICAL RECORDS & CLINICAL ENCOUNTERS
// ==========================================================================
function renderMedicalRecordsView() {
  const patient = patients.find(p => p.id === selectedPatientId);
  if (!patient) {
    showToast("Invalid patient profile ID", "danger");
    switchView("patients");
    return;
  }
  
  // Set patient detail banners
  const initials = patient.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  document.getElementById("record-avatar").textContent = initials;
  document.getElementById("record-patient-name").textContent = patient.name;
  document.getElementById("record-patient-id").textContent = patient.id;
  document.getElementById("record-patient-age-gender").textContent = `${patient.gender}, ${calculateAge(patient.dob)} yrs`;
  document.getElementById("record-patient-contact").textContent = patient.phone;
  document.getElementById("record-patient-blood").textContent = patient.bloodGroup;
  document.getElementById("record-patient-notes").textContent = patient.history;
  
  // Fetch encounters
  const timeline = document.getElementById("clinical-records-timeline");
  const filteredRecords = medicalRecords
    .filter(rec => rec.patientId === selectedPatientId)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // descending dates
    
  if (filteredRecords.length === 0) {
    timeline.innerHTML = `
      <div class="records-empty">
        <i data-lucide="clipboard-x"></i>
        <p>No clinical encounters recorded yet for this patient profile.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  timeline.innerHTML = filteredRecords.map(rec => `
    <div class="timeline-card">
      <div class="timeline-card-header">
        <div class="timeline-title-area">
          <h6>${rec.type}</h6>
          <span class="badge">${rec.type.includes("Emergency") ? "Critical" : "Standard"}</span>
        </div>
        <div class="timeline-meta-area">
          <div><i data-lucide="user"></i> <span>${rec.doctor}</span></div>
          <div><i data-lucide="clock"></i> <span>${formatDateTime(rec.date)}</span></div>
        </div>
      </div>
      <div class="timeline-card-body">
        <!-- Vitals summaries -->
        ${(rec.bp || rec.pulse || rec.temp) ? `
          <div class="vitals-summary-bar">
            ${rec.bp ? `<div class="vital-tag"><i data-lucide="heart-pulse"></i> <span>BP: <strong>${rec.bp}</strong> mmHg</span></div>` : ''}
            ${rec.pulse ? `<div class="vital-tag"><i data-lucide="activity"></i> <span>Pulse: <strong>${rec.pulse}</strong> bpm</span></div>` : ''}
            ${rec.temp ? `<div class="vital-tag"><i data-lucide="thermometer"></i> <span>Temp: <strong>${rec.temp}</strong> °F</span></div>` : ''}
          </div>
        ` : ''}
        
        <!-- Clinical Diagnosis -->
        <div class="timeline-section-block">
          <span class="section-title-lbl">Assessment & Diagnosis</span>
          <p class="section-content-txt">${rec.diagnosis}</p>
        </div>
        
        <!-- Prescriptions -->
        ${rec.prescription ? `
          <div class="timeline-section-block">
            <span class="section-title-lbl">Prescriptions & Dosages</span>
            <p class="section-content-txt" style="white-space: pre-line;">${rec.prescription}</p>
          </div>
        ` : ''}
        
        <!-- Notes -->
        ${rec.notes ? `
          <div class="timeline-section-block">
            <span class="section-title-lbl">Physician Directives / Progress Notes</span>
            <p class="section-content-txt">${rec.notes}</p>
          </div>
        ` : ''}
      </div>
    </div>
  `).join("");
  
  lucide.createIcons();
}

function handleAddMedicalRecord(e) {
  e.preventDefault();
  
  const diagnosisInput = document.getElementById("rec-diagnosis");
  let valid = true;
  
  if (!diagnosisInput.value.trim()) {
    diagnosisInput.closest(".form-group").classList.add("invalid");
    document.getElementById("rec-diagnosis-error").style.display = "block";
    valid = false;
  } else {
    diagnosisInput.closest(".form-group").classList.remove("invalid");
    document.getElementById("rec-diagnosis-error").style.display = "none";
  }
  
  if (!valid) return;
  
  const patient = patients.find(p => p.id === selectedPatientId);
  
  const recordCounter = medicalRecords.length + 1;
  const newRecord = {
    id: `REC-2026-${1000 + recordCounter}`,
    patientId: selectedPatientId,
    type: document.getElementById("rec-type").value,
    doctor: document.getElementById("rec-doctor").value || "Dr. Rajesh Kumar",
    date: new Date().toISOString(),
    bp: document.getElementById("rec-bp").value.trim() || null,
    pulse: document.getElementById("rec-pulse").value || null,
    temp: document.getElementById("rec-temp").value.trim() || null,
    diagnosis: diagnosisInput.value.trim(),
    prescription: document.getElementById("rec-prescription").value.trim() || null,
    notes: document.getElementById("rec-notes").value.trim() || null
  };
  
  medicalRecords.push(newRecord);
  saveDb("mrms_records", medicalRecords);
  
  logActivity(`Encounter record (<strong>${newRecord.type}</strong>) added to <strong>${patient.name}</strong>`);
  showToast(`Medical record added successfully`, "success");
  
  closeRecordModal();
  renderMedicalRecordsView();
}

// Modal Toggle Hooks
function openRecordModal() {
  document.getElementById("add-record-modal").classList.add("active");
  document.getElementById("add-record-form").reset();
  document.getElementById("rec-doctor").value = "Dr. Rajesh Kumar";
  clearFormErrors("add-record-form");
}

function closeRecordModal() {
  document.getElementById("add-record-modal").classList.remove("active");
}

// ==========================================================================
// BOOTSTRAP INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup Mock DB or fetch local
  patients = getDb("mrms_patients", MOCK_PATIENTS);
  medicalRecords = getDb("mrms_records", MOCK_RECORDS);
  activityLogs = getDb("mrms_activities", MOCK_ACTIVITIES);
users = getDb("mrms_users", []);
  
  // Write initial databases back if first time
  if (!localStorage.getItem("mrms_patients")) saveDb("mrms_patients", patients);
  if (!localStorage.getItem("mrms_records")) saveDb("mrms_records", medicalRecords);
  if (!localStorage.getItem("mrms_activities")) saveDb("mrms_activities", activityLogs);
if (!localStorage.getItem("mrms_users")) saveDb("mrms_users", users);
  
  // Set Date display
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("current-date-display").textContent = new Date().toLocaleDateString("en-US", options);
  
  // 2. Auth Session Check
  const activeSession = localStorage.getItem("mrms_session");
  if (activeSession === "active") {
    document.getElementById("auth-view").classList.remove("active");
    document.getElementById("app-shell").classList.add("active");
    switchView("dashboard");
  } else {
    document.getElementById("auth-view").classList.add("active");
    document.getElementById("app-shell").classList.remove("active");
  }
  
  // 3. Setup Listeners
  // Nav tabs routing
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = item.getAttribute("data-view");
      switchView(targetView);
    });
  });
  
  // Login triggers
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("btn-logout").addEventListener("click", handleLogout);
  // Signup button and link handlers
  const signupBtn = document.getElementById("btn-show-signup");
  if (signupBtn) signupBtn.addEventListener("click", showSignup);
  const signupLink = document.getElementById("link-to-signup");
  if (signupLink) signupLink.addEventListener("click", (e) => { e.preventDefault(); showSignup(); });
  const linkToLogin = document.getElementById("link-to-login");
  if (linkToLogin) linkToLogin.addEventListener("click", (e) => { e.preventDefault(); showLogin(); });

  // Close and cancel buttons for signup modal
  const closeSignupBtn = document.getElementById("btn-close-signup-modal");
  if (closeSignupBtn) closeSignupBtn.addEventListener("click", (e) => { e.preventDefault(); showLogin(); });

  const cancelSignupBtn = document.getElementById("btn-cancel-signup");
  if (cancelSignupBtn) cancelSignupBtn.addEventListener("click", (e) => { e.preventDefault(); showLogin(); });

  const signupForm = document.getElementById("signup-auth-form");
  if (signupForm) signupForm.addEventListener("submit", handleSignup);
  
  // Patient Registration trigger
  document.getElementById("patient-registration-form").addEventListener("submit", handlePatientRegistration);
  document.getElementById("btn-cancel-reg").addEventListener("click", () => switchView("patients"));
  
  // Medical records triggers
  document.getElementById("btn-open-record-modal").addEventListener("click", openRecordModal);
  document.getElementById("btn-close-record-modal").addEventListener("click", closeRecordModal);
  document.getElementById("btn-cancel-record").addEventListener("click", closeRecordModal);
  document.getElementById("add-record-form").addEventListener("submit", handleAddMedicalRecord);
  
  // Quick Dashboard Navigation triggers
  document.getElementById("action-quick-register").addEventListener("click", () => switchView("register"));
  document.getElementById("action-quick-search").addEventListener("click", () => switchView("patients"));
  document.getElementById("action-quick-stats").addEventListener("click", () => showToast("Loading custom clinical audit analytics reports...", "success"));
  document.getElementById("btn-go-register").addEventListener("click", () => switchView("register"));
  
  // List Search & filter inputs
  const searchInput = document.getElementById("patient-search-input");
  const filterBlood = document.getElementById("filter-blood-group");
  
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderPatientsTable();
  });
  
  filterBlood.addEventListener("change", () => {
    currentPage = 1;
    renderPatientsTable();
  });
  
  // Global search (top bar header)
  const globalSearch = document.getElementById("global-search-bar");
  globalSearch.addEventListener("input", (e) => {
    const query = e.target.value;
    if (query.trim().length > 0) {
      switchView("patients");
      searchInput.value = query;
      renderPatientsTable();
    }
  });
  
  // Table Pagination click handles
  document.getElementById("btn-prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPatientsTable();
    }
  });
  
  document.getElementById("btn-next-page").addEventListener("click", () => {
    currentPage++;
    renderPatientsTable();
  });
  
  // Initialize Lucide icons on page load
  lucide.createIcons();
});
