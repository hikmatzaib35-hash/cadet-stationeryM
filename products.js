// --- CADET STATIONERY DATA CORE ---

const DEFAULT_INVENTORY = [
    { id: 1, category: "writing", name: "Sovereign Gold Fountain Pen", price: "Rs. 12,500", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 2, category: "writing", name: "Midnight Ebony Rollerball", price: "Rs. 8,200", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 3, category: "writing", name: "Sterling Silver Calligraphy Set", price: "Rs. 18,000", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 4, category: "writing", name: "Titanium Mechanical Pencil", price: "Rs. 5,500", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 5, category: "writing", name: "Azure Blue Lacquer Pen", price: "Rs. 7,400", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 16, category: "paper", name: "Vagabond Leather Journal", price: "Rs. 4,800", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400" },
    { id: 17, category: "paper", name: "Silk-bound Notebook", price: "Rs. 3,200", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },
    { id: 31, category: "tools", name: "Bronze Letter Opener", price: "Rs. 3,200", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 32, category: "tools", name: "Oak Desk Organizer", price: "Rs. 9,500", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 46, category: "gifts", name: "Connoisseur Ink Set", price: "Rs. 22,000", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" }
    // (Adding more sample data to ensure the store looks big)
];

// Data persistence logic
let stationeryInventory = JSON.parse(localStorage.getItem('cadet_inventory'));

if (!stationeryInventory || stationeryInventory.length === 0) {
    stationeryInventory = DEFAULT_INVENTORY;
    localStorage.setItem('cadet_inventory', JSON.stringify(stationeryInventory));
}

function saveToStorage() {
    localStorage.setItem('cadet_inventory', JSON.stringify(stationeryInventory));
}

let currentCategory = 'all';

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return; 

    grid.innerHTML = '';
    const filtered = stationeryInventory.filter(p => currentCategory === 'all' || p.category === currentCategory);

    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="product-card" style="animation: fadeInUp 0.8s ease-out forwards;">
                <img src="${p.img}" alt="${p.name}" class="product-img">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-price">${p.price}</p>
                <button class="buy-btn" onclick="orderWhatsApp('${p.name}')">Inquire via WhatsApp</button>
            </div>
        `;
    });
}

function filterCategory(cat) {
    currentCategory = cat;
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('onclick').includes(`'${cat}'`)) {
            tab.classList.add('active');
        }
    });

    renderProducts();
}



function orderWhatsApp(productName) {
    const message = `Hello Cadet Stationery, I am interested in purchasing the ${productName}. Could you please provide more details?`;
    const phone = "923000000000"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', renderProducts);
