function mudarCarrossel(estacao){
    document.getElementById("carrossel1").src = "images/"+estacao+"1.jpg"
    document.getElementById("carrossel2").src = "images/"+estacao+"2.jpg"
    document.getElementById("carrossel3").src = "images/"+estacao+"3.jpg"
    document.getElementById("carrossel4").src = "images/"+estacao+"4.jpg"
    document.getElementById("carrossel5").src = "images/"+estacao+"5.jpg"
    document.getElementById("slide1").checked = true
}