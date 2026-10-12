(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  // Bilingual interface: the switch is shared by all pages and persists between visits.
  const languageDictionary = {
    'Accueil':'Home','Boutique':'Shop','Arrivages':'New arrivals','À propos':'About us','Contact':'Contact',
    'Ouvrir le menu':'Open menu','Fermer le menu':'Close menu','Écrire sur WhatsApp':'Message us on WhatsApp',
    'F&S BAZAR CORNER · ABIDJAN':'F&S BAZAR CORNER · ABIDJAN',
    'Des bons plans':'Great USA finds','import USA':'from the USA','près de chez vous.':'near you.',
    'Mode, chaussures, maison, électroménager, boissons et produits du quotidien. Une sélection qui change, un contact qui reste simple.':'Fashion, shoes, home goods, appliances, drinks and everyday essentials. A changing selection, with easy direct contact.',
    'Voir la boutique':'Explore the shop','Voir les arrivages':'See new arrivals',
    'Lun–sam 09h00–19h00 · Dim 10h00–17h00':'Mon–Sat 9 AM–7 PM · Sun 10 AM–5 PM',
    'Points forts':'Why shop with us','Import USA':'USA imports','Des arrivages sélectionnés pour le style et le quotidien.':'Selected arrivals for style and everyday life.',
    'Commande directe':'Direct orders','Un message WhatsApp suffit pour réserver ou demander un article.':'Just send us a WhatsApp message to reserve or ask about an item.',
    'Proximité':'Close to you','Retrouvez-nous à Cocody-Angré Djibi, Rue L160.':'Visit us in Cocody-Angré Djibi, Rue L160.',
    'La maison F&S':'The F&S experience','Une boutique.':'One shop.','Plusieurs univers.':'Many worlds.',
    'Tout ce qui peut simplifier le quotidien, avec le plaisir de tomber sur la bonne trouvaille au bon moment.':'Everyday essentials and the joy of finding just the right thing at the right time.',
    'Vêtements':'Clothing','Chaussures':'Shoes','Maison':'Home','Électroménager':'Appliances','Boissons':'Drinks','Rafraîchissements':'Refreshments','Les nouveautés d’abord':'New arrivals first',
    'L’esprit F&S':'The F&S spirit','Notre rôle est simple : vous faire gagner du temps, vous proposer des nouveautés et rendre la commande facile.':'Our mission is simple: save you time, bring you new finds, and make ordering easy.',
    'Découvrir F&S':'Discover F&S','À ne pas manquer':'Don’t miss out','Les favoris du moment.':'Current favourites.','Tout voir':'See all',
    'Bonnes trouvailles':'Great finds','Des produits utiles, parfois inattendus, toujours à découvrir.':'Useful products, sometimes unexpected, always worth discovering.',
    'Découvrir':'Discover','Besoin d’un article ?':'Looking for an item?','Besoin d\'un article ?':'Looking for an item?',
    'Envoyez-nous un message.':'Send us a message.','Photo, nom du produit ou simple question : l’équipe F&S vous répond directement.':'Send a photo, product name or question — the F&S team will reply directly.',
    'Nous trouver':'Find us','USA BAZAR Corner F&S':'USA BAZAR Corner F&S','Cocody-Angré Djibi · Rue L160, Abidjan':'Cocody-Angré Djibi · Rue L160, Abidjan','Itinéraire dans Google Maps':'Directions in Google Maps',
    'Horaires':'Opening hours','Nos horaires':'Our opening hours','Horaires exceptionnels : 1er novembre (Toussaint) et 15 novembre 2026 (Journée nationale de la paix), 10h00 — 17h00.':'Special hours: 1 November (All Saints’ Day) and 15 November 2026 (National Peace Day), 10 AM–5 PM.',
    'Horaires de la boutique':'Store opening hours','Partager':'Share','Faites passer le bon plan.':'Spread the word.','Partagez la boutique avec vos proches depuis votre téléphone.':'Share the shop with friends and family from your phone.',
    'Retrouvez F&S USA Bazar Corner sur Facebook, Instagram, TikTok et Snapchat.':'Find F&S USA Bazar Corner on Facebook, Instagram, TikTok and Snapchat.',
    'À propos de F&S':'About F&S','Une adresse simple':'Your place for','pour de':'great','bonnes trouvailles.':'finds.','F&S USA Bazar Corner sélectionne des marchandises diverses importées des USA et pensées pour la vie quotidienne à Abidjan.':'F&S USA Bazar Corner curates a range of products imported from the USA for everyday life in Abidjan.',
    'Pratique':'Convenient','Un assortiment large, une recherche simple et une commande directe.':'A wide selection, easy browsing and direct ordering.',
    'Curieux':'Discover','Les arrivages sont l’occasion de découvrir de nouveaux produits en permanence.':'New arrivals bring fresh products to discover all the time.',
    'Proche':'Local','Une boutique locale avec un contact humain et un canal WhatsApp accessible.':'A local shop with personal service and easy WhatsApp contact.',
    'Visitez-nous':'Visit us','Lundi–samedi : 09h00–19h00. Dimanche : 10h00–17h00.':'Monday–Saturday: 9 AM–7 PM. Sunday: 10 AM–5 PM.',
    'Voir la boutique':'Explore the shop','Nous écrire':'Message us','Notre façon de travailler':'How we work','Une sélection qui évolue':'A changing selection',
    'F&S mise sur des arrivages réguliers plutôt que sur un catalogue figé. C’est ce qui permet de faire de nouvelles trouvailles au fil du temps.':'F&S focuses on regular arrivals instead of a fixed catalogue, so there are always new finds to discover.',
    'Un contact simple':'Easy to reach','Le site présente les univers et les nouveautés. Pour confirmer un stock, connaître un prix ou envoyer une photo, WhatsApp reste le canal le plus direct.':'Browse our collections and latest arrivals here. For stock checks, prices or sending a photo, WhatsApp is the quickest way to reach us.',
    'Newsroom F&S':'F&S newsroom','Les nouveautés':'What’s new','avant tout le monde.':'before everyone else.','Les arrivages bougent. Gardez cette page en favori et écrivez-nous pour vérifier la disponibilité.':'Our arrivals change often. Bookmark this page and message us to check availability.',
    'Nouveautés F&S USA Bazar Corner':'F&S USA Bazar Corner new arrivals','Mode & sneakers':'Fashion & sneakers','Les nouveautés à porter maintenant : hoodies, sneakers, essentiels et pièces coup de cœur.':'Fresh styles to wear now: hoodies, sneakers, essentials and standout pieces.',
    'Voir la boutique ↗':'Explore the shop ↗','Maison':'Home','Canapés, rangement et équipements pratiques selon les stocks.':'Sofas, storage and practical home essentials, subject to availability.',
    'Voir ↗':'View ↗','Quotidien':'Everyday essentials','Produits utiles, boissons et petites trouvailles.':'Useful products, drinks and little discoveries.',
    'Le réflexe':'The next step','Vous avez vu un article ailleurs ?':'Seen an item somewhere else?','Envoyez-nous une photo ou son nom. Nous pouvons vous confirmer rapidement s’il est disponible chez F&S ou proposer une alternative.':'Send us a photo or its name. We can quickly check whether F&S has it or suggest an alternative.',
    'Envoyer sur WhatsApp ↗':'Send via WhatsApp ↗','Questions fréquentes':'Frequently asked questions',
    'Comment vérifier un article avant de me déplacer ?':'How can I check an item before visiting?','Envoyez simplement le nom ou une photo via WhatsApp. L’équipe pourra vérifier la disponibilité selon le stock du moment.':'Send the item name or a photo on WhatsApp. Our team can check current availability.',
    'Les prix sont-ils fixes ?':'Are prices fixed?','Les prix affichés lorsqu’ils sont connus servent de repère. Pour les articles sur arrivage, demandez le prix et la disponibilité directement.':'Displayed prices are indicative when available. For new arrivals, ask us directly for the price and availability.',
    'Puis-je demander une recherche particulière ?':'Can I request a specific item?','Oui. Décrivez l’article recherché ou envoyez une photo afin de voir si F&S peut vous proposer une disponibilité ou une alternative.':'Yes. Describe the item or send a photo and we’ll check availability or suggest an alternative.',
    'On se parle':'Let’s talk','maintenant.':'right now.','Pour un prix, une disponibilité ou une demande particulière, le plus simple reste WhatsApp.':'For prices, availability or special requests, WhatsApp is the easiest way to reach us.',
    'Adresse':'Address','Horaires exceptionnels':'Special hours','Besoin d’une réponse rapide ?':'Need a quick answer?','Envoyez simplement votre demande. Vous pouvez aussi joindre une photo de l’article recherché.':'Send us your question. You can also attach a photo of the item you’re looking for.',
    'Ouvrir WhatsApp ↗':'Open WhatsApp ↗','Message prêt':'Message ready','Demander un article précis.':'Ask about a specific item.','Nom, catégorie, photo ou référence : plus votre demande est précise, plus la réponse est simple.':'Item name, category, photo or reference: the more detail you provide, the easier it is to help.',
    'Préparer le message ↗':'Prepare message ↗',
    'Rechercher un article':'Search for an item','Rechercher':'Search','Tous':'All','Tous les articles':'All items','Aucun article ne correspond à votre recherche. Essayez un autre mot ou contactez-nous sur WhatsApp.':'No items match your search. Try another term or contact us on WhatsApp.',
    'Installer F&S':'Install F&S','Partager ou copier le lien':'Share or copy link','Autres options de partage':'More sharing options','Lien copié. Vous pouvez le partager où vous voulez.':'Link copied. You can share it anywhere.',
    'Looks & essentiels':'Looks & essentials','Sport & lifestyle':'Sports & lifestyle','Confort & déco':'Comfort & décor','Pratique au quotidien':'Everyday convenience',
    'La boutique':'The shop','Les essentiels.':'Everyday essentials.','Les trouvailles.':'Great finds.','Une sélection multi-catégories qui évolue au fil des arrivages. Recherchez un produit ou filtrez par univers.':'A multi-category selection that evolves with each arrival. Search for a product or filter by category.',
    'Filtrer les produits':'Filter products','Rechercher un produit':'Search for a product','Rechercher un produit…':'Search for a product…','6 articles affichés':'6 items shown',
    'Hoodies & sweats':'Hoodies & sweatshirts','Pièces casual pour tous les jours.':'Casual pieces for every day.','À partir de 12 000 FCFA':'From CFA 12,000','Commander ↗':'Order ↗',
    'Sneakers lifestyle':'Lifestyle sneakers','Sport, ville et décontracté.':'Sporty, urban and casual.','À partir de 18 000 FCFA':'From CFA 18,000',
    'Meubles':'Furniture','Salon & déco':'Living room & décor','Canapés, tables et pièces pour la maison.':'Sofas, tables and home furnishings.','Sur arrivage':'Subject to arrival','Demander ↗':'Ask us ↗',
    'Électroménager':'Home appliances','Appareils maison':'Home appliances','Petits et grands équipements selon arrivage.':'Small and large appliances, subject to arrivals.',
    'Boissons & rafraîchissements':'Drinks & refreshments','Maison, bureau et événements.':'For home, office and events.','Produits divers':'Miscellaneous products','Bonnes trouvailles':'Great finds','Accessoires, rangement, utilitaire et plus.':'Accessories, storage, useful essentials and more.',
    'Selon arrivage':'Subject to arrivals','Voir stock ↗':'Check stock ↗','Voir les arrivages ↗':'See new arrivals ↗',
    'Une boutique locale':'A local shop','Les arrivages bougent.':'New arrivals change often.','Retrouvez-nous à Angré Djibi.':'Find us in Angré Djibi.','USA BAZAR CORNER (F&S) · Abidjan, Cocody-Angré Djibi.':'USA BAZAR CORNER (F&S) · Abidjan, Cocody-Angré Djibi.',
    'Le site présente les univers et les nouveautés.':'The website showcases our categories and latest arrivals.',
    'Nos valeurs':'Our values','F&S USA Bazar Corner':'F&S USA Bazar Corner','F&S USA Bazar Corner — Accueil':'F&S USA Bazar Corner — Home',
    'Arrivages réguliers':'Regular new arrivals','Prix attractifs':'Great prices','Livraison à Abidjan':'Delivery in Abidjan',
    'Ouvrir dans Maps':'Open in Maps','Itinéraire':'Directions','Partager sur WhatsApp':'Share on WhatsApp',
    'À partir de ':'From ','Sur arrivage':'Subject to arrivals','Voir la sélection ↗':'Explore the selection ↗',
    'Des pièces simples à porter, des modèles qui attirent l’œil.':'Easy-to-wear pieces and eye-catching styles.','Canapés, appareils et accessoires selon les arrivages.':'Sofas, appliances and accessories depending on arrivals.',
    'F&S USA Bazar Corner — Import USA à Abidjan':'F&S USA Bazar Corner — USA Imports in Abidjan',
    'À propos — F&S USA Bazar Corner':'About — F&S USA Bazar Corner','Arrivages — F&S USA Bazar Corner':'New arrivals — F&S USA Bazar Corner','Contact — F&S USA Bazar Corner':'Contact — F&S USA Bazar Corner',
    'Import USA, bonnes trouvailles et commande directe à Abidjan.':'USA imports, great finds and direct ordering in Abidjan.',
    'Les nouveautés avant tout le monde.':'The latest finds before everyone else.','Une adresse simple pour de bonnes trouvailles.':'Your place for great finds.',
    'Contactez F&S USA Bazar Corner à Abidjan pour un prix, une disponibilité, une commande ou une recherche particulière.':'Contact F&S USA Bazar Corner in Abidjan for prices, availability, orders or special requests.',
    'Pour confirmer un stock, connaître un prix ou envoyer une photo, WhatsApp reste le canal le plus direct.':'To confirm stock, ask about a price or send a photo, WhatsApp is the quickest way to reach us.',
    'Installer F&S':'Install F&S','Mode hors ligne — les pages déjà visitées restent accessibles':'Offline mode — previously visited pages remain available',
    'Partagez la boutique avec vos proches depuis votre téléphone.':'Share the shop with friends and family from your phone.',
    'Lun–sam : 09h00 — 19h00':'Mon–Sat: 9 AM–7 PM','Dim : 10h00 — 17h00':'Sun: 10 AM–5 PM',
    '01':'01','02':'02','03':'03'
  };
  const applyLanguage = (language) => {
    const lang = language === 'en' ? 'en' : 'fr';
    document.documentElement.lang = lang;
    const switches = $$('.language-switch');
    switches.forEach((switcher) => {
      switcher.dataset.current = lang;
      $$('[data-language]', switcher).forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === lang)));
    });
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      if (!node.__frOriginal) node.__frOriginal = node.nodeValue;
      const original = node.__frOriginal;
      const key = original.trim();
      if (!key) return;
      if (lang === 'fr') node.nodeValue = original;
      else if (Object.prototype.hasOwnProperty.call(languageDictionary, key)) {
        node.nodeValue = original.replace(key, languageDictionary[key]);
      }
    });
    const attributeTranslations = {
      'placeholder': {'Rechercher un produit…':'Search for a product…','Rechercher':'Search'},
      'aria-label': {'Navigation principale':'Main navigation','Navigation mobile':'Mobile navigation','Ouvrir le menu':'Open menu','Fermer le menu':'Close menu','Aller au contenu':'Skip to content','Ouvrir WhatsApp':'Open WhatsApp','Retour en haut':'Back to top','Partager ou copier le lien':'Share or copy link'},
      'title': {'Autres options de partage':'More sharing options'},
      'alt': {'Sélection de produits F&S USA Bazar Corner':'F&S USA Bazar Corner product selection','Nouveautés F&S USA Bazar Corner':'F&S USA Bazar Corner new arrivals','USA BAZAR Corner F&S':'USA BAZAR Corner F&S'},
      'content': {'Import USA, mode, maison, électroménager et bonnes affaires à Cocody-Angré Djibi, Abidjan.':'USA imports, fashion, home goods, appliances and great finds in Cocody-Angré Djibi, Abidjan.','Les arrivages F&S USA Bazar Corner à Abidjan : nouveautés, mode, maison, quotidien et bonnes trouvailles.':'F&S USA Bazar Corner arrivals in Abidjan: new finds, fashion, home goods and everyday essentials.','À propos de F&S USA Bazar Corner, boutique de marchandises diverses importées des USA à Cocody-Angré Djibi, Abidjan.':'About F&S USA Bazar Corner, a shop for products imported from the USA in Cocody-Angré Djibi, Abidjan.','Une réponse rapide par WhatsApp ou retrouvez-nous à Cocody-Angré Djibi.':'Get a quick response on WhatsApp or visit us in Cocody-Angré Djibi.','Import USA, mode, maison, électroménager et bonnes affaires à Cocody-Angré Djibi, Abidjan.':'USA imports, fashion, home goods, appliances and great finds in Cocody-Angré Djibi, Abidjan.'}
    };
    $$('meta, [aria-label], [title], img').forEach((el) => {
      ['aria-label','title','alt','content'].forEach((attr) => {
        const val = el.getAttribute(attr);
        if (!val) return;
        // Keep original French attributes on the element itself; data-* keys cannot safely mirror names such as aria-label.
        if (!el.__frAttributes) el.__frAttributes = {};
        if (!Object.prototype.hasOwnProperty.call(el.__frAttributes, attr)) el.__frAttributes[attr] = val;
        const fr = el.__frAttributes[attr];
        if (lang === 'fr') el.setAttribute(attr, fr);
        else if (attributeTranslations[attr] && attributeTranslations[attr][fr]) el.setAttribute(attr, attributeTranslations[attr][fr]);
      });
    });
    $$('a[target="_blank"]').forEach((link) => { link.rel = 'noopener noreferrer'; });
    const install = $('[data-pwa-install]');
    if (install) install.textContent = lang === 'en' ? 'Install F&S' : 'Installer F&S';
    const titleTranslations = {'F&S USA Bazar Corner — Import USA à Abidjan':'F&S USA Bazar Corner — USA Imports in Abidjan','À propos — F&S USA Bazar Corner':'About — F&S USA Bazar Corner','Arrivages — F&S USA Bazar Corner':'New arrivals — F&S USA Bazar Corner','Contact — F&S USA Bazar Corner':'Contact — F&S USA Bazar Corner'};
    const currentTitle = document.title;
    if (!document.documentElement.dataset.frTitle) document.documentElement.dataset.frTitle = currentTitle;
    document.title = lang === 'fr' ? document.documentElement.dataset.frTitle : (titleTranslations[document.documentElement.dataset.frTitle] || document.documentElement.dataset.frTitle);
    const toast = $('#toast');
    if (toast && lang === 'en' && toast.textContent === 'Le partage est indisponible sur cet appareil.') toast.textContent = 'Sharing is unavailable on this device.';
  };
  $$('.language-switch [data-language]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.language;
      applyLanguage(lang);
      try { localStorage.setItem('fs-language', lang); } catch (_) {}
    });
  });
  let preferredLanguage = 'fr';
  try { preferredLanguage = localStorage.getItem('fs-language') || 'fr'; } catch (_) {}
  applyLanguage(preferredLanguage);


  const waNumber = '2250720602951';
  const waBase = `https://wa.me/${waNumber}`;

  const openWhatsApp = (message) => `${waBase}?text=${encodeURIComponent(message)}`;

  // Add contextual WhatsApp messages to product buttons.
  $$$('.product-cta[data-product]').forEach((button) => {
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
    // Only hide reveal elements after the observer is successfully initialized.
    document.documentElement.classList.add('js-enabled');
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
    if (productCount) productCount.textContent = document.documentElement.lang === 'en' ? `${visible} item${visible !== 1 ? 's' : ''} shown` : `${visible} article${visible > 1 ? 's' : ''} affiché${visible > 1 ? 's' : ''}`;
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
  const showToast = (message, duration = 2400) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), duration);
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
  $$$('a[target="_blank"]').forEach((link) => {
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
    installButton.textContent = document.documentElement.lang === 'en' ? 'Install F&S' : 'Installer F&S';
    installButton.setAttribute('aria-label', 'Aide à l’installation de F&S USA Bazar Corner');
    document.body.appendChild(installButton);
  }

  const isAppleMobile = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
  installButton.hidden = Boolean(isStandalone);

  installButton.addEventListener('click', async () => {
    if (!deferredInstallPrompt) {
      showToast(isAppleMobile
        ? 'Pour installer : touchez Partager dans Safari (ou votre navigateur), puis « Sur l’écran d’accueil ».'
        : 'Ouvrez le menu du navigateur et choisissez « Installer » ou « Ajouter à l’écran d’accueil » si disponible.', 6000);
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
  $$$('.js-year').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();