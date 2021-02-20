const url ='http://newsapi.org/v2/everything?q=(Agricultura)OR(rural)OR(pequeno+agricultor)OR(cultivo)OR(aviario)OR(pecuaria)OR(agro)OR(agricola)OR(ruralismo)NOT(governo)NOT(crise)NOT(politica)NOT(receita)NOT(Portugal)NOT(novela)NOT(eleitor)NOT(futebol)NOT(video-game)NOT(titular)NOT(jogos)NOT(games)NOT(filme)NOT(temporada)NOT(serie)NOT(STF)NOT(desafiante)NOT(Marielle)NOT(peso-pena)NOT(euro)NOT(musica)NOT(europa)NOT(espanha)NOT(poesia)NOT(poema)NOT(teatro)NOT(ministra)NOT(ministro)NOT(ministério)NOT(ministros)NOT(Alemanha)NOT(portugues)NOT(goleiro)NOT(ingredientes)NOT(canábis)NOT(maconha)NOT(cannabis)&language=pt&sortBy=relevancy&apiKey=df86e5e2ed70480cb76005b761c9935d';
 
export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}