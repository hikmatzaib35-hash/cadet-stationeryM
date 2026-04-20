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

// Helper to compress images to ensure they fit in LocalStorage
function compressImage(file, maxWidth, maxHeight, quality, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Export as JPEG with compression
            const result = canvas.toDataURL('image/jpeg', quality);
            callback(result);
        };
    };
}


// Inventory data initialized via products.js default logic if empty


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
        alert('Authentication failed.');
    }
}

function showDashboard() {
    document.getElementById('loginArea').classList.add('hidden');
    document.getElementById('dashboardArea').style.display = 'block';
    document.getElementById('logoutBtn').classList.remove('hidden');

    // Attempt to sync from Firebase on load
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebase.database().ref('inventory').once('value', snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                localStorage.setItem('cadet_inventory', JSON.stringify(data));
                products = data;
                renderAdminProducts();
            }
        });

        firebase.database().ref('categories').once('value', snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                localStorage.setItem('cadet_categories', JSON.stringify(data));
                categories = data;
                renderAdminCategories();
            }
        });
    }
    renderAdminProducts();
    renderAdminCategories();
}


function adminLogout() {
    localStorage.removeItem('cadet_admin_auth');
    location.reload();
}

function renderAdminCategories() {
    const root = document.getElementById('adminCategoryRoot');
    const select = document.getElementById('p_cat');
    if (!root) return;

    root.innerHTML = '';
    categories = JSON.parse(localStorage.getItem('cadet_categories')) || categories;

    let selectHtml = '';
    categories.forEach((c, index) => {
        root.innerHTML += `
            <tr>
                <td style="font-weight: 700; color: var(--text-white);">${c.name}</td>
                <td style="text-align: right;">
                    <button class="action-btn" onclick="deleteCategory(${index})" style="color: #ff4d4d; border-color: rgba(255,77,77,0.3);">Remove</button>
                </td>
            </tr>
        `;
        selectHtml += `<option value="${c.id}">${c.name}</option>`;
    });

    if (select) select.innerHTML = selectHtml;
}

function showCategoryForm() {
    document.getElementById('categoryForm').classList.remove('hidden');
}
function hideCategoryForm() {
    document.getElementById('categoryForm').classList.add('hidden');
}

function saveCategory() {
    const name = document.getElementById('c_name').value.trim();
    if (!name) return alert("Please enter a collection name!");

    // Auto-generate ID from Name (e.g. "Office Tools" -> "office-tools")
    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    categories.push({ id, name });
    localStorage.setItem('cadet_categories', JSON.stringify(categories));

    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebase.database().ref('categories').set(categories);
    }

    renderAdminCategories();
    hideCategoryForm();
    document.getElementById('c_name').value = "";
}

function deleteCategory(index) {
    if (confirm('Delete this collection? All products in this collection will stay but their filter will disappear.')) {
        categories.splice(index, 1);
        localStorage.setItem('cadet_categories', JSON.stringify(categories));
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            firebase.database().ref('categories').set(categories);
        }
        renderAdminCategories();
    }
}

function renderAdminProducts() {
    const root = document.getElementById('adminProductRoot');
    if (!root) return;

    root.innerHTML = '';
    products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];

    let totalValue = 0;

    products.forEach((p, index) => {
        // Calculate total value: parse price string (e.g. "Rs. 5,000" -> 5000)
        const numericPrice = parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0;
        totalValue += numericPrice;

        root.innerHTML += `
            <tr>
                <td><img src="${p.img}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid var(--glass-border);"></td>
                <td style="font-size: 0.9rem;">${p.name}</td>
                <td>
                    <button class="action-btn" onclick="editProduct(${index})">Edit</button>
                    <button class="action-btn" onclick="deleteProduct(${index})" style="color: #ff4d4d; border-color: rgba(255,77,77,0.2);">X</button>
                </td>
            </tr>
        `;
    });

    document.getElementById('totalProducts').innerText = products.length;

    // Format total value (e.g. 150000 -> Rs. 150k or formatted number)
    if (totalValue >= 1000) {
        document.getElementById('portfolioValue').innerText = "Rs. " + (totalValue / 1000).toFixed(1) + "k";
    } else {
        document.getElementById('portfolioValue').innerText = "Rs. " + totalValue;
    }
}

// --- Image Handling ---

function previewImage(input) {
    if (input.files && input.files[0]) {
        compressImage(input.files[0], 800, 800, 0.7, (base64) => {
            currentBase64 = base64;
            document.getElementById('imgPreview').style.display = 'block';
            document.getElementById('previewTag').src = currentBase64;
            document.getElementById('p_img').value = "Product Image Optimized";
        });
    }
}


// --- Inventory Form Logic ---

function showAddForm() {
    resetForm();
    document.getElementById('productForm').classList.remove('hidden');
    document.getElementById('formTitle').innerText = "Add New Masterpiece";
    document.getElementById('editIndex').value = "-1";
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProductForm() {
    document.getElementById('productForm').classList.add('hidden');
}

function resetForm() {
    document.getElementById('p_name').value = "";
    document.getElementById('p_price').value = "";
    document.getElementById('p_img').value = "";
    document.getElementById('p_file').value = "";
    document.getElementById('imgPreview').style.display = 'none';
    currentBase64 = "";
}

function saveProductEntry() {
    const index = parseInt(document.getElementById('editIndex').value);
    const name = document.getElementById('p_name').value;
    const cat = document.getElementById('p_cat').value;
    const price = document.getElementById('p_price').value;
    let img = document.getElementById('p_img').value;

    if (currentBase64) {
        img = currentBase64;
    } else if (index !== -1 && img.toLowerCase().includes("optimized")) {
        img = products[index].img; // Retain existing image
    }

    if (!name || !price || !img) {
        alert("Please fill all fields!");
        return;
    }

    const item = { id: Date.now(), category: cat, name, price, img };

    if (index === -1) products.unshift(item);
    else products[index] = item;

    try {
        localStorage.setItem('cadet_inventory', JSON.stringify(products));

        // Sync to Firebase if configured
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            firebase.database().ref('inventory').set(products)
                .then(() => console.log("Inventory synced to Firebase"))
                .catch(err => console.error("Firebase Inventory Sync Error:", err));
        }

        renderAdminProducts();
        closeProductForm();
        currentBase64 = ""; // Only clear after success
    } catch (e) {


        alert("Storage Full! Cannot save such large images. Try a smaller file or clear some items.");
    }
}


function editProduct(index) {
    const p = products[index];
    document.getElementById('productForm').classList.remove('hidden');
    document.getElementById('editIndex').value = index;
    document.getElementById('p_name').value = p.name;
    document.getElementById('p_cat').value = p.category;
    document.getElementById('p_price').value = p.price;
    document.getElementById('p_img').value = p.img.length > 200 ? "Product Image Optimized" : p.img;
    document.getElementById('imgPreview').style.display = 'block';
    document.getElementById('previewTag').src = p.img;
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProduct(index) {
    if (confirm('Delete?')) {
        products.splice(index, 1);
        localStorage.setItem('cadet_inventory', JSON.stringify(products));
        renderAdminProducts();
    }
}

function resetInventory() {
    if (confirm('Reset all inventory to default?')) {
        localStorage.removeItem('cadet_inventory');
        location.reload();
    }
}
