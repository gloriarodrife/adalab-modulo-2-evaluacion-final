const form=document.getElementById("form"),inputSearch=document.getElementById("search"),bookmarkList=document.getElementById("bookmarks"),drinksList=document.getElementById("list"),button=document.getElementById("button"),API_URL="https://www.thecocktaildb.com";let bookmarks=[];async function searchDrinks(e){const t=await fetch(`${API_URL}/api/json/v1/1/search.php?s=${e}`);return(await t.json()).drinks}function initApp(){const e=localStorage.getItem("bookmarks");if(null!==e){const t=JSON.parse(e);bookmarks=t,renderBookmarks()}form.addEventListener("submit",(async e=>{e.preventDefault(),drinksList.innerHTML="";const t=inputSearch.value;listDrinks(await searchDrinks(t))})),form.addEventListener("reset",(e=>{e.preventDefault(),inputSearch.value="",drinksList.innerHTML=""}))}function renderBookmarks(){bookmarkList.innerHTML="";for(const e of bookmarks){const t=createListItem(e),n=document.createElement("button"),r=document.createTextNode("x");n.appendChild(r),t.appendChild(n),bookmarkList.appendChild(t),n.addEventListener("click",(()=>{const t=bookmarks.findIndex((t=>t.idDrink===e.idDrink));bookmarks.splice(t,1);const n=document.getElementById(e.idDrink);n&&n.classList.remove("highlight"),renderBookmarks(),localStorage.setItem("bookmarks",JSON.stringify(bookmarks))}))}}function listDrinks(e){for(const t of e){const e=createListItem(t);e.setAttribute("id",t.idDrink);bookmarks.find((e=>e.idDrink===t.idDrink))&&e.classList.add("highlight"),drinksList.appendChild(e),e.addEventListener("click",(n=>{n.preventDefault();bookmarks.find((e=>e.idDrink===t.idDrink))||(e.classList.add("highlight"),bookmarks.push(t),localStorage.setItem("bookmarks",JSON.stringify(bookmarks)),renderBookmarks())}))}}function createListItem(e){const t=document.createElement("li"),n=document.createElement("p");if(n.innerText=e.strDrink,t.appendChild(n),e){const n=document.createElement("img");n.src=e.strDrinkThumb||e.strDrinkThumb,t.appendChild(n)}else{const e=document.createElement("img");e.src="./assets/images/images.jpeg",t.appendChild(e)}return t}button.addEventListener("click",(()=>{bookmarks=[],bookmarkList.innerHTML="",localStorage.removeItem("bookmarks")})),initApp();