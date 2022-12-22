const $searchBar = document.getElementById("search_bar");
const $root = document.getElementById("root");
const mazeApi = "https://api.tvmaze.com";
const mazeApiSearch = "/search/shows?q=";
const noImage = "../assets/img/no_img.png";

$searchBar.addEventListener("submit", e=>{
    e.preventDefault()
    $root.firstElementChild.innerHTML="";   
    const query = e.target.children[0].value;

    renderSearch(`${mazeApi}${mazeApiSearch}${query}`);

    $searchBar.reset();
});
document.addEventListener("click", e => {
    if(!e.target.parentElement.matches(".card")) return;

    renderShow(e.target.parentElement.dataset.id);
});

const renderSearch = async (url) =>{
    try {
        $root.firstElementChild.innerHTML = `<img class="loader" src="../assets/img/loader.svg" alt="Cargando..." />`
        let res = await fetch(url);
        let json = await res.json();

        let $templateHTML = "";

        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        
        if(!json.length == 0){
            json.map(el => {
            
                $templateHTML += `
                <a href="${el.show.url}" target="_BLANK" rel="noopener" class="card" data-id="${el.show.id}">
                
                    <img src="${null == el.show.image? (noImage):(el.show.image.original)}" alt="${el.show.name}"/>
                    <h3>${el.show.name}</h3>
    
                </a>`;
                
            });
        }else{
            $templateHTML = `<h3>No se han encontrado resultados</h3>`;
        }


        $root.firstElementChild.innerHTML = $templateHTML;

    } catch (err) {
        console.log(err);
        $root.firstElementChild.innerHTML = `<h3>Ha ocurrido un error</h3>`;
    }
}
/*
const renderShow = async (id) =>{
    try {
        $root.firstElementChild.innerHTML = `<img class="loader" src="../assets/img/loader.svg" alt="Cargando..." />`
        let res = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`);
        let json = await res.json();

        let $templateHTML="";

        if(!res.ok) throw {status: res.status, statusText: res.statusText};

        console.log(json);
        //$root.firstElementChild.innerHTML = $templateHTML;

    } catch (err) {
        console.log(err)
        $root.firstElementChild.innerHTML = `<h3>Ha ocurrido un error</h3>`;
    }
}
*/
