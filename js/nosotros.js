"use strict";

const paginaNosotros = document.querySelector(".cb-nosotros");

if (paginaNosotros) {

  paginaNosotros.classList.add("cb-js");

  // 1. Abrir y cerrar el menú en celulares.
  const botonMenu = paginaNosotros.querySelector(".cb-menu");
  const navegacion = paginaNosotros.querySelector(".cb-nav");

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


  // 2. Validación básica del formulario de contacto.

  const formulario = paginaNosotros.querySelector("#formulario-contacto");
  const mensajeFormulario = paginaNosotros.querySelector("#mensaje-formulario");

  formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const captcha = paginaNosotros.querySelector("#captcha");
    const resultado = Number(captcha.value);

    if (resultado !== 21) {

      mensajeFormulario.textContent =
        "La respuesta de seguridad es incorrecta.";

      captcha.focus();

      return;
    }

    mensajeFormulario.textContent =
      "Mensaje enviado correctamente. Gracias por contactarnos.";

    formulario.reset();

  });

}