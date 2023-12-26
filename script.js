const API_KEY = "5c3241b6e7dd4585a3939ff69f1b59d3";
const url ="https://newsapi.org/v2/everything?q=";




window.addEventListener('load', ()=> fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles){

  const cardsContainer = document.getElementById('cards-container');
  const newsCardTemplate = document.getElementById('template-news-card');

  cardsContainer.innerHTML = ''; //jab bhi fetch ho data pehle wala data khali ho jaye

  articles.forEach((article) => {
    if(!article.urlToImage) return; //ui wierd lagage issi liye chor diya

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}





function fillDataInCard(cardClone, article){

  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newsSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');


  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} - ${date}`;

  cardClone.firstElementChild.addEventListener("click", () =>{
  window.open(article.url, "-blank"); 
 }) //jab bhi kisi element mai click hoga toh uss article mai le jayega
  

}


//nav ke handler

let curSelectedNav = null;

function onNavItemClick(id){
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active'); //?null nhi hai tab
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active');

}


//search bar 
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", ()=>{
  const query = searchText.value;
  if(!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    const query = searchText.value;
    if (query) {
      fetchNews(query);
      curSelectedNav?.classList.remove('active');
      curSelectedNav = null;
    } else return
    
  }
}

// Add an event listener for Enter key press on the search input
searchText.addEventListener('keypress', handleEnterKey);
