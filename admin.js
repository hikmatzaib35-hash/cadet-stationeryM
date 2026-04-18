const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

let products = JSON.parse(localStorage.getItem('cadet_inventory')) || [];
let currentBase64 = "";
let currentCmsBase64 = "";
let currentDpBase64 = "";

// Initialize CMS data if not exists
let cmsData = JSON.parse(localStorage.getItem('cadet_cms')) || {
    storyTitle: "The Art of Fine Writing",
    storyQuote: "A pen is more than a tool; it is an extension of the soul.",
    storyText: "At Cadet Stationery, we believe that the tools you use define the legacy you leave. What began as a passion for the tactile beauty of ink on paper has evolved into a sanctuary for the world's finest writing instruments and handcrafted journals.",
    storyImg: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=800",
    dpImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    philTitle: "ہمارا نظریہ",
    philText: "ہم اپنے کلیکشنز کا انتخاب معیار پر سمجھوتہ کیے بغیر کرتے ہیں۔ نب کے وزن سے لے کر چمڑے کے دانے تک، ہر تفصیل کی باریک بینی سے جانچ کی جاتی ہے۔ ہمارا مقصد جدید پیشہ ور افراد کو ڈیجیٹل دنیا میں ایک اینالاگ فرار فراہم کرنا ہے۔"
};

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
    loadCmsFields();
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
                <td style="font-size: 0.9rem;">${p.name}</td>
                <td>
                    <button class="action-btn" onclick="editProduct(${index})">Edit</button>
                    <button class="action-btn" onclick="deleteProduct(${index})" style="color: #ff4d4d;">X</button>
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
            document.getElementById('p_img').value = "Image uploaded";
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function previewCmsImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentCmsBase64 = e.target.result;
            document.getElementById('cmsImgPreview').style.display = 'block';
            document.getElementById('cmsPreviewTag').src = currentCmsBase64;
            document.getElementById('cms_story_img').value = "Header Image updated";
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function previewDpImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentDpBase64 = e.target.result;
            document.getElementById('cms_dp_img').value = "DP Selected";
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// --- Inventory Form Logic ---

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

    if (currentBase64) img = currentBase64;

    if (!name || !price || !img) {
        alert("Please fill all fields!");
        return;
    }

    const item = { id: Date.now(), category: cat, name, price, img };

    if (index === -1) products.unshift(item);
    else products[index] = item;

    localStorage.setItem('cadet_inventory', JSON.stringify(products));
    renderAdminProducts();
    closeProductForm();
}

function editProduct(index) {
    const p = products[index];
    document.getElementById('productForm').classList.remove('hidden');
    document.getElementById('editIndex').value = index;
    document.getElementById('p_name').value = p.name;
    document.getElementById('p_cat').value = p.category;
    document.getElementById('p_price').value = p.price;
    document.getElementById('p_img').value = p.img;
    document.getElementById('imgPreview').style.display = 'block';
    document.getElementById('previewTag').src = p.img;
}

function deleteProduct(index) {
    if(confirm('Delete?')) {
        products.splice(index, 1);
        localStorage.setItem('cadet_inventory', JSON.stringify(products));
        renderAdminProducts();
    }
}

// --- CMS Logic ---

function loadCmsFields() {
    document.getElementById('cms_story_title').value = cmsData.storyTitle;
    document.getElementById('cms_story_quote').value = cmsData.storyQuote;
    document.getElementById('cms_story_text').value = cmsData.storyText;
    document.getElementById('cms_story_img').value = cmsData.storyImg;
    document.getElementById('cms_dp_img').value = cmsData.dpImg || "";
    document.getElementById('cms_phil_title').value = cmsData.philTitle || "ہمارا نظریہ";
    document.getElementById('cms_phil_text').value = cmsData.philText || "";

    if (cmsData.storyImg) {
        document.getElementById('cmsImgPreview').style.display = 'block';
        document.getElementById('cmsPreviewTag').src = cmsData.storyImg;
    }
}

function saveCmsData() {
    cmsData.storyTitle = document.getElementById('cms_story_title').value;
    cmsData.storyQuote = document.getElementById('cms_story_quote').value;
    cmsData.storyText = document.getElementById('cms_story_text').value;
    cmsData.philTitle = document.getElementById('cms_phil_title').value;
    cmsData.philText = document.getElementById('cms_phil_text').value;
    
    if (currentCmsBase64) cmsData.storyImg = currentCmsBase64;
    else cmsData.storyImg = document.getElementById('cms_story_img').value;

    if (currentDpBase64) cmsData.dpImg = currentDpBase64;
    else cmsData.dpImg = document.getElementById('cms_dp_img').value;

    localStorage.setItem('cadet_cms', JSON.stringify(cmsData));
    alert('Website content updated globally!');
}

function resetInventory() {
    if(confirm('Reset all settings to default?')) {
        localStorage.removeItem('cadet_inventory');
        localStorage.removeItem('cadet_cms');
        location.reload();
    }
}
