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
        mudarCarrossel(carrossel)
    })
}

function mostrarInfo(objeto) {
    // document.querySelector('#comentario-footer')
    const divComentarioFooter = objeto.parentElement.children[1].children[1]
    if (divComentarioFooter.style.display == 'block') {
        console.log(divComentarioFooter.style.display)
        divComentarioFooter.style.display = ''
    }else {
        console.log(divComentarioFooter.style.display)
        divComentarioFooter.style.display = 'block'
    }
}

function mostrarMenu() {
    //let divMenuEstacao = document.querySelector('#menu-estacoes')
    //if (document.querySelector('#menu-estacoes').style.display === 'none'){
    if (document.querySelector('#menu-estacoes').offsetWidth === 0) {
        console.log('on')
        ativaMenu()
    }
    else {
        console.log('off')
        desativaMenu()
    }
}

function ativaMenu() {
    let divMenuEstacao = document.querySelector('#menu-estacoes')
    let estacao = document.querySelector('#estacao')
    let divConteudo = document.querySelector("#conteudo")
    let faixa = document.querySelector("#faixa")

    // divMenuEstacao.style.setProperty('display', 'block', 'important')
    //divMenuEstacao.style.width = '50%'
    // divMenuEstacao.style.backgroundColor = '#eee'
    // divMenuEstacao.style.zIndex = '-3'
    divMenuEstacao.classList.add('menuAtivo')
    divConteudo.style.display = 'none'
    faixa.classList.add('faixaMenuHamburger')
    estacao.classList.add('estacaoMenuHamburger')
    //faixa.style.display = 'block'
    atualizaTamanhoFaixa()
    //faixa.style.left = '15%'
    //faixa.style.width = '4.5%'
    //faixa.style.zIndex = '-2'
    //estacao.style.zIndex = '-1'
}

function desativaMenu() {
    let divMenuEstacao = document.querySelector('#menu-estacoes')
    let divConteudo = document.querySelector("#conteudo")
    let estacao = document.querySelector('#estacao')
    let faixa = document.querySelector("#faixa")

    divMenuEstacao.classList.remove('menuAtivo')
    faixa.classList.remove('faixaMenuHamburger')
    estacao.classList.remove('estacaoMenuHamburger')
    //divMenuEstacao.style.setProperty('display', 'none', 'important')
    //divMenuEstacao.style.setProperty('background-color', '#fff', 'important')
    //faixa.style.display = 'block'
    divConteudo.style.setProperty('display', 'block', 'important')
}

// $('#sobre_nos').click(function() {
//     $.get('sobre', function(data) {
//         $('#conteudo').html(data)
//     })
// })

window.addEventListener('load', function() {
    atualizaTamanhoFaixa()
})
window.addEventListener('resize', function() {
    atualizaTamanhoFaixa()
    desativaMenu()
})





// LISTENER RESIZE
// let menuEstacao = this.document.querySelector("menu-estacoes").style
    // let faixa = this.document.querySelector("faixa").style
    // let conteudo = this.document.querySelector("conteudo").style
    // let hamburger = this.document.querySelector("menu-hamburger").style
   // if (this.window.width <= 600){
        // menuEstacao.display = 'none '
        // conteudo.width = '90%'
        // conteudo.margin = 'auto'
        // hamburger.display = 'block'
        // hamburger.width = '7.5%'
        // hamburger.height = '50px'
        // hamburger.marginLeft = '2.5%'
        // faixa.display = 'none'
    //    ativaMenu()
   // }
   // else if (this.window.width > 600){
        // hamburger.display = 'none'
        // menuEstacao.display = 'block'
        // menuEstacao.backgroundColor = 'white'
        // faixa.display = 'block'
        // conteudo.display = 'block'
      //  desativaMenu()
   // }