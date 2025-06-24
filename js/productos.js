let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const divProductos = document.getElementById("productos");

// Cargar productos desde productos.json
fetch('productos.json')
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos();
  });

// Mostrar productos en la página
function mostrarProductos() {
  divProductos.innerHTML = "";
  productos.forEach(p => {
    const item = document.createElement("div");
    item.className = "producto-item";
    item.innerHTML = `
      <div class="producto" data-id="${p.id}">
        <img src="${p.img}" alt="${p.nombre}" style="width:100px;height:100px;object-fit:cover;">
        <strong>${p.nombre} - $${p.precio}</strong>
        <button class="agregar-carrito">Agregar al carrito</button>
      </div>
    `;
    divProductos.appendChild(item);
  });

  // Asignar evento para abrir modal talle a cada botón recién creado
  document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', function() {
      const productoDiv = this.closest('.producto');
      const id = parseInt(productoDiv.dataset.id);
      const nombre = productoDiv.querySelector('strong').textContent.split(' - $')[0];
      const precio = parseInt(productoDiv.querySelector('strong').textContent.split(' - $')[1]);
      const img = productoDiv.querySelector('img').src;
      mostrarModalTalle({ id, nombre, precio, img });
    });
  });
}

// Opciones de talles
const tallesDisponibles = ["S", "M", "L", "XL"];
let productoPendiente = null;

// Mostrar modal de talles
function mostrarModalTalle(productoInfo) {
  productoPendiente = productoInfo;
  const modal = document.getElementById('modalTalle');
  const opciones = document.getElementById('opcionesTalle');
  opciones.innerHTML = "";
  tallesDisponibles.forEach(talle => {
    const btn = document.createElement('button');
    btn.textContent = talle;
    btn.style.margin = "0 8px";
    btn.onclick = () => seleccionarTalle(talle);
    opciones.appendChild(btn);
  });
  modal.style.display = "flex";
}

// Seleccionar talle y agregar al carrito
function seleccionarTalle(talle) {
  const modal = document.getElementById('modalTalle');
  modal.style.display = "none";
  if (!productoPendiente) return;
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const index = carrito.findIndex(p => p.id === productoPendiente.id && p.talle === talle);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...productoPendiente, talle, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCartCount();
  alert(`Se agregó al carrito: ${productoPendiente.nombre} (Talle: ${talle})`);
  productoPendiente = null;
}

// Cerrar modal
document.getElementById('cancelarTalle').onclick = function() {
  document.getElementById('modalTalle').style.display = "none";
  productoPendiente = null;
};

// Actualizar el contador del carrito en el header
function actualizarCartCount() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const count = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.textContent = count;
}

// Inicializar contador al cargar la página
actualizarCartCount();

// Variables globales
let productoActual = null;

// Evento para cada botón "Agregar al carrito"
document.querySelectorAll('.agregar-carrito').forEach(boton => {
  boton.addEventListener('click', () => {
    const productoDiv = boton.closest('.producto');
    const id = productoDiv.dataset.id || "1";
    const nombre = productoDiv.querySelector('h3').textContent;
    const precio = parseInt(productoDiv.querySelector('.precio').textContent);
    const img = productoDiv.querySelector('img').src;

    productoActual = { id, nombre, precio, img };

    // Mostrar modal de talles
    const modal = document.getElementById('modalTalle');
    const opciones = document.getElementById('opcionesTalle');
    opciones.innerHTML = '';

    ['S', 'M', 'L', 'XL'].forEach(talle => {
      const btn = document.createElement('button');
      btn.textContent = talle;
      btn.style.margin = "5px";
      btn.style.padding = "10px 15px";
      btn.style.cursor = "pointer";
      btn.onclick = () => {
        productoActual.talle = talle;
        productoActual.cantidad = 1;
        agregarAlCarrito(productoActual);
        alert(`Se agregó al carrito: ${productoActual.nombre} (Talle: ${talle})`);
        modal.style.display = 'none';
      };
      opciones.appendChild(btn);
    });

    modal.style.display = 'flex';
  });
});

// Cancelar modal
document.getElementById('cancelarTalle').addEventListener('click', () => {
  document.getElementById('modalTalle').style.display = 'none';
});

function renderizarCarritoPanel() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const ul = document.querySelector("#panelCarrito ul#carrito");
  ul.innerHTML = "";
  let total = 0;
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="item-info">
        ${p.nombre} - $${p.precio} x ${p.cantidad} (Talle: ${p.talle})
      </span>
      <button class="eliminar-item" data-id="${p.id}" data-talle="${p.talle}" title="Eliminar">❌</button>
    `;
    ul.appendChild(li);
    total += p.precio * p.cantidad;
  });
  document.getElementById("carritoTotal").textContent = "Total: $" + total;

  // Evento eliminar
  ul.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      const talle = this.getAttribute('data-talle');
      eliminarDelCarrito(id, talle);
      renderizarCarritoPanel();
    });
  });
}

function eliminarDelCarrito(id, talle) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter(p => !(p.id == id && p.talle == talle));
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
