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

// toggle spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('toggle-spinner').style.display = displayStyle;
}

// search mobile function
const searchMobile = () => {
    // get search text
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;

    // display spinner
    toggleSpinner('flex');

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

        // hide spinner
        toggleSpinner('none');
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

    // check error case
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
                    <div class="card-body d-flex flex-column align-items-md-start align-items-center">
                        <h5 class="card-title">${mobile.phone_name}</h5>
                        <p class="card-text">by ${mobile.brand}</p>
                    </div>
                    <div class="card-footer bg-white border-top-0 d-flex flex-column align-items-md-start align-items-center">
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

    // hide spinner
    toggleSpinner('none');
}

// load mobile details function
const loadDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

// display mobile details function
const displayDetails = mobile => {
    const { mainFeatures, others } = mobile;
    mobileDetails.style.display = 'block';
    mobileImage.src = `${mobile.image}`
    mobileName.innerText = `${mobile.name}`;
    detailsText.innerHTML = `
            <div class="d-flex mb-2 release-date flex-sm-row flex-column">
                <p class="fs-5 mb-0"><i class="fa-solid fa-arrow-right"></i> Release Date :</p>
                <p class="fs-5 mb-0">${mobile.releaseDate ? mobile.releaseDate.substring(9) : 'Unknown'}</p>
            </div>
            
            <div class="fs-5 table-responsive mb-2"><i class="fa-solid fa-arrow-right"></i> Main Features : 
                <div class="fs-6 mx-md-5 ms-1 me-3">
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">Chipset</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${mainFeatures?.chipSet ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">Display Size</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${mainFeatures?.displaySize ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">Memory</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${mainFeatures?.memory ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">Storage</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${mainFeatures?.storage ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">Sensor</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${mainFeatures?.sensors ?? 'Unknown'}</p>
                    </div>
                </div>
            </div>

            <div class="fs-5 table-responsive mb-2"><i class="fa-solid fa-arrow-right"></i> Other Features : 
                <div class="fs-6 mx-md-5 ms-1 me-3">
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">Bluetooth</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${others?.Bluetooth ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">GPS</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${others?.GPS ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">NFC</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${others?.NFC ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">Radio</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${others?.Radio ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">USB</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${others?.USB ?? 'Unknown'}</p>
                    </div>
                    <div class="row border-bottom">
                        <p class="fw-bold col-md-3 col-sm-4 col-12 m-0 p-sm-2 py-1">WLAN</p>
                        <p class="col-md-9 col-sm-8 col-12 m-0 p-sm-2 pb-1">${others?.WLAN ?? 'Unknown'}</p>
                    </div>
                </div>
            </div>
    `
    window.location.href = '#mobile-details';
}