document.getElementById("formTalles").addEventListener("submit", e => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(e.target));
  const { peso, tipo } = datos;

  let resultado = "";

  if (tipo === "remera") {
    if (peso < 60) resultado = "Talle S";
    else if (peso < 75) resultado = "Talle M";
    else resultado = "Talle L";
  } else {
    resultado = "Collar tamaño único";
  }

  document.getElementById("resultado").textContent = `Resultado: ${resultado}`;
});

const tallesData = {
  "pretal-h-sublimado": [
    { talle: "XS", cuello: "32-50", pecho: "35-50", cinta: "1.5" },
    { talle: "S",  cuello: "32-50", pecho: "35-50", cinta: "1.5" },
    { talle: "M",  cuello: "40-65", pecho: "40-65", cinta: "2.5" },
    { talle: "L",  cuello: "40-65", pecho: "40-65", cinta: "2.5" },
    { talle: "XL", cuello: "55-85", pecho: "65-105", cinta: "2.5 / 4" },
    { talle: "XXL", cuello: "55-85", pecho: "65-105", cinta: "2.5 / 4" }
  ],
  "pretal-h-liso": [
    { talle: "XS", cuello: "20-30", pecho: "22-40", cinta: "1.5" },
    { talle: "S",  cuello: "27-45", pecho: "25-50", cinta: "2" },
    { talle: "M",  cuello: "27-45", pecho: "30-75", cinta: "2.5" },
    { talle: "L",  cuello: "30-55", pecho: "40-80", cinta: "3" },
    { talle: "XL", cuello: "35-60", pecho: "55-90", cinta: "4" }
  ],
  "collar-sublimado": [
    { talle: "XS", cuello: "20-32", cinta: "1.5" },
    { talle: "S",  cuello: "20-32", cinta: "1.5" },
    { talle: "M",  cuello: "35-55", cinta: "2.5" },
    { talle: "L",  cuello: "30-55", cinta: "2.5" },
    { talle: "XL", cuello: "40-60", cinta: "2.5 / 4" },
    { talle: "XXL", cuello: "40-60", cinta: "2.5 / 4" }
  ],
  "collar-liso": [
    { talle: "XS", cuello: "15-25", cinta: "1.5" },
    { talle: "S",  cuello: "20-35", cinta: "2" },
    { talle: "M",  cuello: "25-40", cinta: "2.5" },
    { talle: "L",  cuello: "30-50", cinta: "3" },
    { talle: "XL", cuello: "35-55", cinta: "4" }
  ]
};

function mostrarTablaTalles(tipo) {
  const data = tallesData[tipo];
  if (!data) return;

  let html = `<div class="tabla-talles-container">
    <h3>Tabla de Talles</h3>
    <table class="tabla-talles">
      <thead><tr>`;

  // Encabezados según tipo
  if (tipo.startsWith("pretal")) {
    html += `<th>Talle</th><th>Cuello (cm)</th><th>Pecho (cm)</th><th>Ancho de la Cinta (cm)</th>`;
  } else {
    html += `<th>Talle</th><th>Cuello (cm)</th><th>Ancho de la Cinta (cm)</th>`;
  }
  html += `</tr></thead><tbody>`;

  // Filas
  data.forEach(row => {
    html += `<tr>
      <td>${row.talle}</td>
      <td>${row.cuello}</td>`;
    if (row.pecho) html += `<td>${row.pecho}</td>`;
    html += `<td>${row.cinta}</td>
    </tr>`;
  });

  html += `</tbody></table>
    <p class="tabla-talles-nota">* Todas las medidas están expresadas en centímetros.</p>
  </div>`;

  // Puedes mostrarlo en un modal, o reemplazar el contenido de una sección:
  document.getElementById('tabla-talles').innerHTML = html;
}
