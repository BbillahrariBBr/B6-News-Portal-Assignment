const navMenu = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNavMenu(data.data.news_category));
}
const displayNavMenu = (allData) => {
    const navDiv = document.getElementById('nav-menu')
    for (const item of allData) {
        const menuList = document.createElement('li');
        menuList.classList.add('nav-item');
        menuList.innerHTML = `
        <a class="nav-link text-black-50" href="#">${item.category_name}</a>
        `
        navDiv.appendChild(menuList);
        console.log(item);
    }
}
navMenu();