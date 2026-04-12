const API_URL = 'http://localhost:3000/api';
const COMPLAINT_CATEGORIES = ['Electrical', 'Network', 'Maintenance', 'Others'];
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

if (urlParams.has('authError')) {
    const email = urlParams.get('email');
    window.history.replaceState({}, document.title, '/');
    showRegister();
    showMessage(urlParams.get('authError'), 'error');
    if (email) {
        document.getElementById('regEmail').value = email;
    }
}

function loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.querySelectorAll('.tab')[1].classList.remove('active');
    clearMessage();
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'flex';
    document.getElementById('registerForm').reset();
    document.querySelectorAll('.tab')[0].classList.remove('active');
    document.querySelectorAll('.tab')[1].classList.add('active');
    clearMessage();
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
            setTimeout(() => {
                showLogin();
            }, 2000);
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
    showLogin();
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
    msgEl.style.display = 'block';
}

function clearMessage() {
    const msgEl = document.getElementById('authMessage');
    msgEl.textContent = '';
    msgEl.className = '';
    msgEl.style.display = 'none';
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function populateCategorySelect(selectId, placeholder) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = [
        `<option value="">${escapeHtml(placeholder)}</option>`,
        ...COMPLAINT_CATEGORIES.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    ].join('');
}

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
            alert('Complaint submitted successfully!');
            hideComplaintForm();
            loadMyComplaints();
        } else {
            alert(data.message || data.errors?.[0]?.msg || 'Failed to submit complaint');
        }
    } catch (err) {
        alert('Failed to submit complaint: ' + err.message);
    }
});

async function loadMyComplaints() {
    try {
        const res = await fetch(`${API_URL}/complaints/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        const list = document.getElementById('complaintsList');
        if (!data.complaints || data.complaints.length === 0) {
            list.innerHTML = '<p>No complaints yet. Submit your first complaint!</p>';
            return;
        }
        
        list.innerHTML = data.complaints.map(c => `
            <div class="complaint-card">
                <div class="complaint-header">
                    <div>
                        <h3>${escapeHtml(c.title)}</h3>
                        <p>${escapeHtml(c.description)}</p>
                    </div>
                    <div>
                        <span class="status ${c.status.replace(/ /g, '.')}">${escapeHtml(c.status)}</span>
                        <span class="priority ${c.priority}">${escapeHtml(c.priority)}</span>
                    </div>
                </div>
                <p><strong>Category:</strong> ${escapeHtml(c.category)}</p>
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
        const [complaintRes, commentsRes, historyRes] = await Promise.all([
            fetch(`${API_URL}/complaints/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API_URL}/complaints/${id}/comments`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API_URL}/complaints/${id}/history`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const complaint = await complaintRes.json();
        const comments = await commentsRes.json();
        const history = await historyRes.json();

        const c = complaint.complaint;
        const isAdmin = userRole === 'admin';
        
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>${escapeHtml(c.title)}</h2>
            <p>${escapeHtml(c.description)}</p>
            <p><strong>Status:</strong> <span class="status ${c.status.replace(/ /g, '.')}">${escapeHtml(c.status)}</span></p>
            <p><strong>Priority:</strong> <span class="priority ${c.priority}">${escapeHtml(c.priority)}</span></p>
            <p><strong>Category:</strong> ${escapeHtml(c.category)}</p>
            <p><strong>Created:</strong> ${new Date(c.created_at).toLocaleString()}</p>
            
            ${isAdmin ? `
                <div style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
                    <label><strong>Change Status:</strong></label>
                    <select id="modalStatusSelect" style="padding: 0.5rem; margin: 0 0.5rem;">
                        <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                    <button onclick="updateStatusFromModal(${id})">Update Status</button>
                </div>
            ` : ''}
            
            <h3>Comments</h3>
            <div id="commentsList">
                ${comments.comments && comments.comments.length > 0 ? comments.comments.map(cm => `
                    <div class="comment">
                        <strong>${escapeHtml(cm.user_name)}</strong> - ${new Date(cm.created_at).toLocaleString()}
                        <p>${escapeHtml(cm.comment)}</p>
                    </div>
                `).join('') : '<p>No comments yet</p>'}
            </div>
            
            <form id="addCommentForm" style="margin-top: 1rem;">
                <textarea id="newComment" placeholder="Add a comment" required style="width: 100%; min-height: 80px; padding: 0.5rem;"></textarea>
                <button type="submit" style="margin-top: 0.5rem;">Add Comment</button>
            </form>

            <h3>History</h3>
            <div>
                ${history.history && history.history.length > 0 ? history.history.map(h => `
                    <div class="comment">
                        <strong>${escapeHtml(h.changed_by_name)}</strong> changed <strong>${escapeHtml(h.field_name)}</strong> 
                        from "${escapeHtml(h.old_value)}" to "${escapeHtml(h.new_value)}"
                        <br><small>${new Date(h.changed_at).toLocaleString()}</small>
                    </div>
                `).join('') : '<p>No history</p>'}
            </div>
        `;

        document.getElementById('addCommentForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const comment = document.getElementById('newComment').value;
            const res = await fetch(`${API_URL}/complaints/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment })
            });
            if (res.ok) {
                viewComplaint(id);
            }
        });

        document.getElementById('modal').style.display = 'flex';
    } catch (err) {
        console.error('View complaint error:', err);
        alert('Failed to load complaint details');
    }
}

async function updateStatusFromModal(id) {
    const status = document.getElementById('modalStatusSelect').value;
    await updateStatus(id, status);
    closeModal();
    if (userRole === 'admin') {
        loadAdminStats();
        loadAdminComplaints();
    }
}

async function loadAdminStats() {
    try {
        const res = await fetch(`${API_URL}/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        document.getElementById('stats').innerHTML = `
            <div class="stat-card"><h3>${data.stats.total || 0}</h3><p>Total</p></div>
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
    const priority = document.getElementById('filterPriority').value;
    const search = document.getElementById('searchInput').value;
    const list = document.getElementById('adminComplaintsList');
    const params = new URLSearchParams();

    if (status) params.set('status', status);
    if (category) params.set('category', category);
    if (priority) params.set('priority', priority);
    if (search) params.set('search', search);

    const url = `${API_URL}/admin/complaints${params.toString() ? `?${params.toString()}` : ''}`;

    try {
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) {
            const data = await res.json();
            list.innerHTML = `<div class="complaint-card"><p>Error: ${escapeHtml(data.message || 'Failed to load complaints')}</p></div>`;
            return;
        }

        const data = await res.json();

        if (!Array.isArray(data.complaints) || data.complaints.length === 0) {
            list.innerHTML = '<div class="complaint-card"><p>No complaints found.</p></div>';
            return;
        }

        list.innerHTML = data.complaints.map(c => `
            <div class="complaint-card">
                <div class="complaint-header">
                    <div>
                        <h3>${escapeHtml(c.title)}</h3>
                        <p>${escapeHtml(c.description)}</p>
                        <p><strong>User:</strong> ${escapeHtml(c.user_name)} (${escapeHtml(c.user_email)})</p>
                    </div>
                    <div>
                        <span class="status ${c.status.replace(/ /g, '.')}">${escapeHtml(c.status)}</span>
                        <span class="priority ${c.priority}">${escapeHtml(c.priority)}</span>
                    </div>
                </div>
                <p><strong>Category:</strong> ${escapeHtml(c.category)}</p>
                <p><strong>Created:</strong> ${new Date(c.created_at).toLocaleString()}</p>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                    <select onchange="updateStatus(${c.id}, this.value)" style="flex: 1;">
                        <option value="">Change Status</option>
                        <option value="Pending" ${c.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                    <button onclick="viewComplaint(${c.id})">View Details</button>
                    <button onclick="deleteComplaint(${c.id})" style="background: #e74c3c;">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Load complaints error:', err);
        list.innerHTML = `<div class="complaint-card"><p>Error fetching complaints</p></div>`;
    }
}

async function updateStatus(id, status) {
    if (!status) return;
    
    try {
        const res = await fetch(`${API_URL}/admin/complaints/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        if (res.ok) {
            loadAdminStats();
            loadAdminComplaints();
        } else {
            alert('Failed to update status');
        }
    } catch (err) {
        alert('Failed to update status');
    }
}

async function deleteComplaint(id) {
    if (!confirm('Are you sure you want to delete this complaint?')) return;
    
    try {
        const res = await fetch(`${API_URL}/admin/complaints/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            loadAdminStats();
            loadAdminComplaints();
        } else {
            alert('Failed to delete complaint');
        }
    } catch (err) {
        alert('Failed to delete complaint');
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

let searchTimeout;
function handleSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        loadAdminComplaints();
    }, 500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    populateCategorySelect('category', 'Select Category');
    populateCategorySelect('filterCategory', 'All Categories');

    document.getElementById('googleSignInBtn')?.addEventListener('click', loginWithGoogle);
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    document.getElementById('loginTab')?.addEventListener('click', showLogin);
    document.getElementById('registerTab')?.addEventListener('click', showRegister);
    document.getElementById('newComplaintBtn')?.addEventListener('click', showComplaintForm);
    document.getElementById('cancelComplaintBtn')?.addEventListener('click', hideComplaintForm);
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    
    document.getElementById('filterStatus')?.addEventListener('change', loadAdminComplaints);
    document.getElementById('filterCategory')?.addEventListener('change', loadAdminComplaints);
    document.getElementById('filterPriority')?.addEventListener('change', loadAdminComplaints);
});

if (token) {
    showMainSection();
}
