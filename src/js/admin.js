import { siteData, loadStorage } from './data.js';
import { supabase, uploadImage } from './supabase.js';

export async function initAdmin() {
  const loginModal = document.getElementById('login-modal');
  const adminDashboard = document.getElementById('admin-dashboard');
  const openLoginBtn = document.getElementById('open-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');

  // Check current session
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    if (adminDashboard) adminDashboard.classList.add('active');
    renderAdminSection();
  }

  if (openLoginBtn) openLoginBtn.onclick = (e) => { e.preventDefault(); if (loginModal) loginModal.showModal(); };
  if (closeLoginBtn) closeLoginBtn.onclick = () => loginModal && loginModal.close();

  if (loginForm) {
    loginForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-user').value;
      const password = document.getElementById('login-pass').value;

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        if (loginModal) loginModal.close();
        if (adminDashboard) adminDashboard.classList.add('active');
        renderAdminSection();
      } catch (error) {
        alert('Error de acceso: ' + (error.message === 'Invalid login credentials' ? 'Usuario o contraseña incorrectos' : error.message));
      }
    };
  }

  const forgotPassBtn = document.querySelector('.forgot-password');
  if (forgotPassBtn) {
    forgotPassBtn.onclick = () => {
      const phone = "50576911776";
      const message = "Hola, olvidé mi contraseña del panel administrativo de Joyería Grace. ¿Podrían ayudarme a recuperarla?";
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    };
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.onclick = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  const closeAdminBtn = document.getElementById('close-admin-btn');
  if (closeAdminBtn) closeAdminBtn.onclick = () => { if (adminDashboard) adminDashboard.classList.remove('active'); };

  const sidebar = document.querySelector('.admin-sidebar');
  if (sidebar) {
    sidebar.onclick = (e) => {
      const btn = e.target.closest('.nav-item');
      if (!btn || !btn.dataset.section) return;
      document.querySelectorAll('.admin-sidebar .nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.currentAdminSection = btn.dataset.section;
      renderAdminSection();
    };
  }

  // Expose necessary functions to window for early event handlers if any
  window.showForm = showForm;
  window.saveNosotros = saveNosotros;
  window.saveSettings = saveSettings; // Added for currency settings
  window.saveItem = saveItem;
  window.deleteItem = deleteItem;
  window.cancelEdit = cancelEdit;
  window.handleFileSelect = handleFileSelect;
}

function createImageUploadZone(id, currentImageUrl = '') {
  return `
    <div class="form-group full-width">
      <label>Imagen</label>
      <div class="image-upload-zone ${currentImageUrl ? 'has-file' : ''}" id="zone-${id}" onclick="document.getElementById('input-${id}').click()">
        <ion-icon name="cloud-upload-outline"></ion-icon>
        <p>Arrastra una imagen o haz clic aquí</p>
        <span class="upload-tip">Formatos aceptados: JPG, PNG, WEBP</span>
        <img src="${currentImageUrl}" id="preview-${id}" alt="Vista previa">
        <input type="file" id="input-${id}" accept="image/*" onchange="handleFileSelect(event, '${id}')" style="display:none">
        <input type="hidden" id="edit-${id}" value="${currentImageUrl}">
        <div class="loading-overlay" id="loader-${id}">
          <ion-icon name="sync-outline" class="rotate"></ion-icon>
        </div>
      </div>
    </div>
  `;
}

export async function handleFileSelect(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  const zone = document.getElementById(`zone-${id}`);
  const preview = document.getElementById(`preview-${id}`);
  const loader = document.getElementById(`loader-${id}`);
  const hiddenInput = document.getElementById(`edit-${id}`);

  // Preview local
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    zone.classList.add('has-file');
  };
  reader.readAsDataURL(file);

  try {
    loader.classList.add('active');
    const publicUrl = await uploadImage(file);
    hiddenInput.value = publicUrl;
    console.log('Imagen subida:', publicUrl);
  } catch (error) {
    alert('Error al subir imagen: ' + error.message);
  } finally {
    loader.classList.remove('active');
  }
}

window.currentAdminSection = 'nosotros';

export function renderAdminSection(filter = null) {
  const adminContent = document.getElementById('admin-content');
  if (!adminContent) return;
  adminContent.innerHTML = '';
  const section = window.currentAdminSection || 'nosotros';
  const sectionTitle = {
    'nosotros': 'Sección Nosotros',
    'servicios': 'Servicios Disponibles',
    'productos': 'Productos / Accesorios',
    'catalogo': 'Catálogo de Diseños',
    'categories': 'Imágenes de Categorías',
    'finishedWorks': 'Trabajos Realizados',
    'promos': 'Tarjetas de Promoción',
    'ajustes': 'Ajustes Generales'
  }[section];

  adminContent.innerHTML = `
    <div class="admin-header">
      ${filter ? `<button class="btn-back" id="back-to-prev" title="Volver"><ion-icon name="arrow-back-outline"></ion-icon></button>` : ''}
      <h4>${sectionTitle} ${filter ? `(${filter})` : ''}</h4>
      ${(section !== 'nosotros' && section !== 'ajustes') ? `<button class="btn" id="admin-add-new">+ Agregar Nuevo</button>` : ''}
    </div>
    <div id="admin-list-container"></div>
    <div id="admin-form-container"></div>
  `;

  if (filter && document.getElementById('back-to-prev')) {
    document.getElementById('back-to-prev').onclick = () => {
      // Si estamos en catálogo filtrado, volvemos a las subcategorías o a categorías
      // En este caso, volvemos a categorías porque es el flujo más común
      renderAdminSection();
    };
  }

  const addBtn = document.getElementById('admin-add-new');
  if (addBtn) addBtn.onclick = () => showForm(section, null, filter);

  renderList(filter);
}

export function renderList(filter = null) {
  const listContainer = document.getElementById('admin-list-container');
  if (!listContainer) return;
  listContainer.innerHTML = '';
  const section = window.currentAdminSection || 'nosotros';
  if (section === 'nosotros') {
    listContainer.innerHTML = `
      <div class="admin-section-card">
        <h6>Información de la Sección</h6>
        <div class="form-group"><label>Título Principal</label><input type="text" id="a-about-t" value="${siteData.about.title}"></div>
        <div class="form-group"><label>Descripción / Bio</label><textarea id="a-about-d" class="admin-textarea">${siteData.about.desc}</textarea></div>
        ${createImageUploadZone('about', siteData.about.images ? siteData.about.images[0] : '')}
        <div style="margin-top:2rem;"><button class="admin-save-btn" id="save-nosotros-btn">Guardar Cambios</button></div>
      </div>
    `;
    const saveBtn = document.getElementById('save-nosotros-btn');
    if (saveBtn) saveBtn.onclick = saveNosotros;
    return;
  }

  if (section === 'ajustes') {
    listContainer.innerHTML = `
      <div class="admin-section-card">
        <h6>Configuración de Moneda</h6>
        <div class="form-group">
          <label>Tasa de Cambio (1 USD = ? NIO)</label>
          <input type="number" step="0.01" id="a-conv-rate" value="${siteData.conversionRate}">
        </div>
        <div style="margin-top:2rem;">
          <button class="admin-save-btn" id="save-settings-btn">Guardar Ajustes</button>
        </div>
      </div>
    `;
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    if (saveSettingsBtn) saveSettingsBtn.onclick = saveSettings;
    return;
  }
  let items = siteData[section === 'catalogo' ? 'catalogItems' : section];

  // Aplicar filtro si existe
  if (filter) {
    items = items.filter(item => item.category === filter);
  }

  const html = items.map((item, i) => `
    <div class="admin-item-row">
      <img src="${(item.image || item.image_url || (item.images ? item.images[0] : ''))}" alt="">
      <div class="admin-item-info">
        <strong>${item.name || item.title}</strong>
        <small>${item.priceStr || item.category || (section === 'promos' ? item.type : (section === 'categories' ? 'Botón Frontend' : (section === 'finishedWorks' ? item.type : 'Servicio')))}</small>
      </div>
      <div class="action-btns">
        ${section === 'categories' ? `<button class="btn-icon btn-gallery" data-index="${i}" title="Ver Subcategorías"><ion-icon name="images-outline"></ion-icon></button>` : ''}
        <button class="btn-icon btn-edit" data-index="${i}"><ion-icon name="create-outline"></ion-icon></button>
        <button class="btn-icon btn-edit-sub" data-index="${i}" style="display:none"></button> <!-- Placeholder for consistency -->
        <button class="btn-icon btn-delete" data-index="${i}"><ion-icon name="trash-outline"></ion-icon></button>
      </div>
    </div>
  `).join('');
  listContainer.innerHTML = `<div class="admin-table">${html}</div>`;

  listContainer.querySelectorAll('.btn-edit').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.index);
      let realIndex = idx;
      if (filter) {
        const item = items[idx];
        realIndex = siteData[section === 'catalogo' ? 'catalogItems' : section].indexOf(item);
      }
      showForm(section, realIndex, filter);
    };
  });

  listContainer.querySelectorAll('.btn-delete').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.index);
      let realIndex = idx;
      if (filter) {
        const item = items[idx];
        realIndex = siteData[section === 'catalogo' ? 'catalogItems' : section].indexOf(item);
      }
      deleteItem(section, realIndex, filter);
    };
  });

  listContainer.querySelectorAll('.btn-gallery').forEach(btn => {
    btn.onclick = () => renderSubCategories(parseInt(btn.dataset.index));
  });
}

export function renderSubCategories(categoryIndex) {
  const category = siteData.categories[categoryIndex];
  const subCategories = category.subCategories || [];

  if (subCategories.length === 0) {
    // Si no tiene subcategorías, vamos directamente al catálogo filtrado por su ID principal o nombre
    renderAdminSection(category.id);
    return;
  }

  const adminContent = document.getElementById('admin-content');
  adminContent.innerHTML = `
    <div class="admin-header">
      <button class="btn-back" id="back-to-categories"><ion-icon name="arrow-back-outline"></ion-icon></button>
      <h4>Subcategorías de ${category.name}</h4>
    </div>
    <div class="admin-grid">
      ${subCategories.map(sub => `
        <div class="admin-section-card clickable subcategory-card" data-subid="${sub.id}" style="cursor:pointer; padding: 1.5rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); transition: transform 0.2s;">
          <div class="card-info">
            <h5 style="margin:0; font-size: 1.1rem; color: #d4af37;">${sub.name}</h5>
            <small style="opacity:0.6;">Ver galería de esta sección</small>
          </div>
          <ion-icon name="chevron-forward-outline" style="font-size: 1.5rem; color: #d4af37;"></ion-icon>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('back-to-categories').onclick = () => renderAdminSection();
  adminContent.querySelectorAll('.subcategory-card').forEach(card => {
    card.onclick = () => {
      // Al seleccionar subcategoría, vamos a catálogo filtrado
      window.currentAdminSection = 'catalogo';
      renderAdminSection(card.getAttribute('data-subid'));
    };
    card.onmouseover = () => { card.style.transform = 'translateX(10px)'; card.style.background = 'rgba(255,255,255,0.1)'; };
    card.onmouseout = () => { card.style.transform = 'translateX(0)'; card.style.background = 'rgba(255,255,255,0.05)'; };
  });
}

export function showForm(type, index = null, filter = null) {
  const isEdit = index !== null;
  const listContainer = document.getElementById('admin-list-container');
  const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
  const item = isEdit ? items[index] : { category: filter };
  if (listContainer) listContainer.style.display = 'none';
  const header = document.querySelector('.admin-header');
  if (header) header.style.display = 'none';
  const formContainer = document.getElementById('admin-form-container');
  if (!formContainer) return;

  let content = type === 'servicios' ? `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Título</label><input type="text" id="edit-title" value="${item.title || ''}"></div>
        ${createImageUploadZone('image', item.image)}
        <div class="form-group full-width"><label>Descripción</label><textarea id="edit-desc" class="admin-textarea">${item.desc || ''}</textarea></div>
      </div>
    </div>` : type === 'productos' ? `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Precio</label><input type="number" id="edit-price" value="${item.price || 0}"></div>
        ${createImageUploadZone('image', item.image)}
      </div>
    </div>` : type === 'categories' ? `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre de Categoría</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Enlace (.html)</label><input type="text" id="edit-link" value="${item.link || ''}" placeholder="./ejemplo.html"></div>
        ${createImageUploadZone('image', item.image)}
      </div>
    </div>` : type === 'finishedWorks' ? `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre de la Pieza</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Tipo de Prenda</label><input type="text" id="edit-type" value="${item.type || ''}" placeholder="Ej: Anillo, Pulsera"></div>
        <div class="form-group"><label>Peso</label><input type="text" id="edit-weight" value="${item.weight || ''}"></div>
        <div class="form-group"><label>Medida / Largo</label><input type="text" id="edit-size" value="${item.size || ''}"></div>
        <div class="form-group"><label>Metal</label><input type="text" id="edit-metal" value="${item.metal || ''}"></div>
        <div class="form-group"><label>Perlas</label><input type="text" id="edit-pearls" value="${item.pearls || ''}"></div>
        ${createImageUploadZone('image', item.image)}
      </div>
    </div>` : type === 'promos' ? `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Tagline (Subtítulo)</label><input type="text" id="edit-tagline" value="${item.tagline || ''}"></div>
        <div class="form-group"><label>Título</label><input type="text" id="edit-title" value="${item.title || ''}"></div>
        <div class="form-group"><label>Texto del Botón (Solo para tarjetas Anchas)</label><input type="text" id="edit-btnText" value="${item.button_text || ''}"></div>
        <div class="form-group"><label>Tipo de Tarjeta</label>
          <select id="edit-type" class="admin-select" style="width:100%; padding:0.8rem; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:white; border-radius:8px;">
            <option value="tall" ${item.type === 'tall' ? 'selected' : ''}>Alta (Principal - Sin Botón)</option>
            <option value="wide" ${item.type === 'wide' ? 'selected' : ''}>Ancha (Secundaria - Con Botón)</option>
          </select>
        </div>
        ${createImageUploadZone('image', item.image_url)}
      </div>
    </div>` : `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Categoría / SubID</label><input type="text" id="edit-category" value="${item.category || ''}" placeholder="Ej: bachiller-dama"></div>
        <div class="form-group"><label>Peso</label><input type="text" id="edit-peso" value="${item.peso || ''}"></div>
        <div class="form-group"><label>Medida</label><input type="text" id="edit-medida" value="${item.medida || ''}"></div>
        <div class="form-group"><label>Dimensiones</label><input type="text" id="edit-dimensiones" value="${item.dimensiones || ''}"></div>
        <div class="form-group"><label>Precio</label><input type="text" id="edit-precioDiseno" value="${item.precio_diseno || item.precioDiseno || ''}"></div>
        ${createImageUploadZone('img1', item.images ? item.images[0] : (item.image || ''))}
      </div>
    </div>`;

  formContainer.innerHTML = `
    <button class="admin-back-btn" id="form-cancel-btn"><ion-icon name="arrow-back-outline"></ion-icon> Cancelar</button>
    <h4>${isEdit ? 'Editar' : 'Nuevo'}</h4>
    ${content}
    <button class="admin-save-btn" id="form-save-btn">Guardar</button>
  `;

  document.getElementById('form-cancel-btn').onclick = () => renderAdminSection(filter);
  document.getElementById('form-save-btn').onclick = () => saveItem(type, index, filter);
}

export function cancelEdit() { renderAdminSection(); }

export async function saveNosotros() {
  const title = document.getElementById('a-about-t').value;
  const description = document.getElementById('a-about-d').value;
  const imageUrl = document.getElementById('edit-about').value;

  const { error } = await supabase.from('site_about').upsert({
    id: 1,
    title,
    description,
    images: imageUrl ? [imageUrl] : []
  });

  if (error) {
    alert('Error al guardar: ' + error.message);
  } else {
    alert('Información actualizada en Supabase');
    await loadStorage();
    renderAdminSection();
  }
}

export async function saveItem(type, index, filter = null) {
  const isEdit = index !== null;
  const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
  let itemData = {};

  const tableMap = {
    'servicios': 'services',
    'productos': 'products',
    'catalogo': 'catalog_items',
    'categories': 'categories',
    'finishedWorks': 'finished_works',
    'promos': 'promo_cards'
  };

  const table = tableMap[type];
  if (!table) return;

  const parseNumber = (val) => {
    if (!val) return 0;
    const cleanVal = val.toString().replace(',', '.');
    return parseFloat(cleanVal) || 0;
  };

  if (type === 'servicios') {
    itemData = {
      title: document.getElementById('edit-title').value,
      image: document.getElementById('edit-image').value,
      description: document.getElementById('edit-desc').value
    };
  }
  else if (type === 'productos') {
    itemData = {
      name: document.getElementById('edit-name').value,
      image: document.getElementById('edit-image').value,
      price: parseNumber(document.getElementById('edit-price').value)
    };
  }
  else if (type === 'catalogo') {
    itemData = {
      name: document.getElementById('edit-name').value,
      category: document.getElementById('edit-category').value,
      images: [document.getElementById('edit-img1').value],
      peso: document.getElementById('edit-peso').value,
      medida: document.getElementById('edit-medida').value,
      dimensiones: document.getElementById('edit-dimensiones').value,
      precio_diseno: document.getElementById('edit-precioDiseno').value
    };
  }
  else if (type === 'categories') {
    itemData = {
      id: isEdit ? items[index].id : document.getElementById('edit-name').value.toLowerCase().replace(/\s+/g, '-'),
      name: document.getElementById('edit-name').value,
      link: document.getElementById('edit-link').value,
      image: document.getElementById('edit-image').value
    };
  }
  else if (type === 'finishedWorks') {
    itemData = {
      name: document.getElementById('edit-name').value,
      type: document.getElementById('edit-type').value,
      weight: document.getElementById('edit-weight').value,
      size: document.getElementById('edit-size').value,
      metal: document.getElementById('edit-metal').value,
      pearls: document.getElementById('edit-pearls').value,
      image: document.getElementById('edit-image').value
    };
  }
  else if (type === 'promos') {
    itemData = {
      tagline: document.getElementById('edit-tagline').value,
      title: document.getElementById('edit-title').value,
      button_text: document.getElementById('edit-btnText').value,
      type: document.getElementById('edit-type').value,
      image_url: document.getElementById('edit-image').value
    };
  }

  if (isEdit) {
    itemData.id = items[index].id;
  }

  console.log(`Guardando ítem en ${table}:`, itemData);
  const { error } = await supabase.from(table).upsert(itemData);

  if (error) {
    console.error(`Error de Supabase al guardar en ${table}:`, error);
    alert('Error al guardar: ' + error.message);
  } else {
    await loadStorage();
    renderAdminSection(filter);
  }
}

export async function saveSettings() {
  const rawRate = document.getElementById('a-conv-rate').value;
  const cleanRate = rawRate.toString().replace(',', '.');
  const newRate = parseFloat(cleanRate);

  console.log('Intentando guardar tasa de cambio:', { rawRate, cleanRate, newRate });

  if (isNaN(newRate) || newRate <= 0) {
    alert('Por favor ingresa una tasa de cambio válida');
    return;
  }

  const { error } = await supabase
    .from('site_settings')
    .upsert({ id: 'global', conversion_rate: newRate });

  if (error) {
    console.error('Error de Supabase en saveSettings:', error);
    if (error.code === 'PGRST116' || error.message.includes('not found') || error.message.includes('relation')) {
      alert('Error: La tabla "site_settings" no existe en Supabase o no hay permisos. Por favor verifica la base de datos.');
    } else {
      alert('Error al guardar ajustes: ' + error.message);
    }
  } else {
    console.log('Ajustes guardados exitosamente');
    alert('Ajustes guardados correctamente');
    await loadStorage();
    renderAdminSection();
    // Forzar actualización de UI si está abierta en otra pestaña o scroll
    document.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: siteData.currentCurrency } }));
  }
}

export async function deleteItem(type, index, filter = null) {
  if (confirm('¿Eliminar de forma permanente en la nube?')) {
    const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
    const item = items[index];

    const tableMap = {
      'servicios': 'services',
      'productos': 'products',
      'catalogo': 'catalog_items',
      'categories': 'categories',
      'finishedWorks': 'finished_works',
      'promos': 'promo_cards'
    };

    const { error } = await supabase.from(tableMap[type]).delete().eq('id', item.id);

    if (error) {
      alert('Error al eliminar: ' + error.message);
    } else {
      await loadStorage();
      renderAdminSection(filter);
    }
  }
}
