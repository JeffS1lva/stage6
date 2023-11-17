export class Router {
  // ela foi criada só para saber que é um objeto, 
  routes = {}
  
  // Esse metodo criado serve para modelar os objetos externos, routeName (é o nome a rota do navegador) e o link (é o mapeamento do dominio).
  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    // Verificação de evento
    event = event || window.event
    event.preventDefault()
    // Esse comando da acesso ao histórico do navegador, essa função avisa que mudou de página e que seja exibido no histórico de navegação ou seja no dominio.
    window.history.pushState({}, '', event.target.href)
    
    // Para usar a função handle sempre que for classes ( {} colchetes ) é necessário usar this que é a referencia da função.
    this.handle()
  }

  handle() {
    // A propriedade pathname.location / window.location (Feito através da desestruturação) define ou retorna o nome do caminho de uma url(página).
    const { pathname } = window.location
  
    // Esse mostra se caso não tiver um mapeamento como por exemplo 'products', só irá mostrar exibir o que estiver no mapeamento, se não tiver vai exibir error 404.
    const route = this.routes[pathname] || this.routes[404]
  
    // Essa função inicia o processo de busca de um recurso da rede, retornando promessa que é cumprida assim que a resposta estiver disponível.
    fetch(route)
  
    // O metodo then faz a consulta e exibe a resposta, e data é um parametro chamado response (resposta).
    .then(data => data.text())
    .then(html => {
      // innerhtml é necessário porque na documentação tem tags html. Com isso a mensagem de cada de cada documento aparecerá.
      document.querySelector('.app').innerHTML = html
    })
    
  }
}



