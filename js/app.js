// search mobile function
const searchMobile = () => {
    // get search text
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;

    // empty search box
    searchBox.value = '';

    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data));
}

// display result function 
const displayResult = result => {
    const dataStatus = result.status;
    const mobiles = result.data;
    if (dataStatus == true) {

        const resultContainer = document.getElementById('result-container');
        mobiles.forEach(mobile => {
            console.log(mobile);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 rounded-3">
                    <div class="d-flex justify-content-center pt-3">
                        <img src="${mobile.image}" alt="${mobile.phone_name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${mobile.phone_name}</h5>
                        <p class="card-text">${mobile.brand}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            `
            resultContainer.appendChild(div);
        })
    }
    else {
        console.log(11);
    }
}