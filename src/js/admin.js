import { siteData, saveStorage } from './data.js';

export function initAdmin() {
  const loginModal = document.getElementById('login-modal');
  const adminDashboard = document.getElementById('admin-dashboard');
  const openLoginBtn = document.getElementById('open-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');

  if (openLoginBtn) openLoginBtn.onclick = (e) => { e.preventDefault(); if (loginModal) loginModal.showModal(); };
  if (closeLoginBtn) closeLoginBtn.onclick = () => loginModal && loginModal.close();

  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const user = document.getElementById('login-user').value;
      const pass = document.getElementById('login-pass').value;
      if (user === 'nerys' && pass === '123') {
        if (loginModal) loginModal.close();
        if (adminDashboard) adminDashboard.classList.add('active');
        renderAdminSection();
      } else alert('Usuario o contraseña incorrectos');
    };
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.onclick = () => { location.reload(); };

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
  window.saveItem = saveItem;
  window.deleteItem = deleteItem;
  window.cancelEdit = cancelEdit;
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
    'finishedWorks': 'Trabajos Realizados'
  }[section];

  adminContent.innerHTML = `
    <div class="admin-header">
      ${filter ? `<button class="btn-back" id="back-to-prev" title="Volver"><ion-icon name="arrow-back-outline"></ion-icon></button>` : ''}
      <h4>${sectionTitle} ${filter ? `(${filter})` : ''}</h4>
      ${section !== 'nosotros' ? `<button class="btn" id="admin-add-new">+ Agregar Nuevo</button>` : ''}
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
        <div style="margin-top:2rem;"><button class="admin-save-btn" id="save-nosotros-btn">Guardar Cambios</button></div>
      </div>
    `;
    const saveBtn = document.getElementById('save-nosotros-btn');
    if (saveBtn) saveBtn.onclick = saveNosotros;
    return;
  }
  let items = siteData[section === 'catalogo' ? 'catalogItems' : section];

  // Aplicar filtro si existe
  if (filter) {
    items = items.filter(item => item.category === filter);
  }

  const html = items.map((item, i) => `
    <div class="admin-item-row">
      <img src="${(item.image || (item.images ? item.images[0] : ''))}" alt="">
      <div class="admin-item-info">
        <strong>${item.name || item.title}</strong>
        <small>${item.priceStr || item.category || (section === 'categories' ? 'Botón Frontend' : (section === 'finishedWorks' ? item.type : 'Servicio'))}</small>
      </div>
      <div class="action-btns">
        ${section === 'categories' ? `<button class="btn-icon btn-gallery" data-index="${i}" title="Ver Subcategorías"><ion-icon name="images-outline"></ion-icon></button>` : ''}
        <button class="btn-icon btn-edit" data-index="${i}"><ion-icon name="create-outline"></ion-icon></button>
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
        <div class="form-group"><label>Imagen</label><input type="text" id="edit-image" value="${item.image || ''}"></div>
        <div class="form-group full-width"><label>Descripción</label><textarea id="edit-desc" class="admin-textarea">${item.desc || ''}</textarea></div>
      </div>
    </div>` : type === 'productos' ? `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Imagen</label><input type="text" id="edit-image" value="${item.image || ''}"></div>
        <div class="form-group"><label>Precio</label><input type="number" id="edit-price" value="${item.price || 0}"></div>
      </div>
    </div>` : type === 'categories' ? `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre de Categoría</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Enlace (.html)</label><input type="text" id="edit-link" value="${item.link || ''}" placeholder="./ejemplo.html"></div>
        <div class="form-group full-width"><label>URL Imagen</label><input type="text" id="edit-image" value="${item.image || ''}"></div>
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
        <div class="form-group full-width"><label>URL Imagen</label><input type="text" id="edit-image" value="${item.image || ''}"></div>
      </div>
    </div>` : `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Categoría / SubID</label><input type="text" id="edit-category" value="${item.category || ''}" placeholder="Ej: bachiller-dama"></div>
        <div class="form-group"><label>Peso</label><input type="text" id="edit-peso" value="${item.peso || ''}"></div>
        <div class="form-group"><label>Precio</label><input type="text" id="edit-precioDiseno" value="${item.precioDiseno || ''}"></div>
        <div class="form-group full-width"><label>URL Imagen</label><input type="text" id="edit-img1" value="${item.images ? item.images[0] : (item.image || '')}"></div>
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

export function saveNosotros() {
  siteData.about.title = document.getElementById('a-about-t').value;
  siteData.about.desc = document.getElementById('a-about-d').value;
  saveStorage();
  location.reload();
}

export function saveItem(type, index, filter = null) {
  const isEdit = index !== null;
  const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
  let newItem = isEdit ? { ...items[index] } : { id: Date.now() };
  if (type === 'servicios') {
    newItem.title = document.getElementById('edit-title').value;
    newItem.image = document.getElementById('edit-image').value;
    newItem.desc = document.getElementById('edit-desc').value;
  }
  else if (type === 'productos') {
    newItem.name = document.getElementById('edit-name').value;
    newItem.image = document.getElementById('edit-image').value;
    newItem.price = parseInt(document.getElementById('edit-price').value);
    newItem.priceStr = `$${newItem.price.toLocaleString()}`;
  }
  else if (type === 'catalogo') {
    newItem.name = document.getElementById('edit-name').value;
    newItem.category = document.getElementById('edit-category').value;
    newItem.images = [document.getElementById('edit-img1').value];
    newItem.peso = document.getElementById('edit-peso').value;
    newItem.precioDiseno = document.getElementById('edit-precioDiseno').value;
  }
  else if (type === 'categories') {
    newItem.name = document.getElementById('edit-name').value;
    newItem.link = document.getElementById('edit-link').value;
    newItem.image = document.getElementById('edit-image').value;
  }
  else if (type === 'finishedWorks') {
    newItem.name = document.getElementById('edit-name').value;
    newItem.type = document.getElementById('edit-type').value;
    newItem.weight = document.getElementById('edit-weight').value;
    newItem.size = document.getElementById('edit-size').value;
    newItem.metal = document.getElementById('edit-metal').value;
    newItem.pearls = document.getElementById('edit-pearls').value;
    newItem.image = document.getElementById('edit-image').value;
  }
  if (isEdit) items[index] = newItem; else items.push(newItem);
  saveStorage();
  renderAdminSection(filter);
}

export function deleteItem(type, index, filter = null) {
  if (confirm('¿Eliminar?')) {
    const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
    items.splice(index, 1);
    saveStorage();
    renderAdminSection(filter);
  }
}
