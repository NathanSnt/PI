#instalar html5lib e bs4
import urllib.request
from bs4 import BeautifulSoup

with open ('estacoes.txt', 'r') as file:
    estacoes = file.readlines()

lista_estacoes = [x[:-1] for x in estacoes]

url = 'https://www.viamobilidade.com.br/nos/linha-9-esmeralda/'

for x in lista_estacoes:
    pagina = urllib.request.urlopen(url+x)
    with open('enderecos.txt', 'a', encoding='UTF-8') as file:
        file.write(f"{x} = {str(BeautifulSoup(pagina, 'html5lib', from_encoding='UTF-8').find_all('p')[2]).replace('<p>', '').replace('</p>', '')} \n")
        # Estação mendes vila natal não irá constar endereço. Colocar manualmente = Estrada dos Mendes, s/n - Jardim Icarai – Grajaú - 04860-140
    
lista1 = []
lista2 = []
for x in lista_estacoes:
    pagina = urllib.request.urlopen(url+x)
    retorno = str(BeautifulSoup(pagina, 'html5lib').findAll('span')[2:-1]).replace('<span>', '').replace('</span>', '').replace('<br/>', ' - ')
    
    with open('caracteristicas.txt', 'a', encoding='UTF-8') as file:
        file.write(f"{x} = {retorno} \n")
    
    lista2.append(retorno)
    for x in lista2:
        for y in x:
            if not lista1.__contains__(y):
                lista1.append(y)
                with open('images.txt', 'a', encoding='UTF-8') as file:
                    file.write(f"{str(y)} = images/{str(y).replace(' ', '-').lower()}.png\n")
                    # Remover manualmente acentos nos nomes de arquivos.
                print(str(y).replace('<span>', '').replace('</span>', '').replace('<br/>', '\n'))
