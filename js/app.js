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
    displayMenu(data.data);

}

const displayMenu = (data) => {
    document.getElementById('total-item').innerText = data.length;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ``;
    data.forEach(element => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML =
            `
        <div class="d-flex justify-content-center">
                    <div class="card mb-3" style="max-width: 80%;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural
                                        lead-in to
                                        additional content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        cardContainer.appendChild(cardDiv);

    });
    console.log(data);
}


navMenu();