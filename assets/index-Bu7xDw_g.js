(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();let c={about:{title:"Creamos la joya de tus sueños",desc:"Utilizamos la última tecnología de impresión 3D y diseño CAD para materializar tus ideas más creativas. Desde el boceto inicial hasta la pieza final en oro o plata.",images:["/service-repair.png","/service-polishing.png"]},services:[{title:"Reparación de Joyas",image:"/service-repair.png",desc:"Restauramos el brillo y la estructura de tus piezas favoritas."},{title:"Limpieza y Pulido",image:"/service-polishing.png",desc:"Servicio profesional para que tus joyas luzcan como nuevas."},{title:"Diseño Personalizado",image:"https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=600",desc:"Creamos piezas únicas a tu medida con tecnología 3D."},{title:"Valuación",image:"https://images.unsplash.com/photo-1617038224558-2854c900642f?q=80&w=600",desc:"Certificación y avalúo profesional de tus prendas."}],products:[],catalogItems:[{id:101,name:"Anillo de Boda Real",category:"boda",images:["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600"],peso:"6.2g",medida:"8",precioDiseno:"$750",dimensiones:"4mm ancho"},{id:102,name:"Anillo Compromiso Eterno",category:"compromiso",images:["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600"],peso:"4.8g",medida:"6",precioDiseno:"$1,200",dimensiones:"2mm base"}],finishedWorks:[]};function H(){const e=localStorage.getItem("joyeriaGraceData");if(e&&(c=JSON.parse(e)),!c.finishedWorks||c.finishedWorks.length===0){c.finishedWorks=[];const o=["Anillo","Pulsera","Cadena","Dije","Aretes"],n=["Oro 14k","Oro 18k","Plata .925","Platino"],a=["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600","https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600","https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600","https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=600","https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600"];for(let t=0;t<25;t++)c.finishedWorks.push({id:200+t,name:`${o[t%o.length]} Realizado ${t+1}`,type:o[t%o.length],weight:`${(Math.random()*10+2).toFixed(1)}g`,size:t%2===0?"18cm":"Medida 7",metal:n[t%n.length],pearls:t%3===0?"4 Perlas cultivadas":"Sin perlas",image:a[t%a.length]+`&random=${t}`});v()}if(!e){const o=[{name:"Anillo de Oro",type:"Anillo",price:15e3,img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600"},{name:"Collar de Plata",type:"Collar",price:2500,img:"https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600"}];for(let n=0;n<16;n++){const a=o[n%o.length];c.products.push({id:n+1,name:a.name,price:a.price+n*100,priceStr:`$${(a.price+n*100).toLocaleString()}`,image:a.img,desc:"Pieza única diseñada a medida."})}v()}}function v(){localStorage.setItem("joyeriaGraceData",JSON.stringify(c))}H();const f=c.products,w=document.getElementById("services-list");function V(){w&&(w.innerHTML="",c.services.forEach(e=>{const o=document.createElement("div");o.className="service-card",o.innerHTML=`
        <img src="${e.image}" alt="${e.title}">
        <div class="service-info">
          <h3>${e.title}</h3>
          <p>${e.desc}</p>
        </div>
      `,w.appendChild(o)}))}V();function J(){const e=document.querySelector(".custom-info h3"),o=document.querySelector(".custom-info p");e&&(e.textContent=c.about.title),o&&(o.textContent=c.about.desc)}J();const C=document.getElementById("products-list"),b=document.getElementById("view-more-btn");let E=8;function z(){if(!C)return;const e=[];e.push(`
    <div class="feature-card tall">
      <span class="tagline">Joyas con Alma</span>
      <h2>Piezas atemporales hechas para brillar.</h2>
      <button class="feature-btn">Explorar Accesorios</button>
      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600" class="feature-decor" alt="Decor">
    </div>
  `),f.slice(0,E).forEach((n,a)=>{a===7&&e.push(`
        <div class="feature-card wide">
          <span class="tagline">Detalles que Enamoran</span>
          <h2>Cada accesorio cuenta una historia única.</h2>
          <button class="feature-btn">Ver Más</button>
        </div>
      `),e.push(`
      <div class="product-card">
        <div class="product-image-container">
          <img src="${n.image}" alt="${n.name}" class="product-image" data-id="${n.id}">
        </div>
        <div class="product-details">
          <h3>${n.name}</h3>
          <div class="price-container">
            <span class="current-price">${n.priceStr}</span>
          </div>
          <button class="btn btn-outline add-to-cart-quick" data-id="${n.id}">
             <ion-icon name="cart-outline"></ion-icon>
          </button>
        </div>
      </div>
    `)}),C.innerHTML=e.join(""),ee(),b&&(b.style.display=E>=f.length?"none":"block")}b&&b.addEventListener("click",()=>{E+=8,z()});const u=[],g=document.getElementById("cart-count"),R=document.getElementById("cart-modal"),A=document.getElementById("cart-btn"),x=document.getElementById("close-cart-modal"),h=document.getElementById("cart-items"),D=document.getElementById("cart-total"),q=document.getElementById("checkout-btn");function W(){if(g&&(g.textContent=u.length),!!h)if(u.length===0)h.innerHTML='<p style="text-align: center;">Tu carrito está vacío.</p>',D.textContent="$0 MXN";else{h.innerHTML="";let e=0;u.forEach((o,n)=>{e+=o.price;const a=document.createElement("div");a.className="cart-item",a.innerHTML=`
        <div class="cart-item-info">
             <span class="cart-item-name">${o.name}</span>
             <span class="cart-item-price">${o.priceStr}</span>
        </div>
        <button class="remove-item" data-index="${n}">&times;</button>
      `,h.appendChild(a)}),D.textContent=`$${e.toLocaleString()} MXN`,document.querySelectorAll(".remove-item").forEach(o=>{o.addEventListener("click",n=>{const a=parseInt(n.target.dataset.index);u.splice(a,1),W()})})}}function _(e){u.push(e),W(),g&&(g.style.transform="scale(1.2)",setTimeout(()=>g.style.transform="scale(1)",200))}A&&A.addEventListener("click",()=>R.showModal());x&&x.addEventListener("click",()=>R.close());q&&q.addEventListener("click",()=>{if(u.length===0)return;const e="523312345678";let o=`Hola, me interesa comprar:
`+u.map(n=>`- ${n.name} (${n.priceStr})`).join(`
`);window.open(`https://wa.me/${e}?text=${encodeURIComponent(o)}`,"_blank")});const k=document.getElementById("catalog-modal"),M=document.getElementById("open-catalog-btn"),P=document.getElementById("open-catalog-btn-3d"),T=document.getElementById("close-catalog-modal"),p=document.getElementById("catalog-grid"),O=[{id:"boda",name:"Anillos de Boda",img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400"},{id:"compromiso",name:"Anillos de Compromiso",img:"https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=400"},{id:"graduacion",name:"Anillos de Graduación",img:"https://images.unsplash.com/photo-1617038224558-2854c900642f?q=80&w=400"},{id:"cadenas",name:"Cadenas",img:"https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=400"},{id:"casuales",name:"Anillos Casuales",img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400"},{id:"chapas",name:"Chapas",img:"https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=400"},{id:"dijes",name:"Dijes",img:"https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400"}];function L(e,o=!0){p&&(p.innerHTML=e,p.style.display=o?"grid":"block",o?(p.style.gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))",p.style.gap="1rem"):p.style.gridTemplateColumns="none")}function S(){const e=document.querySelector("#catalog-modal h2");e&&(e.textContent="Tipos de Prenda");let o=O.map(n=>`
        <div class="category-card" data-cat="${n.id}" style="background-image: url('${n.img}')">
            <div class="category-overlay"><h3>${n.name}</h3></div>
        </div>
    `).join("");L(o),document.querySelectorAll(".category-card").forEach(n=>{n.addEventListener("click",()=>U(n.dataset.cat))})}function U(e){const o=O.find(i=>i.id===e),n=document.querySelector("#catalog-modal h2");n&&(n.textContent=o.name);const a=c.catalogItems.filter(i=>i.category===e);let t=`
    <button class="back-btn" id="width-auto-back"><ion-icon name="arrow-back-outline"></ion-icon> Volver a Categorías</button>
    <div class="gallery-grid-internal">
  `;a.length===0?t+='<p style="grid-column: 1/-1; text-align: center; color: gray;">No hay diseños disponibles en esta categoría por el momento.</p>':a.forEach(i=>{t+=`
        <div class="catalog-item-card" data-id="${i.id}">
            <div class="item-img-container">
                <img src="${i.images[0]}" alt="${i.name}">
            </div>
            <div class="item-info">
                <h4>${i.name}</h4>
                <p class="item-price-small">Desde ${i.precioDiseno}</p>
            </div>
        </div>
      `}),t+=`
    </div>
    <div style="text-align: center; margin-top: 2rem;">
        <button class="btn btn-outline" id="view-more-catalog">Ver más diseños</button>
    </div>
  `,L(t,!1),document.getElementById("width-auto-back").addEventListener("click",S),document.querySelectorAll(".catalog-item-card").forEach(i=>{i.addEventListener("click",()=>{const s=parseInt(i.dataset.id),d=c.catalogItems.find(l=>l.id===s);d&&X(d)})})}function X(e){const o=document.querySelector("#catalog-modal h2");o&&(o.textContent="Detalles del Diseño");let n=`
    <div class="details-carousel">
        <div class="carousel-images-container">
            ${e.images.map((d,l)=>`
                <img src="${d}" class="carousel-img ${l===0?"active":""}" data-index="${l}">
            `).join("")}
        </div>
        ${e.images.length>1?`
            <button class="carousel-ctrl prev" id="detail-prev"><ion-icon name="chevron-back"></ion-icon></button>
            <button class="carousel-ctrl next" id="detail-next"><ion-icon name="chevron-forward"></ion-icon></button>
        `:""}
    </div>
  `;const a="523312345678",t=`Hola, me interesa adquirir este diseño: ${e.name} (Ref: ${e.id}).`,i=`https://wa.me/${a}?text=${encodeURIComponent(t)}`;let s=`
    <button class="back-btn" id="back-to-gallery"><ion-icon name="arrow-back-outline"></ion-icon> Volver a la Galería</button>
    <div class="item-details-layout">
        <div class="details-visual">
            ${n}
        </div>
        <div class="details-specs">
            <h3>${e.name}</h3>
            <div class="specs-grid">
                <div class="spec-item"><strong>Peso:</strong> <span>${e.peso}</span></div>
                <div class="spec-item"><strong>Medida:</strong> <span>${e.medida}</span></div>
                <div class="spec-item"><strong>Precio de Diseño:</strong> <span>${e.precioDiseno}</span></div>
                <div class="spec-item"><strong>Dimensiones:</strong> <span>${e.dimensiones||"N/A"}</span></div>
            </div>
            <button class="btn btn-wa-adquirir" onclick="window.open('${i}', '_blank')">
                <ion-icon name="logo-whatsapp"></ion-icon> Adquirir Diseño
            </button>
        </div>
    </div>
  `;if(L(s,!1),document.getElementById("back-to-gallery").addEventListener("click",()=>U(e.category)),e.images.length>1){let d=0;const l=document.querySelectorAll(".carousel-img"),r=m=>{l.forEach(F=>F.classList.remove("active")),l[m].classList.add("active"),d=m};document.getElementById("detail-prev").addEventListener("click",()=>{r(d===0?e.images.length-1:d-1)}),document.getElementById("detail-next").addEventListener("click",()=>{r(d===e.images.length-1?0:d+1)})}}M&&M.addEventListener("click",()=>{k.showModal(),S()});P&&P.addEventListener("click",()=>{k.showModal(),S()});T&&T.addEventListener("click",()=>k.close());const I=document.getElementById("product-modal"),j=document.getElementById("close-modal"),K=document.getElementById("modal-img"),Q=document.getElementById("modal-title"),Y=document.getElementById("modal-desc"),Z=document.getElementById("modal-price");function ee(){document.querySelectorAll(".product-image").forEach(e=>{e.addEventListener("click",o=>{const n=parseInt(o.target.dataset.id),a=f.find(t=>t.id===n);a&&I&&(K.src=a.image,Q.textContent=a.name,Y.textContent=a.desc,Z.textContent=a.priceStr,I.showModal())})}),document.querySelectorAll(".add-to-cart-quick").forEach(e=>{e.addEventListener("click",o=>{const n=parseInt(o.currentTarget.dataset.id),a=f.find(t=>t.id===n);a&&_(a)})})}j&&j.addEventListener("click",()=>I.close());window.currentAdminSection="nosotros";function te(){const e=document.getElementById("login-modal"),o=document.getElementById("admin-dashboard"),n=document.getElementById("open-login-btn"),a=document.getElementById("close-login-modal"),t=document.getElementById("login-form");n&&(n.onclick=l=>{l.preventDefault(),e.showModal()}),a&&(a.onclick=()=>e.close()),t&&(t.onsubmit=l=>{l.preventDefault();const r=document.getElementById("login-user").value,m=document.getElementById("login-pass").value;r==="nerys"&&m==="Estudiante*1"?(e.close(),o.classList.add("active"),window.renderAdminSection()):alert("Usuario o contraseña incorrectos")});const i=document.getElementById("logout-btn");i&&(i.onclick=()=>{location.reload()});const s=document.getElementById("close-admin-btn");s&&(s.onclick=()=>{o.classList.remove("active")});const d=document.querySelector(".admin-sidebar");d&&(d.onclick=l=>{const r=l.target.closest(".nav-item");!r||!r.dataset.section||(console.log("Admin Nav Clicked:",r.dataset.section),document.querySelectorAll(".admin-sidebar .nav-item").forEach(m=>m.classList.remove("active")),r.classList.add("active"),window.currentAdminSection=r.dataset.section,window.renderAdminSection())}),o&&o.classList.contains("active")&&window.renderAdminSection()}window.renderAdminSection=function(){const e=document.getElementById("admin-content");if(!e){console.error("Admin content container not found!");return}console.log("Rendering Admin Section:",window.currentAdminSection),e.innerHTML="";const o={nosotros:"Sección Nosotros",servicios:"Servicios Disponibles",productos:"Productos / Accesorios",catalogo:"Catálogo de Diseños"}[window.currentAdminSection];e.innerHTML=`
    <div class="admin-header">
      <h4>${o}</h4>
      ${window.currentAdminSection!=="nosotros"?`<button class="btn" onclick="window.showForm('${window.currentAdminSection}')">+ Agregar Nuevo</button>`:""}
    </div>
    <div id="admin-list-container"></div>
    <div id="admin-form-container"></div>
  `,window.renderList()};te();window.renderList=function(){const e=document.getElementById("admin-list-container");if(!e)return;if(e.innerHTML="",window.currentAdminSection==="nosotros"){e.innerHTML=`
      <div class="admin-section-card">
        <h6>Información de la Sección</h6>
        <p class="section-subtitle">Edita los textos principales de la sección Nosotros y 3D.</p>
        <div class="form-group">
          <label>Título Principal</label>
          <input type="text" id="a-about-t" value="${c.about.title}">
        </div>
        <div class="form-group">
          <label>Descripción / Bio</label>
          <textarea id="a-about-d" class="admin-textarea">${c.about.desc}</textarea>
        </div>
        <div style="margin-top:2rem;">
            <button class="admin-save-btn" onclick="window.saveNosotros()">Guardar Cambios</button>
        </div>
      </div>
    `;return}const a={servicios:c.services,productos:c.products,catalogo:c.catalogItems}[window.currentAdminSection].map((t,i)=>`
    <div class="admin-item-row">
      <img src="${t.image||(t.images?t.images[0]:"")}" alt="">
      <div class="admin-item-info">
        <strong>${t.name||t.title}</strong>
        <small>${t.priceStr||t.category||"Categoría: Servicio"}</small>
      </div>
      <div class="admin-item-status">
        <span class="badge">Visto en la web</span>
      </div>
      <div class="action-btns">
        <button class="btn-icon btn-edit" onclick="window.showForm('${window.currentAdminSection}', ${i})"><ion-icon name="create-outline"></ion-icon></button>
        <button class="btn-icon btn-delete" onclick="window.deleteItem('${window.currentAdminSection}', ${i})"><ion-icon name="trash-outline"></ion-icon></button>
      </div>
    </div>
  `).join("");e.innerHTML=`<div class="admin-table">${a}</div>`};window.showForm=(e,o=null)=>{const n=o!==null,a=document.getElementById("admin-list-container"),t=c[e==="catalogo"?"catalogItems":e],i=n?t[o]:{};a.style.display="none";const s=document.querySelector(".admin-header");s&&(s.style.display="none");const d=document.getElementById("admin-form-container");let l="";e==="servicios"?l=`
      <div class="admin-section-card">
        <h6>Información Básica</h6>
        <p class="section-subtitle">Datos principales del servicio.</p>
        <div class="admin-inputs-grid">
            <div class="form-group">
                <label>Título del Servicio</label>
                <input type="text" id="edit-title" value="${i.title||""}" placeholder="Ej. Limpieza de Joyas">
            </div>
            <div class="form-group">
                <label>URL de la Imagen</label>
                <input type="text" id="edit-image" value="${i.image||""}" placeholder="https://...">
            </div>
            <div class="form-group full-width">
                <label>Descripción Detallada</label>
                <textarea id="edit-desc" class="admin-textarea" placeholder="Describe el servicio...">${i.desc||""}</textarea>
            </div>
        </div>
      </div>
    `:e==="productos"?l=`
      <div class="admin-section-card">
        <h6>Información del Producto</h6>
        <p class="section-subtitle">Datos principales que aparecerán en la tienda.</p>
        <div class="admin-inputs-grid">
            <div class="form-group">
                <label>Nombre del Accesorio</label>
                <input type="text" id="edit-name" value="${i.name||""}" placeholder="Ej. Collar de Plata Elegante">
            </div>
            <div class="form-group">
                <label>URL de Imagen</label>
                <input type="text" id="edit-image" value="${i.image||""}" placeholder="https://...">
            </div>
        </div>
      </div>
      <div class="admin-section-card">
        <h6>Precio e Inventario</h6>
        <div class="admin-inputs-grid">
            <div class="form-group">
                <label>Precio Actual (MXN)</label>
                <input type="number" id="edit-price" value="${i.price||0}">
            </div>
        </div>
      </div>
    `:e==="catalogo"&&(l=`
        <div class="admin-section-card">
            <h6>Especificaciones del Diseño</h6>
            <p class="section-subtitle">Detalles técnicos del diseño en el catálogo.</p>
            <div class="admin-inputs-grid">
                <div class="form-group">
                    <label>Nombre del Diseño</label>
                    <input type="text" id="edit-name" value="${i.name||""}">
                </div>
                <div class="form-group">
                    <label>Categoría</label>
                    <select id="edit-category">
                        <option value="boda" ${i.category==="boda"?"selected":""}>Anillos de Boda</option>
                        <option value="compromiso" ${i.category==="compromiso"?"selected":""}>Anillos de Compromiso</option>
                        <option value="graduacion" ${i.category==="graduacion"?"selected":""}>Graduación</option>
                        <option value="cadenas" ${i.category==="cadenas"?"selected":""}>Cadenas</option>
                        <option value="casuales" ${i.category==="casuales"?"selected":""}>Anillos Casuales</option>
                        <option value="chapas" ${i.category==="chapas"?"selected":""}>Chapas</option>
                        <option value="dijes" ${i.category==="dijes"?"selected":""}>Dijes</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Peso Estimado</label>
                    <input type="text" id="edit-peso" value="${i.peso||""}" placeholder="Ej. 6.2g">
                </div>
                <div class="form-group">
                    <label>Medida Sugerida</label>
                    <input type="text" id="edit-medida" value="${i.medida||""}" placeholder="Ej. 8">
                </div>
                <div class="form-group">
                    <label>Precio de Diseño / Referencial</label>
                    <input type="text" id="edit-precioDiseno" value="${i.precioDiseno||""}" placeholder="Ej. $750">
                </div>
                <div class="form-group">
                    <label>Dimensiones / Ancho</label>
                    <input type="text" id="edit-dimensiones" value="${i.dimensiones||""}" placeholder="Ej. 4mm">
                </div>
            </div>
        </div>
        <div class="admin-section-card">
            <h6>Galería de Imágenes</h6>
            <div class="admin-inputs-grid">
                <div class="form-group">
                    <label>URL Imagen Principal</label>
                    <input type="text" id="edit-img1" value="${i.images?i.images[0]:""}">
                </div>
                <div class="form-group">
                    <label>URL Imagen Secundaria (Opcional)</label>
                    <input type="text" id="edit-img2" value="${i.images&&i.images[1]?i.images[1]:""}">
                </div>
            </div>
        </div>
    `),d.innerHTML=`
    <button class="admin-back-btn" onclick="window.cancelEdit()">
        <ion-icon name="arrow-back-outline"></ion-icon> Cancelar y volver
    </button>
    <div class="admin-header" style="margin-bottom: 2rem;">
        <h4>${n?"Editar Registro":"Nuevo Registro"}</h4>
    </div>
    ${l}
    <div style="display:flex; gap:1.5rem; margin-bottom: 5rem;">
        <button class="admin-save-btn" onclick="window.saveItem('${e}', ${o})" style="width: auto; min-width: 200px;">
            <ion-icon name="save-outline"></ion-icon> Guardar Registro
        </button>
    </div>
  `};window.cancelEdit=()=>{renderAdminSection()};window.saveNosotros=()=>{c.about.title=document.getElementById("a-about-t").value,c.about.desc=document.getElementById("a-about-d").value,v(),alert("Sección Nosotros actualizada correctamente"),location.reload()};window.saveItem=(e,o)=>{const n=o!==null,a=c[e==="catalogo"?"catalogItems":e];let t=n?{...a[o]}:{id:Date.now()};if(e==="servicios")t.title=document.getElementById("edit-title").value,t.image=document.getElementById("edit-image").value,t.desc=document.getElementById("edit-desc").value;else if(e==="productos")t.name=document.getElementById("edit-name").value,t.image=document.getElementById("edit-image").value,t.price=parseInt(document.getElementById("edit-price").value),t.priceStr=`$${t.price.toLocaleString()}`,t.desc=t.desc||"Pieza exclusiva.";else if(e==="catalogo"){t.name=document.getElementById("edit-name").value,t.category=document.getElementById("edit-category").value;const i=document.getElementById("edit-img1").value,s=document.getElementById("edit-img2").value;t.images=[i],s&&t.images.push(s),t.peso=document.getElementById("edit-peso").value,t.medida=document.getElementById("edit-medida").value,t.precioDiseno=document.getElementById("edit-precioDiseno").value,t.dimensiones=document.getElementById("edit-dimensiones").value}n?a[o]=t:a.push(t),v(),alert("Guardado con éxito"),location.reload()};window.deleteItem=(e,o)=>{confirm("¿Estás seguro de que deseas eliminar este elemento?")&&(c[e==="catalogo"?"catalogItems":e].splice(o,1),v(),alert("Eliminado con éxito"),location.reload())};document.addEventListener("click",e=>{e.target.closest(".mobile-menu-btn")&&document.getElementById("filter-drawer").classList.add("active"),(e.target.closest("#close-filter-drawer")||e.target.closest(".drawer-link"))&&document.getElementById("filter-drawer").classList.remove("active")});function oe(){const e=document.querySelectorAll(".header-slider .slide"),o=document.querySelectorAll(".dot");if(e.length===0)return;let n=0;const a=5e3;let t=setInterval(d,a);function i(r){o.forEach(m=>m.classList.remove("active")),o[r]&&o[r].classList.add("active")}function s(r){e[n].classList.remove("active"),n=(r+e.length)%e.length,e[n].classList.add("active"),i(n),l()}function d(){s(n+1)}function l(){clearInterval(t),t=setInterval(d,a)}o.forEach((r,m)=>{r.addEventListener("click",()=>{s(m)})})}document.addEventListener("DOMContentLoaded",()=>{H(),oe(),z(),G(),ne()});function ne(){const e=document.querySelectorAll(".eng-slide");let o=0;if(e.length===0)return;setInterval(()=>{e[o].classList.remove("active"),o=(o+1)%e.length,e[o].classList.add("active")},5e3);const n=document.getElementById("view-engagement-pdf"),a=document.getElementById("pdf-modal"),t=document.getElementById("pdf-frame"),i=document.getElementById("close-pdf-modal");n&&a&&t&&n.addEventListener("click",()=>{window.open("/pdf/catalogo.pdf","_blank")}),i&&a&&i.addEventListener("click",()=>{a.close(),t.src=""})}const y=document.getElementById("view-more-works-btn"),$=document.getElementById("work-detail-modal"),N=document.getElementById("close-work-modal");let B=8;function G(){const e=document.getElementById("works-grid"),o=document.getElementById("works-showcase");if(!e||!o)return;const n=c.finishedWorks,a=n.slice(0,4);o.innerHTML=a.map(s=>`
    <div class="showcase-item work-card" data-id="${s.id}">
      <img src="${s.image}" alt="${s.name}">
    </div>
  `).join("");const t=n.slice(4,B+4);e.innerHTML=t.map(s=>`
    <div class="work-card" data-id="${s.id}">
      <img src="${s.image}" alt="${s.name}">
      <div class="work-card-overlay">
        <span>Ver Detalles</span>
      </div>
    </div>
  `).join(""),y&&(y.style.display=B+4>=n.length?"none":"block");const i=document.getElementById("scroll-to-gallery");i&&(i.onclick=()=>{e.scrollIntoView({behavior:"smooth"})}),ie()}function ie(){document.querySelectorAll(".work-card").forEach(e=>{e.addEventListener("click",()=>{const o=parseInt(e.dataset.id),n=c.finishedWorks.find(a=>a.id===o);n&&ae(n)})})}function ae(e){if(!$)return;document.getElementById("work-modal-img").src=e.image,document.getElementById("work-modal-title").textContent=e.name,document.getElementById("work-spec-type").textContent=e.type,document.getElementById("work-spec-weight").textContent=e.weight,document.getElementById("work-spec-size").textContent=e.size,document.getElementById("work-spec-metal").textContent=e.metal,document.getElementById("work-spec-pearls").textContent=e.pearls;const o="523312345678",n=`Hola, me interesa cotizar esta prenda realizada: ${e.name} (ID: ${e.id})`;document.getElementById("work-quote-btn").onclick=()=>{window.open(`https://wa.me/${o}?text=${encodeURIComponent(n)}`,"_blank")},$.showModal()}y&&y.addEventListener("click",()=>{B+=8,G()});N&&N.addEventListener("click",()=>$.close());
