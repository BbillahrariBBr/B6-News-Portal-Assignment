const navMenu = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNavMenu(data.data.news_category))
        .catch(error => console.log(error))
}
const displayNavMenu = (allData) => {
    const navDiv = document.getElementById('nav-menu')
    for (const item of allData) {
        const menuList = document.createElement('li');
        menuList.classList.add('nav-item');
        menuList.innerHTML = `
        <a id= "" onclick="loadMenu('${item.category_id}')" class="nav-link text-black-50" href="#">${item.category_name}</a>
        `
        navDiv.appendChild(menuList);
        // console.log(item);
    }
}

const loadMenu = async (id) => {
    url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

}


navMenu();