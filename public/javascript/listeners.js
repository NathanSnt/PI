window.addEventListener('load', function() {
    atualizaTamanhoFaixa()
})
window.addEventListener('resize', function() {
    atualizaTamanhoFaixa()
    desativaMenu()
    this.document.querySelectorAll('#comentario-footer').forEach(div => {
        if (div.classList.contains('mostrarInfo')) {
            div.classList.toggle('mostrarInfo')
        }
    })
})