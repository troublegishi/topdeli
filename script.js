// Reemplaza estos valores de ejemplo antes de publicar la pagina o compartir el QR.
const datosTransferencia = {
  nombre: "Anaís Espinosa Quevedo",
  rut: "18.699.767-0",
  banco: "Mercado Pago",
  tipoCuenta: "Cuenta  Vista",
  numeroCuenta: "1040201864",
  correo: "anais.aeq@gmail.com"
};

const etiquetas = {
  nombre: "Nombre",
  rut: "RUT",
  banco: "Banco",
  tipoCuenta: "Tipo de cuenta",
  numeroCuenta: "N° cuenta",
  correo: "Correo"
};

document.querySelectorAll("[data-field]").forEach((elemento) => {
  elemento.textContent = datosTransferencia[elemento.dataset.field];
});

const botonCopiar = document.querySelector("#copy-button");
const etiquetaBoton = botonCopiar.querySelector(".button-label");
const estadoCopia = document.querySelector("#copy-status");
let temporizadorEstado;

function copiarConFallback(texto) {
  const campo = document.createElement("textarea");
  campo.value = texto;
  campo.setAttribute("readonly", "");
  campo.style.position = "fixed";
  campo.style.opacity = "0";
  document.body.appendChild(campo);
  campo.select();

  try {
    if (!document.execCommand("copy")) {
      throw new Error("No se pudo copiar");
    }
  } finally {
    campo.remove();
    botonCopiar.focus();
  }
}

async function copiarDatos() {
  const texto = [
    "TopDeli",
    "",
    ...Object.entries(etiquetas).map(([clave, etiqueta]) => `${etiqueta}: ${datosTransferencia[clave]}`)
  ].join("\n");

  clearTimeout(temporizadorEstado);
  botonCopiar.classList.remove("is-success", "is-error");
  estadoCopia.classList.remove("is-error");

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(texto);
    } else {
      copiarConFallback(texto);
    }
    botonCopiar.classList.add("is-success");
    etiquetaBoton.textContent = "Datos copiados";
    estadoCopia.textContent = "Los datos están listos para pegar.";
  } catch {
    botonCopiar.classList.add("is-error");
    etiquetaBoton.textContent = "No se pudo copiar";
    estadoCopia.classList.add("is-error");
    estadoCopia.textContent = "Selecciona y copia los datos manualmente.";
  }

  temporizadorEstado = setTimeout(() => {
    botonCopiar.classList.remove("is-success", "is-error");
    etiquetaBoton.textContent = "Copiar datos";
    estadoCopia.textContent = "";
    estadoCopia.classList.remove("is-error");
  }, 2800);
}

botonCopiar.addEventListener("click", copiarDatos);
