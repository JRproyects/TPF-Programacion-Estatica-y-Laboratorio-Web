document.getElementById("formContacto").addEventListener("submit", e => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(e.target));
  localStorage.setItem(datos.email, JSON.stringify(datos));
  document.getElementById("respuesta").textContent = `¡Gracias ${datos.nombre}! Te llegará un correo con nuestras ofertas (simulado).`;
});
