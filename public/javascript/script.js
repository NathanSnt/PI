function mudarCarrossel(estacao){
    document.getElementById("carrossel1").src = "images/"+estacao+"1.jpg"
    document.getElementById("carrossel2").src = "images/"+estacao+"2.jpg"
    document.getElementById("carrossel3").src = "images/"+estacao+"3.jpg"
    document.getElementById("carrossel4").src = "images/"+estacao+"4.jpg"
    document.getElementById("carrossel5").src = "images/"+estacao+"5.jpg"
    document.getElementById("slide1").checked = true
}

function atualizaTamanhoFaixa(){
    const nav = document.querySelector('nav');
    const faixa = document.querySelector('#faixa');
    const alturaNav = nav.offsetHeight;
    const alturaFaixa = alturaNav * 0.95;
    const margem = alturaNav * 0.025;
    
    faixa.style.height = `${alturaFaixa}px`;
    faixa.style.marginTop = `${margem}px`;
    faixa.style.marginBottom = `${margem}px`;
}

function mudarConteudo(pagina, divId, carrossel, nome_estacao) {
    if (nome_estacao) {
        pagina += `?estacao=${nome_estacao}`
    }
    $.get(pagina, function(data) {
        $(divId).html(data)
        $('html, body').animate({
            scrollTop: $('#conteudo').offset().top
        })
        mudarCarrossel(carrossel)
    })
}

function mostrarInfo(objeto) {
    const divComentarioFooter = objeto.parentElement.children[1].children[1]
    divComentarioFooter.classList.toggle('mostrarInfo')
}

function mostrarMenu() {
    if (document.querySelector('#menu-estacoes').offsetWidth === 0) {
        ativaMenu()
    }
    else {
        desativaMenu()
    }
}

function ativaMenu() {
    let divMenuEstacao = document.querySelector('#menu-estacoes')
    let estacao = document.querySelector('#estacao')
    let divConteudo = document.querySelector("#conteudo")
    let faixa = document.querySelector("#faixa")

    divMenuEstacao.classList.add('menuAtivo')
    divConteudo.style.display = 'none'
    faixa.classList.add('faixaMenuHamburger')
    estacao.classList.add('estacaoMenuHamburger')
    atualizaTamanhoFaixa()
}

function desativaMenu() {
    let divMenuEstacao = document.querySelector('#menu-estacoes')
    let divConteudo = document.querySelector("#conteudo")
    let estacao = document.querySelector('#estacao')
    let faixa = document.querySelector("#faixa")

    divMenuEstacao.classList.remove('menuAtivo')
    faixa.classList.remove('faixaMenuHamburger')
    estacao.classList.remove('estacaoMenuHamburger')
    divConteudo.style.setProperty('display', 'block', 'important')
}

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
