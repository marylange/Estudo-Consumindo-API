const renderizacao = (data) => {
  let mapedData = mapData(data);//mapear o titulo (lista com títulos)
  console.log('f',mapedData);
  let htmlElements = createHtmlElements(mapedData); // criar a listagem de título de elementos HTML com create element
  console.log('r',htmlElements);
  insertHtmlElements(htmlElements);//inserir elementos HTML criados no HTML
}

const APIrequest = 'https://ghibliapi.herokuapp.com/films';
const getData = () => {
  const myObj = {
    method: 'GET',
    headers: { 'Accept': 'text/plain' }
  };

  fetch(APIrequest, myObj)
    .then(response => response.json())
    .then(data => {
      renderizacao(data);
  })
}
function mapData (data) {
  const mapeamentoApi = data.map((elemento) => {
      return {
          titulo: elemento.title,
          diretor: elemento.director,
          descricao: elemento.description,
      };
  })
  return mapeamentoApi;
}
function createHtmlElements(mapedData) {
  const article = document.createElement('article');
  for(let i = 0; i < mapedData.length; i += 1) {
      //criar os elementos
      const tagTitulo = document.createElement('p');
      tagTitulo.className = 'titulo';

      const tagAutor = document.createElement('p');
      tagAutor.className = 'autor';

      const tagDescricao = document.createElement('p');
      tagDescricao.className = 'descricao';

      //popular os elementos
      tagTitulo.textContent = mapedData[i].titulo;
      tagAutor.textContent = mapedData[i].diretor;
      tagDescricao.textContent = mapedData[i].descricao;

      //adicionar elementos ao elemento pai
      article.appendChild(tagTitulo);
      article.appendChild(tagAutor);
      article.appendChild(tagDescricao);
  }
  return article;
}

function insertHtmlElements(htmlElements) {
  const container = document.getElementsByClassName('container');
  container[0].innerHTML += htmlElements.innerHTML;
}

getData();//trás informações da API
