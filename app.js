(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const waNumber = '2250720602951';
  const waBase = `https://wa.me/${waNumber}`;

  const openWhatsApp = (message) => `${waBase}?text=${encodeURIComponent(message)}`;

  // Add contextual WhatsApp messages to product buttons.
  $$('.product-cta[data-product]').forEach((button) => {
    button.href = openWhatsApp(`Bonjour F&S USA Bazar Corner, je suis intéressé(e) par : ${button.dataset.product}. Pouvez-vous me confirmer la disponibilité et le prix ?`);
  });

  // Mobile navigation.
  const menuButton = $('.header-menu');
  const mobileMenu = $('#mobileMenu');
  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Ouvrir le menu');
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (!isOpen) {
        const headerRect = menuButton.closest('.site-header')?.getBoundingClientRect();
        if (headerRect) mobileMenu.style.top = `${headerRect.bottom + 8}px`;
      }
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', !isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      mobileMenu.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    mobileMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (!mobileMenu.classList.contains('is-open')) return;
      if (event.target.closest('.site-header') || event.target.closest('#mobileMenu')) return;
      closeMenu();
    });
  }

  // Sticky header state, scroll progress and back-to-top button.
  const header = $('.site-header');
  const progress = $('.site-progress');
  const backTop = $('.back-top');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 10);
    if (backTop) backTop.classList.toggle('visible', y > 500);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal-on-scroll with a safe fallback when IntersectionObserver is unavailable.
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Boutique filters + search + hash deep-linking.
  const filterButtons = $$('.filter-btn');
  const products = $$('.product-card[data-category]');
  const searchInput = $('#productSearch');
  const productCount = $('#productCount');
  const emptyState = $('#emptyState');
  let activeFilter = 'Tous';

  const normalizeText = (value) => (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const categoryForHash = {
    '#vetements': 'Vêtements',
    '#chaussures': 'Chaussures',
    '#maison': 'Maison',
    '#electro': 'Electroménager',
    '#boissons': 'Boissons'
  };

  const applyFilters = () => {
    if (!products.length) return;
    const search = normalizeText(searchInput?.value);
    let visible = 0;

    products.forEach((card) => {
      const category = card.dataset.category || '';
      const haystack = normalizeText(card.textContent);
      const categoryMatch = activeFilter === 'Tous' || category === activeFilter;
      const searchMatch = !search || haystack.includes(search);
      const show = categoryMatch && searchMatch;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.filter === activeFilter));
    if (productCount) productCount.textContent = `${visible} article${visible > 1 ? 's' : ''} affiché${visible > 1 ? 's' : ''}`;
    if (emptyState) emptyState.style.display = visible ? 'none' : 'block';
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'Tous';
      applyFilters();
    });
  });
  searchInput?.addEventListener('input', applyFilters);

  const hashCategory = categoryForHash[window.location.hash.toLowerCase()];
  if (hashCategory) activeFilter = hashCategory;
  applyFilters();

  // Lightweight share interaction.
  const shareButton = $('[data-share]');
  const toast = $('#toast');
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  };
  const copyLink = async (value) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return;
      } catch (_) {
        // Fall back for browsers or contexts that deny clipboard access.
      }
    }
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    field.style.pointerEvents = 'none';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    if (!copied) throw new Error('Copy unavailable');
  };

  shareButton?.addEventListener('click', async () => {
    const shareData = { title: document.title, text: 'F&S USA Bazar Corner — Abidjan', url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await copyLink(window.location.href);
      showToast('Lien copié. Vous pouvez le partager où vous voulez.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Le partage est indisponible sur cet appareil.');
    }
  });

  // Graceful external link handling for WhatsApp / Maps.
  $$('a[target="_blank"]').forEach((link) => {
    link.rel = 'noopener noreferrer';
  });

  // Progressive Web App: register offline support and guide installation across browsers.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }, { once: true });
  }

  let deferredInstallPrompt = null;
  let installButton = $('[data-pwa-install]');
  if (!installButton) {
    installButton = document.createElement('button');
    installButton.className = 'pwa-install';
    installButton.type = 'button';
    installButton.dataset.pwaInstall = 'true';
    installButton.textContent = 'Installer F&S';
    document.body.appendChild(installButton);
  }

  installButton.addEventListener('click', async () => {
    if (!deferredInstallPrompt) {
      const isAppleMobile = /iphone|ipad|ipod/i.test(navigator.userAgent);
      showToast(isAppleMobile
        ? 'Pour installer : touchez Partager dans Safari, puis « Sur l’écran d’accueil ».'
        : 'Ouvrez le menu du navigateur et choisissez « Installer » ou « Ajouter à l’écran d’accueil » si disponible.');
      return;
    }
    try {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice?.outcome === 'accepted') installButton.hidden = true;
    } catch (_) {
      showToast('Installation indisponible pour le moment. Essayez depuis le menu du navigateur.');
    } finally {
      deferredInstallPrompt = null;
    }
  });

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installButton.hidden = false;
  });

  window.addEventListener('appinstalled', () => {
    installButton.hidden = true;
    deferredInstallPrompt = null;
  });

  // Lightweight connectivity feedback so an offline visit does not feel broken.
  const refreshConnectivity = () => {
    document.documentElement.classList.toggle('is-offline', !navigator.onLine);
  };
  window.addEventListener('online', refreshConnectivity);
  window.addEventListener('offline', refreshConnectivity);
  refreshConnectivity();

  // Update the displayed year automatically.
  $$('.js-year').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();