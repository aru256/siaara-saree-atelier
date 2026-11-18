/**
 * SIAARA ATELIER - Executive Admin Panel Controller
 * Synchronized with StoreDB in real-time
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  refreshAdminDashboard();

  window.addEventListener('siaara_orders_updated', () => refreshAdminDashboard());
  window.addEventListener('siaara_products_updated', () => refreshAdminDashboard());
  window.addEventListener('siaara_bookings_updated', () => refreshAdminDashboard());
});

function refreshAdminDashboard() {
  updateMetrics();
  renderOrdersTable();
  renderAdminProducts();
  renderBookingsTable();

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ================= KPI METRICS =================
function updateMetrics() {
  const orders = StoreDB.getOrders();
  const products = StoreDB.getProducts();
  const bookings = StoreDB.getBookings();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const revEl = document.getElementById('stat-revenue');
  const ordEl = document.getElementById('stat-orders-count');
  const prodEl = document.getElementById('stat-products-count');
  const bookEl = document.getElementById('stat-bookings-count');

  if (revEl) revEl.textContent = Currency.format(totalRevenue);
  if (ordEl) ordEl.textContent = orders.length;
  if (prodEl) prodEl.textContent = products.length;
  if (bookEl) bookEl.textContent = bookings.length;
}

// ================= ORDERS MANAGEMENT =================
function renderOrdersTable(filteredOrders = null) {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;

  const orders = filteredOrders || StoreDB.getOrders();

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-brand-mocha">
          <i data-lucide="inbox" class="w-8 h-8 text-brand-sand mx-auto mb-2"></i>
          <p class="font-bold">No orders found</p>
        </td>
      </tr>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  tbody.innerHTML = orders.map(order => {
    return `
      <tr class="hover:bg-brand-sand/30 transition-colors">
        <!-- Order ID & Date -->
        <td class="py-3.5 px-3">
          <span class="font-bold text-brand-espresso block">${order.orderId}</span>
          <span class="text-[10px] text-brand-muted">${new Date(order.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </td>

        <!-- Customer Details -->
        <td class="py-3.5 px-3">
          <span class="font-bold text-brand-espresso block">${order.customerName}</span>
          <span class="text-[11px] text-brand-mocha block">${order.customerPhone}</span>
          <button onclick="viewCustomerAddress('${order.orderId}')" class="text-[10px] text-brand-gold hover:underline font-semibold mt-0.5">
            View Address
          </button>
        </td>

        <!-- Items Booked -->
        <td class="py-3.5 px-3">
          <div class="flex items-center gap-2">
            ${order.items.slice(0, 2).map(i => `
              <img src="${i.image}" alt="${i.name}" title="${i.name} (x${i.qty})" class="w-8 h-10 object-cover rounded-lg border border-brand-sand shadow-sm" />
            `).join('')}
            <div class="text-[11px]">
              <span class="font-semibold text-brand-espresso block">${order.items[0]?.name || 'Heirloom Saree'}</span>
              ${order.items.length > 1 ? `<span class="text-brand-muted text-[10px]">+${order.items.length - 1} more item(s)</span>` : ''}
            </div>
          </div>
        </td>

        <!-- Amount -->
        <td class="py-3.5 px-3 font-serif font-bold text-brand-gold text-sm">
          ${Currency.format(order.total)}
        </td>

        <!-- Payment -->
        <td class="py-3.5 px-3">
          <span class="badge-pill ${order.paymentStatus === 'PAID' ? 'badge-success' : 'badge-brown'} text-[10px]">
            ${order.paymentMethod}
          </span>
        </td>

        <!-- Live Status Dropdown (Real-Time Interactive) -->
        <td class="py-3.5 px-3">
          <select 
            onchange="handleStatusChange('${order.orderId}', this.value)" 
            class="text-xs py-1.5 px-3 bg-white border border-brand-gold/40 rounded-full font-semibold text-brand-espresso focus:ring-2 focus:ring-brand-gold cursor-pointer"
          >
            <option value="Order Confirmed" ${order.orderStatus === 'Order Confirmed' ? 'selected' : ''}>Order Confirmed</option>
            <option value="Loom Allocated" ${order.orderStatus === 'Loom Allocated' ? 'selected' : ''}>Loom Allocated</option>
            <option value="Weaving & Finishing" ${order.orderStatus === 'Weaving & Finishing' ? 'selected' : ''}>Weaving & Finishing</option>
            <option value="Dispatched" ${order.orderStatus === 'Dispatched' ? 'selected' : ''}>Dispatched via Courier</option>
            <option value="Delivered" ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered Successfully</option>
          </select>
        </td>

        <!-- Actions -->
        <td class="py-3.5 px-3 text-right">
          <button onclick="window.open('index.html#track-order', '_blank')" title="View in Customer Tracker" class="w-8 h-8 rounded-full bg-brand-sand hover:bg-brand-gold hover:text-brand-espresso text-brand-mocha inline-flex items-center justify-center transition-all">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function handleStatusChange(orderId, newStatus) {
  StoreDB.updateOrderStatus(orderId, newStatus);
  alert(`Order ${orderId} status successfully updated to: "${newStatus}". Customer tracking will immediately reflect this stage!`);
}

function viewCustomerAddress(orderId) {
  const orders = StoreDB.getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    alert(`Delivery Coordinates for ${order.orderId}:\n\nRecipient: ${order.customerName}\nPhone: ${order.customerPhone}\nEmail: ${order.customerEmail}\n\nShipping Destination:\n${order.shippingAddress}\n\nCourier: ${order.trackingCourier} (Waybill: ${order.trackingNumber})`);
  }
}

function filterOrdersTable() {
  const query = document.getElementById('order-search-input').value.toLowerCase().trim();
  const orders = StoreDB.getOrders();
  if (!query) {
    renderOrdersTable();
    return;
  }
  const filtered = orders.filter(o => 
    o.orderId.toLowerCase().includes(query) ||
    o.customerName.toLowerCase().includes(query) ||
    o.customerPhone.includes(query) ||
    o.orderStatus.toLowerCase().includes(query)
  );
  renderOrdersTable(filtered);
}

// ================= PRODUCT & INVENTORY MANAGEMENT =================
function renderAdminProducts() {
  const grid = document.getElementById('admin-products-grid');
  if (!grid) return;

  const products = StoreDB.getProducts();

  grid.innerHTML = products.map(prod => `
    <div class="p-4 rounded-3xl bg-brand-cream border border-brand-gold/30 flex flex-col justify-between space-y-3">
      <div class="flex gap-3">
        <img src="${prod.images[0]}" alt="${prod.name}" class="w-16 h-20 object-cover rounded-2xl border border-brand-sand shrink-0" />
        <div class="flex-1 min-w-0">
          <span class="text-[10px] text-brand-gold uppercase tracking-wider font-bold">${prod.collectionName}</span>
          <h4 class="font-serif text-sm font-bold text-brand-espresso truncate">${prod.name}</h4>
          <span class="text-xs font-serif font-bold text-brand-gold block mt-0.5">${Currency.format(prod.price)}</span>
          <span class="badge-pill ${prod.inStock ? 'badge-success' : 'badge-brown'} text-[10px] mt-1">
            ${prod.inStock ? 'In Stock' : 'Sold Out'}
          </span>
        </div>
      </div>

      <div class="pt-2 border-t border-brand-gold/20 flex items-center justify-between text-xs">
        <button onclick="toggleProductStock('${prod.id}')" class="text-brand-mocha hover:text-brand-gold font-semibold underline text-[11px]">
          ${prod.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
        </button>
        <button onclick="deleteProduct('${prod.id}')" class="text-brand-terracotta hover:underline font-semibold text-[11px]">
          Delete Weave
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function toggleProductStock(id) {
  const prod = StoreDB.getProductById(id);
  if (prod) {
    StoreDB.updateProduct(id, { inStock: !prod.inStock });
  }
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to remove this saree from the active boutique catalog?')) {
    StoreDB.deleteProduct(id);
  }
}

function openAddProductModal() {
  const modal = document.getElementById('add-product-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAddProductModal() {
  const modal = document.getElementById('add-product-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCreateProduct(e) {
  e.preventDefault();

  const name = document.getElementById('new-prod-name').value.trim();
  const collection = document.getElementById('new-prod-collection').value;
  const color = document.getElementById('new-prod-color').value;
  const price = Number(document.getElementById('new-prod-price').value);
  const origPrice = Number(document.getElementById('new-prod-orig-price').value);
  const imgUrl = document.getElementById('new-prod-image').value.trim();
  const fabric = document.getElementById('new-prod-fabric').value.trim();
  const desc = document.getElementById('new-prod-desc').value.trim();

  const collectionNames = {
    'tissue-silk': 'Tissue Silk',
    'banarasi-silk': 'Banarasi Silk',
    'malai-silk': 'Malai Silk',
    'kanjivaram-silk': 'Kanjivaram Silk',
    'organza-silk': 'Organza Silk'
  };

  const newProd = StoreDB.addProduct({
    name,
    collection,
    collectionName: collectionNames[collection] || 'Luxury Silk',
    price,
    originalPrice: origPrice,
    color,
    colorHex: '#D4AF37',
    tag: 'New Masterpiece',
    fabric,
    zariType: 'Tested Metallic Zari Weave',
    blousePiece: 'Matching unstitched blouse piece included',
    length: '6.4 Meters',
    description: desc,
    images: [imgUrl, imgUrl, imgUrl]
  });

  closeAddProductModal();
  e.target.reset();
  alert(`"${newProd.name}" has been published live to the Customer Storefront!`);
}

// ================= BRIDAL BOOKINGS =================
function renderBookingsTable() {
  const tbody = document.getElementById('bookings-table-body');
  if (!tbody) return;

  const bookings = StoreDB.getBookings();

  if (bookings.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-12 text-center text-brand-mocha">
          <p class="font-bold">No active appointments</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = bookings.map(b => `
    <tr class="hover:bg-brand-sand/30 transition-colors">
      <td class="py-3 px-3 font-bold text-brand-espresso">${b.id}</td>
      <td class="py-3 px-3">
        <span class="font-bold text-brand-espresso block">${b.name}</span>
        <span class="text-[11px] text-brand-mocha">${b.phone}</span>
      </td>
      <td class="py-3 px-3">
        <span class="font-medium text-brand-espresso block">${b.preferredDate}</span>
        <span class="text-[10px] text-brand-gold font-bold">${b.preferredTime}</span>
      </td>
      <td class="py-3 px-3 text-xs text-brand-mocha">
        ${b.service}
      </td>
      <td class="py-3 px-3">
        <span class="badge-pill ${b.status === 'Confirmed' ? 'badge-success' : 'badge-brown'} text-[10px]">
          ${b.status}
        </span>
      </td>
      <td class="py-3 px-3 text-right">
        <a href="https://wa.me/${b.phone.replace(/\D/g, '')}" target="_blank" class="px-3 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-semibold hover:bg-emerald-600 inline-flex items-center gap-1">
          <i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp
        </a>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= TAB SWITCHER =================
function switchAdminTab(tabKey) {
  const views = ['orders', 'products', 'bookings'];
  views.forEach(v => {
    const el = document.getElementById(`admin-view-${v}`);
    const btn = document.getElementById(`tab-btn-${v}`);
    if (v === tabKey) {
      if (el) el.classList.remove('hidden');
      if (btn) {
        btn.classList.add('bg-brand-espresso', 'text-brand-sand', 'shadow-sm');
        btn.classList.remove('text-brand-mocha');
      }
    } else {
      if (el) el.classList.add('hidden');
      if (btn) {
        btn.classList.remove('bg-brand-espresso', 'text-brand-sand', 'shadow-sm');
        btn.classList.add('text-brand-mocha');
      }
    }
  });
}

