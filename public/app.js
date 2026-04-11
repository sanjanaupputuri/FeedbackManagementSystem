const API_URL = 'http://localhost:3000/api';
let token = localStorage.getItem('token');
let userRole = localStorage.getItem('role');

// Check for Google OAuth redirect
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('token')) {
    token = urlParams.get('token');
    userRole = urlParams.get('role');
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('userName', urlParams.get('name'));
    window.history.replaceState({}, document.title, '/');
    showMainSection();
}

function loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
}

// Auth Functions
function showLogin() {
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('registerForm').style.display = 'none';
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.querySelectorAll('.tab')[1].classList.remove('active');
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'flex';
    document.querySelectorAll('.tab')[0].classList.remove('active');
    document.querySelectorAll('.tab')[1].classList.add('active');
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            token = data.token;
            userRole = data.user.role;
            localStorage.setItem('token', token);
            localStorage.setItem('role', userRole);
            localStorage.setItem('userName', data.user.name);
            showMainSection();
        } else {
            showMessage(data.message, 'error');
        }
    } catch (err) {
        showMessage('Login failed', 'error');
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            showMessage('Registration successful! Please login.', 'success');
            setTimeout(showLogin, 2000);
        } else {
            showMessage(data.message, 'error');
        }
    } catch (err) {
        showMessage('Registration failed', 'error');
    }
});

function logout() {
    localStorage.clear();
    token = null;
    userRole = null;
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('mainSection').style.display = 'none';
    document.getElementById('navbar').style.display = 'none';
}

function showMainSection() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('mainSection').style.display = 'block';
    document.getElementById('navbar').style.display = 'flex';
    document.getElementById('userInfo').textContent = localStorage.getItem('userName');

    if (userRole === 'admin') {
        document.getElementById('userView').style.display = 'none';
        document.getElementById('adminView').style.display = 'block';
        loadAdminStats();
        loadAdminComplaints();
    } else {
        document.getElementById('userView').style.display = 'block';
        document.getElementById('adminView').style.display = 'none';
        loadMyComplaints();
    }
}

function showMessage(msg, type) {
    const msgEl = document.getElementById('authMessage');
    msgEl.textContent = msg;
    msgEl.className = type;
}

// Complaint Functions
function showComplaintForm() {
    document.getElementById('complaintForm').style.display = 'block';
}

function hideComplaintForm() {
    document.getElementById('complaintForm').style.display = 'none';
    document.getElementById('newComplaintForm').reset();
}

document.getElementById('newComplaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('priority', document.getElementById('priority').value);
    
    const imageFile = document.getElementById('image').files[0];
    if (imageFile) formData.append('image', imageFile);

    try {
        const res = await fetch(`${API_URL}/complaints`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        const data = await res.json();

        if (res.ok) {
            hideComplaintForm();
            loadMyComplaints();
        } else {
            alert(data.message || 'Failed to submit complaint');
        }
    } catch (err) {
        alert('Failed to submit complaint');
    }
});

async function loadMyComplaints() {
    try {
        const res = await fetch(`${API_URL}/complaints/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        const list = document.getElementById('complaintsList');
        list.innerHTML = data.complaints.map(c => `
            <div class="complaint-card">
                <div class="complaint-header">
                    <div>
                        <h3>${c.title}</h3>
                        <p>${c.description}</p>
                    </div>
                    <div>
                        <span class="status ${c.status.replace(' ', '.')}">${c.status}</span>
                        <span class="priority ${c.priority}">${c.priority}</span>
                    </div>
                </div>
                <p><strong>Category:</strong> ${c.category}</p>
                <p><strong>Created:</strong> ${new Date(c.created_at).toLocaleString()}</p>
                <button onclick="viewComplaint(${c.id})">View Details</button>
            </div>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

async function viewComplaint(id) {
    try {
        const [complaint, comments, history] = await Promise.all([
            fetch(`${API_URL}/complaints/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.json()),
            fetch(`${API_URL}/complaints/${id}/comments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.json()),
            fetch(`${API_URL}/complaints/${id}/history`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.json())
        ]);

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>${complaint.complaint.title}</h2>
            <p>${complaint.complaint.description}</p>
            <p><strong>Status:</strong> <span class="status ${complaint.complaint.status.replace(' ', '.')}">${complaint.complaint.status}</span></p>
            <p><strong>Priority:</strong> <span class="priority ${complaint.complaint.priority}">${complaint.complaint.priority}</span></p>
            <p><strong>Category:</strong> ${complaint.complaint.category}</p>
            
            <h3>Comments</h3>
            <div id="commentsList">
                ${comments.comments.map(c => `
                    <div class="comment">
                        <strong>${c.user_name}</strong> - ${new Date(c.created_at).toLocaleString()}
                        <p>${c.comment}</p>
                    </div>
                `).join('') || '<p>No comments yet</p>'}
            </div>
            
            <form id="addCommentForm">
                <textarea id="newComment" placeholder="Add a comment" required></textarea>
                <button type="submit">Add Comment</button>
            </form>

            <h3>History</h3>
            ${history.history.map(h => `
                <div class="comment">
                    <strong>${h.changed_by_name}</strong> changed <strong>${h.field_name}</strong> 
                    from "${h.old_value}" to "${h.new_value}"
                    <br><small>${new Date(h.changed_at).toLocaleString()}</small>
                </div>
            `).join('') || '<p>No history</p>'}
        `;

        document.getElementById('addCommentForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const comment = document.getElementById('newComment').value;
            await fetch(`${API_URL}/complaints/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment })
            });
            viewComplaint(id);
        });

        document.getElementById('modal').style.display = 'flex';
    } catch (err) {
        console.error(err);
    }
}

// Admin Functions
async function loadAdminStats() {
    try {
        const res = await fetch(`${API_URL}/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        document.getElementById('stats').innerHTML = `
            <div class="stat-card"><h3>${data.stats.total}</h3><p>Total</p></div>
            <div class="stat-card"><h3>${data.stats.Pending || 0}</h3><p>Pending</p></div>
            <div class="stat-card"><h3>${data.stats['In Progress'] || 0}</h3><p>In Progress</p></div>
            <div class="stat-card"><h3>${data.stats.Resolved || 0}</h3><p>Resolved</p></div>
        `;
    } catch (err) {
        console.error(err);
    }
}

async function loadAdminComplaints() {
    const status = document.getElementById('filterStatus').value;
    const category = document.getElementById('filterCategory').value;
    
    let url = `${API_URL}/admin/complaints?`;
    if (status) url += `status=${status}&`;
    if (category) url += `category=${category}&`;

    try {
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        const list = document.getElementById('adminComplaintsList');
        list.innerHTML = data.complaints.map(c => `
            <div class="complaint-card">
                <div class="complaint-header">
                    <div>
                        <h3>${c.title}</h3>
                        <p>${c.description}</p>
                        <p><strong>User:</strong> ${c.user_name} (${c.user_email})</p>
                    </div>
                    <div>
                        <span class="status ${c.status.replace(' ', '.')}">${c.status}</span>
                        <span class="priority ${c.priority}">${c.priority}</span>
                    </div>
                </div>
                <p><strong>Category:</strong> ${c.category}</p>
                <p><strong>Created:</strong> ${new Date(c.created_at).toLocaleString()}</p>
                <select onchange="updateStatus(${c.id}, this.value)">
                    <option value="">Change Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                </select>
                <button onclick="viewComplaint(${c.id})">View Details</button>
                <button onclick="deleteComplaint(${c.id})" style="background: #e74c3c;">Delete</button>
            </div>
        `).join('');
    } catch (err) {
        console.error(err);
    }
}

async function updateStatus(id, status) {
    if (!status) return;
    
    try {
        await fetch(`${API_URL}/admin/complaints/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        loadAdminStats();
        loadAdminComplaints();
    } catch (err) {
        alert('Failed to update status');
    }
}

async function deleteComplaint(id) {
    if (!confirm('Delete this complaint?')) return;
    
    try {
        await fetch(`${API_URL}/admin/complaints/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadAdminStats();
        loadAdminComplaints();
    } catch (err) {
        alert('Failed to delete complaint');
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Google Sign-In button
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', loginWithGoogle);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Tab buttons
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    if (loginTab) loginTab.addEventListener('click', showLogin);
    if (registerTab) registerTab.addEventListener('click', showRegister);

    // New complaint button
    const newComplaintBtn = document.getElementById('newComplaintBtn');
    if (newComplaintBtn) {
        newComplaintBtn.addEventListener('click', showComplaintForm);
    }

    // Cancel complaint button
    const cancelComplaintBtn = document.getElementById('cancelComplaintBtn');
    if (cancelComplaintBtn) {
        cancelComplaintBtn.addEventListener('click', hideComplaintForm);
    }

    // Close modal button
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Filter selects
    const filterStatus = document.getElementById('filterStatus');
    const filterCategory = document.getElementById('filterCategory');
    if (filterStatus) {
        filterStatus.addEventListener('change', loadAdminComplaints);
    }
    if (filterCategory) {
        filterCategory.addEventListener('change', loadAdminComplaints);
    }
});

// Initialize
if (token) {
    showMainSection();
}
