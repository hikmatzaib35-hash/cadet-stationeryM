// --- CADET STATIONERY DATA CORE ---

const DEFAULT_INVENTORY = [
    // --- WRITING INSTRUMENTS (1-25) ---
    { id: 1, category: "writing", name: "Sovereign Gold Fountain Pen", price: "Rs. 12,500", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 2, category: "writing", name: "Midnight Ebony Rollerball", price: "Rs. 8,200", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 3, category: "writing", name: "Sterling Silver Calligraphy Set", price: "Rs. 18,000", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 4, category: "writing", name: "Titanium Mechanical Pencil", price: "Rs. 5,500", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 5, category: "writing", name: "Azure Blue Lacquer Pen", price: "Rs. 7,400", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 6, category: "writing", name: "Rose Gold Trimmed Ballpoint", price: "Rs. 6,500", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 7, category: "writing", name: "Bamboo Eco-Chic Pen", price: "Rs. 3,500", img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=400" },
    { id: 8, category: "writing", name: "Crystal Inlaid Rollerball", price: "Rs. 14,000", img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=400" },
    { id: 9, category: "writing", name: "Matte Black Stealth Pen", price: "Rs. 4,200", img: "https://images.unsplash.com/photo-1516961314488-84f98f6d6286?auto=format&fit=crop&q=80&w=400" },
    { id: 10, category: "writing", name: "Antique Copper Fountain Pen", price: "Rs. 9,800", img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=400" },
    { id: 11, category: "writing", name: "Pearl White Writing Tool", price: "Rs. 11,000", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 12, category: "writing", name: "Geometric Carbon Fiber Pen", price: "Rs. 15,500", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 13, category: "writing", name: "Vintage Quill & Ink Set", price: "Rs. 7,500", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 14, category: "writing", name: "Multi-Engine Engineering Pen", price: "Rs. 8,900", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 15, category: "writing", name: "Diamond Tip Luxury Pen", price: "Rs. 45,000", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 16, category: "writing", name: "Minimalist Brass Rollerball", price: "Rs. 5,200", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 17, category: "writing", name: "Velvet Purple Fountain Pen", price: "Rs. 6,800", img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=400" },
    { id: 18, category: "writing", name: "Space-Grade Aluminum Pen", price: "Rs. 12,000", img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=400" },
    { id: 19, category: "writing", name: "Hand-Carved Walnut Pen", price: "Rs. 9,400", img: "https://images.unsplash.com/photo-1516961314488-84f98f6d6286?auto=format&fit=crop&q=80&w=400" },
    { id: 20, category: "writing", name: "Ceramic Glaze Rollerball", price: "Rs. 13,200", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 21, category: "writing", name: "Art Deco Silver Pen", price: "Rs. 19,500", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 22, category: "writing", name: "Neon Flux Modern Pen", price: "Rs. 3,800", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 23, category: "writing", name: "Gold Leaf Infused Pen", price: "Rs. 28,000", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 24, category: "writing", name: "Obsidian Shard Pen", price: "Rs. 10,500", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 25, category: "writing", name: "Emerald Glint Ballpoint", price: "Rs. 7,200", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },

    // --- PAPER & JOURNALS (26-50) ---
    { id: 26, category: "paper", name: "Vagabond Leather Journal", price: "Rs. 4,800", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400" },
    { id: 27, category: "paper", name: "Silk-bound Notebook", price: "Rs. 3,200", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },
    { id: 28, category: "paper", name: "Moleskine Limited Edition", price: "Rs. 6,500", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
    { id: 29, category: "paper", name: "Gilded Edge Diary", price: "Rs. 5,400", img: "https://images.unsplash.com/photo-1516414917003-4c9f162bb63a?auto=format&fit=crop&q=80&w=400" },
    { id: 30, category: "paper", name: "Recycled Earth Journal", price: "Rs. 2,500", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },
    { id: 31, category: "paper", name: "Marble Cover Sketchbook", price: "Rs. 3,800", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400" },
    { id: 32, category: "paper", name: "Velvet Ribbon Planner", price: "Rs. 4,200", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
    { id: 33, category: "paper", name: "Tactile Linen Notebook", price: "Rs. 3,400", img: "https://images.unsplash.com/photo-1516414917003-4c9f162bb63a?auto=format&fit=crop&q=80&w=400" },
    { id: 34, category: "paper", name: "Architect Blueprint Pad", price: "Rs. 7,200", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },
    { id: 35, category: "paper", name: "Embossed Crest Journal", price: "Rs. 5,800", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400" },
    { id: 36, category: "paper", name: "Holographic Future Log", price: "Rs. 4,500", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
    { id: 37, category: "paper", name: "Parchment Poetry Book", price: "Rs. 3,900", img: "https://images.unsplash.com/photo-1516414917003-4c9f162bb63a?auto=format&fit=crop&q=80&w=400" },
    { id: 38, category: "paper", name: "Suede Executive Folder", price: "Rs. 8,500", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },
    { id: 39, category: "paper", name: "Handmade Petal Paper", price: "Rs. 2,800", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400" },
    { id: 40, category: "paper", name: "Cork Bound Eco-Diary", price: "Rs. 3,600", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
    { id: 41, category: "paper", name: "Royal Seal Stationery Set", price: "Rs. 12,000", img: "https://images.unsplash.com/photo-1516414917003-4c9f162bb63a?auto=format&fit=crop&q=80&w=400" },
    { id: 42, category: "paper", name: "Map Engraved Travelogue", price: "Rs. 5,200", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },
    { id: 43, category: "paper", name: "Minimalist Grid Pad", price: "Rs. 1,800", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400" },
    { id: 44, category: "paper", name: "Vintage Map Notebook", price: "Rs. 4,700", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
    { id: 45, category: "paper", name: "Luxury Letterheads (50pcs)", price: "Rs. 9,000", img: "https://images.unsplash.com/photo-1516414917003-4c9f162bb63a?auto=format&fit=crop&q=80&w=400" },
    { id: 46, category: "paper", name: "Indigo Dye Journal", price: "Rs. 4,400", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },
    { id: 47, category: "paper", name: "Matte Black Ledger", price: "Rs. 6,800", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400" },
    { id: 48, category: "paper", name: "Artistic Splatter Notelets", price: "Rs. 2,200", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
    { id: 49, category: "paper", name: "Crushed Velvet Scrapbook", price: "Rs. 7,400", img: "https://images.unsplash.com/photo-1516414917003-4c9f162bb63a?auto=format&fit=crop&q=80&w=400" },
    { id: 50, category: "paper", name: "Gilded Butterfly Diary", price: "Rs. 5,900", img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400" },

    // --- DESK TOOLS (51-70) ---
    { id: 51, category: "tools", name: "Bronze Letter Opener", price: "Rs. 3,200", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 52, category: "tools", name: "Oak Desk Organizer", price: "Rs. 9,500", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 53, category: "tools", name: "Magnetic Paperweight", price: "Rs. 2,800", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 54, category: "tools", name: "Crystal Inkwell", price: "Rs. 6,400", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 55, category: "tools", name: "Marble Tape Dispenser", price: "Rs. 4,500", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 56, category: "tools", name: "Sand Glass Timer (30 min)", price: "Rs. 5,200", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 57, category: "tools", name: "Modernist Stapler", price: "Rs. 3,900", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 58, category: "tools", name: "Luxury Scissors Set", price: "Rs. 7,200", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 59, category: "tools", name: "Vintage Magnifying Glass", price: "Rs. 4,800", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 60, category: "tools", name: "Suede Mouse Pad", price: "Rs. 2,400", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 61, category: "tools", name: "Brass Desk Lamp", price: "Rs. 18,500", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 62, category: "tools", name: "Leather Document Tray", price: "Rs. 11,000", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 63, category: "tools", name: "Zen Garden Mini Set", price: "Rs. 5,500", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 64, category: "tools", name: "Titanium Push Pins", price: "Rs. 1,500", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 65, category: "tools", name: "Engraved Ruler (Steel)", price: "Rs. 2,900", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 66, category: "tools", name: "Desktop Calendar Stand", price: "Rs. 4,200", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 67, category: "tools", name: "Anti-Gravity Desk Toy", price: "Rs. 8,800", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 68, category: "tools", name: "Gold-Plated Thumbtacks", price: "Rs. 3,500", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 69, category: "tools", name: "Obsidian Card Holder", price: "Rs. 6,700", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 70, category: "tools", name: "Minimalist Pencil Cup", price: "Rs. 2,100", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },

    // --- ARTISAN GIFTS (71-90) ---
    { id: 71, category: "gifts", name: "Connoisseur Ink Set", price: "Rs. 22,000", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 72, category: "gifts", name: "Calligrapher's trunk", price: "Rs. 35,000", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 73, category: "gifts", name: "Leather Travel Kit", price: "Rs. 15,400", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 74, category: "gifts", name: "Hand-Bound Masterpiece", price: "Rs. 42,000", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 75, category: "gifts", name: "Wax Seal Stamp Kit", price: "Rs. 6,800", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 76, category: "gifts", name: "Poet's Inspiration Kit", price: "Rs. 12,500", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 77, category: "gifts", name: "Silver Leaf Bookmark", price: "Rs. 3,200", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 78, category: "gifts", name: "Executive Gift Hamper", price: "Rs. 55,000", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 79, category: "gifts", name: "Miniature Library Set", price: "Rs. 28,000", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" },
    { id: 80, category: "gifts", name: "Artist's Sketching Case", price: "Rs. 19,200", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400" },
    { id: 81, category: "gifts", name: "Botanical Writing Set", price: "Rs. 7,400", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400" },
    { id: 82, category: "gifts", name: "Vintage Compass Case", price: "Rs. 9,900", img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=400" },
    { id: 83, category: "gifts", name: "Gilded Globe Accent", price: "Rs. 14,000", img: "https://images.unsplash.com/photo-1596401057633-5310344f6f32?auto=format&fit=crop&q=80&w=400" },
    { id: 84, category: "gifts", name: "Midnight Quill Box", price: "Rs. 11,200", img: "https://images.unsplash.com/photo-1518128485912-df77014b5a6c?auto=format&fit=crop&q=80&w=400" },
    { id: 85, category: "gifts", name: "Crystal Prism Weight", price: "Rs. 4,500", img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400" }
];

// Data persistence logic
let stationeryInventory = JSON.parse(localStorage.getItem('cadet_inventory'));

// FORCE REFRESH TO 85+ ON FIRST LOAD OR IF TOLD
if (!stationeryInventory || stationeryInventory.length < 80) {
    stationeryInventory = DEFAULT_INVENTORY;
    localStorage.setItem('cadet_inventory', JSON.stringify(stationeryInventory));
}

function saveToStorage() {
    localStorage.setItem('cadet_inventory', JSON.stringify(stationeryInventory));
}

// Fetch from Firebase if configured
if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    firebase.database().ref('inventory').on('value', snapshot => {
        if (snapshot.exists()) {
            stationeryInventory = snapshot.val();
            localStorage.setItem('cadet_inventory', JSON.stringify(stationeryInventory));
            renderProducts();
        }
    });
}


let currentCategory = 'all';

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return; 

    const filtered = stationeryInventory.filter(p => currentCategory === 'all' || p.category === currentCategory);
    
    // Smooth loading: clear and rebuild with template string (much faster)
    let htmlContent = '';
    filtered.forEach((p, index) => {
        // Staggered delay for smooth flow
        const delay = (index % 12) * 0.05; 
        htmlContent += `
            <div class="product-card" style="animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards; opacity: 0;">
                <div class="product-img-container">
                    <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy">
                </div>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-price">${p.price}</p>
                <button class="buy-btn" onclick="orderWhatsApp('${p.name}')">Order Now</button>
            </div>
        `;
    });
    
    grid.innerHTML = htmlContent;
}

function filterCategory(cat) {
    currentCategory = cat;
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        const tabFunc = tab.getAttribute('onclick');
        if (tabFunc && tabFunc.includes(`'${cat}'`)) {
            tab.classList.add('active');
        }
    });

    renderProducts();
}

function orderWhatsApp(productName) {
    const message = `Assalam-o-Alaikum Cadet Stationery, mujhe ye "${productName}" order karna hai. Baraye meherbani is ki tafseelat aur delivery ka tareeqa bata dein. Shukriya!`;
    const phone = "923347124766"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', renderProducts);
