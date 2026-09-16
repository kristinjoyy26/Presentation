/**
 * APUNG PANING HOMEMADE FOOD PRODUCTS — APP.JS
 * E-Commerce Interactivity, Cart State, Bundle Builder, Modals & Toast System
 */

// ============================================================
// PRODUCT CATALOG DATABASE
// ============================================================
const PRODUCTS = [
  {
    id: 'cinnamon-coffee-chips',
    name: 'Cinnamon-Coffee Banana Chips',
    category: 'banana-chips',
    price: 140,
    originalPrice: 155,
    weight: '100g Pouch',
    badge: 'Bestseller',
    badgeType: 'bestseller',
    image: 'assets/pouch-cinnamon.jpg',
    description: 'Thinly sliced native Laguna saba bananas kettle-crisped to golden perfection, then lightly glazed with warm ground cinnamon and roasted Batangas barako coffee. Delicately sweet with a comforting morning aroma.',
    flavorNotes: 'Warm Cinnamon • Roasted Barako • Subtle Caramelized Muscovado',
    crunchRating: 5,
    ingredients: 'Fresh Saba Bananas, Coconut Oil, Muscovado Sugar, Roasted Barako Coffee, Pure Cinnamon, Sea Salt',
    tags: ['Thin & Crispy', '100% Native Saba', 'No Preservatives']
  },
  {
    id: 'dark-cacao-sea-salt',
    name: 'Dark Cacao Sea Salt Banana Chips',
    category: 'banana-chips',
    price: 145,
    originalPrice: 160,
    weight: '100g Pouch',
    badge: "Lola's Choice",
    badgeType: 'lolas-choice',
    image: 'assets/pouch-cacao.jpg',
    description: 'Artisanal Philippine saba chips generously dusted with rich bittersweet dark cacao and finished with crunchy crystals of artisanal sea salt. The ultimate gourmet Filipino indulgence.',
    flavorNotes: 'Bittersweet Batangas Cacao • Mineral Sea Salt • Crisp Banana Crunch',
    crunchRating: 5,
    ingredients: 'Fresh Saba Bananas, Pure Batangas Tablea Cacao, Coconut Oil, Organic Cane Sugar, Artisanal Sea Salt',
    tags: ['Rich Bittersweet', 'Batangas Cacao', 'Gourmet Crunch']
  },
  {
    id: 'cornick-peanuts-spicy-garlic',
    name: 'Spicy Garlic Cornick & Peanuts',
    category: 'cornick-peanuts',
    price: 130,
    originalPrice: 145,
    weight: '250g Tub',
    badge: 'Top Pulutan',
    badgeType: 'new-drop',
    image: 'assets/tub-cornick.jpg',
    description: 'Crispy popped white cornick paired with crunchy native peanuts, tossed with generous slices of real toasted garlic chips and chili flakes. Addictively savory with authentic gawang-bahay aroma.',
    flavorNotes: 'Aromatic Fried Garlic • Roasted Corn Kernels • Gentle Chili Kick',
    crunchRating: 5,
    ingredients: 'White Cornick Kernels, Native Peanuts, Sliced Garlic Chips, Dried Chili, Vegetable Oil, Iodized Salt',
    tags: ['Slow-Fried Garlic', 'Real Native Corn', 'Spicy Savory']
  },
  {
    id: 'lolas-trio-pasalubong-box',
    name: "Lola's Trio Pasalubong Box",
    category: 'gift-sets',
    price: 395,
    originalPrice: 435,
    weight: 'Curated 3-Pack Box',
    badge: 'Perfect Gift',
    badgeType: 'bestseller',
    image: 'assets/pouches-basket.jpg',
    description: 'The definitive taste of Apung Paning! Includes 1x Cinnamon-Coffee Banana Chips, 1x Dark Cacao Sea Salt Banana Chips, and 1x Spicy Garlic Cornick & Peanuts in a kraft gift box with hand-stamped Lola ribbon.',
    flavorNotes: 'Complete Sweet & Savory Balance • Photogenic Pasalubong Box',
    crunchRating: 5,
    ingredients: 'Contains 1 Pouch Cinnamon-Coffee, 1 Pouch Dark Cacao Sea Salt, 1 Tub Spicy Garlic Cornick & Peanuts',
    tags: ['Gift Ready', 'Includes Dedication Tag', 'Best Value']
  },
  {
    id: 'barkada-merienda-bundle',
    name: 'Barkada Merienda Party Box',
    category: 'gift-sets',
    price: 740,
    originalPrice: 840,
    weight: '6-Item Assortment',
    badge: 'Free Delivery',
    badgeType: 'lolas-choice',
    image: 'assets/batch-pouches.jpg',
    description: 'Stock up for university study groups, office afternoon slump, or family gathering. Comes with 2x Cinnamon-Coffee, 2x Dark Cacao, and 2x Spicy Garlic Cornick plus free Apung Paning waterproof sticker pack!',
    flavorNotes: '6 Generous Packs • Free Metro Manila Shipping • Free Stickers',
    crunchRating: 5,
    ingredients: 'Assortment of our 3 bestseller products (2 packs each)',
    tags: ['6 Full Packs', 'Free Metro Manila Delivery', 'Free Merch']
  },
  {
    id: 'artisan-harvest-basket',
    name: 'Laguna Heirloom Woven Hamper',
    category: 'gift-sets',
    price: 980,
    originalPrice: 1150,
    weight: 'Limited Edition',
    badge: 'Handcrafted',
    badgeType: 'new-drop',
    image: 'assets/hero-basket.jpg',
    description: 'An authentic handwoven rattan basket from local Laguna artisans filled with our complete snack collection, 1 pouch of roasted Barako coffee beans, and an apo personalized letter of gratitude.',
    flavorNotes: 'Authentic Woven Rattan • Coffee Beans • Full Snack Lineup',
    crunchRating: 5,
    ingredients: 'Handcrafted Rattan Basket, Full Snack Lineup, 100g Barako Coffee Beans, Personalized Letter',
    tags: ['Heirloom Keepsake', 'Laguna Artisan Made', 'VIP Gift']
  }
];

// ============================================================
// SHOPPING CART STATE & PERSISTENCE
// ============================================================
class CartState {
  constructor() {
    this.storageKey = 'apung_paning_cart_v1';
    this.items = this.loadCart();
    this.discountCode = '';
    this.discountPercent = 0;
    this.freeShippingThreshold = 600;
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  }

  addItem(product, quantity = 1, customNote = '') {
    const existingIndex = this.items.findIndex(
      item => item.id === product.id && item.customNote === customNote
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        weight: product.weight,
        quantity: quantity,
        customNote: customNote
      });
    }

    this.saveCart();
    this.updateUI();
  }

  updateQuantity(index, delta) {
    if (this.items[index]) {
      this.items[index].quantity += delta;
      if (this.items[index].quantity <= 0) {
        this.items.splice(index, 1);
      }
      this.saveCart();
      this.updateUI();
    }
  }

  removeItem(index) {
    if (this.items[index]) {
      this.items.splice(index, 1);
      this.saveCart();
      this.updateUI();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateUI();
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDiscountAmount() {
    if (this.discountPercent > 0) {
      return Math.round(this.getSubtotal() * (this.discountPercent / 100));
    }
    return 0;
  }

  getTotal() {
    return Math.max(0, this.getSubtotal() - this.getDiscountAmount());
  }

  applyPromo(code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'HUYAPO10' || cleanCode === 'LOLA10') {
      this.discountCode = cleanCode;
      this.discountPercent = 10;
      this.updateUI();
      return { success: true, message: 'Huy, Apo! 10% discount applied to your merienda!' };
    } else if (cleanCode === 'FREECHIPS') {
      this.discountCode = cleanCode;
      this.discountPercent = 15;
      this.updateUI();
      return { success: true, message: '15% Apo VIP discount applied!' };
    }
    return { success: false, message: 'Oops! Invalid promo code. Try HUYAPO10 for 10% off.' };
  }

  updateUI() {
    // Update cart badge counts
    const badge = document.getElementById('cartBadge');
    if (badge) {
      const count = this.getItemCount();
      badge.textContent = count;
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
    }

    // Render drawer list
    const cartContainer = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    const progressFill = document.getElementById('shippingProgressFill');
    const progressText = document.getElementById('shippingProgressText');

    const subtotal = this.getSubtotal();

    // Free shipping tracker
    if (progressFill && progressText) {
      const percent = Math.min(100, Math.round((subtotal / this.freeShippingThreshold) * 100));
      progressFill.style.width = `${percent}%`;
      if (subtotal >= this.freeShippingThreshold) {
        progressText.innerHTML = '🎉 <strong>Apo, libre na ang shipping mo</strong> within Metro Manila!';
      } else {
        const remaining = this.freeShippingThreshold - subtotal;
        progressText.innerHTML = `Magdagdag ng <strong>₱${remaining}</strong> pa for <strong>Free Metro Manila Shipping</strong>!`;
      }
    }

    if (subtotalEl) {
      subtotalEl.textContent = `₱${this.getTotal().toLocaleString()}`;
    }

    if (!cartContainer || !emptyState) return;

    if (this.items.length === 0) {
      cartContainer.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      cartContainer.style.display = 'flex';
      cartContainer.innerHTML = this.items.map((item, index) => `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <div>
              <h4 class="cart-item-title">${item.name}</h4>
              <p class="cart-item-note">${item.customNote ? item.customNote : item.weight}</p>
            </div>
            <div class="cart-item-price">₱${(item.price * item.quantity).toLocaleString()}</div>
            <div class="cart-item-controls">
              <div class="flavor-counter">
                <button class="btn-counter" onclick="cart.updateQuantity(${index}, -1)" aria-label="Decrease quantity">−</button>
                <span class="counter-value">${item.quantity}</span>
                <button class="btn-counter" onclick="cart.updateQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
              </div>
              <button class="btn-remove-item" onclick="cart.removeItem(${index})">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

const cart = new CartState();

// ============================================================
// BUNDLE BUILDER STATE ("Huy, Apo! Mix & Match")
// ============================================================
const BUNDLE_TIERS = {
  3: { max: 3, price: 380, normalPrice: 420, label: '3-Pack Merienda Box', save: 'Save ₱40' },
  5: { max: 5, price: 599, normalPrice: 700, label: '5-Pack Super Pasalubong', save: 'Save ₱101 + Free Delivery' }
};

let currentTier = 3;
let selectedFlavors = {
  'cinnamon-coffee-chips': 1,
  'dark-cacao-sea-salt': 1,
  'cornick-peanuts-spicy-garlic': 1
};

function setBundleTier(tier) {
  currentTier = tier;
  document.querySelectorAll('.tier-card').forEach(card => {
    card.classList.toggle('selected', parseInt(card.dataset.tier) === tier);
  });

  // Adjust selections if exceeding
  let total = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);
  if (total > tier) {
    // Reset to default
    selectedFlavors = {
      'cinnamon-coffee-chips': 1,
      'dark-cacao-sea-salt': 1,
      'cornick-peanuts-spicy-garlic': 1
    };
  }
  updateBundleUI();
}

function adjustFlavorCount(flavorId, delta) {
  const currentTotal = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);
  const currentCount = selectedFlavors[flavorId] || 0;

  if (delta > 0 && currentTotal >= currentTier) {
    showToast(`Puno na ang ${currentTier}-pack box mo! Tanggalin muna ang iba kung gusto magpalit.`);
    return;
  }

  const newCount = currentCount + delta;
  if (newCount >= 0) {
    selectedFlavors[flavorId] = newCount;
    updateBundleUI();
  }
}

function updateBundleUI() {
  const tierConfig = BUNDLE_TIERS[currentTier];
  const totalChosen = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);

  // Update counters
  for (const [id, count] of Object.entries(selectedFlavors)) {
    const el = document.getElementById(`count-${id}`);
    if (el) el.textContent = count;
  }

  // Update Progress Track
  const progressFill = document.getElementById('bundleProgressFill');
  const progressText = document.getElementById('bundleProgressCount');
  if (progressFill && progressText) {
    const percent = Math.min(100, (totalChosen / currentTier) * 100);
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${totalChosen} / ${currentTier} Packs Chosen`;
  }

  // Render Slots List
  const slotsList = document.getElementById('bundleSlotsList');
  if (slotsList) {
    let html = '';
    let slotNum = 1;
    for (const [id, count] of Object.entries(selectedFlavors)) {
      const prod = PRODUCTS.find(p => p.id === id);
      for (let i = 0; i < count; i++) {
        html += `
          <li class="bundle-slot-item">
            <span><strong>Slot ${slotNum}:</strong> ${prod ? prod.name : id}</span>
            <span style="color: #FCD34D;">✓</span>
          </li>
        `;
        slotNum++;
      }
    }
    // Remaining empty slots
    while (slotNum <= currentTier) {
      html += `
        <li class="bundle-slot-item slot-empty">
          <span>Slot ${slotNum}: Pumili ng meryenda sa kaliwa...</span>
          <span>+</span>
        </li>
      `;
      slotNum++;
    }
    slotsList.innerHTML = html;
  }

  // Total price
  const priceEl = document.getElementById('bundleTotalPrice');
  if (priceEl) {
    priceEl.textContent = `₱${tierConfig.price}`;
  }

  // Button state
  const btn = document.getElementById('btnAddBundleToCart');
  if (btn) {
    btn.disabled = totalChosen !== currentTier;
    if (totalChosen === currentTier) {
      btn.textContent = `Idagdag sa Merienda Bag (₱${tierConfig.price})`;
    } else {
      btn.textContent = `Pumili pa ng ${currentTier - totalChosen} snack${currentTier - totalChosen > 1 ? 's' : ''}`;
    }
  }
}

function addBundleToCart() {
  const tierConfig = BUNDLE_TIERS[currentTier];
  const totalChosen = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);

  if (totalChosen !== currentTier) {
    showToast(`Kulang pa ng ${currentTier - totalChosen} pack ang box mo, Apo!`);
    return;
  }

  const dedicationInput = document.getElementById('bundleDedicationNote');
  const dedication = dedicationInput ? dedicationInput.value.trim() : '';

  // Construct item note
  const breakdown = Object.entries(selectedFlavors)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const p = PRODUCTS.find(prod => prod.id === id);
      return `${count}x ${p ? p.name : id}`;
    })
    .join(', ');

  const note = `[${tierConfig.label}] ${breakdown}${dedication ? ' • Note: "' + dedication + '"' : ''}`;

  const bundleProduct = {
    id: `custom-bundle-${currentTier}-${Date.now()}`,
    name: `Custom ${tierConfig.label}`,
    price: tierConfig.price,
    image: currentTier === 3 ? 'assets/pouches-basket.jpg' : 'assets/batch-pouches.jpg',
    weight: `${currentTier} Packs`
  };

  cart.addItem(bundleProduct, 1, note);
  showToast(`Huy, Apo! Naidagdag na ang iyong ${tierConfig.label} sa bag! 👵🏽✨`);
  openCartDrawer();

  // Reset note
  if (dedicationInput) dedicationInput.value = '';
}

// ============================================================
// UI RENDERING: PRODUCTS GRID & FILTERING
// ============================================================
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(prod => `
    <article class="product-card" data-category="${prod.category}">
      <div class="product-img-wrap">
        <span class="product-badge ${prod.badgeType}">${prod.badge}</span>
        <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
        <div class="quick-view-overlay">
          <button class="btn-quick-view" onclick="openQuickView('${prod.id}')">Quick View</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-tags">
          ${prod.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
        <h3 class="product-name" onclick="openQuickView('${prod.id}')">${prod.name}</h3>
        <p class="product-taste-note">${prod.flavorNotes}</p>
        <div class="product-crunch-bar">
          <span>Crunchiness:</span>
          <div class="crunch-dots">
            <span class="crunch-dot active"></span>
            <span class="crunch-dot active"></span>
            <span class="crunch-dot active"></span>
            <span class="crunch-dot active"></span>
            <span class="crunch-dot active"></span>
          </div>
        </div>
        <div class="product-footer">
          <div class="product-price-box">
            <span class="price-curr">₱${prod.price}</span>
            ${prod.originalPrice ? `<span class="price-original">₱${prod.originalPrice}</span>` : ''}
          </div>
          <button class="btn-add-cart" onclick="handleAddToCart('${prod.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function handleAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    cart.addItem(product, 1);
    showToast(`Naidagdag sa bag: ${product.name}! 🍌`);
  }
}

// ============================================================
// MODAL CONTROLS: QUICK VIEW
// ============================================================
function openQuickView(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const modalBody = document.getElementById('quickViewModalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="quick-view-grid">
      <img src="${prod.image}" alt="${prod.name}" class="quick-view-img">
      <div class="quick-view-info">
        <span class="section-eyebrow" style="margin-bottom: 8px;">Gawang-Bahay Heritage</span>
        <h2 class="quick-view-title">${prod.name}</h2>
        <div class="quick-view-price">₱${prod.price} <small style="font-size:0.8rem; color:#6B7280;">(${prod.weight})</small></div>
        <p class="quick-view-desc">${prod.description}</p>
        <ul class="quick-view-specs">
          <li><span>Flavor Profile:</span> <strong>${prod.flavorNotes}</strong></li>
          <li><span>Ingredients:</span> <strong>${prod.ingredients}</strong></li>
          <li><span>Shelf Life:</span> <strong>6 Months (Best enjoyed fresh)</strong></li>
          <li><span>Origin:</span> <strong>Handcrafted in Calamba, Laguna</strong></li>
        </ul>
        <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="handleAddToCart('${prod.id}'); closeModal('quickViewModal'); openCartDrawer();">
          Add ${prod.name} to Merienda Bag
        </button>
      </div>
    </div>
  `;

  openModal('quickViewModal');
}

// ============================================================
// CHECKOUT WORKFLOW & MULTI-CHANNEL ORDERING
// ============================================================
function openCheckoutModal() {
  if (cart.items.length === 0) {
    showToast('Walang laman ang bag mo, Apo! Pumili muna ng meryenda.');
    return;
  }

  const recapEl = document.getElementById('checkoutOrderRecap');
  if (recapEl) {
    const listHtml = cart.items.map(i => `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>${i.quantity}x ${i.name}</span>
        <strong>₱${(i.price * i.quantity).toLocaleString()}</strong>
      </div>
    `).join('');

    const discountRow = cart.getDiscountAmount() > 0 
      ? `<div style="display:flex; justify-content:space-between; color:#15803D; margin-bottom:6px;">
          <span>Discount (${cart.discountCode}):</span>
          <strong>-₱${cart.getDiscountAmount().toLocaleString()}</strong>
        </div>`
      : '';

    recapEl.innerHTML = `
      <h4 style="font-family:var(--font-serif); margin-bottom:12px; color:var(--plum-deep);">Order Summary</h4>
      ${listHtml}
      ${discountRow}
      <hr style="border:none; border-top:1px solid #D1D5DB; margin:10px 0;">
      <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:800; color:var(--plum-deep);">
        <span>Total Payable:</span>
        <span>₱${cart.getTotal().toLocaleString()}</span>
      </div>
    `;
  }

  closeCartDrawer();
  openModal('checkoutModal');
}

function submitCheckoutOrder(e) {
  e.preventDefault();
  const name = document.getElementById('coName').value.trim();
  const phone = document.getElementById('coPhone').value.trim();
  const address = document.getElementById('coAddress').value.trim();
  const paymentMethod = document.querySelector('.payment-method-card.selected')?.dataset.method || 'GCash';
  const notes = document.getElementById('coNotes')?.value.trim() || '';

  if (!name || !phone || !address) {
    showToast('Paki-fill out lahat ng required information, Apo!');
    return;
  }

  // Generate friendly receipt & order code
  const orderCode = 'AP-' + Math.floor(100000 + Math.random() * 900000);
  
  // Format Messenger fallback message
  const itemsText = cart.items.map(i => `• ${i.quantity}x ${i.name} (₱${i.price * i.quantity})`).join('\n');
  const messengerMsg = encodeURIComponent(
    `Huy Lola Paning / Apung Paning Team! 👵🏽💜\n\nNais ko po i-confirm ang aking order (${orderCode}):\n\n${itemsText}\n\nTotal: ₱${cart.getTotal()}\nPayment: ${paymentMethod}\n\nPangalan: ${name}\nContact: ${phone}\nAddress: ${address}\nNotes: ${notes}\n\nMaraming salamat po sa gawang-bahay merienda!`
  );

  closeModal('checkoutModal');
  cart.clearCart();

  // Show success modal
  const successModal = document.getElementById('orderSuccessModal');
  const successBody = document.getElementById('orderSuccessBody');
  if (successBody) {
    successBody.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">👵🏽🎉</div>
        <h3 style="font-family:var(--font-serif); font-size: 1.8rem; color:var(--plum-deep); margin-bottom: 8px;">
          Salamat, Apo! Your order is placed!
        </h3>
        <p style="color: #6B7280; margin-bottom: 18px;">
          Order Reference: <strong style="color:var(--plum-deep);">${orderCode}</strong>
        </p>
        <div style="background:var(--color-sand); padding: 16px; border-radius:12px; margin-bottom: 24px; text-align:left; font-size:0.9rem;">
          <p><strong>Payment Chosen:</strong> ${paymentMethod}</p>
          <p><strong>Deliver to:</strong> ${name} — ${address}</p>
          <p style="margin-top:8px; font-style:italic; color:#4B5563;">
            Inihahanda na sa kusina ni Lola ang sariwang batch ng iyong meryenda. Tatawag o magte-text kami bago ipadala ang rider!
          </p>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <a href="https://m.me/61575430525991?text=${messengerMsg}" target="_blank" class="btn-messenger-order" style="text-decoration:none;">
            Chat Us on Facebook Messenger to Track
          </a>
          <button class="btn-secondary" style="color:var(--plum-deep); border-color:var(--color-border); justify-content:center;" onclick="closeModal('orderSuccessModal')">
            Back to Merienda Catalog
          </button>
        </div>
      </div>
    `;
  }
  openModal('orderSuccessModal');
}

function orderViaMessenger() {
  if (cart.items.length === 0) {
    showToast('Walang laman ang bag mo, Apo!');
    return;
  }
  const itemsText = cart.items.map(i => `• ${i.quantity}x ${i.name} (₱${i.price * i.quantity})`).join('\n');
  const msg = encodeURIComponent(
    `Huy Lola Paning / Apung Paning! 👵🏽\nNais ko po mag-order directly:\n\n${itemsText}\n\nSubtotal: ₱${cart.getTotal()}\n\nPwede po magpa-assist for delivery details? Salamat po!`
  );
  window.open(`https://m.me/61575430525991?text=${msg}`, '_blank');
}

// ============================================================
// GENERAL MODAL HELPERS
// ============================================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>👵🏽</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// ============================================================
// INITIALIZATION ON DOM CONTENT LOADED
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Catalog
  renderProducts();

  // 2. Initialize Cart UI
  cart.updateUI();

  // 3. Initialize Bundle Builder
  updateBundleUI();

  // 4. Category Filter Tabs
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.category);
    });
  });

  // 5. Header Scroll Shadow
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  // 6. Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const navContainer = document.getElementById('navContainer');
  const navLinks = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      if (navContainer) navContainer.classList.toggle('active');
      if (navLinks) navLinks.classList.toggle('active');
    });

    // Close menu when clicking on any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        if (navContainer) navContainer.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
      });
    });
  }

  // 7. Promo Code Form in Cart
  const promoBtn = document.getElementById('btnApplyPromo');
  const promoInput = document.getElementById('cartPromoInput');
  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      const res = cart.applyPromo(promoInput.value);
      showToast(res.message);
    });
  }

  // 8. Payment Method Selection in Checkout
  document.querySelectorAll('.payment-method-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // 9. Checkout Form Submission
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', submitCheckoutOrder);
  }

  // 10. Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail')?.value;
      if (email) {
        showToast('Huy, Apo! Salamat sa pag-subscribe! Gamitin ang code HUYAPO10 for 10% off! 💜');
        document.getElementById('newsletterEmail').value = '';
      }
    });
  }

  // 11. Initialize Fullscreen State
  updateFullscreenUI();
});

// ============================================================
// FULLSCREEN MODE CONTROLLER
// ============================================================
function isFullscreenActive() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function toggleFullscreen() {
  const docEl = document.documentElement;
  if (!isFullscreenActive()) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(err => console.warn('Fullscreen request failed:', err));
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.warn('Exit fullscreen failed:', err));
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function updateFullscreenUI() {
  const isFs = isFullscreenActive();

  // Update Header Fullscreen Button
  const headerBtn = document.getElementById('fullscreenToggleBtn');
  if (headerBtn) {
    const expandIcon = headerBtn.querySelector('.icon-expand');
    const compressIcon = headerBtn.querySelector('.icon-compress');
    if (expandIcon && compressIcon) {
      expandIcon.style.display = isFs ? 'none' : 'block';
      compressIcon.style.display = isFs ? 'block' : 'none';
    }
    headerBtn.setAttribute('title', isFs ? 'Exit Full Screen' : 'Toggle Full Screen');
    headerBtn.setAttribute('aria-label', isFs ? 'Exit Full Screen' : 'Toggle Full Screen');
  }
}

// Fullscreen event listeners across browsers
['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(event => {
  document.addEventListener(event, updateFullscreenUI);
});

