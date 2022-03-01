// get error messages
const emptyError = document.getElementById('empty-error');
const resultError = document.getElementById('result-error');

// get element for display result function
const resultContainer = document.getElementById('result-container');

// get elements for mobile details function
const mobileDetails = document.getElementById('mobile-details');
const mobileImage = document.getElementById('mobile-image');
const mobileName = document.getElementById('mobile-name');
const detailsText = document.getElementById('details-text');

// search mobile function
const searchMobile = () => {
    // get search text
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;

    // empty search box
    searchBox.value = '';

    // check error case
    if (searchText == '') {
        // display search box empty error
        emptyError.style.display = 'block';
        resultError.style.display = 'none';
        resultContainer.style.display = 'none';
    }
    else {
        emptyError.style.display = 'none';
        resultError.style.display = 'none';
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data));
    }
}

// display result function 
const displayResult = result => {
    const dataStatus = result.status;
    const mobiles = result.data;
    if (dataStatus == true) {
        resultContainer.style.display = 'flex';
        mobiles.forEach(mobile => {

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 rounded-3">
                    <div class="d-flex justify-content-center pt-3">
                        <img src="${mobile.image}" alt="${mobile.phone_name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${mobile.phone_name}</h5>
                        <p class="card-text">by ${mobile.brand}</p>
                    </div>
                    <div class="card-footer green-bg">
                        <button onclick="loadDetails('${mobile.slug}')" class="btn btn-light px-4 py-1 rounded-3 font-roboto fw-medium">Details</button>
                    </div>
                </div>
            `
            resultContainer.appendChild(div);
        })
    }

    else {
        // display no result found error
        resultError.style.display = 'block';
        resultContainer.style.display = 'none';
    }
}

// load mobile details function
const loadDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

// get element


// display mobile details function
const displayDetails = mobile => {

    mobileDetails.style.display = 'block';
    mobileImage.src = `${mobile.image}`
    mobileName.innerText = `${mobile.name}`;
    detailsText.innerHTML = `
        <ul>
            <li>Release Date : ${mobile.releaseDate ? mobile.releaseDate : 'Unknown'}</li>
            <li>Features : 
                <ul>
                    <li>Chipset : ${mobile.mainFeatures.chipSet}</li>
                    <li>Display Size : ${mobile.mainFeatures.displaySize}</li>
                    <li>Memory : ${mobile.mainFeatures.memory}</li>
                    <li>Storage : ${mobile.mainFeatures.storage}</li>
                </ul>
            </li>
        </ul>
    `
}

// close button function
const closeDetails = () => {
    mobileDetails.style.display = 'none';
}