"use strict";

const paginaServicios = document.querySelector(".cb-servicios");

if (paginaServicios) {
  paginaServicios.classList.add("cb-js");

  const botonMenu = paginaServicios.querySelector(".cb-menu");
  const navegacion = paginaServicios.querySelector(".cb-nav");
  botonMenu.hidden = false;

  function cerrarMenu() {
    navegacion.classList.remove("cb-nav-abierta");
    botonMenu.setAttribute("aria-expanded", "false");
  }

  botonMenu.addEventListener("click", () => {
    const abierto = navegacion.classList.toggle("cb-nav-abierta");
    botonMenu.setAttribute("aria-expanded", String(abierto));
  });

  navegacion.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) cerrarMenu();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && navegacion.classList.contains("cb-nav-abierta")) {
      cerrarMenu();
      botonMenu.focus();
    }
  });
}
