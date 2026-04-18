const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

let products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];
let currentBase64 = "";

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
    renderAdminProducts();
}

function adminLogout() {
    localStorage.removeItem('cadet_admin_auth');
    location.reload();
}

function renderAdminProducts() {
    const root = document.getElementById('adminProductRoot');
    if (!root) return;
    
    root.innerHTML = '';
    products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];

    products.forEach((p, index) => {
        root.innerHTML += `
            <tr>
                <td><img src="${p.img}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>
                    <button class="action-btn" onclick="editProduct(${index})">Edit</button>
                    <button class="action-btn" onclick="deleteProduct(${index})" style="color: #ff4d4d;">Trash</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('totalProducts').innerText = products.length;
}

// --- Image Handling ---

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentBase64 = e.target.result;
            document.getElementById('imgPreview').style.display = 'block';
            document.getElementById('previewTag').src = currentBase64;
            document.getElementById('p_img').value = "Image Selected from File System";
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// --- Form Logic ---

function showAddForm() {
    resetForm();
    document.getElementById('productForm').classList.remove('hidden');
    document.getElementById('formTitle').innerText = "Add New Masterpiece";
    document.getElementById('editIndex').value = "-1";
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
    }

    if (!name || !price || !img) {
        alert("Please fill all fields!");
        return;
    }

    const newProduct = { id: Date.now(), category: cat, name, price, img };

    if (index === -1) {
        products.unshift(newProduct);
    } else {
        products[index] = { ...products[index], ...newProduct };
    }

    localStorage.setItem('cadet_inventory', JSON.stringify(products));
    renderAdminProducts();
    closeProductForm();
    alert("Collection updated!");
}

function editProduct(index) {
    const p = products[index];
    document.getElementById('productForm').classList.remove('hidden');
    document.getElementById('formTitle').innerText = "Edit " + p.name;
    document.getElementById('editIndex').value = index;
    
    document.getElementById('p_name').value = p.name;
    document.getElementById('p_cat').value = p.category;
    document.getElementById('p_price').value = p.price;
    document.getElementById('p_img').value = p.img;
    
    document.getElementById('imgPreview').style.display = 'block';
    document.getElementById('previewTag').src = p.img;
    currentBase64 = ""; // Reset since we are using existing
}

function deleteProduct(index) {
    if(confirm('Delete this item?')) {
        products.splice(index, 1);
        localStorage.setItem('cadet_inventory', JSON.stringify(products));
        renderAdminProducts();
    }
}

function resetInventory() {
    if(confirm('Reset to default items?')) {
        localStorage.removeItem('cadet_inventory');
        location.reload();
    }
}
