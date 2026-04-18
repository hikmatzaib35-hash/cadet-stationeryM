const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

// Initial Sync from LocalStorage
let products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];

// Check if already authenticated (simple session check)
if (localStorage.getItem('cadet_admin_auth') === 'true') {
    showDashboard();
}

function adminLogin() {
    const user = document.getElementById('adminUsername').value;
    const pass = document.getElementById('adminPassword').value;

    if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('cadet_admin_auth', 'true');
        showDashboard();
    } else {
        alert('Authentication failed. Check your security key.');
    }
}

function showDashboard() {
    document.getElementById('loginArea').classList.add('hidden');
    document.getElementById('dashboardArea').style.display = 'block';
    document.getElementById('logoutBtn').classList.remove('hidden');
    renderAdminProducts();
}

function adminLogout() {
    localStorage.removeItem('cadet_admin_auth');
    document.getElementById('loginArea').classList.remove('hidden');
    document.getElementById('dashboardArea').style.display = 'none';
    document.getElementById('logoutBtn').classList.add('hidden');
}

function renderAdminProducts() {
    const root = document.getElementById('adminProductRoot');
    if (!root) return;
    
    root.innerHTML = '';
    // Refresh local products array from storage to stay in sync
    products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];

    products.forEach((p, index) => {
        root.innerHTML += `
            <tr>
                <td><img src="${p.img}" style="width: 50px; height: 50px; object-fit: cover; border: 1px solid var(--accent-gold); border-radius: 4px;"></td>
                <td style="font-weight: 500;">${p.name}</td>
                <td style="color: var(--accent-gold);">${p.price}</td>
                <td>
                    <button class="action-btn" onclick="editProduct(${index})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="action-btn" onclick="deleteProduct(${index})" style="border-color: #ff4d4d; color: #ff4d4d;"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
    document.getElementById('totalProducts').innerText = products.length;
}

function saveChanges() {
    localStorage.setItem('cadet_inventory', JSON.stringify(products));
}

function deleteProduct(index) {
    if(confirm('Are you sure you want to remove this item?')) {
        products.splice(index, 1);
        saveChanges();
        renderAdminProducts();
    }
}

function openAddModal() {
    const name = prompt('Product Name:');
    const category = prompt('Category (writing, paper, tools, gifts):', 'writing');
    const price = prompt('Price (e.g., Rs. 5,000):');
    const img = prompt('Image URL (Unsplash link works best):');

    if (name && price && img && category) {
        products.unshift({ id: Date.now(), category, name, price, img });
        saveChanges();
        renderAdminProducts();
        alert('New product added to the collection!');
    }
}

function editProduct(index) {
    const p = products[index];
    const newName = prompt('New Name:', p.name);
    const newPrice = prompt('New Price:', p.price);
    const newImg = prompt('New Image URL:', p.img);
    const newCat = prompt('New Category:', p.category);

    if (newName && newPrice && newImg && newCat) {
        products[index] = { ...p, name: newName, price: newPrice, img: newImg, category: newCat };
        saveChanges();
        renderAdminProducts();
        alert('Product updated successfully!');
    }
}

function resetInventory() {
    if(confirm('This will reset the store to the default 85+ products. All custom changes will be lost. Proceed?')) {
        localStorage.removeItem('cadet_inventory');
        location.reload(); // products.js will handle the re-initialization
    }
}
