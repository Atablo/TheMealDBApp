//Footer
document.addEventListener("scroll", function () {
  let scrolled = window.scrollY;
  let windowHeight = window.innerHeight;
  let bodyHeight = document.body.clientHeight;
  // Muestra el footer cuando estás cerca del final de la página
  document.body.classList.toggle("scrolled-footer-visible", scrolled + windowHeight >= bodyHeight - 100);
});

/*-----------------------------------------------
/*---------------boton scroll--------------------
-------------------------------------------------*/
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var scrollTopBtn = document.getElementById("scrollTopBtn");

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

// Función para animar el scroll al top de la página
document.getElementById("scrollTopBtn").onclick = function () {
  scrollToTop();
};

function scrollToTop() {
  document.documentElement.scrollTop = 0;
}
