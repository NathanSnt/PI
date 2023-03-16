function mudarCarrossel(estacao){
    document.getElementById("carrossel1").src = "images/"+estacao+"1.jpg"
    document.getElementById("carrossel2").src = "images/"+estacao+"2.jpg"
    document.getElementById("carrossel3").src = "images/"+estacao+"3.jpg"
    document.getElementById("carrossel4").src = "images/"+estacao+"4.jpg"
    document.getElementById("carrossel5").src = "images/"+estacao+"5.jpg"
    document.getElementById("slide1").checked = true
}

const nav = document.querySelector('nav');
const faixa = document.querySelector('#faixa');
const alturaNav = nav.offsetHeight;
const alturaFaixa = alturaNav * 0.95;
const margem = alturaNav * 0.025;

faixa.style.height = `${alturaFaixa}px`;
faixa.style.marginTop = `${margem}px`;
faixa.style.marginBottom = `${margem}px`;