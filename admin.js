/* ═══════════════════════════════════════════════
   Cadet Stationery — Admin Command Center JS
   ═══════════════════════════════════════════════ */

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

let products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];
let categories = JSON.parse(localStorage.getItem('cadet_categories')) || [
    { id: 'writing', name: 'Instruments' },
    { id: 'paper', name: 'Paper & Journals' },
    { id: 'tools', name: 'Desk Tools' },
    { id: 'gifts', name: 'Artisan Gifts' },
    { id: 'office', name: 'Office Essentials' },
    { id: 'luxury', name: 'Luxury Suite' },
    { id: 'art', name: 'Artistic Canvas' },
    { id: 'cards', name: 'Greets & Cards' }
];
let currentBase64 = "";
let pendingDeleteFn = null;

/* ──────────────────────────────────────
   TOAST NOTIFICATIONS
────────────────────────────────────── */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toastIcon');
    const msg = document.getElementById('toastMsg');

    toast.className = 'show ' + type;
    icon.className = type === 'success'
        ? 'fas fa-check-circle toast-icon'
        : 'fas fa-triangle-exclamation toast-icon';
    msg.textContent = message;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.className = ''; }, 3200);
}

/* ──────────────────────────────────────
   CONFIRM MODAL
────────────────────────────────────── */
function showModal(title, message, onConfirm) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('modalConfirmBtn').onclick = () => {
        onConfirm();
        closeModal();
    };
    document.getElementById('confirmModal').classList.add('open');
}

function closeModal() {
    document.getElementById('confirmModal').classList.remove('open');
}

/* ──────────────────────────────────────
   IMAGE COMPRESSION
────────────────────────────────────── */
function compressImage(file, maxW, maxH, quality, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let w = img.width, h = img.height;
            if (w > h) { if (w > maxW) { h *= maxW / w; w = maxW; } }
            else { if (h > maxH) { w *= maxH / h; h = maxH; } }
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            callback(canvas.toDataURL('image/jpeg', quality));
        };
    };
}

/* ──────────────────────────────────────
   AUTH
────────────────────────────────────── */
if (localStorage.getItem('cadet_admin_auth') === 'true') {
    bootDashboard();
}

function adminLogin() {
    const user = document.getElementById('adminUsername').value.trim();
    const pass = document.getElementById('adminPassword').value;
    const errEl = document.getElementById('loginError');

    if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('cadet_admin_auth', 'true');
        document.getElementById('loginPage').style.opacity = '0';
        document.getElementById('loginPage').style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.getElementById('loginPage').style.display = 'none';
            bootDashboard();
        }, 500);
    } else {
        errEl.style.display = 'block';
        errEl.style.animation = 'none';
        setTimeout(() => { errEl.style.animation = 'shake 0.4s ease'; }, 10);
    }
}

function bootDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminApp').style.display = 'block';

    // Firebase sync
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebase.database().ref('inventory').once('value', snap => {
            if (snap.exists()) {
                products = snap.val();
                localStorage.setItem('cadet_inventory', JSON.stringify(products));
                refreshAll();
            }
        });
        firebase.database().ref('categories').once('value', snap => {
            if (snap.exists()) {
                categories = snap.val();
                localStorage.setItem('cadet_categories', JSON.stringify(categories));
                refreshAll();
            }
        });
    }

    refreshAll();
}

function adminLogout() {
    showModal(
        'Logging Out',
        'Are you sure you want to end your session?',
        () => {
            localStorage.removeItem('cadet_admin_auth');
            location.reload();
        }
    );
}

/* ──────────────────────────────────────
   PANEL NAVIGATION
────────────────────────────────────── */
function switchPanel(panelId, navEl) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById('panel-' + panelId).classList.add('active');
    if (navEl) navEl.classList.add('active');

    const titles = {
        dashboard: ['Dashboard', 'Overview'],
        products: ['Products', 'Inventory Management'],
        categories: ['Collections', 'Category Manager']
    };

    document.getElementById('panelTitle').textContent = titles[panelId][0];
    document.getElementById('panelBreadcrumb').textContent = titles[panelId][1];

    // Auto-close sidebar on mobile after navigation
    if (window.innerWidth <= 900) {
        closeSidebar();
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
}

/* ──────────────────────────────────────
   REFRESH ALL DATA
────────────────────────────────────── */
function refreshAll() {
    products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];
    categories = JSON.parse(localStorage.getItem('cadet_categories')) || categories;

    renderStats();
    renderRecentProducts();
    renderAdminProducts();
    renderAdminCategories();
}

/* ──────────────────────────────────────
   STATS
────────────────────────────────────── */
function renderStats() {
    let totalValue = 0;
    products.forEach(p => {
        totalValue += parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0;
    });

    document.getElementById('statProducts').textContent = products.length;
    document.getElementById('sidebarProductCount').textContent = products.length;
    document.getElementById('statCategories').textContent = categories.length;

    const valEl = document.getElementById('statValue');
    if (totalValue >= 1000000) {
        valEl.textContent = 'Rs. ' + (totalValue / 1000000).toFixed(1) + 'M';
    } else if (totalValue >= 1000) {
        valEl.textContent = 'Rs. ' + (totalValue / 1000).toFixed(1) + 'k';
    } else {
        valEl.textContent = 'Rs. ' + totalValue;
    }
}

/* ──────────────────────────────────────
   RECENT PRODUCTS (Dashboard)
────────────────────────────────────── */
function renderRecentProducts() {
    const root = document.getElementById('recentProductsRoot');
    if (!root) return;

    const recent = products.slice(0, 6);

    if (recent.length === 0) {
        root.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:30px;">No products yet</td></tr>`;
        return;
    }

    root.innerHTML = recent.map(p => {
        const catName = (categories.find(c => c.id === p.category) || {}).name || p.category || '—';
        return `
        <tr>
            <td><img src="${p.img}" class="product-thumb" alt="${p.name}"></td>
            <td style="font-weight:500;">${p.name}</td>
            <td><span class="category-tag">${catName}</span></td>
            <td class="price-tag">${p.price}</td>
        </tr>`;
    }).join('');
}

/* ──────────────────────────────────────
   PRODUCTS TABLE
────────────────────────────────────── */
function renderAdminProducts(filter = '') {
    const root = document.getElementById('adminProductRoot');
    const emptyEl = document.getElementById('productEmptyState');
    if (!root) return;

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        root.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    root.innerHTML = filtered.map((p, idx) => {
        const realIdx = products.indexOf(p);
        const catName = (categories.find(c => c.id === p.category) || {}).name || p.category || '—';
        return `
        <tr>
            <td><img src="${p.img}" class="product-thumb" alt="${p.name}"></td>
            <td style="font-weight:500;max-width:220px;">${p.name}</td>
            <td><span class="category-tag">${catName}</span></td>
            <td class="price-tag">${p.price}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-outline btn-sm" onclick="editProduct(${realIdx})">
                        <i class="fas fa-pen"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteProduct(${realIdx})">
                        <i class="fas fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

function filterProducts() {
    const q = document.getElementById('productSearch').value;
    renderAdminProducts(q);
}

/* ──────────────────────────────────────
   CATEGORIES TABLE
────────────────────────────────────── */
function renderAdminCategories() {
    const root = document.getElementById('adminCategoryRoot');
    const select = document.getElementById('p_cat');
    if (!root) return;

    root.innerHTML = categories.map((c, i) => `
        <tr>
            <td style="color:var(--text-muted);font-size:0.8rem;">${i + 1}</td>
            <td style="font-weight:600;">${c.name}</td>
            <td><code style="font-size:0.75rem;color:var(--blue);background:rgba(76,201,240,0.08);padding:3px 8px;">${c.id}</code></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="confirmDeleteCategory(${i})">
                    <i class="fas fa-trash-can"></i> Remove
                </button>
            </td>
        </tr>
    `).join('');

    if (select) {
        select.innerHTML = categories.map(c =>
            `<option value="${c.id}">${c.name}</option>`
        ).join('');
    }
}

/* ──────────────────────────────────────
   CATEGORY CRUD
────────────────────────────────────── */
function showCategoryForm() {
    document.getElementById('categoryFormOverlay').classList.add('open');
    document.getElementById('c_name').focus();
}

function hideCategoryForm() {
    document.getElementById('categoryFormOverlay').classList.remove('open');
    document.getElementById('c_name').value = '';
}

function saveCategory() {
    const name = document.getElementById('c_name').value.trim();
    if (!name) { showToast('Please enter a collection name!', 'error'); return; }

    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    categories.push({ id, name });
    localStorage.setItem('cadet_categories', JSON.stringify(categories));

    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebase.database().ref('categories').set(categories);
    }

    renderAdminCategories();
    renderStats();
    hideCategoryForm();
    showToast(`Collection "${name}" added!`);
}

function confirmDeleteCategory(index) {
    showModal(
        'Remove Collection',
        `Delete "${categories[index].name}"? Products in this collection won't be removed.`,
        () => deleteCategory(index)
    );
}

function deleteCategory(index) {
    const name = categories[index].name;
    categories.splice(index, 1);
    localStorage.setItem('cadet_categories', JSON.stringify(categories));

    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebase.database().ref('categories').set(categories);
    }

    renderAdminCategories();
    renderStats();
    showToast(`Collection "${name}" removed.`);
}

/* ──────────────────────────────────────
   PRODUCT CRUD
────────────────────────────────────── */
function showAddForm() {
    resetForm();
    document.getElementById('productFormOverlay').classList.add('open');
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('editIndex').value = '-1';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => document.getElementById('p_name').focus(), 300);
}

function closeProductForm() {
    document.getElementById('productFormOverlay').classList.remove('open');
    resetForm();
}

function resetForm() {
    document.getElementById('p_name').value = '';
    document.getElementById('p_price').value = '';
    document.getElementById('p_img').value = '';
    document.getElementById('p_file').value = '';
    document.getElementById('imgPreview').classList.remove('show');
    currentBase64 = '';
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        compressImage(input.files[0], 800, 800, 0.72, (base64) => {
            currentBase64 = base64;
            document.getElementById('imgPreview').classList.add('show');
            document.getElementById('previewTag').src = base64;
            document.getElementById('p_img').value = 'Product Image Optimized';
        });
    }
}

function saveProductEntry() {
    const index = parseInt(document.getElementById('editIndex').value);
    const name = document.getElementById('p_name').value.trim();
    const cat = document.getElementById('p_cat').value;
    const price = document.getElementById('p_price').value.trim();
    let img = document.getElementById('p_img').value.trim();

    if (currentBase64) {
        img = currentBase64;
    } else if (index !== -1 && img.toLowerCase().includes('optimized')) {
        img = products[index].img;
    }

    if (!name || !price || !img) {
        showToast('Please fill all required fields!', 'error');
        return;
    }

    const item = { id: Date.now(), category: cat, name, price, img };

    try {
        if (index === -1) products.unshift(item);
        else products[index] = item;

        localStorage.setItem('cadet_inventory', JSON.stringify(products));

        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            firebase.database().ref('inventory').set(products)
                .then(() => console.log('Synced to Firebase'))
                .catch(err => console.error('Firebase error:', err));
        }

        closeProductForm();
        refreshAll();
        showToast(index === -1 ? `"${name}" added!` : `"${name}" updated!`);
    } catch (e) {
        showToast('Storage full! Try a smaller image.', 'error');
    }
}

function editProduct(index) {
    const p = products[index];
    document.getElementById('productFormOverlay').classList.add('open');
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('editIndex').value = index;
    document.getElementById('p_name').value = p.name;
    document.getElementById('p_price').value = p.price;
    document.getElementById('p_img').value = p.img.length > 200 ? 'Product Image Optimized' : p.img;
    document.getElementById('previewTag').src = p.img;
    document.getElementById('imgPreview').classList.add('show');

    // Set category
    setTimeout(() => {
        const sel = document.getElementById('p_cat');
        if (sel) sel.value = p.category;
    }, 50);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function confirmDeleteProduct(index) {
    showModal(
        'Delete Product',
        `Remove "${products[index].name}" from inventory?`,
        () => deleteProduct(index)
    );
}

function deleteProduct(index) {
    const name = products[index].name;
    products.splice(index, 1);
    localStorage.setItem('cadet_inventory', JSON.stringify(products));

    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebase.database().ref('inventory').set(products);
    }

    refreshAll();
    showToast(`"${name}" deleted.`);
}

function confirmResetInventory() {
    showModal(
        'Reset Inventory',
        'This will permanently remove all products and restore defaults. Are you sure?',
        () => {
            localStorage.removeItem('cadet_inventory');
            showToast('Inventory reset to defaults.');
            setTimeout(() => location.reload(), 1000);
        }
    );
}
