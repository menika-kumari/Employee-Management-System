const users = {
  admin: { password: 'admin123', role: 'Admin' },
  manager: { password: 'manager123', role: 'Manager' },
  employee: { password: 'employee123', role: 'Employee' }
};

const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const dashboard = document.getElementById('dashboard');
const userRoleSpan = document.getElementById('user-role');
const adminControls = document.getElementById('admin-controls');
const content = document.getElementById('content');

loginForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value;

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

  const data = await res.json();

  if (res.ok && data.success) {
      showPopup(`Welcome, ${username}!`, 'success');
      showDashboard(data.role);
    } else {
      showPopup(data.message || 'Login failed', 'error');
    }
  } catch (err) {
    showPopup('Server error. Please try again later.', 'error');
    console.error(err);
  }
  
  loginForm.reset();
});

function showDashboard(role) {
  loginSection.classList.add('hidden');
  dashboard.classList.remove('hidden');
  userRoleSpan.textContent = role;

  if (role === 'Admin') {
    adminControls.classList.remove('hidden');
  } else {
    adminControls.classList.add('hidden');
  }
}

function logout() {
  showPopup('Logged out successfully.', 'success');
  loginSection.classList.remove('hidden');
  dashboard.classList.add('hidden');
  userRoleSpan.textContent = '';
  adminControls.classList.add('hidden');
  content.innerHTML = '';
}

function loadAdminPanel() {
  content.innerHTML = '<h3>👨‍💼 Admin Panel</h3><p>Manage employees, roles, and credentials.</p>';
  showPopup('Admin panel loaded.', 'success');
}

function loadAttendance() {
  content.innerHTML = '<h3>📅 Attendance</h3><p>Track check-in/check-out logs and monthly reports.</p>';
  showPopup('Attendance section loaded.', 'success');
}

function loadSalary() {
  content.innerHTML = '<h3>💰 Salary</h3><p>View payroll, bonuses, and generate payslips.</p>';
  showPopup('Salary section loaded.', 'success');
}

function showPopup(message, type) {
  const popup = document.createElement('div');
  popup.className = `popup ${type === 'error' ? 'error' : ''}`;
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 3000);
}
