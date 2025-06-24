// caritolateral.js

// Recuperar carrito de localStorage o crear uno nuevo
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias a elementos del DOM
const panelCarrito = document.getElementById('panelCarrito');
const carritoOverlay = document.getElementById('carritoOverlay');
const openCarritoBtn = document.getElementById('openCarrito');
const closeCarritoBtn = document.getElementById('closeCarrito');
const listaCarrito = document.querySelector("#panelCarrito ul#carrito");
const totalCarritoDiv = document.getElementById('carritoTotal');
const cartCountSpan = document.querySelector('.cart-count');

// Función para actualizar contador en icono carrito
function actualizarContadorCarrito() {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  cartCountSpan.textContent = totalCantidad;
  cartCountSpan.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
}

// Función para renderizar el carrito lateral
function renderizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad} (Talle: ${item.talle})
      <button class="eliminar-item" data-id="${item.id}" data-talle="${item.talle}" title="Eliminar">X</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalCarritoDiv.textContent = `Total: $${total}`;

  // Agregar eventos para eliminar items
  listaCarrito.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = btn.getAttribute('data-id');
      const talle = btn.getAttribute('data-talle');
      const index = carrito.findIndex(p => p.id === id && p.talle === talle);
      if (index !== -1) {
        carrito[index].cantidad--;
        if (carrito[index].cantidad <= 0) {
          carrito.splice(index, 1);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContadorCarrito();
      }
    });
  });
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
  const index = carrito.findIndex(p => p.id === producto.id && p.talle === producto.talle);
  if (index !== -1) {
    carrito[index].cantidad += producto.cantidad;
  } else {
    carrito.push(producto);
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Abrir carrito
if (openCarritoBtn) {
  openCarritoBtn.addEventListener('click', () => {
    renderizarCarrito();
    panelCarrito.classList.add('open');
    carritoOverlay.classList.add('open');
  });
}

// Cerrar carrito
if (closeCarritoBtn) {
  closeCarritoBtn.addEventListener('click', () => {
    panelCarrito.classList.remove('open');
    carritoOverlay.classList.remove('open');
  });
}

if (carritoOverlay) {
  carritoOverlay.addEventListener('click', () => {
    panelCarrito.classList.remove('open');
    carritoOverlay.classList.remove('open');
  });
}

// Inicializa contador al cargar
actualizarContadorCarrito();

// Exportar función agregarAlCarrito para usar desde otros scripts
export { agregarAlCarrito };

// Agregar botón de pagar
const pagarBtn = document.createElement('button');
pagarBtn.id = "pagarBtn";
pagarBtn.className = "carrito-pagar-btn";
pagarBtn.textContent = "Iniciar Compra";
panelCarrito.appendChild(pagarBtn);

document.addEventListener('DOMContentLoaded', () => {
  const pagarBtn = document.getElementById('pagarBtn');
  if (pagarBtn) {
    pagarBtn.addEventListener('click', () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de continuar.");
        return;
      }
      window.location.href = "continuar-compra.html";
    });
  }
});
