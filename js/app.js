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
    toggleSpinner(true);
    url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
    // console.log(url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMenu(data.data);
    } catch (error) {
        console.log(error);
    }
}

const displayMenu = (data) => {
    const totalItem = document.getElementById('total-item');
    if (data.length <= 0) {
        totalItem.innerText = 'No'
    }
    else {
        totalItem.innerText = data.length;
    }


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
                                <img src="${element.thumbnail_url}" class="img-fluid  rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">${element.details.slice(0, 200)}...</p>
                                </div>
                                
                                <div class="d-flex justify-content-evenly p-1">

                                    <div class="d-flex align-items-center   justify-content-center">
                                    
                                    <img class="roundImage img-fluid rounded-circle mx-1" src="${element.author.img}" alt="">
                                    <p>${element.author.name ? element.author.name : 'No author found'}</p>
                                    </div>
                                    
                                    <div class="d-flex align-items-center justify-content-center">
                                    <p class="mx-1"><i class="fa-regular fa-eye"></i></p>
                                    <p>${element.total_view ? element.total_view : 0}</p>
                                    </div>
                                    <button class="btn btn-primary" onclick="loadNewsDetails('${element._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i></button>

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        cardContainer.appendChild(cardDiv);

    });
    console.log(data);
    toggleSpinner(false);
}

const loadNewsDetails = async (newsId) => {
    url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }

    // console.log(url);

}

const displayNewsDetails = (data) => {
    console.log(data);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = data.title;

    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img src="${data.image_url}" class="img-fluid  rounded-start" alt="...">
    <p class="mt-1 text-wrap">${data.details}</p>
                                
    <div class="d-flex justify-content-evenly p-1">

        <div class="d-flex align-items-center   justify-content-center">
        
        <img class="roundImage img-fluid rounded-circle mx-1" src="${data.author.img}" alt="">
        <p>${data.author.name ? data.author.name : 'No author found'}</p>
        </div>
        
        <div class="d-flex align-items-center justify-content-center">
        <p class="mx-1"><i class="fa-regular fa-eye"></i></p>
        <p>${data.total_view ? data.total_view : 0}</p>
        </div>

       
    </div>
    `;
    // const phoneDetails = document.getElementById('phone-details');
    // phoneDetails.innerHTML = `
    // <p>Released Date: ${phnDetails.releaseDate}</p>
    // `;
    // console.log(phnDetails);

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');

    }
}

navMenu();