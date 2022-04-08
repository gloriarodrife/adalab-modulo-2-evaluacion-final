const form=document.getElementById("form"),inputSearch=document.getElementById("search"),bookmarkList=document.getElementById("bookmarks"),drinksList=document.getElementById("list"),API_URL="https://www.thecocktaildb.com";let bookmarks=[];async function searchDrinks(e){const t=await fetch(`${API_URL}/api/json/v1/1/search.php?s=${e}`);return(await t.json()).drinks}function initApp(){const e=localStorage.getItem("bookmarks");if(null!==e){const t=JSON.parse(e);bookmarks=t,renderBookmarks()}form.addEventListener("submit",(async e=>{e.preventDefault(),drinksList.innerHTML="";const t=inputSearch.value;listDrinks(await searchDrinks(t))})),clearBookmarks()}function renderBookmarks(){for(const e of bookmarks){const t=createListItem(e),n=document.createElement("button"),o=document.createTextNode("x");n.appendChild(o);const r=document.getElementById(e.idDrink);t.appendChild(n),bookmarkList.appendChild(t),n.addEventListener("click",(()=>{const e=bookmarks.findIndex((e=>e.idDrink===r.id));r.removeAttribute("style"),bookmarks.splice(e,1),bookmarkList.innerHTML="",renderBookmarks(),localStorage.setItem("bookmarks",JSON.stringify(bookmarks))}))}}function clearBookmarks(){form.addEventListener("reset",(e=>{e.preventDefault(),bookmarkList.innerHTML="",drinksList.innerHTML="",bookmarks=[],localStorage.removeItem("bookmarks")}))}async function listDrinks(e){for(const t of e){const e=createListItem(t);bookmarks.find((e=>e.idDrink===t.idDrink))&&(e.style.border="2px solid #f8b5d6",e.style.fontStyle="Italic"),drinksList.appendChild(e),e.addEventListener("click",(n=>{n.preventDefault();bookmarks.find((e=>e.idDrink===t.idDrink))||(e.style.border="2px solid #f8b5d6",e.style.fontStyle="Italic",bookmarks.push(t),localStorage.setItem("bookmarks",JSON.stringify(bookmarks))),bookmarkList.innerHTML="",renderBookmarks()}))}}function createListItem(e){const t=document.createElement("li");t.setAttribute("id",e.idDrink);const n=document.createElement("p");if(n.innerText=e.strDrink,t.appendChild(n),e){const n=document.createElement("img");n.src=e.strDrinkThumb||e.strDrinkThumb,t.appendChild(n)}else{const e=document.createElement("img");e.src="./assets/images/images.jpeg",t.appendChild(e)}return t}initApp();