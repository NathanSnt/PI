function mudarCarrossel(estacao){
        document.getElementById("carrossel1").src = "images/"+estacao+"1.png"
        document.getElementById("carrossel2").src = "images/"+estacao+"2.png"
        document.getElementById("carrossel3").src = "images/"+estacao+"3.png"
        document.getElementById("carrossel4").src = "images/"+estacao+"4.png"
        document.getElementById("carrossel5").src = "images/"+estacao+"5.png"
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
    $.ajax({
        url: pagina,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'XMLHttpRequest': '1'
        },
        success: function(data) {
            $(divId).html(data)
            // $('html, body').animate({
            //     scrollTop: $('#conteudo').offset().top
            // })
            mudarCarrossel(carrossel)
        }
    })
}

function mostrarInfo(objeto) {
    const divComentarioFooter = objeto.parentElement.children[1].children[2]
    const divTags = objeto.parentElement.children[1].children[0]
    divComentarioFooter.classList.toggle('mostrarInfo')
    divTags.classList.toggle('mostrarInfo')
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

function mostraCardDenuncia(div){
    var comentario = div.closest('#comentario');
    var card = comentario.querySelector('#card');
    card.classList.toggle('card-denuncia');
}

function exibe(elemento){
    //document.getElementById("outro-motivo-text").classList.add("exibir")
    var comentario = elemento.closest('#card');
    var card = comentario.querySelector('#outro-motivo-text');
    card.classList.add('exibir');
}

function esconde(elemento){
    //document.getElementById("outro-motivo-text").classList.remove("exibir")
    var comentario = elemento.closest('#card');
    var card = comentario.querySelector('#outro-motivo-text');
    card.classList.remove('exibir');
}


function exibeCaixa(select, texto){

    var selecao = document.getElementById(select);
    var caixaDeTexto = document.getElementById(texto);
    if(selecao.options[selecao.selectedIndex].text === "Outro"){
        
        caixaDeTexto.classList.add("caixaOutro");
    }
    else{
        caixaDeTexto.classList.remove("caixaOutro");  
    }

}

function alerta() {
    const alerta = document.querySelector(".alerta");
    alerta.style.opacity = "0";
}

window.addEventListener('load', function() {
    atualizaTamanhoFaixa()
    // $('html, body').animate({
    //     scrollTop: $('#conteudo').offset().top
    // })

    // Exibindo Toast
    this.setTimeout(() =>{
        alerta()
    }, 3500)
})
window.addEventListener('resize', function() {
    atualizaTamanhoFaixa()
    desativaMenu()
    this.document.querySelectorAll('#comentario-footer').forEach(div => {
        if (div.classList.contains('mostrarInfo')) {
            div.classList.toggle('mostrarInfo')
        }
    })
    this.document.querySelectorAll(".tags").forEach(div => {
        if (div.classList.contains('mostrarInfo')){
            div.classList.toggle('mostrarInfo')
        }
    })
})