"use strict";

const paginaProductos = document.querySelector(".cb-productos");

if (paginaProductos) {
  paginaProductos.classList.add("cb-js");

  const botonMenu = paginaProductos.querySelector(".cb-menu");
  const navegacion = paginaProductos.querySelector(".cb-nav");
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

  const controles = paginaProductos.querySelector(".cb-controles");
  const busqueda = paginaProductos.querySelector("#busqueda-productos");
  const botonesFiltro = paginaProductos.querySelectorAll(".cb-filtro");
  const tarjetas = paginaProductos.querySelectorAll(".cb-tarjeta-producto");
  const resultado = paginaProductos.querySelector("#resultado-productos");
  const sinResultados = paginaProductos.querySelector("#sin-resultados");
  let categoriaActiva = "todos";

  function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
  }

  function actualizarProductos() {
    const consulta = normalizar(busqueda.value.trim());
    let cantidad = 0;

    tarjetas.forEach((tarjeta) => {
      const coincideCategoria = categoriaActiva === "todos" || tarjeta.dataset.categoria === categoriaActiva;
      const coincideBusqueda = !consulta || normalizar(tarjeta.textContent).includes(consulta);
      const visible = coincideCategoria && coincideBusqueda;

      tarjeta.hidden = !visible;
      if (visible) cantidad++;
    });

    resultado.textContent = cantidad === 1 ? "Se muestra 1 producto." : `Se muestran ${cantidad} productos.`;
    sinResultados.hidden = cantidad > 0;
  }

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      categoriaActiva = boton.dataset.filtro;
      botonesFiltro.forEach((otroBoton) => {
        otroBoton.setAttribute("aria-pressed", String(otroBoton === boton));
      });
      actualizarProductos();
    });
  });

  busqueda.addEventListener("input", actualizarProductos);
  controles.hidden = false;
  actualizarProductos();
}