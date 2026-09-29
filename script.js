/**
 * ===================================================================
 * GameZone – Gaming Store | Dynamic Front-End Engine
 * Written in Clean, Beginner-Friendly Vanilla JavaScript (ES6+)
 * 
 * Features:
 * - Dynamic Game Catalog Array (10 Featured Titles)
 * - Multi-criteria Filtering (Search, Category, Price Range, Sorting)
 * - Single-Page Dynamic View Routing (SPA with window.location.hash)
 * - Interactive Shopping Cart with LocalStorage Persistence
 * - Quantity Increment/Decrement and Subtotal Recalculation
 * - Game Details Showcase with System Specs & "Buy Now"
 * - Simulated Checkout Workflow & Dynamic Order ID Receipt Modal
 * - Front-End User Authentication (Login/Register Demo)
 * - Contact Form Validation & Interactive Feedback
 * - Toast Notification Alert System
 * ===================================================================
 */

// ==========================================
// 1. DATA STORE: SAMPLE GAMES ARRAY
// ==========================================
const gamesData = [
  {
    id: 1,
    name: "Cyber Strike",
    category: "Action",
    price: 1999,
    mrp: 2999,
    rating: 4.8,
    reviews: 1420,
    featured: true,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description: "Dive into a neon-lit cyberpunk metropolis where cybernetically enhanced operatives wage war against ruthless megacorporations in adrenaline-charged tactical gunplay.",
    longDescription: "Set in Neo-Veridia in the year 2088, Cyber Strike delivers lightning-fast first-person tactical action. Upgrade your neural implants, hack enemy security drones, and conquer intense corporate territories. Featuring cutting-edge ray-tracing graphics, 60fps competitive gunplay, and a dynamic 25-hour single-player campaign alongside team-based multiplayer skirmishes.",
    specs: {
      platform: "PC, PS5, Xbox Series X",
      release: "2026 Edition",
      developer: "CyberCore Interactive",
      storage: "65 GB SSD"
    }
  },
  {
    id: 2,
    name: "Street Racer X",
    category: "Racing",
    price: 1499,
    mrp: 2499,
    rating: 4.6,
    reviews: 980,
    featured: true,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
    description: "Tear through night-drenched urban highways and alpine mountain passes in custom-tuned supercars with realistic physics and nitro-boosted velocity.",
    longDescription: "Street Racer X redefines street racing with ultra-detailed vehicle customization, authentic engine acoustics, dynamic rain reflections, and competitive online crew battles. Tune your turbochargers, spray custom decals, and drift through bustling Tokyo-inspired highways to become the undisputed street king.",
    specs: {
      platform: "PC, PS5, Xbox Series X",
      release: "2025 Winter",
      developer: "Apex Velocity Studios",
      storage: "50 GB High-Speed"
    }
  },
  {
    id: 3,
    name: "Shadow Quest",
    category: "Adventure",
    price: 2299,
    mrp: 3499,
    rating: 4.9,
    reviews: 2150,
    featured: true,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    description: "An atmospheric stealth-adventure across forgotten ancient kingdoms and shadow realms. Unravel clandestine conspiracies armed with ancient magic.",
    longDescription: "Step into the boots of Kaelen, the last Shadow Walker. Traverse misty gothic ruins, scale ancient temple battlements, and bend shadows to eliminate corrupt tyrannical monarchs. Features an expansive open world, branching dialogue choices, deep stealth mechanics, and an award-winning orchestral soundtrack.",
    specs: {
      platform: "PC, PS5, Nintendo Switch 2",
      release: "2026 Master Edition",
      developer: "Mythic Veil Games",
      storage: "70 GB SSD"
    }
  },
  {
    id: 4,
    name: "Battle Arena",
    category: "Strategy",
    price: 1199,
    mrp: 1999,
    rating: 4.5,
    reviews: 870,
    featured: false,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    description: "Clash in fast-paced competitive tactical warfare. Select your champion, master distinctive weapon loadouts, and conquer the global leaderboards.",
    longDescription: "Battle Arena brings tactical depth to arena strategy. Form squads of four warriors, coordinate spell combos, control map objectives, and outsmart opposing commanders in intense 20-minute ranked matches. Includes over 40 unique champions and seasonal tournament ladders.",
    specs: {
      platform: "PC Exclusive",
      release: "2025 Competitive",
      developer: "Ironclad Studios",
      storage: "35 GB"
    }
  },
  {
    id: 5,
    name: "Football Pro 26",
    category: "Sports",
    price: 2999,
    mrp: 4199,
    rating: 4.7,
    reviews: 1820,
    featured: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    description: "The next generation of virtual football. Experience hyper-realistic player animations, tactical career management, and authentic stadium atmospheres.",
    longDescription: "Feel every touch, tackle, and strike with the groundbreaking HyperMotion engine in Football Pro 26. Manage your dream club across all major global leagues, scout youth talent, and lead your team to international glory in career mode or online competitive seasons.",
    specs: {
      platform: "PC, PS5, Xbox Series X, Switch",
      release: "2026 Edition",
      developer: "EA Pro Sports",
      storage: "80 GB SSD"
    }
  },
  {
    id: 6,
    name: "Space Warriors",
    category: "Action",
    price: 1799,
    mrp: 2699,
    rating: 4.4,
    reviews: 730,
    featured: false,
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80",
    description: "Pilot deep-space starfighters through asteroid fields, board hostile capital dreadnoughts, and defend the outer solar colonies against alien armadas.",
    longDescription: "Space Warriors puts you in the cockpit of advanced starfighters equipped with plasma cannons, shield boosters, and warp drives. Engage in dogfights around planetary rings, coordinate orbital bombardment strikes, and experience deep-space tactical warfare on a galactic scale.",
    specs: {
      platform: "PC, PS5, VR Compatible",
      release: "2025 Galactic",
      developer: "Nebula Interactive",
      storage: "55 GB"
    }
  },
  {
    id: 7,
    name: "Desert Racing",
    category: "Racing",
    price: 899,
    mrp: 1499,
    rating: 4.3,
    reviews: 540,
    featured: false,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description: "Conquer relentless desert dunes, rocky canyons, and extreme off-road terrains behind the wheel of rugged 4x4 trophy trucks and sand buggies.",
    longDescription: "Race across unforgiving desert landscapes with realistic deformable terrain physics. Navigate blinding sandstorms, master high-speed dune jumps, and fine-tune your suspension and tire grip to survive gruelling rally raid championships across the Sahara and Mojave.",
    specs: {
      platform: "PC, PS5, Xbox Series X",
      release: "2025 Off-Road",
      developer: "DustStorm Studios",
      storage: "40 GB"
    }
  },
  {
    id: 8,
    name: "Mystery Island",
    category: "Adventure",
    price: 1299,
    mrp: 1999,
    rating: 4.6,
    reviews: 1100,
    featured: false,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Shipwrecked on an uncharted island shrouded in mist, solve cryptic environmental puzzles and uncover the lost relics of a forgotten civilization.",
    longDescription: "An evocative first-person puzzle adventure filled with wonder and discovery. Explore lush tropical jungles, submerged sea caverns, and ancient crystal observatories. Every puzzle is organically woven into the island's mysterious past, rewarding patience, curiosity, and keen observation.",
    specs: {
      platform: "PC, PS5, Nintendo Switch",
      release: "2025 Explorers",
      developer: "Solitary Studios",
      storage: "30 GB"
    }
  },
  {
    id: 9,
    name: "Dragon Legends",
    category: "RPG",
    price: 2499,
    mrp: 3799,
    rating: 4.9,
    reviews: 3200,
    featured: true,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    description: "An epic open-world fantasy RPG. Forge legendary blades, master dragon incantations, and vanquish primordial beasts across the continent of Eldoria.",
    longDescription: "Immerse yourself in Eldoria, a vast living realm where ancient dragons awaken from thousand-year slumbers. Customise your class from Archmage to Dragon Knight, tame winged mounts, harvest mythical ore, and shape the political fate of kingdoms through consequential player choices.",
    specs: {
      platform: "PC, PS5, Xbox Series X",
      release: "2026 Definitive",
      developer: "Eldoria World Games",
      storage: "90 GB SSD"
    }
  },
  {
    id: 10,
    name: "Speed Horizon",
    category: "Racing",
    price: 1899,
    mrp: 2799,
    rating: 4.7,
    reviews: 1650,
    featured: false,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    description: "An exhilarating open-world racing festival across coastal highways, scenic mountain passes, and bustling cities with dynamic 4-season weather.",
    longDescription: "Drive over 200 meticulously licensed supercars in a vibrant open-world festival. Seamlessly transition between sunny coastal sprints, torrential monsoon drifts, and snow-capped mountain hillclimbs. Features seamless multiplayer drop-in co-op and a custom track creator.",
    specs: {
      platform: "PC, PS5, Xbox Series X",
      release: "2026 Festival",
      developer: "Horizon Horizon Interactive",
      storage: "75 GB SSD"
    }
  }
];

// ==========================================
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
// The shopping cart array holds objects: { id: number, quantity: number }
let cart = [];
let appliedDiscount = 0; // Discount in percentage (e.g. 10 for 10%)
let currentUser = null; // Stored user { name, email }

/**
 * Initializes state from browser localStorage
 */
function initStorage() {
  try {
    const savedCart = localStorage.getItem('gamezone_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }

    const savedUser = localStorage.getItem('gamezone_user');
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
      updateUserNavUI();
    }
  } catch (err) {
    console.warn("Could not read from localStorage:", err);
    cart = [];
  }
}

/**
 * Persists current cart to localStorage and updates UI badges
 */
function saveCart() {
  try {
    localStorage.setItem('gamezone_cart', JSON.stringify(cart));
  } catch (err) {
    console.warn("Could not write cart to localStorage:", err);
  }
  updateCartBadge();
}

/**
 * Calculates total number of items in the cart
 */
function getCartTotalCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Updates navbar badges with current cart count
 */
function updateCartBadge() {
  const count = getCartTotalCount();
  const navBadge = document.getElementById('nav-cart-badge');
  const mobileBadge = document.getElementById('mobile-cart-badge');
  
  if (navBadge) navBadge.textContent = count;
  if (mobileBadge) mobileBadge.textContent = count;
}

// ==========================================
// 3. SINGLE PAGE ROUTING & NAVIGATION
// ==========================================

/**
 * Shows the target section and hides all others
 * @param {string} sectionId - Target section name ('home', 'games', 'categories', 'game-details', 'cart', 'checkout', 'about', 'contact')
 * @param {boolean} updateHash - Whether to push to URL hash
 */
function navigateTo(sectionId, updateHash = true) {
  // All available sections
  const sections = [
    'home', 'games', 'categories', 'game-details', 
    'cart', 'checkout', 'about', 'contact'
  ];

  // Hide all sections
  sections.forEach(sec => {
    const el = document.getElementById(`section-${sec}`);
    if (el) el.classList.remove('active');
  });

  // Activate chosen section
  const targetSection = document.getElementById(`section-${sectionId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  } else {
    // Fallback to home
    const homeSection = document.getElementById('section-home');
    if (homeSection) homeSection.classList.add('active');
    sectionId = 'home';
  }

  // Update navigation menu active states
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    const pageAttr = link.getAttribute('data-page') || link.getAttribute('href')?.replace('#', '');
    if (pageAttr === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update URL hash without jumping
  if (updateHash) {
    window.location.hash = sectionId;
  }

  // If navigating to cart or checkout, refresh their respective views
  if (sectionId === 'cart') {
    renderCart();
  } else if (sectionId === 'checkout') {
    renderCheckoutSummary();
  }

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Syncs page with initial URL hash or on back/forward browser button
 */
function handleHashChange() {
  const hash = window.location.hash.replace('#', '').trim();
  if (hash.startsWith('details?id=')) {
    const gameId = parseInt(hash.split('=')[1], 10);
    if (!isNaN(gameId)) {
      openGameDetails(gameId, false);
      return;
    }
  }

  if (hash) {
    navigateTo(hash, false);
  } else {
    navigateTo('home', false);
  }
}

/**
 * Mobile Navigation Drawer Toggle
 */
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.classList.toggle('open');
  }
}

// ==========================================
// 4. RENDERING GAME CARDS
// ==========================================

/**
 * Generates HTML string for a single game card
 * @param {Object} game - Game item object
 */
function createGameCardHTML(game) {
  // Format Indian Rupee currency
  const formattedPrice = `₹${game.price.toLocaleString('en-IN')}`;

  return `
    <article class="game-card" data-id="${game.id}">
      <div class="game-card-image-wrap" onclick="openGameDetails(${game.id})">
        <img 
          src="${game.image}" 
          alt="${game.name} Cover" 
          class="game-card-img"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'"
        >
        <span class="game-card-tag">${game.category}</span>
        <div class="game-card-rating">
          ★ ${game.rating}
        </div>
      </div>

      <div class="game-card-body">
        <h3 class="game-card-title" onclick="openGameDetails(${game.id})">${game.name}</h3>
        <p class="game-card-desc">${game.description}</p>
        
        <div class="game-card-footer">
          <div class="game-price-box">
            <span class="price-label">Price</span>
            <span class="game-price">${formattedPrice}</span>
          </div>

          <div class="game-card-actions">
            <button class="btn btn-secondary btn-sm" onclick="openGameDetails(${game.id})" title="View Details">
              Details
            </button>
            <button class="btn-icon-cart" onclick="addToCart(${game.id})" title="Add ${game.name} to Cart">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renders Featured Games onto the Home page section
 */
function renderFeaturedGames() {
  const featuredContainer = document.getElementById('home-featured-grid');
  if (!featuredContainer) return;

  const featuredList = gamesData.filter(g => g.featured);
  featuredContainer.innerHTML = featuredList.map(createGameCardHTML).join('');
}

/**
 * Renders the All Games catalog with current filters applied
 */
function renderCatalog(gamesToRender) {
  const gridContainer = document.getElementById('all-games-grid');
  const emptyState = document.getElementById('games-empty-state');
  const countText = document.getElementById('results-count-text');

  if (!gridContainer) return;

  if (countText) {
    countText.textContent = `Showing ${gamesToRender.length} of ${gamesData.length} games`;
  }

  if (gamesToRender.length === 0) {
    gridContainer.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
  } else {
    if (emptyState) emptyState.classList.add('hidden');
    gridContainer.innerHTML = gamesToRender.map(createGameCardHTML).join('');
  }
}

// ==========================================
// 5. SEARCH, FILTERING & SORTING LOGIC
// ==========================================

/**
 * Reads all active filter inputs and re-renders catalog
 */
function handleFilterChange() {
  const searchInput = document.getElementById('game-search-input');
  const catSelect = document.getElementById('category-filter-select');
  const priceSelect = document.getElementById('price-filter-select');
  const sortSelect = document.getElementById('sort-select');

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCategory = catSelect ? catSelect.value : 'all';
  const selectedPrice = priceSelect ? priceSelect.value : 'all';
  const selectedSort = sortSelect ? sortSelect.value : 'featured';

  // 1. Filter by Search Query (Name or Category or Description)
  let filtered = gamesData.filter(game => {
    const matchesSearch = !searchTerm || 
      game.name.toLowerCase().includes(searchTerm) ||
      game.category.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm);

    // 2. Filter by Category
    const matchesCat = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory.toLowerCase();

    // 3. Filter by Price bracket
    let matchesPrice = true;
    if (selectedPrice === 'under-1500') {
      matchesPrice = game.price < 1500;
    } else if (selectedPrice === '1500-2500') {
      matchesPrice = game.price >= 1500 && game.price <= 2500;
    } else if (selectedPrice === 'above-2500') {
      matchesPrice = game.price > 2500;
    }

    return matchesSearch && matchesCat && matchesPrice;
  });

  // 4. Sort the filtered array
  if (selectedSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default featured: featured first, then original order
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  // Update pills UI to reflect active category
  updatePillsUI(selectedCategory);

  renderCatalog(filtered);
}

/**
 * Updates Category Pill buttons visual highlight
 */
function updatePillsUI(activeCategory) {
  const pills = document.querySelectorAll('.pill-btn');
  pills.forEach(pill => {
    const cat = pill.getAttribute('data-cat');
    if (cat.toLowerCase() === activeCategory.toLowerCase()) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

/**
 * Handles clicking a category pill button
 */
function selectPillCategory(catName) {
  const catSelect = document.getElementById('category-filter-select');
  if (catSelect) {
    catSelect.value = catName;
  }
  handleFilterChange();
}

/**
 * Helper to filter by category and navigate straight to the Games page
 */
function filterAndNavigateCategory(catName) {
  const catSelect = document.getElementById('category-filter-select');
  if (catSelect) {
    catSelect.value = catName;
  }
  // Clear search for clarity
  const searchInput = document.getElementById('game-search-input');
  if (searchInput) searchInput.value = '';

  navigateTo('games');
  handleFilterChange();
}

/**
 * Resets all search, category, and sort filters back to defaults
 */
function resetFilters() {
  const searchInput = document.getElementById('game-search-input');
  const catSelect = document.getElementById('category-filter-select');
  const priceSelect = document.getElementById('price-filter-select');
  const sortSelect = document.getElementById('sort-select');

  if (searchInput) searchInput.value = '';
  if (catSelect) catSelect.value = 'all';
  if (priceSelect) priceSelect.value = 'all';
  if (sortSelect) sortSelect.value = 'featured';

  handleFilterChange();
  showToast("All filters have been reset.");
}

/**
 * Clears search input box
 */
function clearSearch() {
  const searchInput = document.getElementById('game-search-input');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
    handleFilterChange();
  }
}

// ==========================================
// 6. GAME DETAILS PAGE VIEW
// ==========================================

/**
 * Opens detailed view for a chosen game ID
 */
function openGameDetails(gameId, updateHash = true) {
  const game = gamesData.find(g => g.id === gameId);
  if (!game) return;

  const breadcrumb = document.getElementById('detail-breadcrumb-title');
  if (breadcrumb) breadcrumb.textContent = game.name;

  const container = document.getElementById('game-detail-container');
  if (!container) return;

  const discountPercent = Math.round(((game.mrp - game.price) / game.mrp) * 100);

  container.innerHTML = `
    <div class="detail-layout-grid">
      
      <!-- Left Image Column -->
      <div class="detail-image-box">
        <img 
          src="${game.image}" 
          alt="${game.name} Artwork" 
          class="detail-main-img"
          onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'"
        >
      </div>

      <!-- Right Details Column -->
      <div class="detail-info-box">
        <div class="detail-header-tags">
          <span class="section-tag">${game.category}</span>
          <span class="badge-dot"></span>
          <span class="text-success" style="font-size: 0.85rem; font-weight: 700;">● IN STOCK (DIGITAL)</span>
        </div>

        <h1 class="detail-title">${game.name}</h1>

        <div class="detail-rating-row">
          <div class="rating-stars">★★★★★</div>
          <span class="rating-score">${game.rating} / 5.0</span>
          <span class="review-count">(${game.reviews.toLocaleString()} gamer reviews)</span>
        </div>

        <div class="detail-price-box">
          <span class="detail-price">₹${game.price.toLocaleString('en-IN')}</span>
          <span class="detail-price-mrp">₹${game.mrp.toLocaleString('en-IN')}</span>
          <span class="detail-discount-badge">${discountPercent}% OFF</span>
        </div>

        <p class="detail-desc">${game.longDescription || game.description}</p>

        <!-- System Specs Grid -->
        <div class="detail-specs-grid">
          <div class="spec-pill"><strong>Platforms:</strong> ${game.specs?.platform || "PC / Console"}</div>
          <div class="spec-pill"><strong>Release:</strong> ${game.specs?.release || "2026"}</div>
          <div class="spec-pill"><strong>Developer:</strong> ${game.specs?.developer || "GameZone Studios"}</div>
          <div class="spec-pill"><strong>Download:</strong> ${game.specs?.storage || "50 GB"}</div>
        </div>

        <!-- Action Buttons -->
        <div class="detail-actions-row">
          <button class="btn btn-primary btn-large flex-grow" onclick="addToCart(${game.id})">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
          <button class="btn btn-secondary btn-large" onclick="buyNowGame(${game.id})">
            Buy Now ⚡
          </button>
        </div>

        <div class="detail-guarantees">
          <span>✓ Instant Key Activation</span>
          <span>✓ Official Publisher License</span>
          <span>✓ 24/7 Digital Support</span>
        </div>

      </div>

    </div>
  `;

  navigateTo('game-details', false);
  if (updateHash) {
    window.location.hash = `details?id=${game.id}`;
  }
}

/**
 * "Buy Now" handler: adds to cart if not present, then opens checkout immediately
 */
function buyNowGame(gameId) {
  addToCart(gameId, false); // Don't show redundant toast
  proceedToCheckout();
}

// ==========================================
// 7. SHOPPING CART LOGIC
// ==========================================

/**
 * Adds a game to cart by ID
 */
function addToCart(gameId, showNotification = true) {
  const game = gamesData.find(g => g.id === gameId);
  if (!game) return;

  const existingItem = cart.find(item => item.id === gameId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: gameId, quantity: 1 });
  }

  saveCart();

  if (showNotification) {
    showToast(`Added "${game.name}" to cart! 🛒`);
  }
}

/**
 * Increases quantity of a cart item
 */
function incrementQuantity(gameId) {
  const item = cart.find(i => i.id === gameId);
  if (item) {
    item.quantity += 1;
    saveCart();
    renderCart();
  }
}

/**
 * Decreases quantity of a cart item (removes if reaches 0)
 */
function decrementQuantity(gameId) {
  const itemIndex = cart.findIndex(i => i.id === gameId);
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      removeFromCart(gameId);
      return;
    }
    saveCart();
    renderCart();
  }
}

/**
 * Removes an item from cart
 */
function removeFromCart(gameId) {
  const game = gamesData.find(g => g.id === gameId);
  cart = cart.filter(item => item.id !== gameId);
  saveCart();
  renderCart();
  
  if (game) {
    showToast(`Removed "${game.name}" from cart.`, 'toast-remove');
  }
}

/**
 * Clears entire shopping cart
 */
function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  appliedDiscount = 0;
  saveCart();
  renderCart();
  showToast("Your cart has been cleared.");
}

/**
 * Renders the Shopping Cart page UI
 */
function renderCart() {
  const contentWrapper = document.getElementById('cart-content-wrapper');
  const emptyState = document.getElementById('cart-empty-state');
  const listContainer = document.getElementById('cart-items-list');
  const countSpan = document.getElementById('cart-items-count');
  const subtotalSpan = document.getElementById('cart-subtotal-price');
  const totalSpan = document.getElementById('cart-total-price');

  if (!contentWrapper || !emptyState) return;

  if (cart.length === 0) {
    contentWrapper.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  contentWrapper.classList.remove('hidden');
  emptyState.classList.add('hidden');

  let subtotal = 0;
  let totalItems = 0;

  // Generate HTML for cart rows
  const itemsHTML = cart.map(item => {
    const game = gamesData.find(g => g.id === item.id);
    if (!game) return '';

    const itemTotal = game.price * item.quantity;
    subtotal += itemTotal;
    totalItems += item.quantity;

    return `
      <div class="cart-item-row">
        <img 
          src="${game.image}" 
          alt="${game.name}" 
          class="cart-item-thumb" 
          onclick="openGameDetails(${game.id})"
          onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'"
        >
        
        <div class="cart-item-meta">
          <span class="cart-item-title" onclick="openGameDetails(${game.id})">${game.name}</span>
          <span class="cart-item-cat">${game.category} • Digital License</span>
          <span class="cart-item-unit-price">₹${game.price.toLocaleString('en-IN')} each</span>
        </div>

        <div class="qty-controls">
          <button class="qty-btn" onclick="decrementQuantity(${game.id})" title="Decrease quantity">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="incrementQuantity(${game.id})" title="Increase quantity">+</button>
        </div>

        <div class="cart-item-total">
          ₹${itemTotal.toLocaleString('en-IN')}
        </div>

        <button class="cart-remove-btn" onclick="removeFromCart(${game.id})" title="Remove item">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  if (listContainer) listContainer.innerHTML = itemsHTML;
  if (countSpan) countSpan.textContent = totalItems;

  // Apply discount calculation
  let finalTotal = subtotal;
  if (appliedDiscount > 0) {
    const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
    finalTotal = subtotal - discountAmount;
  }

  if (subtotalSpan) subtotalSpan.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (totalSpan) totalSpan.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
}

/**
 * Applies a demo promo code (e.g. GAMEZONE10 for 10% off)
 */
function applyPromoCode() {
  const input = document.getElementById('coupon-code-input');
  const msg = document.getElementById('coupon-message');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();

  if (code === 'GAMEZONE10') {
    appliedDiscount = 10;
    msg.textContent = "✓ Promo code applied: 10% Student Discount!";
    msg.className = "coupon-message text-success";
    renderCart();
    showToast("Promo Code applied: 10% Discount!");
  } else if (code === '') {
    msg.textContent = "Please enter a promo code.";
    msg.className = "coupon-message text-danger";
  } else {
    msg.textContent = "Invalid code. Try 'GAMEZONE10'.";
    msg.className = "coupon-message text-danger";
  }
}

// ==========================================
// 8. CHECKOUT WORKFLOW
// ==========================================

/**
 * Navigates from Cart to Checkout page
 */
function proceedToCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add games to proceed!");
    navigateTo('games');
    return;
  }

  navigateTo('checkout');
}

/**
 * Renders the mini order review on the Checkout page
 */
function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-preview');
  const itemsCount = document.getElementById('checkout-total-items');
  const totalPrice = document.getElementById('checkout-total-price');

  if (!container) return;

  let subtotal = 0;
  let totalCount = 0;

  const itemsHTML = cart.map(item => {
    const game = gamesData.find(g => g.id === item.id);
    if (!game) return '';

    const itemTotal = game.price * item.quantity;
    subtotal += itemTotal;
    totalCount += item.quantity;

    return `
      <div class="checkout-item-mini">
        <span class="checkout-item-mini-name">${game.name} × ${item.quantity}</span>
        <strong>₹${itemTotal.toLocaleString('en-IN')}</strong>
      </div>
    `;
  }).join('');

  container.innerHTML = itemsHTML;
  if (itemsCount) itemsCount.textContent = totalCount;

  let finalTotal = subtotal;
  if (appliedDiscount > 0) {
    const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
    finalTotal = subtotal - discountAmount;
  }

  if (totalPrice) totalPrice.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  // Pre-fill user details if logged in
  if (currentUser) {
    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    if (nameInput && !nameInput.value) nameInput.value = currentUser.name || '';
    if (emailInput && !emailInput.value) emailInput.value = currentUser.email || '';
  }
}

/**
 * Handles placing the demo order
 */
function handleCheckoutSubmit(event) {
  event.preventDefault();

  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  const name = document.getElementById('checkout-name').value;
  const email = document.getElementById('checkout-email').value;
  const phone = document.getElementById('checkout-phone').value;
  const city = document.getElementById('checkout-city').value;
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || "UPI";

  // Calculate total before clearing cart
  let subtotal = cart.reduce((sum, item) => {
    const g = gamesData.find(game => game.id === item.id);
    return sum + (g ? g.price * item.quantity : 0);
  }, 0);

  let finalTotal = subtotal;
  if (appliedDiscount > 0) {
    finalTotal = subtotal - Math.round((subtotal * appliedDiscount) / 100);
  }

  // Generate random order ID (e.g. GZ-2026-89412)
  const orderId = `GZ-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  // Populate Order Confirmation Modal
  const receiptContainer = document.getElementById('order-receipt-details');
  if (receiptContainer) {
    receiptContainer.innerHTML = `
      <div class="receipt-line">
        <span>Order Number:</span>
        <strong>${orderId}</strong>
      </div>
      <div class="receipt-line">
        <span>Customer Name:</span>
        <strong>${name}</strong>
      </div>
      <div class="receipt-line">
        <span>Email Delivery:</span>
        <strong>${email}</strong>
      </div>
      <div class="receipt-line">
        <span>Payment Method:</span>
        <strong>${paymentMethod} (Demo)</strong>
      </div>
      <div class="receipt-line">
        <span>Total Amount Paid:</span>
        <strong style="color: var(--accent); font-size: 1.1rem;">₹${finalTotal.toLocaleString('en-IN')}</strong>
      </div>
      <div class="receipt-line">
        <span>Items Purchased:</span>
        <strong>${cart.length} title(s)</strong>
      </div>
    `;
  }

  // Show confirmation modal
  const modal = document.getElementById('order-success-modal');
  if (modal) modal.classList.remove('hidden');

  // Clear shopping cart and reset discount
  cart = [];
  appliedDiscount = 0;
  saveCart();

  // Reset checkout form
  const form = document.getElementById('checkout-form');
  if (form) form.reset();

  showToast(`Order ${orderId} confirmed successfully! 🎉`);
}

/**
 * Closes the order modal and redirects back to games store
 */
function closeOrderModalAndShop() {
  const modal = document.getElementById('order-success-modal');
  if (modal) modal.classList.add('hidden');
  navigateTo('games');
}

// ==========================================
// 9. AUTHENTICATION MODAL (LOGIN / REGISTER)
// ==========================================

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('hidden');
}

function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('login-form');
  const formRegister = document.getElementById('register-form');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.classList.remove('hidden');
    formRegister.classList.add('hidden');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.classList.remove('hidden');
    formLogin.classList.add('hidden');
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const name = email.split('@')[0]; // Simple mock name extraction

  currentUser = { name: capitalizeWord(name), email: email };
  localStorage.setItem('gamezone_user', JSON.stringify(currentUser));
  updateUserNavUI();
  closeAuthModal();
  showToast(`Welcome back, ${currentUser.name}! 🎮`);
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();

  currentUser = { name: name, email: email };
  localStorage.setItem('gamezone_user', JSON.stringify(currentUser));
  updateUserNavUI();
  closeAuthModal();
  showToast(`Account created! Welcome to GameZone, ${name}! 🚀`);
}

function updateUserNavUI() {
  const btnText = document.getElementById('user-btn-text');
  const mobileBtn = document.getElementById('mobile-auth-btn');

  if (currentUser) {
    if (btnText) btnText.textContent = currentUser.name;
    if (mobileBtn) mobileBtn.textContent = `Logout (${currentUser.name})`;
  } else {
    if (btnText) btnText.textContent = "Login";
    if (mobileBtn) mobileBtn.textContent = "Login / Register";
  }
}

function capitalizeWord(str) {
  if (!str) return 'Gamer';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==========================================
// 10. CONTACT FORM SUBMISSION
// ==========================================

function handleContactSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('contact-name');
  const feedback = document.getElementById('contact-feedback');

  const senderName = nameInput ? nameInput.value : 'Gamer';

  if (feedback) {
    feedback.textContent = `Thank you, ${senderName}! Your message has been received. Our team will contact you shortly.`;
    feedback.className = "contact-alert success";
    feedback.classList.remove('hidden');
  }

  // Reset form
  const form = document.getElementById('contact-form');
  if (form) form.reset();

  showToast("Contact message sent successfully!");
}

// ==========================================
// 11. TOAST NOTIFICATIONS
// ==========================================

/**
 * Displays a non-intrusive floating toast message
 * @param {string} message - Message text
 * @param {string} customClass - Optional CSS class
 */
function showToast(message, customClass = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${customClass}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove after 3.2 seconds
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

// ==========================================
// 12. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize storage
  initStorage();

  // Render initial views
  renderFeaturedGames();
  handleFilterChange(); // Renders catalog with default sorting/filtering
  updateCartBadge();

  // Handle URL routing
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
});
