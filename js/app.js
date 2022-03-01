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

    // clear search box
    searchBox.value = '';

    // clear result container
    resultContainer.textContent = '';

    // hide more details
    mobileDetails.style.display = 'none';

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
    const mobilesSliced = mobiles.slice(0, 20);
    if (dataStatus == true) {
        resultContainer.style.display = 'flex';
        mobilesSliced.forEach(mobile => {
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
                    <div class="card-footer bg-white border-top-0">
                        <button onclick="loadDetails('${mobile.slug}')" class="btn px-4 py-1 rounded-3 blue-bg text-white font-roboto fw-medium">Details</button>
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
    window.location.href = '#mobile-details';
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

// get element


// display mobile details function
const displayDetails = mobile => {
    const { mainFeatures, others } = mobile;
    console.log(mainFeatures);
    mobileDetails.style.display = 'block';
    mobileImage.src = `${mobile.image}`
    mobileName.innerText = `${mobile.name}`;
    detailsText.innerHTML = `
        <ul>
            <li class="fs-5">Release Date : ${mobile.releaseDate ? mobile.releaseDate : 'Unknown'}</li>
            <li class="fs-5">Main Features : 
                <table class="table caption-top fs-6">
                    <tbody>
                        <tr>
                            <th scope="row">Chipset</th>
                            <td>${mainFeatures?.chipSet ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Display Size</th>
                            <td>${mainFeatures?.displaySize ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Memory</th>
                            <td>${mainFeatures?.memory ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Storage</th>
                            <td>${mainFeatures?.storage ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Sensor</th>
                            <td>${mainFeatures?.sensors ?? 'Unknown'}</td>
                        </tr>
                    </tbody>
                </table>
            </li>
            <li class="fs-5">Other Features :
                <table class="table caption-top fs-6">
                    <tbody>
                        <tr>
                            <th scope="row">Bluetooth</th>
                            <td>${others?.Bluetooth ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">GPS</th>
                            <td>${others?.GPS ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">NFC</th>
                            <td>${others?.NFC ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Radio</th>
                            <td>${others?.Radio ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">USB</th>
                            <td>${others?.USB ?? 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th scope="row">WLAN</th>
                            <td>${others?.WLAN ?? 'Unknown'}</td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>
    `
}

// close button function
const closeDetails = () => {
    mobileDetails.style.display = 'none';
}