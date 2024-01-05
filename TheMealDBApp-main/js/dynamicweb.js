document.addEventListener('scroll', function () {
    let scrolled = window.scrollY;
    let windowHeight = window.innerHeight;
    let bodyHeight = document.body.clientHeight;
    // Muestra el footer cuando estás cerca del final de la página
    document.body.classList.toggle('scrolled-footer-visible', scrolled + windowHeight >= bodyHeight - 100);
})