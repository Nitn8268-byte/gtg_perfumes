// ====================== NAV: HAMBURGER ======================
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('nav--open');
    });
}

// ====================== GALLERY ======================
const galleryMain = document.getElementById('gallery-main');
const galleryImages = [
    'assets/img (13).png',
    'assets/img (9).png',
    'assets/img (10).png',
    'assets/img (11).png'
]; // adjust to your real main images

let currentIndex = 0;
const prevBtn = document.querySelector('.gallery-arrow--prev');
const nextBtn = document.querySelector('.gallery-arrow--next');
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const dots = Array.from(document.querySelectorAll('.dot'));

function setGalleryIndex(index) {
    const len = galleryImages.length;
    currentIndex = (index + len) % len;

    if (galleryMain) {
        galleryMain.src = galleryImages[currentIndex];
    }

    thumbs.forEach(btn => {
        btn.classList.toggle(
            'thumb--active',
            Number(btn.dataset.index) === currentIndex
        );
    });

    dots.forEach(btn => {
        btn.classList.toggle(
            'dot--active',
            Number(btn.dataset.index) === currentIndex
        );
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => setGalleryIndex(currentIndex - 1));
    nextBtn.addEventListener('click', () => setGalleryIndex(currentIndex + 1));
}

thumbs.forEach(btn =>
    btn.addEventListener('click', () =>
        setGalleryIndex(Number(btn.dataset.index))
    )
);

dots.forEach(btn =>
    btn.addEventListener('click', () =>
        setGalleryIndex(Number(btn.dataset.index))
    )
);

setGalleryIndex(0);

// ====================== PRODUCT LOGIC ======================

// --- plans: Single & Double are two independent dropdowns ---
const planSections = document.querySelectorAll('.plan');

planSections.forEach(plan => {
    const header = plan.querySelector('.plan__header');
    const indicator = plan.querySelector('.plan__radio-indicator');

    header.addEventListener('click', () => {
        // toggle this plan only
        const isOpen = plan.classList.toggle('plan--open');

        // update fake radio indicator
        if (indicator) {
            indicator.classList.toggle('plan__radio-indicator--active', isOpen);
        }

        // optional: keep purchaseType radios in sync with open/close
        const purchaseRadioValue =
            plan.dataset.plan === 'single' ? 'single-sub' : 'double-sub';
        const purchaseRadio = document.querySelector(
            `input[name="purchaseType"][value="${purchaseRadioValue}"]`
        );
        if (purchaseRadio && isOpen) {
            purchaseRadio.checked = true;
        }

        updateAddToCart();
    });
});

// --- fragrance tiles (3 variants) ---
const fragranceTiles = document.querySelectorAll('.fragrance-tile');

fragranceTiles.forEach(tile => {
    const input = tile.querySelector('input[type="radio"]');
    if (!input) return;

    input.addEventListener('change', () => {
        fragranceTiles.forEach(t =>
            t.classList.toggle(
                'fragrance-tile--selected',
                t.querySelector('input')?.checked
            )
        );
        updateAddToCart();
    });
});

// --- included tabs (Every 30 Days vs One Time Free) ---
const includedTabs = document.querySelectorAll('.included-tab');
const includedPanels = document.querySelectorAll('.included-panel');

includedTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const key = tab.dataset.included;

        includedTabs.forEach(t =>
            t.classList.toggle('included-tab--active', t === tab)
        );

        includedPanels.forEach(panel =>
            panel.classList.toggle(
                'included-panel--active',
                panel.dataset.included === key
            )
        );

        updateAddToCart();
    });
});

// ====================== ADD TO CART URL ======================

const addToCartLink = document.getElementById('add-to-cart');

function getActiveFragrance() {
    const el = document.querySelector('input[name="fragrance"]:checked');
    return el ? el.value : 'original';
}

function getActivePlan() {
    // prefer the plan that is visually open; fall back to dataset
    const openPlan = document.querySelector('.plan.plan--open');
    if (openPlan) return openPlan.dataset.plan || 'single';

    // fallback: use purchaseType radios if you still have them
    const purchase = document.querySelector(
        'input[name="purchaseType"]:checked'
    )?.value;
    if (purchase === 'double-sub') return 'double';
    return 'single';
}

function getActiveIncluded() {
    const activeTab = document.querySelector('.included-tab--active');
    return activeTab ? activeTab.dataset.included : 'every30';
}

// example mapping; extend to all combinations you want
const addToCartMap = {
    'original|single|every30': '#/cart/original-single-30',
    'original|single|onetime': '#/cart/original-single-one',
    'original|double|every30': '#/cart/original-double-30',
    'original|double|onetime': '#/cart/original-double-one',
    'lily|single|every30': '#/cart/lily-single-30',
    'lily|single|onetime': '#/cart/lily-single-one',
    'rose|single|every30': '#/cart/rose-single-30',
    'rose|single|onetime': '#/cart/rose-single-one'
    // add more keys as needed
};

function updateAddToCart() {
    const fragrance = getActiveFragrance();
    const plan = getActivePlan();        // 'single' or 'double'
    const included = getActiveIncluded(); // 'every30' or 'onetime'

    const key = `${fragrance}|${plan}|${included}`;
    if (addToCartLink) {
        addToCartLink.href = addToCartMap[key] || '#';
    }
}

// initial URL
updateAddToCart();

// ====================== STATS COUNTERS ======================
const statNumbers = document.querySelectorAll('.stat__number');
let statsAnimated = false;

function animateNumber(el, target, duration = 1100) {
    let start = null;

    function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const value = Math.floor(target * progress);
        el.textContent = `${value}%`;
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

const statsSection = document.querySelector('.section--stats');

if (statsSection && statNumbers.length) {
    const obs = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    statNumbers.forEach(el =>
                        animateNumber(el, Number(el.dataset.target || '0'))
                    );
                    obs.disconnect();
                }
            });
        },
        { threshold: 0.4 }
    );
    obs.observe(statsSection);
}

// ====================== OUR COLLECTION ACCORDION ======================
const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion__header');
    const icon = item.querySelector('.accordion__icon');
    const body = item.querySelector('.accordion__body');

    header.addEventListener('click', () => {
        const isOpen = item.classList.toggle('accordion__item--open');

        // icon + / - toggle
        if (icon) {
            icon.textContent = isOpen ? '−' : '+';
        }

        // ensure only one open at a time (like Figma)
        if (isOpen) {
            accordionItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('accordion__item--open');
                    const otherIcon = other.querySelector('.accordion__icon');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
        }
    });
});


