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
            if (user === 'nerys' && pass === 'Estudiante*1') {
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

export function renderAdminSection() {
    const adminContent = document.getElementById('admin-content');
    if (!adminContent) return;
    adminContent.innerHTML = '';
    const section = window.currentAdminSection || 'nosotros';
    const sectionTitle = { 'nosotros': 'Sección Nosotros', 'servicios': 'Servicios Disponibles', 'productos': 'Productos / Accesorios', 'catalogo': 'Catálogo de Diseños' }[section];
    adminContent.innerHTML = `
    <div class="admin-header">
      <h4>${sectionTitle}</h4>
      ${section !== 'nosotros' ? `<button class="btn" id="admin-add-new">+ Agregar Nuevo</button>` : ''}
    </div>
    <div id="admin-list-container"></div>
    <div id="admin-form-container"></div>
  `;

    const addBtn = document.getElementById('admin-add-new');
    if (addBtn) addBtn.onclick = () => showForm(section);

    renderList();
}

export function renderList() {
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
    const items = siteData[section === 'catalogo' ? 'catalogItems' : section];
    const html = items.map((item, i) => `
    <div class="admin-item-row">
      <img src="${(item.image || (item.images ? item.images[0] : ''))}" alt="">
      <div class="admin-item-info"><strong>${item.name || item.title}</strong><small>${item.priceStr || item.category || 'Servicio'}</small></div>
      <div class="action-btns">
        <button class="btn-icon btn-edit" data-index="${i}"><ion-icon name="create-outline"></ion-icon></button>
        <button class="btn-icon btn-delete" data-index="${i}"><ion-icon name="trash-outline"></ion-icon></button>
      </div>
    </div>
  `).join('');
    listContainer.innerHTML = `<div class="admin-table">${html}</div>`;

    listContainer.querySelectorAll('.btn-edit').forEach(btn => {
        btn.onclick = () => showForm(section, parseInt(btn.dataset.index));
    });
    listContainer.querySelectorAll('.btn-delete').forEach(btn => {
        btn.onclick = () => deleteItem(section, parseInt(btn.dataset.index));
    });
}

export function showForm(type, index = null) {
    const isEdit = index !== null;
    const listContainer = document.getElementById('admin-list-container');
    const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
    const item = isEdit ? items[index] : {};
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
    </div>` : `
    <div class="admin-section-card">
      <div class="admin-inputs-grid">
        <div class="form-group"><label>Nombre</label><input type="text" id="edit-name" value="${item.name || ''}"></div>
        <div class="form-group"><label>Categoría</label><select id="edit-category"><option value="boda" ${item.category === 'boda' ? 'selected' : ''}>Boda</option><option value="compromiso" ${item.category === 'compromiso' ? 'selected' : ''}>Compromiso</option></select></div>
        <div class="form-group"><label>Peso</label><input type="text" id="edit-peso" value="${item.peso || ''}"></div>
        <div class="form-group"><label>Precio</label><input type="text" id="edit-precioDiseno" value="${item.precioDiseno || ''}"></div>
        <div class="form-group"><label>Imagen 1</label><input type="text" id="edit-img1" value="${item.images ? item.images[0] : ''}"></div>
      </div>
    </div>`;

    formContainer.innerHTML = `
    <button class="admin-back-btn" id="form-cancel-btn"><ion-icon name="arrow-back-outline"></ion-icon> Cancelar</button>
    <h4>${isEdit ? 'Editar' : 'Nuevo'}</h4>
    ${content}
    <button class="admin-save-btn" id="form-save-btn">Guardar</button>
  `;

    document.getElementById('form-cancel-btn').onclick = cancelEdit;
    document.getElementById('form-save-btn').onclick = () => saveItem(type, index);
}

export function cancelEdit() { renderAdminSection(); }

export function saveNosotros() {
    siteData.about.title = document.getElementById('a-about-t').value;
    siteData.about.desc = document.getElementById('a-about-d').value;
    saveStorage();
    location.reload();
}

export function saveItem(type, index) {
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
    if (isEdit) items[index] = newItem; else items.push(newItem);
    saveStorage();
    location.reload();
}

export function deleteItem(type, index) {
    if (confirm('¿Eliminar?')) {
        const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
        items.splice(index, 1);
        saveStorage();
        location.reload();
    }
}
