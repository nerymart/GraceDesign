import { siteData, formatCurrency, setCurrency } from './data.js';
import { addToCart, updateCartUI } from './cart.js';
import initialLikesData from '../data/likes.json';

export let productsShown = 8;

export function renderCategories() {
  const container = document.getElementById('category-scroller');
  if (!container) return;

  if (siteData.categories) {
    container.innerHTML = siteData.categories.map(cat => `
      <a href="${cat.link}" class="cat-link with-img">
        <div class="cat-img-wrapper">
          <img src="${cat.image}" alt="${cat.name}">
        </div>
        <span class="cat-text">${cat.name}</span>
      </a>
    `).join('');
  }
}

export function renderServices() {
  const servicesContainer = document.getElementById('services-list');
  if (!servicesContainer) return;
  servicesContainer.innerHTML = '';
  siteData.servicios.forEach((service) => {
    const card = document.createElement("div");
    card.className = "service-card";
    if (service.youtubeId || service.videoSrc) {
      card.classList.add("service-card-video");
    }

    // Generate feature list HTML
    const featuresHtml = service.features ? `
      <ul class="service-features-list">
        ${service.features.map(f => `
          <li>
            <ion-icon name="${f.icon}"></ion-icon>
            <span>${f.text}</span>
          </li>
        `).join('')}
      </ul>
    ` : '';

    const mediaHtml = service.youtubeId ? `
      <div class="service-image-container video-container youtube-container">
        <iframe
          src="https://www.youtube.com/embed/${service.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${service.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1"
          class="service-video youtube-iframe"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
          title="${service.title}"
        ></iframe>
      </div>
    ` : service.videoSrc ? `
      <div class="service-image-container video-container">
        <video src="${service.videoSrc}" autoplay loop muted playsinline preload="auto" class="service-video"></video>
        <div class="video-audio-badge">
          <ion-icon name="volume-medium-outline"></ion-icon>
          <span>Pasa el cursor para audio 🔊</span>
        </div>
      </div>
    ` : `
      <div class="service-image-container">
        <img src="${service.image}" alt="${service.title}">
      </div>
    `;

    card.innerHTML = `
        ${mediaHtml}
        <div class="service-info">
          <h3>${service.title}</h3>
          <p class="service-main-desc">${service.desc || service.description || ''}</p>
          ${featuresHtml}
        </div>
      `;
    servicesContainer.appendChild(card);

    if (service.videoSrc) {
      const videoEl = card.querySelector('video');
      const badgeIcon = card.querySelector('.video-audio-badge ion-icon');
      const badgeText = card.querySelector('.video-audio-badge span');

      if (videoEl) {
        const playMuted = () => {
          videoEl.muted = true;
          const promise = videoEl.play();
          if (promise !== undefined) promise.catch(() => {});
        };

        const enableAudio = () => {
          videoEl.muted = false;
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              videoEl.muted = true;
              videoEl.play().catch(() => {});
            });
          }
          if (badgeIcon) badgeIcon.setAttribute('name', 'volume-high-outline');
          if (badgeText) badgeText.textContent = 'Sonando 🔊';
          card.classList.add('audio-active');
        };

        const disableAudio = () => {
          videoEl.muted = true;
          if (badgeIcon) badgeIcon.setAttribute('name', 'volume-medium-outline');
          if (badgeText) badgeText.textContent = 'Pasa el cursor para audio 🔊';
          card.classList.remove('audio-active');
        };

        // Auto unmute audio on very first user gesture anywhere on page
        const autoUnmuteOnFirstGesture = () => {
          if (videoEl && videoEl.muted) {
            enableAudio();
          }
          document.removeEventListener('click', autoUnmuteOnFirstGesture);
          document.removeEventListener('touchstart', autoUnmuteOnFirstGesture);
          document.removeEventListener('keydown', autoUnmuteOnFirstGesture);
        };
        document.addEventListener('click', autoUnmuteOnFirstGesture, { once: true });
        document.addEventListener('touchstart', autoUnmuteOnFirstGesture, { once: true });
        document.addEventListener('keydown', autoUnmuteOnFirstGesture, { once: true });

        // Attempt muted autoplay immediately
        playMuted();

        // Scroll observer: play muted when card is visible, pause when scrolled away
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (card.classList.contains('audio-active')) {
                enableAudio();
              } else {
                playMuted();
              }
            } else {
              disableAudio();
              videoEl.pause();
            }
          });
        }, { threshold: 0.25 });

        observer.observe(card);

        // YouTube-style Hover Audio Preview:
        // 1. Mouse enter / Hover on card: IMMEDIATELY enable audio!
        card.addEventListener('mouseenter', () => {
          enableAudio();
        });

        // 2. Mouse leave / Hover off card: Return to muted mode
        card.addEventListener('mouseleave', () => {
          disableAudio();
        });

        // 3. Touch start on mobile: Enable audio on touch
        card.addEventListener('touchstart', () => {
          enableAudio();
        }, { passive: true });

        // Click / tap toggle audio manually
        card.addEventListener('click', () => {
          if (videoEl.muted) enableAudio();
          else disableAudio();
        });
      }
    }
  });
}

export function updateAboutSection() {
  const subtitle = document.querySelector('.custom-info h3');
  const desc = document.querySelector('.custom-info p');
  if (subtitle) subtitle.textContent = siteData.about.title;
  if (desc) desc.textContent = siteData.about.desc;
}

export function renderProducts() {
  const productsContainer = document.getElementById("products-list");
  if (!productsContainer) return;
  const content = [];

  // Render main promo (tall) if exists
  const tallPromo = siteData.promos.find(p => p.type === 'tall');

  if (tallPromo) {
    const rawTitle = tallPromo.title || 'APARTA HOY Y PAGA A TU RITMO';

    // Split into two lines: "APARTA HOY" and "Y PAGA A TU RITMO"
    // Try to split at "Y PAGA" if it exists
    const splitMatch = rawTitle.match(/^(.*?HOY)\s+(Y\s+PAGA.*)/i);
    let line1Html, line2Html;

    if (splitMatch) {
      // Line 1: "APARTA HOY" — smaller, lighter, with HOY in gold
      line1Html = splitMatch[1].replace(/\bHOY\b/gi, '<span class="promo-gold">HOY</span>');
      // Line 2: "Y PAGA A TU RITMO" — larger, bold
      line2Html = splitMatch[2].toUpperCase();
    } else {
      line1Html = rawTitle.replace(/\bHOY\b/gi, '<span class="promo-gold">HOY</span>');
      line2Html = '';
    }

    content.push(`
      <div class="feature-card tall promo-card-luxury" id="gold-promo-card">
        <canvas class="gold-confetti-canvas"></canvas>
        ${tallPromo.tagline ? `<span class="tagline">${tallPromo.tagline}</span>` : ''}
        <div class="promo-title-block">
          <p class="promo-line1">${line1Html}</p>
          ${line2Html ? `<p class="promo-line2">${line2Html}</p>` : ''}
        </div>
        <img src="${tallPromo.image_url}" class="feature-decor promo-img-tall" alt="Promo">
        <div class="promo-buttons-container">
          <a href="./graduacion.html" class="promo-pill-btn catalog-btn">
            <span>Ver Catálogo</span>
            <div class="btn-icon-circle">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </a>
          <a href="https://wa.me/50585052032?text=Hola,%20me%20gustar%C3%ADa%20apartar%20mi%20joya%20de%20la%20promoci%C3%B3n" target="_blank" rel="noopener" class="promo-pill-btn reserve-btn">
            <span>APARTA EL TUYO</span>
            <div class="btn-icon-circle">
              <ion-icon name="logo-whatsapp"></ion-icon>
            </div>
          </a>
        </div>
      </div>
    `);
  }

  const visibleProducts = siteData.productos.slice(0, productsShown);
  visibleProducts.forEach((product, index) => {
    if (index === 7) {
      const widePromo = siteData.promos.find(p => p.type === 'wide');

      if (widePromo) {
        content.push(`
          <div class="feature-card wide">
            <span class="tagline">${widePromo.tagline}</span>
            <h2>${widePromo.title}</h2>
            <button class="feature-btn">${widePromo.button_text}</button>
          </div>
        `);
      }
    }

    content.push(`
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" data-id="${product.id}">
        </div>
        <div class="product-details">
          <h3>${product.name}</h3>
          <div class="price-container">
            <span class="current-price">${formatCurrency(product.price)}</span>
          </div>
          <button class="btn btn-outline add-to-cart-quick" data-id="${product.id}">
             <ion-icon name="cart-outline"></ion-icon>
          </button>
        </div>
      </div>
    `);
  });

  productsContainer.innerHTML = content.join('');
  attachProductModalListeners();
  initGoldConfetti();

  const viewMoreBtn = document.getElementById("view-more-btn");
  if (viewMoreBtn) {
    viewMoreBtn.style.display = productsShown >= siteData.productos.length ? "none" : "block";
    // Avoid multiple listeners if called again
    viewMoreBtn.onclick = () => {
      productsShown += 8;
      renderProducts();
    };
  }

  // Quick add to cart buttons
  document.querySelectorAll('.add-to-cart-quick').forEach(btn => {
    btn.onclick = (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const p = siteData.productos.find(p => p.id === id);
      if (p) addToCart(p);
    };
  });
}

export function initGoldConfetti() {
  const card = document.getElementById('gold-promo-card');
  if (!card) return;

  const canvas = card.querySelector('.gold-confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;

  const goldColors = [
    '#FFD700', // Bright Gold
    '#D4AF37', // Metallic Gold
    '#FFF8DC', // Cream Gold
    '#F7D070', // Light Gold
    '#DAA520', // Goldenrod
    '#B8860B', // Dark Gold
    '#FFFFFF'  // Diamond sparkle
  ];

  function resizeCanvas() {
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticle(x, y, isExplosion = false) {
    const angle = isExplosion ? Math.random() * Math.PI * 2 : (Math.PI / 2 + (Math.random() - 0.5));
    const speed = isExplosion ? Math.random() * 9 + 4 : Math.random() * 3 + 1;
    return {
      x: x !== undefined ? x : Math.random() * canvas.width,
      y: y !== undefined ? y : -10,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isExplosion ? Math.random() * 5 + 2 : 0),
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.25,
      gravity: 0.16,
      drag: 0.97,
      alpha: 1,
      decay: isExplosion ? Math.random() * 0.012 + 0.007 : Math.random() * 0.005 + 0.002,
      shape: Math.random() > 0.4 ? 'rect' : (Math.random() > 0.5 ? 'star' : 'circle')
    };
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function launchBurst(originX, originY, count = 70) {
    resizeCanvas();
    const x = originX !== undefined ? originX : canvas.width / 2;
    const y = originY !== undefined ? originY : canvas.height / 2;
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(x, y, true));
    }
    if (!animationId) {
      animate();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > canvas.height + 30) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.shape === 'rect') {
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'star') {
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        drawStar(ctx, 0, 0, 5, p.size, p.size / 2, p.color);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      }
      ctx.restore();
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animate);
    } else {
      animationId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Trigger confetti burst on scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        launchBurst(canvas.width / 2, canvas.height * 0.35, 75);
        setTimeout(() => {
          launchBurst(canvas.width / 2, canvas.height * 0.65, 55);
        }, 320);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(card);

  // Trigger burst on click or tap
  card.addEventListener('click', (e) => {
    const rect = card.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    launchBurst(clickX, clickY, 80);
  });
}

export let currentModalProduct = null;

export function openProductModal(p) {
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPrice = document.getElementById('modal-price');

  if (p && modal) {
    currentModalProduct = p;
    modalImg.src = p.image;
    modalTitle.textContent = p.name;
    modalDesc.textContent = p.desc;
    modalPrice.textContent = formatCurrency(p.price);
    modal.showModal();
  }
}

export function attachProductModalListeners() {
  document.querySelectorAll('.product-image').forEach(img => {
    img.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const p = siteData.productos.find(p => p.id === id);
      openProductModal(p);
    });
  });
}

export function initProductModalListeners() {
  const modal = document.getElementById('product-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const buyBtn = document.getElementById('modal-buy-btn');
  const addCartBtn = document.getElementById('modal-add-cart-btn');

  if (!modal) return;

  const closeAction = () => {
    modal.close();
    document.body.style.overflow = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeAction);

  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      if (!currentModalProduct) return;
      const phone = "50585052032";
      let message = `Hola Grace Designs, me interesa comprar: "${currentModalProduct.name}" (${formatCurrency(currentModalProduct.price)}). ¿Me podrían brindar más información?`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    });
  }

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      if (currentModalProduct) {
        addToCart(currentModalProduct);
        // Optional: Close modal or show feedback
        // closeAction(); 
      }
    });
  }

  // Close when clicking outside
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeAction();
    }
  });
}

let worksLimit = 50;

function getWorkBaseLikes(id) {
  if (initialLikesData && initialLikesData.items && initialLikesData.items[id]) {
    return initialLikesData.items[id];
  }
  return ((id * 17 + 37) % 65) + 24;
}

function getLikeButtonHtml(workId) {
  const isLiked = localStorage.getItem(`grace_like_${workId}`) === 'true';
  const baseLikes = getWorkBaseLikes(workId);
  const count = baseLikes + (isLiked ? 1 : 0);
  return `
    <button class="work-like-btn ${isLiked ? 'liked' : ''}" data-id="${workId}" aria-label="Dar Me Gusta">
      <div class="like-btn-left">
        <ion-icon name="${isLiked ? 'heart' : 'heart-outline'}"></ion-icon>
        <span>Likes</span>
      </div>
      <div class="like-btn-divider"></div>
      <span class="like-count">${count}</span>
    </button>
  `;
}

export function renderFinishedWorks() {
  const worksContainer = document.getElementById("works-grid");
  const showcaseContainer = document.getElementById("works-showcase");
  const viewMoreBtn = document.getElementById("view-more-works-btn");

  if (!worksContainer || !showcaseContainer) return;

  const works = siteData.finishedWorks || [];

  // Showcase Top 4
  showcaseContainer.innerHTML = works.slice(0, 4).map(w => `
    <div class="showcase-item work-card" data-id="${w.id}">
      <img src="${w.image}">
      ${getLikeButtonHtml(w.id)}
    </div>
  `).join('');

  // Grid items (showing according to worksLimit)
  worksContainer.innerHTML = works.slice(4, worksLimit).map(w => `
    <div class="work-card" data-id="${w.id}">
      <img src="${w.image}">
      <div class="work-card-overlay"><span>Detalles</span></div>
      ${getLikeButtonHtml(w.id)}
    </div>
  `).join('');

  attachWorkListeners();

  // "View More" Button Logic
  if (viewMoreBtn) {
    // Hide button if no more works to show
    if (works.length <= worksLimit) {
      viewMoreBtn.parentElement.style.display = 'none';
    } else {
      viewMoreBtn.parentElement.style.display = 'block';
      viewMoreBtn.onclick = () => {
        worksLimit += 24; // Load 24 more on each click
        renderFinishedWorks();
      };
    }
  }
}

export let currentWorkModal = null;

export function openWorkModal(work) {
  if (work) {
    currentWorkModal = work;

    // Elements
    const track = document.getElementById("work-carousel-track");
    const counterElement = document.getElementById("work-carousel-counter");
    const thumbnailsContainer = document.getElementById("work-thumbnails");
    const prevBtn = document.getElementById("work-prev-btn");
    const nextBtn = document.getElementById("work-next-btn");

    if (!track) return;

    let images = work.images || [];
    if (images.length === 0 && work.image) images = [work.image];
    if (images.length === 0) images = ['grace_logo.png'];

    const totalImages = images.length;
    let currentIndex = 0;

    // Render slides
    track.innerHTML = images.map(img => `
      <div class="carousel-slide">
        <img src="${img}" alt="${work.name}">
      </div>
    `).join('');

    // Render thumbnails
    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = images.map((img, idx) => `
        <div class="thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <img src="${img}" alt="thumbnail ${idx + 1}">
        </div>
      `).join('');

      // Add thumbnail listeners
      thumbnailsContainer.querySelectorAll('.thumb-item').forEach(thumb => {
        thumb.onclick = () => {
          currentIndex = parseInt(thumb.dataset.index);
          updateCarousel();
        };
      });
    }

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update counter
      if (counterElement) {
        counterElement.textContent = `${currentIndex + 1} / ${totalImages}`;
      }

      // Update thumbnails active state
      if (thumbnailsContainer) {
        thumbnailsContainer.querySelectorAll('.thumb-item').forEach((t, i) => {
          t.classList.toggle('active', i === currentIndex);
        });
      }
    };

    // Nav buttons
    if (prevBtn && nextBtn) {
      const showNav = totalImages > 1;
      prevBtn.style.display = showNav ? 'flex' : 'none';
      nextBtn.style.display = showNav ? 'flex' : 'none';
      if (counterElement) counterElement.parentElement.style.display = showNav ? 'flex' : 'none';

      nextBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
      };

      prevBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
      };
    }

    // Reset position
    updateCarousel();

    // Map Details
    document.getElementById("work-modal-title").textContent = work.name;
    document.getElementById("work-modal-subtitle").textContent = work.type || 'Diseño Exclusivo';

    document.getElementById("work-spec-type").textContent = work.type || '--';
    document.getElementById("work-spec-weight").textContent = work.weight || '--';
    document.getElementById("work-spec-size").textContent = work.size || '--';
    document.getElementById("work-spec-metal").textContent = work.metal || 'Oro 10K / 14K';

    // Description and tech specs
    const descriptionElement = document.getElementById("work-description-text");
    if (descriptionElement) {
      descriptionElement.textContent = work.pearls || `Esta pieza de alta joyería ha sido trabajada artesanalmente con los más altos estándares de calidad. ${work.name} representa la elegancia y el detalle que nos caracteriza en Grace Designs.`;
    }

    // Optional: Render tech list if data exists (future proofing)
    const techList = document.getElementById("work-tech-list");
    if (techList) {
      techList.innerHTML = '';
      if (work.tech_specs) {
        work.tech_specs.forEach(spec => {
          const li = document.createElement('li');
          li.textContent = spec;
          techList.appendChild(li);
        });
      }
    }

    document.getElementById("work-detail-modal").showModal();
  }
}

function attachWorkListeners() {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.work-like-btn')) return;
      const work = siteData.finishedWorks.find(w => w.id === parseInt(card.dataset.id));
      openWorkModal(work);
    });
  });

  document.querySelectorAll('.work-like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      const isLiked = localStorage.getItem(`grace_like_${id}`) === 'true';
      const newLikedState = !isLiked;
      localStorage.setItem(`grace_like_${id}`, newLikedState);

      const baseLikes = getWorkBaseLikes(id);
      const currentCount = baseLikes + (newLikedState ? 1 : 0);

      btn.classList.toggle('liked', newLikedState);
      const icon = btn.querySelector('ion-icon');
      if (icon) icon.setAttribute('name', newLikedState ? 'heart' : 'heart-outline');
      const countEl = btn.querySelector('.like-count');
      if (countEl) countEl.textContent = currentCount;
    });
  });
}

export function initWorkModalListeners() {
  const workModal = document.getElementById("work-detail-modal");
  const closeWorkModal = document.getElementById("close-work-modal");
  const quoteBtn = document.getElementById("work-quote-btn");

  if (!workModal) return;

  const closeModal = () => {
    workModal.close();
    document.body.style.overflow = '';
  };

  if (closeWorkModal) closeWorkModal.onclick = closeModal;

  if (quoteBtn) {
    quoteBtn.onclick = () => {
      if (currentWorkModal) {
        const phone = "50585052032";
        const message = `Hola Grace Designs, me interesa cotizar un trabajo similar a este diseño: "${currentWorkModal.name}" (${currentWorkModal.type || 'Personalizado'}). ¿Me podrían brindar más información?`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
      }
    };
  }

  workModal.addEventListener('click', (e) => {
    const dialogDimensions = workModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });
}

const translations = {
  ES: { "nav.services": "Servicios", "nav.products": "Disponible", "nav.about": "Nosotros", "search.placeholder": "Que deseas hoy?", "hero.title1": "Descubre la mejor", "hero.title2": "JOYERÍA", "hero.title3": "de nuestra colección" },
  EN: { "nav.services": "Services", "nav.products": "Available", "nav.about": "About Us", "search.placeholder": "What are you looking for?", "hero.title1": "Discover the best", "hero.title2": "JEWELRY", "hero.title3": "from our collection" }
};

export function openJewelryModal(product) {
  const jewelryModal = document.getElementById('jewelry-detail-modal');
  const track = document.getElementById('jewelry-carousel-track');
  const counterElement = document.getElementById('jewelry-carousel-counter');
  const thumbnailsContainer = document.getElementById('jewelry-thumbnails');
  const prevBtn = document.getElementById('jewelry-prev-btn');
  const nextBtn = document.getElementById('jewelry-next-btn');

  const modalTitle = document.getElementById('jewelry-modal-title');
  const specWeight = document.getElementById('jewelry-spec-weight');
  const specSize = document.getElementById('jewelry-spec-size');
  const specPrice = document.getElementById('jewelry-spec-price');
  const specDims = document.getElementById('jewelry-spec-dims');
  const jewelryBuyBtn = document.getElementById('jewelry-buy-btn');
  const badge = document.getElementById('jewelry-modal-badge');

  if (!jewelryModal) return;

  // Handle Images
  let images = product.images || [];
  if (images.length === 0 && product.img) images = [product.img];
  if (images.length === 0 && product.image) images = [product.image];
  if (images.length === 0) images = ['grace_logo.png'];

  const totalImages = images.length;
  let currentIndex = 0;

  // Render Slides
  if (track) {
    track.innerHTML = images.map(img => `
      <div class="carousel-slide">
        <img src="${img}" alt="${product.title || product.name}">
      </div>
    `).join('');
  }

  // Render Thumbnails
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = images.map((img, idx) => `
      <div class="thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${img}" alt="thumbnail ${idx + 1}">
      </div>
    `).join('');

    thumbnailsContainer.querySelectorAll('.thumb-item').forEach(thumb => {
      thumb.onclick = () => {
        currentIndex = parseInt(thumb.dataset.index);
        updateCarousel();
      };
    });
  }

  const updateCarousel = () => {
    if (track) track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (counterElement) {
      counterElement.textContent = `${currentIndex + 1} / ${totalImages}`;
    }

    if (thumbnailsContainer) {
      thumbnailsContainer.querySelectorAll('.thumb-item').forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
      });
    }
  };

  // Nav Buttons
  if (prevBtn && nextBtn) {
    const showNav = totalImages > 1;
    prevBtn.style.display = showNav ? 'flex' : 'none';
    nextBtn.style.display = showNav ? 'flex' : 'none';
    if (counterElement) counterElement.parentElement.style.display = showNav ? 'flex' : 'none';

    nextBtn.onclick = (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    };

    prevBtn.onclick = (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
    };
  }

  updateCarousel();

  // Map Details
  modalTitle.textContent = product.title || product.name || 'Sin Título';
  if (badge) badge.textContent = product.badge || 'DISEÑO EXCLUSIVO';

  specWeight.textContent = product.peso || 'N/A';
  specSize.textContent = product.medida || 'A medida';

  // Price calculation
  const basePrice = parseFloat(product.price || product.precioDiseno || product.precio_diseno || 0);
  specPrice.textContent = basePrice > 0 ? formatCurrency(basePrice) : 'Por cotizar';

  specDims.textContent = product.dims || product.dimensiones || 'Variado';

  // Configurar Link de WhatsApp
  const phoneNumber = '50585052032';
  const message = `Hola Grace Designs, me interesa adquirir el diseño "${product.title || product.name}" que vi en la galería web (Ref: ${product.id || 'Web'}). ¿Me podrían brindar más detalles?`;
  jewelryBuyBtn.onclick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  jewelryModal.showModal();
  document.body.style.overflow = 'hidden';
}

// Ensure jewelry modal closing logic is global
export function initJewelryModalListeners() {
  const jewelryModal = document.getElementById('jewelry-detail-modal');
  const closeJewelryBtn = document.getElementById('close-jewelry-modal');
  const backToGalleryBtn = document.getElementById('back-to-gallery-btn');

  if (!jewelryModal) return;

  const closeModal = () => {
    jewelryModal.close();
    document.body.style.overflow = '';
  };

  if (closeJewelryBtn) closeJewelryBtn.addEventListener('click', closeModal);
  if (backToGalleryBtn) backToGalleryBtn.addEventListener('click', closeModal);

  jewelryModal.addEventListener('click', (e) => {
    const dialogDimensions = jewelryModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });
}

export function updateLanguage(lang) {
  const t = translations[lang]; if (!t) return;
  const setText = (sel, k) => { const el = document.querySelector(sel); if (el) el.textContent = t[k]; };
  setText('.primary-nav a[href="#services"]', 'nav.services');
  setText('.primary-nav a[href="#products"]', 'nav.products');
  setText('.primary-nav a[href="#about"]', 'nav.about');
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.placeholder = t['search.placeholder'];
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = `${t['hero.title1']}<br><span class="italic-text">${t['hero.title2']}</span><br>${t['hero.title3']}`;
}

// Inicializar selectores globales (Moneda)
export function initGlobalUI() {
  const currencyBtn = document.getElementById('currency-toggle');
  const symbolSpan = document.getElementById('current-currency-symbol');
  const textSpan = document.getElementById('current-currency-text');

  const updateHeader = () => {
    if (symbolSpan) symbolSpan.textContent = siteData.currentCurrency === 'USD' ? '$' : 'C$';
    if (textSpan) textSpan.textContent = siteData.currentCurrency;
  };

  if (currencyBtn) {
    currencyBtn.onclick = () => {
      const newCurr = siteData.currentCurrency === 'USD' ? 'NIO' : 'USD';
      setCurrency(newCurr);
    };
  }

  document.addEventListener('currencyChanged', () => {
    updateHeader();
    renderProducts();
    updateCartUI();
  });

  updateHeader();
  initScrollVideoAudio();
}

export function initScrollVideoAudio() {
  const videos = document.querySelectorAll('.blob-image-wrapper video');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        v.muted = false;
        const p = v.play();
        if (p !== undefined) p.catch(() => {});
      } else {
        v.muted = true;
      }
    });
  }, { threshold: 0.3 });

  videos.forEach(v => observer.observe(v));
}
