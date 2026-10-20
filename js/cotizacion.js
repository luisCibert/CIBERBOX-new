"use strict";

const paginaCotizacion = document.querySelector(".cb-cotizacion");

if (paginaCotizacion) {

  paginaCotizacion.classList.add("cb-js");

  // 1. Menú responsive.
  const botonMenu = paginaCotizacion.querySelector(".cb-menu");
  const navegacion = paginaCotizacion.querySelector(".cb-nav");

  botonMenu.hidden = false;

  function cerrarMenu() {
    navegacion.classList.remove("cb-nav-abierta");
    botonMenu.setAttribute("aria-expanded", "false");
  }

  botonMenu.addEventListener("click", () => {
    const abierto = navegacion.classList.toggle("cb-nav-abierta");

    botonMenu.setAttribute(
      "aria-expanded",
      String(abierto)
    );
  });

  navegacion.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) {
      cerrarMenu();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      navegacion.classList.contains("cb-nav-abierta")
    ) {
      cerrarMenu();
      botonMenu.focus();
    }
  });


  // 2. Cambiar el nombre del campo según el cliente.
  const tipoCliente = paginaCotizacion.querySelector("#tipo-cliente");
  const etiquetaNombre = paginaCotizacion.querySelector("#etiqueta-nombre");
  const campoNombre = paginaCotizacion.querySelector("#nombre");
  const parametros = new URLSearchParams(window.location.search);
  const categoriaSolicitada = parametros.get("categoria");
  const categoriasValidas = ["computo", "redes", "servidores", "servicios"];

  if (categoriasValidas.includes(categoriaSolicitada)) {
    paginaCotizacion.querySelector("#categoria").value = categoriaSolicitada;
  }

  const productoSolicitado = parametros.get("producto");
  if (productoSolicitado) {
    paginaCotizacion.querySelector("#detalle").value = `Me interesa cotizar: ${productoSolicitado}.`;
  }

  tipoCliente.addEventListener("change", () => {

    if (tipoCliente.value === "empresa") {

      etiquetaNombre.textContent = "Razón social *";
      campoNombre.placeholder = "Nombre de la empresa";

    } else {

      etiquetaNombre.textContent = "Nombre completo *";
      campoNombre.placeholder = "Escribe tu nombre completo";

    }

  });


  // 3. Validar el formulario.
  const formulario = paginaCotizacion.querySelector("#formulario-cotizacion");
  const archivo = paginaCotizacion.querySelector("#archivo");
  const mensaje = paginaCotizacion.querySelector("#mensaje-formulario");

  formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    mensaje.textContent = "";

    // Comprobar el formato del archivo.
    if (archivo.files.length > 0) {

      const nombreArchivo = archivo.files[0].name.toLowerCase();

      const formatoValido =
        nombreArchivo.endsWith(".pdf") ||
        nombreArchivo.endsWith(".xls") ||
        nombreArchivo.endsWith(".xlsx");

      if (!formatoValido) {

        mensaje.textContent =
          "Adjunta un archivo PDF o Excel válido.";

        archivo.focus();
        return;

      }

    }

    // Confirmación de la validación local.
    mensaje.textContent =
      "Formulario validado correctamente. Para enviar la solicitud, falta conectar el sistema a un servicio de recepción.";

  });

}