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
    joinedDate: "2026-06-10",
    treatmentStatus: "In Consultation",
    queueStatus: "In Consultation"   // FIX: keep queueStatus in sync with treatmentStatus
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
    joinedDate: "2026-06-12",
    treatmentStatus: "Waiting",
    queueStatus: "Waiting"           // FIX: keep queueStatus in sync with treatmentStatus
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
    joinedDate: "2026-06-14",
    treatmentStatus: "Tests Required",
    queueStatus: "Waiting"           // FIX: keep queueStatus in sync with treatmentStatus
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
    notes: "Patient complained of seasonal sneezing and runny nose. Clear lungs on auscultation. Advised to avoid pollen exposure.",
    status: "Treatment Completed"
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
    notes: "Follow-up regarding acid reflux. Advised dietary modifications: avoid spicy foods, maintain caffeine constraints.",
    status: "Treatment Completed"
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
    notes: "Annual physical review. Blood profiles are entirely normal. Patient active in jogging and sports.",
    status: "Treatment Completed"
  }
];

const MOCK_ACTIVITIES = [
  { text: "System database initialized with mock data", time: "2026-06-16T00:00:00" },
  { text: "Patient <strong>Amit Verma (PAT-2026-0003)</strong> registered by administrative officer", time: "2026-06-14T15:30:00" },
  { text: "Medical encounter record added for <strong>Priya Patel (PAT-2026-0002)</strong>", time: "2026-06-13T10:45:00" },
  { text: "Patient <strong>Priya Patel (PAT-2026-0002)</strong> registered by administrative officer", time: "2026-06-12T11:20:00" }
];

const MOCK_DOCTORS = [
  {
    id: "DOC-2026-0001",
    name: "Dr. Rajesh Kumar",
    gender: "Male",
    specialization: "General Physician",
    qualification: "MBBS, MD",
    experience: 15,
    email: "rajesh.kumar@example.com",
    phone: "9876543210",
    username: "rajesh",
    password: "password",
    joiningDate: "2020-01-15",
    status: "Active",
    consultationFee: 1500
  }
];

const MOCK_USERS = [
  {
    userId: "USR-0001",
    fullName: "System Admin",
    username: "admin",
    email: "admin@hospital.com",
    password: "admin",
    role: "Admin"
  },
  {
    userId: "USR-0002",
    fullName: "Dr. Rajesh Kumar",
    username: "rajesh",
    email: "doctor@hospital.com",
    password: "doctor",
    role: "Doctor"
  },
  {
    userId: "USR-0003",
    fullName: "Anita Sharma",
    username: "anita",
    email: "nurse@hospital.com",
    password: "nurse",
    role: "Nurse"
  },
  {
    userId: "USR-0004",
    fullName: "Meena Gupta",
    username: "meena",
    email: "reception@hospital.com",
    password: "reception",
    role: "Receptionist"
  }
];

const MOCK_NURSES = [
  {
    id: "NRS-0001",
    name: "Anita Sharma",
    gender: "Female",
    qualification: "B.Sc Nursing",
    experience: 8,
    email: "anita.sharma@hospital.com",
    phone: "9123456789",
    department: "General Ward",
    joiningDate: "2022-03-10",
    status: "Active"
  }
];

const MOCK_RECEPTIONISTS = [
  {
    id: "REC-0001",
    name: "Meena Gupta",
    gender: "Female",
    qualification: "B.Com",
    experience: 5,
    email: "meena.gupta@hospital.com",
    phone: "9234567890",
    shift: "Morning",
    joiningDate: "2023-01-15",
    status: "Active"
  }
];

const MOCK_APPOINTMENTS = [
  {
    id: "APT-0001",
    patientId: "PAT-2026-0001",
    patientName: "Rahul Sharma",
    doctorName: "Dr. Rajesh Kumar",
    date: "2026-06-18",
    time: "10:00",
    type: "Follow-up",
    status: "Scheduled",
    notes: "Follow-up for allergic rhinitis treatment"
  }
];

// App Local Database state variables
let patients = [];
let medicalRecords = [];
let activityLogs = [];
let selectedPatientId = null;
let users = [];
let doctors = [];
let nurses = [];
let receptionists = [];
let appointments = [];
let currentUser = null;
// Pagination state
let currentPage = 1;
const patientsPerPage = 5;

const ROLE_PERMISSIONS = {
  Admin: ["dashboard", "patients", "register", "doctors", "nurses", "receptionists", "records", "appointments", "revenue", "users", "settings", "access-denied"],
  Doctor: ["dashboard", "patients", "records", "appointments", "access-denied"],
  Nurse: ["dashboard", "patients", "records", "access-denied"],
  Receptionist: ["dashboard", "register", "appointments", "billing", "access-denied"]
};

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================
function getDb(key, fallback) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

function saveDb(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generatePersistentId(prefix) {
  let counter = parseInt(localStorage.getItem(`mrms_counter_${prefix}`) || "0") + 1;
  localStorage.setItem(`mrms_counter_${prefix}`, counter);
  return `${prefix}-${String(counter).padStart(4, "0")}`;
}

// FIX: Unified status badge class resolver — handles all treatment AND queue statuses
function getStatusBadgeClass(status) {
  if (!status) return "status-waiting";
  if (status === "In Consultation" || status === "Active") return "status-consultation";
  if (status === "Tests Required" || status === "Busy") return "status-tests";
  if (status === "Follow-Up Required" || status === "On Leave") return "status-followup";
  if (status === "Treatment Completed" || status === "Checked Out" || status === "Completed") return "status-completed";
  if (status === "Cancelled" || status === "Off Duty") return "status-cancelled";
  return "status-waiting";
}

// Push toast alert
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return; // FIX: null guard
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
  // Check permission
  const role = (currentUser && currentUser.role) ? currentUser.role : "Admin";
  const permissions = ROLE_PERMISSIONS[role] || [];
  
  if (!permissions.includes(viewName)) {
    viewName = "access-denied";
  }

  // Hide all views
  document.querySelectorAll(".app-view").forEach(view => {
    view.classList.remove("active");
  });

  // Show target view
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add("active");
  }

  // Handle specific initializations
  if (viewName === "patients") {
    renderPatientsTable();
  } else if (viewName === "dashboard") {
    renderDashboardStats();
  } else if (viewName === "records") {
    renderMedicalRecordsView();
  } else if (viewName === "doctors") {
    renderDoctorsTable();
  } else if (viewName === "nurses") {
    renderNursesTable();
  } else if (viewName === "receptionists") {
    renderReceptionistsTable();
  } else if (viewName === "appointments") {
    renderAppointmentsTable();
  } else if (viewName === "billing") {
    renderBillingTable();
  } else if (viewName === "revenue") {
    renderRevenueView();
  } else if (viewName === "users") {
    renderUsersTable();
  } else if (viewName === "register") {
    // Populate assigned doctor dropdown
    const regDocSelect = document.getElementById("reg-assigned-doc");
    if (regDocSelect) {
      regDocSelect.innerHTML = '<option value="">Select Doctor</option>' +
        doctors.filter(d => d.status === "Active").map(d => `<option value="${d.name}">${d.name} (${d.specialization})</option>`).join("");
    }
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-view") === viewName) {
      item.classList.add("active");
    }
  });

  // Dynamic headings — FIX: null checks before setting textContent
  const title = document.getElementById("current-view-title");
  const subtitle = document.getElementById("current-view-subtitle");

  switch (viewName) {
    case "dashboard":
      if (title) title.textContent = "Clinical Dashboard";
      if (subtitle) subtitle.textContent = "Overview of current operations";
      renderDashboardStats();
      renderDashboardActivities();
      break;
    case "patients":
      if (title) title.textContent = "Patient Directory";
      if (subtitle) subtitle.textContent = "Manage clinical and demographic patient list";
      currentPage = 1;
      renderPatientsTable();
      break;
    case "register":
      if (title) title.textContent = "Patient Registration";
      if (subtitle) subtitle.textContent = "Add a new patient details profile";
      {
        const regForm = document.getElementById("patient-registration-form");
        if (regForm) { regForm.reset(); clearFormErrors("patient-registration-form"); }
      }
      break;
    case "records":
      if (title) title.textContent = "Medical Records Terminal";
      if (subtitle) subtitle.textContent = "Patient clinical encounter history";
      renderMedicalRecordsView();
      break;
    case "doctors":
      if (title) title.textContent = "Doctors Directory";
      if (subtitle) subtitle.textContent = "Manage clinical staff profiles";
      {
        const docForm = document.getElementById("doctor-form");
        if (docForm) { docForm.reset(); clearFormErrors("doctor-form"); }
      }
      renderDoctorsTable();
      break;
    case "nurses":
      if (title) title.textContent = "Nurses Directory";
      if (subtitle) subtitle.textContent = "Manage nursing staff profiles";
      {
        const nurseForm = document.getElementById("nurse-form");
        if (nurseForm) { nurseForm.reset(); clearFormErrors("nurse-form"); }
      }
      renderNursesTable();
      break;
    case "receptionists":
      if (title) title.textContent = "Receptionists Directory";
      if (subtitle) subtitle.textContent = "Manage administrative receptionist staff";
      {
        const recForm = document.getElementById("receptionist-form");
        if (recForm) { recForm.reset(); clearFormErrors("receptionist-form"); }
      }
      renderReceptionistsTable();
      break;
    case "appointments":
      if (title) title.textContent = "Patient Appointments Scheduling";
      if (subtitle) subtitle.textContent = "Schedule and manage patient encounter slots";
      {
        const aptForm = document.getElementById("appointment-form");
        if (aptForm) { aptForm.reset(); clearFormErrors("appointment-form"); }
      }
      renderAppointmentsTable();
      break;
    case "billing":
      if (title) title.textContent = "Patient Billing & Finance Terminal";
      if (subtitle) subtitle.textContent = "Generate invoices and track consultation payments";
      renderBillingTable();
      break;
    case "revenue":
      if (title) title.textContent = "Revenue Reports & Fee Audits";
      if (subtitle) subtitle.textContent = "Overview of clinical earnings and doctor fee changes";
      renderRevenueView();
      break;
    case "users":
      if (title) title.textContent = "Clinical Users & Accounts Management";
      if (subtitle) subtitle.textContent = "Create, edit, delete, and control user access profiles";
      {
        const userForm = document.getElementById("user-management-form");
        if (userForm) { userForm.reset(); clearFormErrors("user-management-form"); }
      }
      renderUsersTable();
      break;
    case "settings":
      if (title) title.textContent = "System Settings";
      if (subtitle) subtitle.textContent = "Configure hospital details and localized settings";
      break;
    case "access-denied":
      if (title) title.textContent = "Access Denied";
      if (subtitle) subtitle.textContent = "Authorization Error";
      break;
  }

  // Re-generate icons
  lucide.createIcons();
}

// Clear input validation classes
function clearFormErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return; // FIX: null guard
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

  if (!usernameInput || !passwordInput) return; // FIX: null guard

  let valid = true;

  // Reset errors
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  if (usernameError) usernameError.style.display = "none";
  if (passwordError) passwordError.style.display = "none";
  usernameInput.closest(".input-group").classList.remove("invalid");
  passwordInput.closest(".input-group").classList.remove("invalid");

  if (!usernameInput.value.trim()) {
    usernameInput.closest(".input-group").classList.add("invalid");
    if (usernameError) usernameError.style.display = "block";
    valid = false;
  }

  if (!passwordInput.value.trim()) {
    passwordInput.closest(".input-group").classList.add("invalid");
    if (passwordError) passwordError.style.display = "block";
    valid = false;
  }

  if (!valid) return;

  const usernameVal = usernameInput.value.trim();
  const passwordVal = passwordInput.value.trim();

  // Verify credentials
  const storedUsers = getDb("mrms_users", MOCK_USERS);
  const isAdmin = usernameVal === "admin" && passwordVal === "admin";
  
  let matchedUser = storedUsers.find(u => 
    (u.email === usernameVal || u.username === usernameVal) && u.password === passwordVal
  );

  if (isAdmin && !matchedUser) {
    matchedUser = storedUsers.find(u => u.role === "Admin") || { userId: "USR-0001", fullName: "System Admin", email: "admin@hospital.com", role: "Admin" };
  }

  if (matchedUser) {
    // Save session state
    localStorage.setItem("mrms_session", "active");
    localStorage.setItem("mrms_logged_in_user", JSON.stringify(matchedUser));
    currentUser = matchedUser;

    // UI transitions
    const authView = document.getElementById("auth-view");
    const appShell = document.getElementById("app-shell");
    if (authView) authView.classList.remove("active");
    if (appShell) appShell.classList.add("active");
    
    updateSessionUI();
    showToast("Session authenticated successfully.", "success");
    logActivity(`User <strong>${currentUser.fullName} (${currentUser.role})</strong> signed in to terminal`);
    switchView("dashboard");
  } else {
    // Shake animation error
    if (authCard) {
      authCard.classList.add("shake");
      setTimeout(() => authCard.classList.remove("shake"), 400);
    }
    showToast("Invalid security credentials. Access Denied.", "danger");
  }
}

function showSignup() {
  const modal = document.getElementById("signup-modal");
  if (!modal) return; // FIX: null guard
  modal.classList.add("active");
  const form = document.getElementById("signup-auth-form");
  if (form) form.reset();
  clearFormErrors("signup-auth-form");
}

function showLogin() {
  const signupModal = document.getElementById("signup-modal");
  if (signupModal) signupModal.classList.remove("active");
  const authView = document.getElementById("auth-view");
  if (authView) authView.classList.add("active");
}

function handleSignup(e) {
  e.preventDefault();
  const fields = [
    { id: "signup-fullname", errorId: "signup-fullname-error", rule: val => val.trim().length >= 3 },
    { id: "signup-username", errorId: "signup-username-error", rule: val => val.trim().length >= 3 },
    { id: "signup-email", errorId: "signup-email-error", rule: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { id: "signup-dob", errorId: "signup-dob-error", rule: val => val.trim() !== "" },
    { id: "signup-password", errorId: "signup-password-error", rule: val => val.trim().length >= 6 },
    { id: "signup-confirm-password", errorId: "signup-confirm-error", rule: val => { const pw = document.getElementById("signup-password"); return pw && val === pw.value; } },
    { id: "signup-role", errorId: "signup-role-error", rule: val => val !== "" }
  ];
  let valid = true;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errorId);
    if (!el) return;
    const group = el.closest(".form-group");
    const isValid = f.rule(el.value);
    if (!isValid) {
      if (group) group.classList.add("invalid");
      if (err) err.style.display = "block";
      valid = false;
    } else {
      if (group) group.classList.remove("invalid");
      if (err) err.style.display = "none";
    }
  });
  if (!valid) {
    showToast("Please correct the highlighted fields.", "danger");
    return;
  }
  const storedUsers = getDb("mrms_users", MOCK_USERS);
  const usernameEl = document.getElementById("signup-username");
  const username = usernameEl ? usernameEl.value.trim() : "";
  const emailEl = document.getElementById("signup-email");
  const email = emailEl ? emailEl.value.trim() : "";
  if (storedUsers.some(u => u.email === email || u.username === username)) {
    showToast("Username or Email already exists.", "danger");
    return;
  }
  
  const generatedUserId = generatePersistentId("USR");
  const newUser = {
    userId: generatedUserId,
    fullName: (document.getElementById("signup-fullname") || {}).value?.trim() || "",
    username,
    email,
    dob: (document.getElementById("signup-dob") || {}).value || "",
    password: (document.getElementById("signup-password") || {}).value || "",
    role: (document.getElementById("signup-role") || {}).value || "Receptionist"
  };
  storedUsers.push(newUser);
  saveDb("mrms_users", storedUsers);
  users = storedUsers; // Keep sync
  showToast("Account created successfully. Please log in.", "success");
  const signupForm = document.getElementById("signup-auth-form");
  if (signupForm) signupForm.reset();
  showLogin();
}

function updateSessionUI() {
  const sessionActive = localStorage.getItem("mrms_session") === "active";
  if (!sessionActive) {
    currentUser = null;
    return;
  }
  
  const storedUser = localStorage.getItem("mrms_logged_in_user");
  currentUser = storedUser ? JSON.parse(storedUser) : null;
  
  if (!currentUser) return;

  const nameEl = document.getElementById("sidebar-user-name");
  const roleEl = document.getElementById("sidebar-user-role");
  const avatarEl = document.querySelector(".sidebar-footer .user-avatar");
  
  if (nameEl) nameEl.textContent = currentUser.fullName || currentUser.name || "User";
  if (roleEl) roleEl.textContent = currentUser.role || "Clinical Staff";
  if (avatarEl) {
    avatarEl.textContent = (currentUser.fullName || currentUser.name || "US")
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  const dashWelcome = document.getElementById("dashboard-welcome-msg");
  const dashRole = document.getElementById("dashboard-role-msg");
  const dashAvatar = document.getElementById("dashboard-user-avatar");

  if (dashWelcome) dashWelcome.textContent = `Welcome, ${currentUser.fullName || currentUser.name || "User"}`;
  if (dashRole) dashRole.textContent = `Role: ${currentUser.role || "Clinical Staff"}`;
  if (dashAvatar) {
    dashAvatar.textContent = (currentUser.fullName || currentUser.name || "US")
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  const role = currentUser.role || "Admin";
  const permissions = ROLE_PERMISSIONS[role] || [];
  
  document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => {
    const view = item.getAttribute("data-view");
    if (permissions.includes(view)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

window.redirectToHomeDashboard = function() {
  switchView("dashboard");
};


function handleLogout() {
  if (confirm("Are you sure you want to end this clinical session?")) {
    localStorage.removeItem("mrms_session");
    localStorage.removeItem("mrms_logged_in_user");
    currentUser = null;
    const appShell = document.getElementById("app-shell");
    const authView = document.getElementById("auth-view");
    const loginForm = document.getElementById("login-form");
    if (appShell) appShell.classList.remove("active");
    if (authView) authView.classList.add("active");
    if (loginForm) loginForm.reset();
    showToast("Session closed.", "success");
  }
}

// ==========================================================================
// MODULE: DASHBOARD RENDERS
// ==========================================================================
function renderDashboardStats() {
  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  const setCardTitle = (cardId, titleText) => {
    const card = document.getElementById(cardId);
    if (card) {
      const h3 = card.querySelector("h3");
      if (h3) h3.textContent = titleText;
    }
  };

  const showCard = (cardId, show) => {
    const card = document.getElementById(cardId);
    if (card) card.style.display = show ? "flex" : "none";
  };

  const role = currentUser ? currentUser.role : "Admin";

  // Calculate generic properties
  const totalRevenue = patients.reduce((sum, p) => sum + (p.assignedDoctorFee || 0), 0);
  const inConsultationAll = patients.filter(p => p.queueStatus === "In Consultation").length;
  const waitingAll = patients.filter(p => !p.queueStatus || p.queueStatus === "Waiting").length;
  const checkedOutAll = patients.filter(p => p.queueStatus === "Checked Out").length;

  if (role === "Admin") {
    // Show all
    showCard("card-total-patients", true);
    setCardTitle("card-total-patients", "Total Patients");
    setEl("stat-total-patients", patients.length);

    showCard("card-in-consultation", true);
    setCardTitle("card-in-consultation", "Patients In Consultation");
    setEl("stat-in-consultation", inConsultationAll);

    showCard("card-checked-out", true);
    setCardTitle("card-checked-out", "Checked-Out Patients");
    setEl("stat-checked-out", checkedOutAll);

    showCard("card-total-doctors", true);
    setCardTitle("card-total-doctors", "Total Doctors");
    setEl("stat-total-doctors", doctors.length);

    showCard("card-waiting-patients", true);
    setCardTitle("card-waiting-patients", "Waiting Patients");
    setEl("stat-waiting-queue", waitingAll);

    showCard("card-total-revenue", true);
    setEl("stat-total-revenue", `₹${totalRevenue}`);
  } 
  else if (role === "Doctor") {
    const docName = currentUser.fullName || currentUser.name || "";
    const ownPatients = patients.filter(p => p.assignedDoctor === docName);
    const docConsultation = ownPatients.filter(p => p.queueStatus === "In Consultation").length;
    const docWaiting = ownPatients.filter(p => p.queueStatus === "Waiting").length;

    showCard("card-total-patients", true);
    setCardTitle("card-total-patients", "My Patients");
    setEl("stat-total-patients", ownPatients.length);

    showCard("card-in-consultation", true);
    setCardTitle("card-in-consultation", "In Consultation");
    setEl("stat-in-consultation", docConsultation);

    showCard("card-checked-out", false);
    showCard("card-total-doctors", false);

    showCard("card-waiting-patients", true);
    setCardTitle("card-waiting-patients", "My Queue");
    setEl("stat-waiting-queue", docWaiting);

    showCard("card-total-revenue", false);
  } 
  else if (role === "Nurse") {
    showCard("card-total-patients", true);
    setCardTitle("card-total-patients", "Total Patients");
    setEl("stat-total-patients", patients.length);

    showCard("card-in-consultation", true);
    setCardTitle("card-in-consultation", "In Consultation");
    setEl("stat-in-consultation", inConsultationAll);

    showCard("card-checked-out", false);
    showCard("card-total-doctors", false);

    showCard("card-waiting-patients", true);
    setCardTitle("card-waiting-patients", "Waiting Patients");
    setEl("stat-waiting-queue", waitingAll);

    showCard("card-total-revenue", false);
  } 
  else if (role === "Receptionist") {
    const todayStr = new Date().toISOString().split("T")[0];
    const registeredToday = patients.filter(p => p.joinedDate === todayStr).length;
    const todayRevenue = patients
      .filter(p => p.joinedDate === todayStr)
      .reduce((sum, p) => sum + (p.assignedDoctorFee || 0), 0);

    showCard("card-total-patients", true);
    setCardTitle("card-total-patients", "Total Patients");
    setEl("stat-total-patients", patients.length);

    showCard("card-in-consultation", false);
    showCard("card-checked-out", false);

    showCard("card-total-doctors", true);
    setCardTitle("card-total-doctors", "Registered Today");
    setEl("stat-total-doctors", registeredToday);

    showCard("card-waiting-patients", true);
    setCardTitle("card-waiting-patients", "Queue Size");
    setEl("stat-waiting-queue", waitingAll);

    showCard("card-total-revenue", true);
    setCardTitle("card-total-revenue", "Today's Invoices");
    setEl("stat-total-revenue", `₹${todayRevenue}`);
  }

  // Today's visits
  const todayStr = new Date().toDateString();
  const todayVisits = medicalRecords.filter(rec => new Date(rec.date).toDateString() === todayStr).length;
  setEl("stat-today-visits", todayVisits);
}

function renderDashboardActivities() {
  const container = document.getElementById("dashboard-activity-list");
  if (!container) return; // FIX: null guard

  if (activityLogs.length === 0) {
    container.innerHTML = `
      <div class="activity-empty">
        <i data-lucide="inbox"></i>
        <p>No recent activities found.</p>
      </div>
    `;
    lucide.createIcons();
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
    if (!el) return; // FIX: null guard
    const value = el.value;
    const group = el.closest(".form-group");

    if (!field.rule(value)) {
      if (group) group.classList.add("invalid");
      if (errorEl) errorEl.style.display = "block";
      valid = false;
    } else {
      if (group) group.classList.remove("invalid");
      if (errorEl) errorEl.style.display = "none";
    }
  });

  if (!valid) {
    showToast("Please correct invalid registration fields", "danger");
    return;
  }

  const generatedId = generatePersistentId("PAT-2026");

  // Generate token counter
  let tokenCounter = parseInt(localStorage.getItem("mrms_token_counter") || "0") + 1;
  localStorage.setItem("mrms_token_counter", tokenCounter);
  const tokenNumber = "T-" + String(tokenCounter).padStart(3, "0");

  const selectedDocName = (document.getElementById("reg-assigned-doc") || {}).value || "";
  const doctorObj = doctors.find(d => d.name === selectedDocName);
  const docFee = doctorObj ? (doctorObj.consultationFee || 1500) : 1500;

  const newPatient = {
    id: generatedId,
    tokenNumber: tokenNumber,
    name: (document.getElementById("reg-name") || {}).value?.trim() || "",
    dob: (document.getElementById("reg-dob") || {}).value || "",
    gender: (document.getElementById("reg-gender") || {}).value || "",
    phone: (document.getElementById("reg-phone") || {}).value?.trim() || "",
    email: (document.getElementById("reg-email") || {}).value?.trim() || "N/A",
    bloodGroup: (document.getElementById("reg-blood") || {}).value || "",
    emergencyContact: (document.getElementById("reg-emergency-name") || {}).value?.trim() || "None",
    address: (document.getElementById("reg-address") || {}).value?.trim() || "None provided",
    reasonForVisit: (document.getElementById("reg-reason") || {}).value?.trim() || "",
    assignedDoctor: selectedDocName,
    assignedDoctorFee: docFee,
    history: (document.getElementById("reg-history") || {}).value?.trim() || "None reported",
    joinedDate: new Date().toISOString().split("T")[0],
    treatmentStatus: "Waiting",
    queueStatus: "Waiting"   // FIX: always initialize queueStatus consistently
  };

  patients.push(newPatient);
  saveDb("mrms_patients", patients);

  logActivity(`Registered new patient: <strong>${newPatient.name} (${newPatient.id})</strong> with Token <strong>${tokenNumber}</strong>`);
  showToast(`Patient ${newPatient.name} registered successfully. Token: ${tokenNumber}`, "success");

  const regForm = document.getElementById("patient-registration-form");
  if (regForm) regForm.reset();

  // Navigate to list view
  switchView("patients");

  // Prompt to print token
  setTimeout(() => printToken(generatedId), 500);
}

window.editPatient = function(id) {
  const pat = patients.find(p => p.id === id);
  if (!pat) return;
  const modalId = document.getElementById("edit-patient-id");
  if (modalId) modalId.value = pat.id;
  const nameEl = document.getElementById("edit-pat-name");
  const dobEl = document.getElementById("edit-pat-dob");
  const genderEl = document.getElementById("edit-pat-gender");
  const phoneEl = document.getElementById("edit-pat-phone");
  const emailEl = document.getElementById("edit-pat-email");
  const addressEl = document.getElementById("edit-pat-address");
  if (nameEl) nameEl.value = pat.name;
  if (dobEl) dobEl.value = pat.dob;
  if (genderEl) genderEl.value = pat.gender;
  if (phoneEl) phoneEl.value = pat.phone;
  if (emailEl) emailEl.value = pat.email;
  if (addressEl) addressEl.value = pat.address;
  const modal = document.getElementById("edit-patient-modal");
  if (modal) modal.classList.add("active");
};

function handleEditPatient(e) {
  e.preventDefault();
  const idEl = document.getElementById("edit-patient-id");
  if (!idEl) return;
  const id = idEl.value;
  const pat = patients.find(p => p.id === id);
  if (!pat) return;

  const nameEl = document.getElementById("edit-pat-name");
  const dobEl = document.getElementById("edit-pat-dob");
  const genderEl = document.getElementById("edit-pat-gender");
  const phoneEl = document.getElementById("edit-pat-phone");
  const emailEl = document.getElementById("edit-pat-email");
  const addressEl = document.getElementById("edit-pat-address");

  if (nameEl) pat.name = nameEl.value.trim();
  if (dobEl) pat.dob = dobEl.value;
  if (genderEl) pat.gender = genderEl.value;
  if (phoneEl) pat.phone = phoneEl.value.trim();
  if (emailEl) pat.email = emailEl.value.trim();
  if (addressEl) pat.address = addressEl.value.trim();

  saveDb("mrms_patients", patients);
  logActivity(`Patient profile updated: <strong>${pat.name} (${pat.id})</strong>`);
  showToast("Patient profile updated successfully.", "success");

  const modal = document.getElementById("edit-patient-modal");
  if (modal) modal.classList.remove("active");

  renderPatientsTable();
  renderDashboardStats();
}

window.deletePatient = function(id) {
  if (confirm("Are you sure you want to delete this patient and all their medical records? This cannot be undone.")) {
    patients = patients.filter(p => p.id !== id);
    medicalRecords = medicalRecords.filter(r => r.patientId !== id);
    saveDb("mrms_patients", patients);
    saveDb("mrms_records", medicalRecords);
    logActivity(`Deleted patient profile: <strong>${id}</strong>`);
    showToast("Patient deleted successfully", "success");
    renderPatientsTable();
    renderDashboardStats();

    // If viewing this patient, redirect
    if (selectedPatientId === id) {
      const recordsView = document.getElementById("view-records");
      if (recordsView && recordsView.classList.contains("active")) {
        switchView("patients");
      }
    }
  }
};

// ==========================================================================
// MODULE: DOCTOR MANAGEMENT
// ==========================================================================
function renderDoctorsTable() {
  const tbody = document.getElementById("doctors-table-body");
  if (!tbody) return; // FIX: null guard
  const searchInput = document.getElementById("doctor-search-input");
  const specFilter = document.getElementById("filter-doc-specialization");
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedSpec = specFilter ? specFilter.value : "";

  const filtered = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery) ||
                          doc.id.toLowerCase().includes(searchQuery);
    const matchesSpec = selectedSpec === "" || doc.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; color: var(--text-muted); padding: 40px;">
          No matching doctor records found.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(doc => {
    return `
      <tr>
        <td><strong class="pid-tag">${doc.id}</strong></td>
        <td><span class="p-name-txt">${doc.name}</span></td>
        <td>${doc.specialization}</td>
        <td>₹${doc.consultationFee || 0}</td>
        <td>${doc.qualification}</td>
        <td>${doc.experience} yrs</td>
        <td>${doc.phone}</td>
        <td>
          <select class="inline-select" onchange="changeDoctorStatus('${doc.id}', this)">
            <option value="Active" ${doc.status === "Active" ? "selected" : ""}>Active</option>
            <option value="On Leave" ${doc.status === "On Leave" ? "selected" : ""}>On Leave</option>
            <option value="Busy" ${doc.status === "Busy" ? "selected" : ""}>Busy</option>
            <option value="Off Duty" ${doc.status === "Off Duty" ? "selected" : ""}>Off Duty</option>
          </select>
        </td>
        <td>
          <div class="action-buttons-cell">
            <button class="action-icon-btn primary" title="Update Fee" onclick="updateDoctorFee('${doc.id}')">
              <i data-lucide="dollar-sign"></i>
            </button>
            <button class="action-icon-btn primary" title="Edit Doctor" onclick="editDoctor('${doc.id}')">
              <i data-lucide="edit-2"></i>
            </button>
            <button class="action-icon-btn danger" style="border-color: var(--color-danger); color: var(--color-danger);" title="Delete Doctor" onclick="deleteDoctor('${doc.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  lucide.createIcons();
}

window.changeDoctorStatus = function(id, selectEl) {
  const newStatus = selectEl.value;
  const doc = doctors.find(d => d.id === id);
  if (doc) {
    doc.status = newStatus;
    saveDb("mrms_doctors", doctors);
    logActivity(`Doctor <strong>${doc.name}</strong> status changed to <strong>${newStatus}</strong>`);
    showToast(`Doctor status updated`, "success");
  }
};

window.editDoctor = function(id) {
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;
  const modalId = document.getElementById("edit-doc-id");
  if (modalId) modalId.value = doc.id;
  const nameEl = document.getElementById("edit-doc-name");
  const specEl = document.getElementById("edit-doc-specialization");
  const phoneEl = document.getElementById("edit-doc-phone");
  const emailEl = document.getElementById("edit-doc-email");
  const statusEl = document.getElementById("edit-doc-status");
  if (nameEl) nameEl.value = doc.name;
  if (specEl) specEl.value = doc.specialization;
  if (phoneEl) phoneEl.value = doc.phone;
  if (emailEl) emailEl.value = doc.email;
  if (statusEl) statusEl.value = doc.status;
  const modal = document.getElementById("edit-doctor-modal");
  if (modal) modal.classList.add("active");
};

function handleEditDoctor(e) {
  e.preventDefault();
  const idEl = document.getElementById("edit-doc-id");
  if (!idEl) return;
  const id = idEl.value;
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;

  const nameEl = document.getElementById("edit-doc-name");
  const specEl = document.getElementById("edit-doc-specialization");
  const phoneEl = document.getElementById("edit-doc-phone");
  const emailEl = document.getElementById("edit-doc-email");
  const statusEl = document.getElementById("edit-doc-status");

  if (nameEl) doc.name = nameEl.value.trim();
  if (specEl) doc.specialization = specEl.value;
  if (phoneEl) doc.phone = phoneEl.value.trim();
  if (emailEl) doc.email = emailEl.value.trim();
  if (statusEl) doc.status = statusEl.value;

  saveDb("mrms_doctors", doctors);
  logActivity(`Doctor profile updated: <strong>${doc.name} (${doc.id})</strong>`);
  showToast("Doctor profile updated successfully.", "success");

  const modal = document.getElementById("edit-doctor-modal");
  if (modal) modal.classList.remove("active");

  renderDoctorsTable();
  renderDashboardStats();
}

window.deleteDoctor = function(id) {
  if (confirm("Are you sure you want to delete this doctor?")) {
    doctors = doctors.filter(d => d.id !== id);
    saveDb("mrms_doctors", doctors);
    logActivity(`Deleted doctor profile: <strong>${id}</strong>`);
    showToast("Doctor deleted successfully", "success");
    renderDoctorsTable();
    renderDashboardStats();
  }
};

window.updateDoctorFee = function(id) {
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;

  const modalId = document.getElementById("update-fee-doc-id");
  const nameEl = document.getElementById("update-fee-doc-name");
  const specEl = document.getElementById("update-fee-doc-spec");
  const currentEl = document.getElementById("update-fee-doc-current");
  const newEl = document.getElementById("update-fee-doc-new");

  if (modalId) modalId.value = doc.id;
  if (nameEl) nameEl.value = doc.name;
  if (specEl) specEl.value = doc.specialization;
  if (currentEl) currentEl.value = `${doc.consultationFee || 0}`;
  if (newEl) {
    newEl.value = doc.consultationFee || "";
    const group = newEl.closest(".form-group");
    if (group) group.classList.remove("invalid");
    const errorEl = document.getElementById("update-fee-doc-new-error");
    if (errorEl) errorEl.style.display = "none";
  }

  const modal = document.getElementById("update-fee-modal");
  if (modal) modal.classList.add("active");
};

function handleUpdateFee(e) {
  e.preventDefault();
  const idEl = document.getElementById("update-fee-doc-id");
  if (!idEl) return;
  const id = idEl.value;
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;

  const newFeeInput = document.getElementById("update-fee-doc-new");
  if (!newFeeInput) return;
  const newFeeVal = newFeeInput.value.trim();
  const newFee = Number(newFeeVal);

  const group = newFeeInput.closest(".form-group");
  const errorEl = document.getElementById("update-fee-doc-new-error");

  if (newFeeVal === "" || isNaN(newFee) || newFee <= 0) {
    if (group) group.classList.add("invalid");
    if (errorEl) errorEl.style.display = "block";
    showToast("Please enter a valid consultation fee greater than 0", "danger");
    return;
  }

  if (group) group.classList.remove("invalid");
  if (errorEl) errorEl.style.display = "none";

  const oldFee = doc.consultationFee || 1500;
  doc.consultationFee = newFee;

  // Save history
  let history = getDb("mrms_doctor_fee_history", []);
  history.push({
    doctorId: doc.id,
    oldFee: oldFee,
    newFee: newFee,
    changedOn: new Date().toISOString()
  });
  saveDb("mrms_doctor_fee_history", history);

  saveDb("mrms_doctors", doctors);

  logActivity(`Consultation fee for <strong>${doc.name} (${doc.id})</strong> updated from ₹${oldFee} to ₹${newFee}`);
  showToast("Consultation fee updated successfully.", "success");

  const modal = document.getElementById("update-fee-modal");
  if (modal) modal.classList.remove("active");

  renderDoctorsTable();
  renderDashboardStats();
}

function handleDoctorRegistration(e) {
  e.preventDefault();

  const fields = [
    { id: "doc-name", errorId: "doc-name-error", rule: val => val.trim().length >= 3 },
    { id: "doc-gender", errorId: "doc-gender-error", rule: val => val !== "" },
    { id: "doc-specialization", errorId: "doc-specialization-error", rule: val => val !== "" },
    { id: "doc-qualification", errorId: "doc-qualification-error", rule: val => val.trim() !== "" },
    { id: "doc-experience", errorId: "doc-experience-error", rule: val => val !== "" && Number(val) >= 0 },
    { id: "doc-email", errorId: "doc-email-error", rule: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { id: "doc-phone", errorId: "doc-phone-error", rule: val => /^\d{10,11}$/.test(val.trim()) },
    { id: "doc-username", errorId: "doc-username-error", rule: val => val.trim().length >= 3 },
    { id: "doc-password", errorId: "doc-password-error", rule: val => val.trim().length >= 4 },
    { id: "doc-joining", errorId: "doc-joining-error", rule: val => val !== "" },
    { id: "doc-status", errorId: "doc-status-error", rule: val => val !== "" },
    { id: "doc-fee", errorId: "doc-fee-error", rule: val => val.trim() !== "" && Number(val) > 0 }
  ];

  let valid = true;
  fields.forEach(field => {
    const el = document.getElementById(field.id);
    const errorEl = document.getElementById(field.errorId);
    if (!el) return; // FIX: null guard
    const group = el.closest(".form-group");

    if (!field.rule(el.value)) {
      if (group) group.classList.add("invalid");
      if (errorEl) errorEl.style.display = "block";
      valid = false;
    } else {
      if (group) group.classList.remove("invalid");
      if (errorEl) errorEl.style.display = "none";
    }
  });

  if (!valid) {
    showToast("Please correct invalid doctor fields", "danger");
    return;
  }

  const usernameEl = document.getElementById("doc-username");
  const username = usernameEl ? usernameEl.value.trim() : "";

  // Prevent duplicate usernames
  if (doctors.some(d => d.username === username)) {
    showToast("Username already exists. Please choose a different one.", "danger");
    return;
  }

  const generatedId = generatePersistentId("DOC-2026");

  const newDoc = {
    id: generatedId,
    name: (document.getElementById("doc-name") || {}).value?.trim() || "",
    gender: (document.getElementById("doc-gender") || {}).value || "",
    specialization: (document.getElementById("doc-specialization") || {}).value || "",
    qualification: (document.getElementById("doc-qualification") || {}).value?.trim() || "",
    experience: (document.getElementById("doc-experience") || {}).value?.trim() || "0",
    email: (document.getElementById("doc-email") || {}).value?.trim() || "",
    phone: (document.getElementById("doc-phone") || {}).value?.trim() || "",
    username: username,
    password: (document.getElementById("doc-password") || {}).value || "",
    joiningDate: (document.getElementById("doc-joining") || {}).value || new Date().toISOString().split("T")[0],
    status: (document.getElementById("doc-status") || {}).value || "Active",
    consultationFee: Number((document.getElementById("doc-fee") || {}).value) || 1500
  };

  doctors.push(newDoc);
  saveDb("mrms_doctors", doctors);

  logActivity(`Registered new doctor: <strong>${newDoc.name} (${newDoc.id})</strong>`);
  showToast(`Doctor ${newDoc.name} registered successfully.`, "success");

  const docForm = document.getElementById("doctor-form");
  if (docForm) docForm.reset();
  renderDoctorsTable();
  renderDashboardStats();
}

// ==========================================================================
// MODULE: PATIENT LIST, SEARCH & FILTRATION
// ==========================================================================
function renderPatientsTable() {
  const tbody = document.getElementById("patients-table-body");
  if (!tbody) return; // FIX: null guard
  const searchInput = document.getElementById("patient-search-input");
  const bloodFilter = document.getElementById("filter-blood-group");
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedBlood = bloodFilter ? bloodFilter.value : "";

  // Filter core array
  const filtered = patients.filter(pat => {
    const matchesSearch = pat.name.toLowerCase().includes(searchQuery) ||
                          pat.id.toLowerCase().includes(searchQuery) ||
                          pat.phone.includes(searchQuery);
    const matchesBlood = selectedBlood === "" || pat.bloodGroup === selectedBlood;
    
    let matchesRole = true;
    if (currentUser && currentUser.role === "Doctor") {
      matchesRole = pat.assignedDoctor === currentUser.fullName;
    }
    
    return matchesSearch && matchesBlood && matchesRole;
  });

  // Pagination indexes
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / patientsPerPage) || 1;

  if (currentPage > totalPages) currentPage = totalPages;

  const startIdx = (currentPage - 1) * patientsPerPage;
  const endIdx = Math.min(startIdx + patientsPerPage, totalItems);

  // Slice rendering page
  const pageItems = filtered.slice(startIdx, endIdx);

  const paginationText = document.getElementById("pagination-text");
  const prevBtn = document.getElementById("btn-prev-page");
  const nextBtn = document.getElementById("btn-next-page");

  if (totalItems === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 40px;">
          No matching patient records found.
        </td>
      </tr>
    `;
    if (paginationText) paginationText.textContent = "Showing 0 of 0 patients"; // FIX: null guard
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  tbody.innerHTML = pageItems.map(pat => {
    const initials = pat.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    // FIX: Use queueStatus primarily, fallback to treatmentStatus, then "Waiting"
    let statusText = pat.queueStatus || pat.treatmentStatus || "Waiting";
    let statusBadgeClass = getStatusBadgeClass(statusText);

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
        <td><span class="status-badge ${statusBadgeClass}">${statusText}</span></td>
        <td>
          <div class="action-buttons-cell">
            <button class="action-icon-btn primary" title="View Medical Timeline" onclick="viewPatientRecords('${pat.id}')">
              <i data-lucide="folder-heart"></i>
            </button>
            <button class="action-icon-btn primary" title="Add Consultation Record" onclick="openAddRecordForPatient('${pat.id}')">
              <i data-lucide="file-plus-2"></i>
            </button>
            <button class="action-icon-btn primary" title="Edit Patient" onclick="editPatient('${pat.id}')">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="action-icon-btn danger" style="border-color: var(--color-danger); color: var(--color-danger);" title="Delete Patient" onclick="deletePatient('${pat.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // Update pagination footer — FIX: null checks
  if (paginationText) paginationText.textContent = `Showing ${startIdx + 1}-${endIdx} of ${totalItems} patients`;
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;

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

  // Set patient detail banners — FIX: null checks on every element
  const initials = patient.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setElText("record-avatar", initials);
  setElText("record-patient-name", patient.name);
  setElText("record-patient-id", patient.id);
  setElText("record-patient-age-gender", `${patient.gender}, ${calculateAge(patient.dob)} yrs`);
  setElText("record-patient-contact", patient.phone);
  setElText("record-patient-blood", patient.bloodGroup);
  setElText("record-patient-notes", patient.history);

  // FIX: Render patient treatment status badge correctly with all statuses
  const statusBadge = document.getElementById("record-patient-status");
  if (statusBadge) {
    let statusText = patient.treatmentStatus || "Waiting";
    let statusBadgeClass = getStatusBadgeClass(statusText); // FIX: use shared helper
    statusBadge.className = `status-badge ${statusBadgeClass}`;
    statusBadge.textContent = statusText;
  }

  // Fetch encounters
  const timeline = document.getElementById("clinical-records-timeline");
  if (!timeline) return; // FIX: null guard

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

  timeline.innerHTML = filteredRecords.map(rec => {
    const recStatus = rec.status || "Treatment Completed";
    const statusClass = getStatusBadgeClass(recStatus);
    // FIX: Use rec.doctor (correct field name) not rec.doctorName (undefined)
    const doctorName = rec.doctor || rec.doctorName || "Unknown Doctor";

    const isNurse = currentUser && currentUser.role === "Nurse";
    const actionsHtml = isNurse ? "" : `
      <div class="timeline-actions" style="margin-top: 15px; display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="editRecord('${rec.id}')">Edit</button>
        <button class="btn btn-outline danger" style="padding: 5px 10px; font-size: 12px; color: var(--color-danger); border-color: var(--color-danger);" onclick="deleteRecord('${rec.id}')">Delete</button>
      </div>
    `;

    return `
      <div class="timeline-item">
        <div class="timeline-marker ${statusClass}"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h4>Consultation with ${doctorName}</h4>
            <div class="timeline-meta">
              <span class="badge ${statusClass}">${recStatus}</span>
              <span class="date">${formatDateTime(rec.date)}</span>
            </div>
          </div>
          <div class="timeline-body">
            <div class="diagnosis-block">
              <h5><i data-lucide="activity"></i> Clinical Diagnosis</h5>
              <p>${rec.diagnosis}</p>
            </div>
            ${rec.prescription ? `
              <div class="prescription-block">
                <h5><i data-lucide="pill"></i> Prescription</h5>
                <p>${rec.prescription}</p>
              </div>
            ` : ""}
            ${rec.notes ? `
              <div class="notes-block">
                <h5><i data-lucide="file-text"></i> Consultation Notes</h5>
                <p>${rec.notes}</p>
              </div>
            ` : ""}
            ${actionsHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// FIX: Implement editRecord — was referenced in template but never defined
window.editRecord = function(id) {
  const rec = medicalRecords.find(r => r.id === id);
  if (!rec) return;
  const idEl = document.getElementById("edit-record-id");
  const diagEl = document.getElementById("edit-rec-diagnosis");
  const presEl = document.getElementById("edit-rec-prescription");
  const notesEl = document.getElementById("edit-rec-notes");
  if (idEl) idEl.value = rec.id;
  if (diagEl) diagEl.value = rec.diagnosis || "";
  if (presEl) presEl.value = rec.prescription || "";
  if (notesEl) notesEl.value = rec.notes || "";
  const modal = document.getElementById("edit-record-modal");
  if (modal) modal.classList.add("active");
};

function handleEditRecord(e) {
  e.preventDefault();
  const idEl = document.getElementById("edit-record-id");
  if (!idEl) return;
  const id = idEl.value;
  const rec = medicalRecords.find(r => r.id === id);
  if (!rec) return;

  const diagEl = document.getElementById("edit-rec-diagnosis");
  const presEl = document.getElementById("edit-rec-prescription");
  const notesEl = document.getElementById("edit-rec-notes");

  if (diagEl) rec.diagnosis = diagEl.value.trim();
  if (presEl) rec.prescription = presEl.value.trim() || null;
  if (notesEl) rec.notes = notesEl.value.trim() || null;

  saveDb("mrms_records", medicalRecords);
  logActivity(`Medical record <strong>${rec.id}</strong> updated`);
  showToast("Medical record updated successfully.", "success");

  const modal = document.getElementById("edit-record-modal");
  if (modal) modal.classList.remove("active");

  renderMedicalRecordsView();
}

// FIX: Implement deleteRecord — was referenced in template but never defined
window.deleteRecord = function(id) {
  if (confirm("Are you sure you want to delete this medical record? This cannot be undone.")) {
    medicalRecords = medicalRecords.filter(r => r.id !== id);
    saveDb("mrms_records", medicalRecords);
    logActivity(`Deleted medical record: <strong>${id}</strong>`);
    showToast("Medical record deleted.", "success");
    renderMedicalRecordsView();
    renderDashboardStats();
  }
};

function handleAddMedicalRecord(e) {
  e.preventDefault();

  const diagnosisInput = document.getElementById("rec-diagnosis");
  if (!diagnosisInput) return; // FIX: null guard
  let valid = true;

  if (!diagnosisInput.value.trim()) {
    diagnosisInput.closest(".form-group").classList.add("invalid");
    const diagErr = document.getElementById("rec-diagnosis-error");
    if (diagErr) diagErr.style.display = "block";
    valid = false;
  } else {
    diagnosisInput.closest(".form-group").classList.remove("invalid");
    const diagErr = document.getElementById("rec-diagnosis-error");
    if (diagErr) diagErr.style.display = "none";
  }

  if (!valid) return;

  const patient = patients.find(p => p.id === selectedPatientId);
  if (!patient) return; // FIX: null guard

  const generatedId = generatePersistentId("REC-2026");

  const typeEl = document.getElementById("rec-type");
  const doctorEl = document.getElementById("rec-doctor");
  const bpEl = document.getElementById("rec-bp");
  const pulseEl = document.getElementById("rec-pulse");
  const tempEl = document.getElementById("rec-temp");
  const prescriptionEl = document.getElementById("rec-prescription");
  // FIX: HTML uses id="rec-nots" (not rec-notes) — use correct ID
  const notesEl = document.getElementById("rec-nots");
  const updateStatusEl = document.getElementById("rec-update-status");

  const newRecord = {
    id: generatedId,
    patientId: selectedPatientId,
    type: typeEl ? typeEl.value : "Regular Checkup",
    doctor: doctorEl ? (doctorEl.value || "Dr. Rajesh Kumar") : "Dr. Rajesh Kumar",
    date: new Date().toISOString(),
    bp: bpEl ? (bpEl.value.trim() || null) : null,
    pulse: pulseEl ? (pulseEl.value || null) : null,
    temp: tempEl ? (tempEl.value.trim() || null) : null,
    diagnosis: diagnosisInput.value.trim(),
    prescription: prescriptionEl ? (prescriptionEl.value.trim() || null) : null,
    notes: notesEl ? (notesEl.value.trim() || null) : null,  // FIX: correct element id
    status: updateStatusEl ? (updateStatusEl.value || "Treatment Completed") : "Treatment Completed"
  };

  medicalRecords.push(newRecord);
  saveDb("mrms_records", medicalRecords);

  // FIX: Update both treatmentStatus AND queueStatus from the "Update Treatment Status" select
  if (updateStatusEl && updateStatusEl.value) {
    patient.treatmentStatus = updateStatusEl.value;
    // Map treatment statuses to queue statuses
    if (updateStatusEl.value === "Treatment Completed" || updateStatusEl.value === "Cancelled") {
      patient.queueStatus = "Checked Out";
    } else if (updateStatusEl.value === "In Consultation") {
      patient.queueStatus = "In Consultation";
    } else {
      patient.queueStatus = "Waiting";
    }
    saveDb("mrms_patients", patients);
  }

  logActivity(`Encounter record (<strong>${newRecord.type}</strong>) added to <strong>${patient.name}</strong>`);
  showToast(`Medical record added successfully`, "success");

  closeRecordModal();
  renderMedicalRecordsView();
  renderDashboardStats();
}

// Modal Toggle Hooks
function openRecordModal() {
  if (currentUser && currentUser.role === "Nurse") {
    showToast("Nurses cannot add clinical encounter records.", "danger");
    return;
  }
  const modal = document.getElementById("add-record-modal");
  if (!modal) return; // FIX: null guard
  modal.classList.add("active");

  const form = document.getElementById("add-record-form");
  if (form) form.reset();

  const docSelect = document.getElementById("rec-doctor");
  if (docSelect) {
    docSelect.innerHTML = '<option value="">Select Doctor</option>' +
      doctors.filter(d => d.status === "Active").map(d => `<option value="${d.name}">${d.name} (${d.specialization})</option>`).join("");
  }

  const updateStatusInput = document.getElementById("rec-update-status");
  if (updateStatusInput) {
    const patient = patients.find(p => p.id === selectedPatientId);
    updateStatusInput.value = patient ? (patient.treatmentStatus || "Waiting") : "Waiting";
  }

  clearFormErrors("add-record-form");
}

function closeRecordModal() {
  const modal = document.getElementById("add-record-modal");
  if (modal) modal.classList.remove("active"); // FIX: null guard
}

// ==========================================================================
// BOOTSTRAP INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup Mock DB or fetch local
  doctors = getDb("mrms_doctors", MOCK_DOCTORS).map(doc => ({
    ...doc,
    consultationFee: doc.consultationFee !== undefined ? Number(doc.consultationFee) : 1500
  }));
  patients = getDb("mrms_patients", MOCK_PATIENTS).map(p => {
    if (p.assignedDoctorFee === undefined) {
      const docObj = doctors.find(d => d.name === p.assignedDoctor);
      p.assignedDoctorFee = docObj ? (docObj.consultationFee || 1500) : 1500;
    }
    if (p.billingStatus === undefined) {
      p.billingStatus = "Paid";
    }
    return p;
  });
  medicalRecords = getDb("mrms_records", MOCK_RECORDS);
  activityLogs = getDb("mrms_activities", MOCK_ACTIVITIES);
  users = getDb("mrms_users", MOCK_USERS);
  nurses = getDb("mrms_nurses", MOCK_NURSES);
  receptionists = getDb("mrms_receptionists", MOCK_RECEPTIONISTS);
  appointments = getDb("mrms_appointments", MOCK_APPOINTMENTS);

  // FIX: Ensure every patient loaded from storage has a queueStatus
  patients = patients.map(p => {
    if (!p.queueStatus) {
      // Derive a sensible default from treatmentStatus
      if (p.treatmentStatus === "Treatment Completed" || p.treatmentStatus === "Cancelled") {
        p.queueStatus = "Checked Out";
      } else if (p.treatmentStatus === "In Consultation") {
        p.queueStatus = "In Consultation";
      } else {
        p.queueStatus = "Waiting";
      }
    }
    return p;
  });

  // Write initial databases back if first time
  saveDb("mrms_patients", patients);
  saveDb("mrms_doctors", doctors);
  saveDb("mrms_users", users);
  saveDb("mrms_nurses", nurses);
  saveDb("mrms_receptionists", receptionists);
  saveDb("mrms_appointments", appointments);
  if (!localStorage.getItem("mrms_records")) saveDb("mrms_records", medicalRecords);
  if (!localStorage.getItem("mrms_activities")) saveDb("mrms_activities", activityLogs);

  // Set Date display
  const dateDisplay = document.getElementById("current-date-display");
  if (dateDisplay) { // FIX: null guard
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    dateDisplay.textContent = new Date().toLocaleDateString("en-US", options);
  }

  // 2. Auth Session Check
  const activeSession = localStorage.getItem("mrms_session");
  const authView = document.getElementById("auth-view");
  const appShell = document.getElementById("app-shell");

  if (activeSession === "active") {
    if (authView) authView.classList.remove("active");
    if (appShell) appShell.classList.add("active");
    updateSessionUI();
    switchView("dashboard");
  } else {
    if (authView) authView.classList.add("active");
    if (appShell) appShell.classList.remove("active");
  }

  // 3. Setup Listeners — FIX: every listener attachment guarded with null check

  // Nav tabs routing
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = item.getAttribute("data-view");
      switchView(targetView);
    });
  });

  // Dashboard Cards routing
  const cardTotalPatients = document.getElementById("card-total-patients");
  if (cardTotalPatients) cardTotalPatients.addEventListener("click", () => switchView("patients"));

  const cardMedicalRecords = document.getElementById("card-medical-records");
  if (cardMedicalRecords) cardMedicalRecords.addEventListener("click", () => {
    showToast("Select a patient from the list to view records.", "success");
    switchView("patients");
  });

  const cardTotalDoctors = document.getElementById("card-total-doctors");
  if (cardTotalDoctors) cardTotalDoctors.addEventListener("click", () => switchView("doctors"));

  const cardVisitsToday = document.getElementById("card-visits-today");
  if (cardVisitsToday) cardVisitsToday.addEventListener("click", openVisitsModal);

  const cardInQueue = document.getElementById("card-in-queue");
  if (cardInQueue) cardInQueue.addEventListener("click", openQueueModal);

  // Waiting / In Consultation / Checked Out stat cards — click to open queue
  const cardWaiting = document.getElementById("card-waiting-patients");
  if (cardWaiting) cardWaiting.addEventListener("click", openQueueModal);

  const cardInConsultation = document.getElementById("card-in-consultation");
  if (cardInConsultation) cardInConsultation.addEventListener("click", openQueueModal);

  const cardCheckedOut = document.getElementById("card-checked-out");
  if (cardCheckedOut) cardCheckedOut.addEventListener("click", openQueueModal);

  // Login triggers
  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

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
  const patRegForm = document.getElementById("patient-registration-form");
  if (patRegForm) patRegForm.addEventListener("submit", handlePatientRegistration);

  const cancelRegBtn = document.getElementById("btn-cancel-reg");
  if (cancelRegBtn) cancelRegBtn.addEventListener("click", () => switchView("patients"));

  // Medical records triggers
  const btnOpenRecord = document.getElementById("btn-open-record-modal");
  if (btnOpenRecord) btnOpenRecord.addEventListener("click", openRecordModal);

  const btnCloseRecord = document.getElementById("btn-close-record-modal");
  if (btnCloseRecord) btnCloseRecord.addEventListener("click", closeRecordModal);

  const btnCancelRecord = document.getElementById("btn-cancel-record");
  if (btnCancelRecord) btnCancelRecord.addEventListener("click", closeRecordModal);

  const addRecordForm = document.getElementById("add-record-form");
  if (addRecordForm) addRecordForm.addEventListener("submit", handleAddMedicalRecord);

  // Edit Record Modal
  const editRecordForm = document.getElementById("edit-record-form");
  if (editRecordForm) editRecordForm.addEventListener("submit", handleEditRecord);

  const btnCloseEditRecord = document.getElementById("btn-close-edit-record");
  if (btnCloseEditRecord) btnCloseEditRecord.addEventListener("click", () => {
    const m = document.getElementById("edit-record-modal");
    if (m) m.classList.remove("active");
  });

  const btnCancelEditRecord = document.getElementById("btn-cancel-edit-record");
  if (btnCancelEditRecord) btnCancelEditRecord.addEventListener("click", () => {
    const m = document.getElementById("edit-record-modal");
    if (m) m.classList.remove("active");
  });

  // Doctor triggers
  const docForm = document.getElementById("doctor-form");
  if (docForm) docForm.addEventListener("submit", handleDoctorRegistration);

  const cancelDocBtn = document.getElementById("btn-cancel-doc");
  if (cancelDocBtn) cancelDocBtn.addEventListener("click", () => {
    const df = document.getElementById("doctor-form");
    if (df) df.reset();
    clearFormErrors("doctor-form");
  });

  const docSearchInput = document.getElementById("doctor-search-input");
  if (docSearchInput) docSearchInput.addEventListener("input", renderDoctorsTable);

  const docSpecFilter = document.getElementById("filter-doc-specialization");
  if (docSpecFilter) docSpecFilter.addEventListener("change", renderDoctorsTable);

  // Edit Doctor Modal
  const editDocForm = document.getElementById("edit-doctor-form");
  if (editDocForm) editDocForm.addEventListener("submit", handleEditDoctor);

  const btnCloseEditDoctor = document.getElementById("btn-close-edit-doctor");
  if (btnCloseEditDoctor) btnCloseEditDoctor.addEventListener("click", () => {
    const m = document.getElementById("edit-doctor-modal");
    if (m) m.classList.remove("active");
  });

  const btnCancelEditDoctor = document.getElementById("btn-cancel-edit-doctor");
  if (btnCancelEditDoctor) btnCancelEditDoctor.addEventListener("click", () => {
    const m = document.getElementById("edit-doctor-modal");
    if (m) m.classList.remove("active");
  });

  // Edit Patient Modal
  const editPatientForm = document.getElementById("edit-patient-form");
  if (editPatientForm) editPatientForm.addEventListener("submit", handleEditPatient);

  const btnCloseEditPatient = document.getElementById("btn-close-edit-patient");
  if (btnCloseEditPatient) btnCloseEditPatient.addEventListener("click", () => {
    const m = document.getElementById("edit-patient-modal");
    if (m) m.classList.remove("active");
  });

  const btnCancelEditPatient = document.getElementById("btn-cancel-edit-patient");
  if (btnCancelEditPatient) btnCancelEditPatient.addEventListener("click", () => {
    const m = document.getElementById("edit-patient-modal");
    if (m) m.classList.remove("active");
  });

  // Quick Dashboard Navigation triggers
  const actionQuickRegister = document.getElementById("action-quick-register");
  if (actionQuickRegister) actionQuickRegister.addEventListener("click", () => switchView("register"));

  const actionQuickSearch = document.getElementById("action-quick-search");
  if (actionQuickSearch) actionQuickSearch.addEventListener("click", () => switchView("patients"));

  const actionQuickStats = document.getElementById("action-quick-stats");
  if (actionQuickStats) actionQuickStats.addEventListener("click", () => showToast("Loading custom clinical audit analytics reports...", "success"));

  const btnGoRegister = document.getElementById("btn-go-register");
  if (btnGoRegister) btnGoRegister.addEventListener("click", () => switchView("register"));

  // List Search & filter inputs
  const searchInput = document.getElementById("patient-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderPatientsTable();
    });
  }

  const filterBlood = document.getElementById("filter-blood-group");
  if (filterBlood) {
    filterBlood.addEventListener("change", () => {
      currentPage = 1;
      renderPatientsTable();
    });
  }

  // Global search (top bar header)
  const globalSearch = document.getElementById("global-search-bar");
  if (globalSearch) {
    globalSearch.addEventListener("input", (e) => {
      const query = e.target.value;
      if (query.trim().length > 0) {
        switchView("patients");
        if (searchInput) searchInput.value = query;
        renderPatientsTable();
      }
    });
  }

  // Table Pagination click handles
  const btnPrev = document.getElementById("btn-prev-page");
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPatientsTable();
      }
    });
  }

  const btnNext = document.getElementById("btn-next-page");
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      currentPage++;
      renderPatientsTable();
    });
  }

  // Visits Today Modal close
  const btnCloseVisits = document.getElementById("btn-close-visits-modal");
  if (btnCloseVisits) btnCloseVisits.addEventListener("click", () => {
    const m = document.getElementById("visits-today-modal");
    if (m) m.classList.remove("active");
  });

  // Queue Modal close
  const btnCloseQueue = document.getElementById("btn-close-queue-modal");
  if (btnCloseQueue) btnCloseQueue.addEventListener("click", () => {
    const m = document.getElementById("queue-modal");
    if (m) m.classList.remove("active");
  });

  // Update Fee triggers
  const updateFeeForm = document.getElementById("update-fee-form");
  if (updateFeeForm) updateFeeForm.addEventListener("submit", handleUpdateFee);

  const btnCloseUpdateFee = document.getElementById("btn-close-update-fee");
  if (btnCloseUpdateFee) btnCloseUpdateFee.addEventListener("click", () => {
    const m = document.getElementById("update-fee-modal");
    if (m) m.classList.remove("active");
  });

  const btnCancelUpdateFee = document.getElementById("btn-cancel-update-fee");
  if (btnCancelUpdateFee) btnCancelUpdateFee.addEventListener("click", () => {
    const m = document.getElementById("update-fee-modal");
    if (m) m.classList.remove("active");
  });

  // Nurse view triggers
  const nurseForm = document.getElementById("nurse-form");
  if (nurseForm) nurseForm.addEventListener("submit", handleNurseRegistration);
  
  const cancelNurseBtn = document.getElementById("btn-cancel-nurse");
  if (cancelNurseBtn) cancelNurseBtn.addEventListener("click", () => {
    if (nurseForm) nurseForm.reset();
    clearFormErrors("nurse-form");
  });

  // Receptionist view triggers
  const recForm = document.getElementById("receptionist-form");
  if (recForm) recForm.addEventListener("submit", handleReceptionistRegistration);
  
  const cancelRecBtn = document.getElementById("btn-cancel-receptionist");
  if (cancelRecBtn) cancelRecBtn.addEventListener("click", () => {
    if (recForm) recForm.reset();
    clearFormErrors("receptionist-form");
  });

  // Appointment view triggers
  const aptForm = document.getElementById("appointment-form");
  if (aptForm) aptForm.addEventListener("submit", handleAddAppointment);
  
  const cancelAptBtn = document.getElementById("btn-cancel-apt");
  if (cancelAptBtn) cancelAptBtn.addEventListener("click", () => {
    if (aptForm) aptForm.reset();
    clearFormErrors("appointment-form");
  });

  // User management triggers
  const usrForm = document.getElementById("user-management-form");
  if (usrForm) usrForm.addEventListener("submit", handleAddUser);
  
  const cancelUsrBtn = document.getElementById("btn-cancel-usr");
  if (cancelUsrBtn) cancelUsrBtn.addEventListener("click", () => {
    if (usrForm) usrForm.reset();
    clearFormErrors("user-management-form");
  });

  const editUsrForm = document.getElementById("edit-user-form");
  if (editUsrForm) editUsrForm.addEventListener("submit", handleEditUser);

  const btnCloseEditUser = document.getElementById("btn-close-edit-user");
  if (btnCloseEditUser) btnCloseEditUser.addEventListener("click", () => {
    const m = document.getElementById("edit-user-modal");
    if (m) m.classList.remove("active");
  });

  const btnCancelEditUser = document.getElementById("btn-cancel-edit-user");
  if (btnCancelEditUser) btnCancelEditUser.addEventListener("click", () => {
    const m = document.getElementById("edit-user-modal");
    if (m) m.classList.remove("active");
  });

  // Initialize Lucide icons on page load
  lucide.createIcons();
});

// ==========================================================================
// MODULE: VISITS & QUEUE MODALS
// ==========================================================================

function openVisitsModal() {
  const modal = document.getElementById("visits-today-modal");
  if (!modal) return; // FIX: null guard
  modal.classList.add("active");
  renderVisitsModal();
}

function renderVisitsModal() {
  const tbody = document.getElementById("visits-today-table-body");
  if (!tbody) return; // FIX: null guard
  const todayStr = new Date().toDateString();
  const todayVisits = medicalRecords.filter(rec => new Date(rec.date).toDateString() === todayStr);

  if (todayVisits.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No visits recorded today.</td></tr>';
    return;
  }

  tbody.innerHTML = todayVisits.map(rec => {
    const patient = patients.find(p => p.id === rec.patientId);
    const patName = patient ? patient.name : "Unknown";
    const status = rec.visitStatus || "Completed";
    return `
      <tr>
        <td><strong>${rec.id}</strong></td>
        <td>${patName}</td>
        <td>${rec.type}</td>
        <td>${rec.doctor}</td>
        <td>
          <select class="inline-select" onchange="changeVisitStatus('${rec.id}', this)">
            <option value="Waiting" ${status === "Waiting" ? "selected" : ""}>Waiting</option>
            <option value="In Consultation" ${status === "In Consultation" ? "selected" : ""}>In Consultation</option>
            <option value="Completed" ${status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </td>
      </tr>
    `;
  }).join("");
}

window.changeVisitStatus = function(id, selectEl) {
  const newStatus = selectEl.value;
  const rec = medicalRecords.find(r => r.id === id);
  if (rec) {
    rec.visitStatus = newStatus;
    saveDb("mrms_records", medicalRecords);
    logActivity(`Visit status for <strong>${rec.id}</strong> updated to <strong>${newStatus}</strong>`);
    showToast(`Visit status updated`, "success");
  }
};

function openQueueModal() {
  const modal = document.getElementById("queue-modal");
  if (!modal) return; // FIX: null guard
  modal.classList.add("active");
  renderQueueModal();
}

function renderQueueModal() {
  const tbody = document.getElementById("queue-table-body");
  if (!tbody) return; // FIX: null guard

  // FIX: Queue shows patients with queueStatus Waiting or In Consultation
  const queuedPatients = patients.filter(p =>
    !p.queueStatus || p.queueStatus === "Waiting" || p.queueStatus === "In Consultation"
  );

  if (queuedPatients.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">The patient queue is empty.</td></tr>';
    return;
  }

  tbody.innerHTML = queuedPatients.map(pat => {
    const status = pat.queueStatus || "Waiting";
    const doctor = pat.assignedDoctor || "Unassigned";
    const token = pat.tokenNumber || "N/A";

    // Find department (specialization) based on doctor name
    const docObj = doctors.find(d => d.name === doctor);
    const department = docObj ? docObj.specialization : "General";

    return `
      <tr>
        <td><strong>${token}</strong><br><span style="font-size: 0.7rem; color: var(--text-secondary);">${pat.id}</span></td>
        <td>${pat.name}</td>
        <td>${doctor}</td>
        <td>${department}</td>
        <td>₹${pat.assignedDoctorFee || 0}</td>
        <td>
          <select class="inline-select" onchange="changeQueueStatus('${pat.id}', this)">
            <option value="Waiting" ${status === "Waiting" ? "selected" : ""}>Waiting</option>
            <option value="In Consultation" ${status === "In Consultation" ? "selected" : ""}>In Consultation</option>
            <option value="Checked Out" ${status === "Checked Out" ? "selected" : ""}>Checked Out</option>
          </select>
        </td>
        <td>
          <button class="action-icon-btn primary" title="Print Token" onclick="printToken('${pat.id}')">
            <i data-lucide="printer"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");
  lucide.createIcons();
}

window.changeQueueStatus = function(id, selectEl) {
  const newStatus = selectEl.value;
  const pat = patients.find(p => p.id === id);
  if (pat) {
    pat.queueStatus = newStatus;
    // FIX: keep treatmentStatus partially in sync
    if (newStatus === "In Consultation") {
      pat.treatmentStatus = "In Consultation";
    } else if (newStatus === "Checked Out" && pat.treatmentStatus === "Waiting") {
      pat.treatmentStatus = "Treatment Completed";
    }
    saveDb("mrms_patients", patients);
    logActivity(`Queue status for <strong>${pat.name}</strong> updated to <strong>${newStatus}</strong>`);
    showToast(`Queue status updated`, "success");
    renderDashboardStats();
    renderPatientsTable();

    // If checked out, remove from queue UI right away
    if (newStatus === "Checked Out") {
      renderQueueModal();
    }
  }
};

window.printToken = function(patientId) {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return;

  const tokenArea = document.getElementById("print-token-area");
  if (tokenArea) {
    tokenArea.innerHTML = `
      <div class="token-slip">
        <h2>MediFlow Hospital</h2>
        <p>Token Slip</p>
        <hr>
        <h1>${patient.tokenNumber || "N/A"}</h1>
        <p><strong>Patient:</strong> ${patient.name}</p>
        <p><strong>ID:</strong> ${patient.id}</p>
        <hr>
        <p><strong>Doctor:</strong> ${patient.assignedDoctor || "Unassigned"}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${patient.queueStatus || "Waiting"}</p>
      </div>
    `;
    window.print();
  }
};

// ==========================================================================
// MODULE: RBAC EXTENSIONS (Nurses, Receptionists, Users, Appointments, Billing, Revenue)
// ==========================================================================

function renderNursesTable() {
  const tbody = document.getElementById("nurses-table-body");
  if (!tbody) return;
  if (nurses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">No nurse records found.</td></tr>';
    return;
  }
  tbody.innerHTML = nurses.map(n => `
    <tr>
      <td><strong class="pid-tag">${n.id}</strong></td>
      <td><span class="p-name-txt">${n.name}</span></td>
      <td>${n.gender}</td>
      <td>${n.department}</td>
      <td>${n.email}</td>
      <td>${n.phone}</td>
      <td>
        <div class="action-buttons-cell">
          <button class="action-icon-btn danger" style="border-color: var(--color-danger); color: var(--color-danger);" title="Delete Nurse" onclick="deleteNurseRecord('${n.id}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
  lucide.createIcons();
}

window.deleteNurseRecord = function(id) {
  if (confirm("Are you sure you want to delete this nurse?")) {
    nurses = nurses.filter(n => n.id !== id);
    saveDb("mrms_nurses", nurses);
    logActivity(`Deleted nurse profile: <strong>${id}</strong>`);
    showToast("Nurse profile deleted.", "success");
    renderNursesTable();
  }
};

function handleNurseRegistration(e) {
  e.preventDefault();
  const nameEl = document.getElementById("nurse-name");
  const genderEl = document.getElementById("nurse-gender");
  const deptEl = document.getElementById("nurse-dept");
  const emailEl = document.getElementById("nurse-email");
  const phoneEl = document.getElementById("nurse-phone");
  
  let valid = true;
  [nameEl, genderEl, deptEl, emailEl, phoneEl].forEach(el => {
    if (!el) return;
    const group = el.closest(".form-group");
    if (!el.value.trim()) {
      if (group) group.classList.add("invalid");
      valid = false;
    } else {
      if (group) group.classList.remove("invalid");
    }
  });
  
  if (!valid) return;
  
  const id = generatePersistentId("NUR-2026");
  const newNurse = {
    id,
    name: nameEl.value.trim(),
    gender: genderEl.value,
    department: deptEl.value.trim(),
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    status: "Active",
    joiningDate: new Date().toISOString().split("T")[0]
  };
  
  nurses.push(newNurse);
  saveDb("mrms_nurses", nurses);
  logActivity(`Nurse registered: <strong>${newNurse.name} (${newNurse.id})</strong>`);
  showToast(`Nurse ${newNurse.name} registered successfully.`, "success");
  
  const form = document.getElementById("nurse-form");
  if (form) form.reset();
  renderNursesTable();
}

function renderReceptionistsTable() {
  const tbody = document.getElementById("receptionists-table-body");
  if (!tbody) return;
  if (receptionists.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No receptionist records found.</td></tr>';
    return;
  }
  tbody.innerHTML = receptionists.map(r => `
    <tr>
      <td><strong class="pid-tag">${r.id}</strong></td>
      <td><span class="p-name-txt">${r.name}</span></td>
      <td>${r.gender}</td>
      <td>${r.email}</td>
      <td>${r.phone}</td>
      <td>
        <div class="action-buttons-cell">
          <button class="action-icon-btn danger" style="border-color: var(--color-danger); color: var(--color-danger);" title="Delete Receptionist" onclick="deleteReceptionistRecord('${r.id}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
  lucide.createIcons();
}

window.deleteReceptionistRecord = function(id) {
  if (confirm("Are you sure you want to delete this receptionist?")) {
    receptionists = receptionists.filter(r => r.id !== id);
    saveDb("mrms_receptionists", receptionists);
    logActivity(`Deleted receptionist profile: <strong>${id}</strong>`);
    showToast("Receptionist profile deleted.", "success");
    renderReceptionistsTable();
  }
};

function handleReceptionistRegistration(e) {
  e.preventDefault();
  const nameEl = document.getElementById("receptionist-name");
  const genderEl = document.getElementById("receptionist-gender");
  const emailEl = document.getElementById("receptionist-email");
  const phoneEl = document.getElementById("receptionist-phone");
  
  let valid = true;
  [nameEl, genderEl, emailEl, phoneEl].forEach(el => {
    if (!el) return;
    const group = el.closest(".form-group");
    if (!el.value.trim()) {
      if (group) group.classList.add("invalid");
      valid = false;
    } else {
      if (group) group.classList.remove("invalid");
    }
  });
  
  if (!valid) return;
  
  const id = generatePersistentId("REC-2026");
  const newRec = {
    id,
    name: nameEl.value.trim(),
    gender: genderEl.value,
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    status: "Active",
    joiningDate: new Date().toISOString().split("T")[0]
  };
  
  receptionists.push(newRec);
  saveDb("mrms_receptionists", receptionists);
  logActivity(`Receptionist registered: <strong>${newRec.name} (${newRec.id})</strong>`);
  showToast(`Receptionist ${newRec.name} registered successfully.`, "success");
  
  const form = document.getElementById("receptionist-form");
  if (form) form.reset();
  renderReceptionistsTable();
}

function renderAppointmentsTable() {
  const tbody = document.getElementById("appointments-table-body");
  if (!tbody) return;
  
  const docSelect = document.getElementById("apt-doc-name");
  if (docSelect) {
    docSelect.innerHTML = '<option value="">Select Doctor</option>' +
      doctors.filter(d => d.status === "Active").map(d => `<option value="${d.name}">${d.name}</option>`).join("");
  }
  
  let filtered = appointments;
  const isDoc = currentUser && currentUser.role === "Doctor";
  if (isDoc) {
    filtered = appointments.filter(a => a.doctorName === currentUser.fullName);
  }
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">No appointments scheduled.</td></tr>';
    return;
  }
  
  tbody.innerHTML = filtered.map(a => `
    <tr>
      <td><strong class="pid-tag">${a.id}</strong></td>
      <td>${a.patientName}</td>
      <td>${a.doctorName}</td>
      <td>${a.date}</td>
      <td>${a.time}</td>
      <td><span class="status-badge status-consultation">${a.status || 'Scheduled'}</span></td>
      <td>
        <div class="action-buttons-cell">
          ${isDoc ? '<span style="font-size:0.8rem; color:var(--text-muted);">View Only</span>' : `
          <button class="action-icon-btn danger" style="border-color: var(--color-danger); color: var(--color-danger);" title="Cancel Appointment" onclick="cancelAppointment('${a.id}')">
            <i data-lucide="trash-2"></i>
          </button>
          `}
        </div>
      </td>
    </tr>
  `).join("");
  lucide.createIcons();
}

window.cancelAppointment = function(id) {
  if (confirm("Are you sure you want to cancel this appointment?")) {
    appointments = appointments.filter(a => a.id !== id);
    saveDb("mrms_appointments", appointments);
    logActivity(`Cancelled appointment: <strong>${id}</strong>`);
    showToast("Appointment cancelled successfully.", "success");
    renderAppointmentsTable();
  }
};

function handleAddAppointment(e) {
  e.preventDefault();
  const patNameEl = document.getElementById("apt-patient-name");
  const docNameEl = document.getElementById("apt-doc-name");
  const dateEl = document.getElementById("apt-date");
  const timeEl = document.getElementById("apt-time");
  
  let valid = true;
  [patNameEl, docNameEl, dateEl, timeEl].forEach(el => {
    if (!el) return;
    const group = el.closest(".form-group");
    if (!el.value) {
      if (group) group.classList.add("invalid");
      valid = false;
    } else {
      if (group) group.classList.remove("invalid");
    }
  });
  
  if (!valid) return;
  
  const id = generatePersistentId("APT");
  const newApt = {
    id,
    patientName: patNameEl.value.trim(),
    doctorName: docNameEl.value,
    date: dateEl.value,
    time: timeEl.value,
    status: "Scheduled"
  };
  
  appointments.push(newApt);
  saveDb("mrms_appointments", appointments);
  logActivity(`Scheduled appointment: <strong>${newApt.id}</strong> for <strong>${newApt.patientName}</strong>`);
  showToast("Appointment scheduled successfully.", "success");
  
  const form = document.getElementById("appointment-form");
  if (form) form.reset();
  renderAppointmentsTable();
}

function renderBillingTable() {
  const tbody = document.getElementById("billing-table-body");
  if (!tbody) return;
  
  if (patients.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No patient records found.</td></tr>';
    return;
  }
  
  tbody.innerHTML = patients.map(p => {
    const status = p.billingStatus || "Unpaid";
    const statusClass = status === "Paid" ? "status-completed" : "status-waiting";
    return `
      <tr>
        <td><strong class="pid-tag">${p.id}</strong></td>
        <td>${p.name}</td>
        <td>${p.assignedDoctor || 'Unassigned'}</td>
        <td>₹${p.assignedDoctorFee || 0}</td>
        <td><span class="status-badge ${statusClass}">${status}</span></td>
        <td>
          <div class="action-buttons-cell">
            ${status === "Paid" ? '<span style="font-size:0.8rem; color:var(--color-success); font-weight:600;">Paid</span>' : `
            <button class="btn btn-primary btn-sm" onclick="collectBillingFee('${p.id}')">
              Collect ₹${p.assignedDoctorFee || 0}
            </button>
            `}
          </div>
        </td>
      </tr>
    `;
  }).join("");
  lucide.createIcons();
}

window.collectBillingFee = function(id) {
  const p = patients.find(pat => pat.id === id);
  if (p) {
    p.billingStatus = "Paid";
    saveDb("mrms_patients", patients);
    logActivity(`Collected fee of ₹${p.assignedDoctorFee || 0} from <strong>${p.name}</strong>`);
    showToast(`Payment collected successfully for ${p.name}`, "success");
    renderBillingTable();
    renderDashboardStats();
  }
};

function renderRevenueView() {
  const earningsEl = document.getElementById("revenue-total-earnings");
  const patientsEl = document.getElementById("revenue-total-patients");
  const tbody = document.getElementById("revenue-fee-history-table-body");
  
  const totalRevenue = patients.reduce((sum, p) => sum + (p.assignedDoctorFee || 0), 0);
  const paidCount = patients.filter(p => p.billingStatus === "Paid").length;
  
  if (earningsEl) earningsEl.textContent = `₹${totalRevenue}`;
  if (patientsEl) patientsEl.textContent = paidCount;
  
  if (tbody) {
    const history = getDb("mrms_doctor_fee_history", []);
    if (history.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 20px;">No fee history records found.</td></tr>';
      return;
    }
    tbody.innerHTML = history.map(h => {
      return `
        <tr>
          <td><strong class="pid-tag">${h.doctorId}</strong></td>
          <td>₹${h.oldFee}</td>
          <td>₹${h.newFee}</td>
          <td>${formatDateTime(h.changedOn)}</td>
        </tr>
      `;
    }).join("");
  }
}

function renderUsersTable() {
  const tbody = document.getElementById("users-table-body");
  if (!tbody) return;
  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No user accounts found.</td></tr>';
    return;
  }
  tbody.innerHTML = users.map(u => `
    <tr>
      <td><strong class="pid-tag">${u.userId}</strong></td>
      <td>${u.fullName || u.name}</td>
      <td>${u.email}</td>
      <td><span class="status-badge ${u.role === 'Admin' ? 'status-completed' : u.role === 'Doctor' ? 'status-consultation' : u.role === 'Nurse' ? 'status-followup' : 'status-waiting'}">${u.role}</span></td>
      <td>
        <div class="action-buttons-cell">
          <button class="action-icon-btn primary" title="Edit User" onclick="editUser('${u.userId}')">
            <i data-lucide="edit-2"></i>
          </button>
          <button class="action-icon-btn danger" style="border-color: var(--color-danger); color: var(--color-danger);" title="Delete User" onclick="deleteUserAccount('${u.userId}')">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
  lucide.createIcons();
}

window.deleteUserAccount = function(userId) {
  if (currentUser && currentUser.userId === userId) {
    showToast("You cannot delete your own account.", "danger");
    return;
  }
  if (confirm("Are you sure you want to delete this user?")) {
    users = users.filter(u => u.userId !== userId);
    saveDb("mrms_users", users);
    logActivity(`Deleted user account: <strong>${userId}</strong>`);
    showToast("User deleted successfully.", "success");
    renderUsersTable();
  }
};

window.editUser = function(userId) {
  const u = users.find(usr => usr.userId === userId);
  if (!u) return;
  const idEl = document.getElementById("edit-usr-id");
  const nameEl = document.getElementById("edit-usr-fullname");
  const emailEl = document.getElementById("edit-usr-email");
  const passEl = document.getElementById("edit-usr-password");
  const roleEl = document.getElementById("edit-usr-role");
  
  if (idEl) idEl.value = u.userId;
  if (nameEl) nameEl.value = u.fullName || u.name || "";
  if (emailEl) emailEl.value = u.email || "";
  if (passEl) passEl.value = u.password || "";
  if (roleEl) roleEl.value = u.role || "";
  
  const modal = document.getElementById("edit-user-modal");
  if (modal) modal.classList.add("active");
};

function handleEditUser(e) {
  e.preventDefault();
  const idEl = document.getElementById("edit-usr-id");
  if (!idEl) return;
  const id = idEl.value;
  const u = users.find(usr => usr.userId === id);
  if (!u) return;
  
  const nameEl = document.getElementById("edit-usr-fullname");
  const emailEl = document.getElementById("edit-usr-email");
  const passEl = document.getElementById("edit-usr-password");
  const roleEl = document.getElementById("edit-usr-role");
  
  if (nameEl) u.fullName = nameEl.value.trim();
  if (emailEl) u.email = emailEl.value.trim();
  if (passEl) u.password = passEl.value;
  if (roleEl) u.role = roleEl.value;
  
  saveDb("mrms_users", users);
  logActivity(`Updated clinical user account: <strong>${u.fullName} (${u.userId})</strong>`);
  showToast("User updated successfully.", "success");
  
  const modal = document.getElementById("edit-user-modal");
  if (modal) modal.classList.remove("active");
  renderUsersTable();
}

function handleAddUser(e) {
  e.preventDefault();
  const nameEl = document.getElementById("usr-fullname");
  const emailEl = document.getElementById("usr-email");
  const passEl = document.getElementById("usr-password");
  const roleEl = document.getElementById("usr-role");
  
  let valid = true;
  [nameEl, emailEl, passEl, roleEl].forEach(el => {
    if (!el) return;
    const group = el.closest(".form-group");
    if (!el.value.trim()) {
      if (group) group.classList.add("invalid");
      valid = false;
    } else {
      if (group) group.classList.remove("invalid");
    }
  });
  
  if (!valid) return;
  
  const email = emailEl.value.trim();
  if (users.some(u => u.email === email)) {
    showToast("User with this email already exists.", "danger");
    return;
  }
  
  const userId = generatePersistentId("USR");
  const newUser = {
    userId,
    fullName: nameEl.value.trim(),
    email,
    password: passEl.value,
    role: roleEl.value
  };
  
  users.push(newUser);
  saveDb("mrms_users", users);
  
  logActivity(`Created clinical account: <strong>${newUser.fullName} (${newUser.role})</strong>`);
  showToast(`Account created successfully for ${newUser.fullName}`, "success");
  
  const form = document.getElementById("user-management-form");
  if (form) form.reset();
  renderUsersTable();
}
