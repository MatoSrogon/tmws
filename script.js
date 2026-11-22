import { itemList } from './data.js';
import { pcPartData } from './data.js';
import { loadCustomParts } from './data.js';

// suciastky nastavene na null
let currentBuild = {
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    psu: null,
    storage: null
};


const partsRolldown = document.getElementById('partsRolldown');
const buildList = document.getElementById('build-list');
const totalPriceElement = document.getElementById('total-price');
const headerTotalPrice = document.querySelector('.total-price-display');
const clearBuildButton = document.getElementById('clear-build');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchList = document.getElementById('searchList');

// nacitanie ulozenej zostavy z localStorage
const savedBuild = JSON.parse(localStorage.getItem('currentBuild'));
if (savedBuild) {
    for (const key in currentBuild) {
        if (savedBuild[key]) {
            currentBuild[key] = savedBuild[key];
        }
    }
}

// nacitanie vlastnych suciastok z localStorage
loadCustomParts();

generateCategoryRolldowns();
updateBuild();


// Otvorenie prveho rolldownu na stranke
// setTimeout(() => {
//     const firstRolldown = document.querySelector('.rolldown-button');
//     if (firstRolldown) {
//         firstRolldown.classList.remove('collapsed');
//         firstRolldown.setAttribute('aria-expanded', 'true');
//         const firstCollapse = document.querySelector('.rolldown-collapse');
//         if (firstCollapse) {
//             firstCollapse.classList.add('show');
//         }
//     }
// }, 100);

function generateCategoryRolldowns() {
    partsRolldown.innerHTML = '';
    

    // pre kazdu kategoriiu vytvor rolldown sekciu a dynamicky pridel hodnoty
    for (const pcPartDataItem in pcPartData) {
        const itemData = pcPartData[pcPartDataItem];

        const rolldownItem = document.createElement('div');
        rolldownItem.className = 'part-pcPartDataItem';
        rolldownItem.innerHTML = `
            <div class="rolldown-header rolldown-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${itemData.collapseId}">
                <div class="d-flex align-items-center">
                    <div class="part-icon">
                        <i class="${itemData.iconClass}"></i>
                    </div>
                    <div>
                        <h3 class="h5 mb-1">${itemData.displayName}</h3>
                        <p class="mb-0">${itemData.description}</p>
                    </div>
                </div>
                <i class="fas fa-chevron-down rolldown-icon"></i>
            </div>
            <!-- automaticke skrytie ked je stlacena ina kategoria -->
            <div id="${itemData.collapseId}" class="rolldown-collapse collapse" data-bs-parent="#partsRolldown">
                <div class="products-grid row g-4" id="${pcPartDataItem}-products">
                </div>
            </div>
        `;
        
        partsRolldown.appendChild(rolldownItem);
        renderProductGrid(pcPartDataItem);
    }
}

// funkcia na vykreslenie produktov v danej kategórii
function renderProductGrid(pcPartDataItem) {
    const containerId = `${pcPartDataItem}-products`;
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.innerHTML = '';
    
    itemList[pcPartDataItem].forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-12 col-md-6 col-lg-4 mb-4';
        productCard.innerHTML = `
            <div class="card h-100 bg-dark text-light border-secondary">
                <div class="product-image card-img-top d-flex align-items-center justify-content-center bg-secondary bg-opacity-10" style="height: 180px;">
                    <img src="https://images.pexels.com/photos/2582935/pexels-photo-2582935.jpeg" alt="${product.name}" class="img-fluid" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="product-name card-title fw-semibold mb-2">${product.name}</div>
                    <div class="product-specs card-text mb-2 flex-grow-1">${product.specs}</div>
                    <div class="product-price fw-bold text-success mb-3">€${product.price.toFixed(2)}</div>
                    <button class="btn btn-outline-primary add-to-build mt-auto w-100" data-pcPartDataItem="${pcPartDataItem}" data-id="${product.id}">
                        <i class="fas fa-plus-circle me-1"></i> Add to Build
                    </button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    const addButtons = container.querySelectorAll('.add-to-build');
    addButtons.forEach(button => {
        const pcPartDataItem = button.getAttribute('data-pcPartDataItem');
        const id = parseInt(button.getAttribute('data-id'));

        // ked je polozka pridana, zmeni tlacitko na "Added" a vypne ho
        if (currentBuild[pcPartDataItem] && currentBuild[pcPartDataItem].id === id) {
            button.innerHTML = '<i class="fas fa-check me-1"></i> Added';
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-success');
            button.disabled = true;
        } else {
            button.innerHTML = '<i class="fas fa-plus-circle me-1"></i> Add to Build';
            button.classList.remove('btn-success');
            button.classList.add('btn-outline-primary');
            button.disabled = false;
        }
        button.addEventListener('click', function() {
            addToBuild(pcPartDataItem, id);
        });
    });
}

// pridanie polozky do zostavy
function addToBuild(pcPartDataItem, productId) {
    const product = itemList[pcPartDataItem].find(p => p.id === productId);
    if (product) {
        currentBuild[pcPartDataItem] = product;
        updateBuild();
        // ulozenie do localStorage
        localStorage.setItem('currentBuild', JSON.stringify(currentBuild));
        renderProductGrid(pcPartDataItem);
    }
}


// odstranenie vlastnej polozky zo zostavy
function removeFromBuild(pcPartDataItem) {
    currentBuild[pcPartDataItem] = null;
    updateBuild();
    localStorage.setItem('currentBuild', JSON.stringify(currentBuild));
    renderProductGrid(pcPartDataItem);
}

function updateBuild() {
    let totalPrice = 0;
    let hasItems = false;
    let buildHTML = '';
    

    // nastavenie vybranej plozky z kategorie
    for (const pcPartDataItem in currentBuild) {
        const product = currentBuild[pcPartDataItem];
        
        if (product) {
            hasItems = true;
            totalPrice += product.price;
            
            // Nazov polozky kategorie pouzitim itemData
            let categoryDisplay = pcPartData[pcPartDataItem]?.displayName || pcPartDataItem.charAt(0).toUpperCase() + pcPartDataItem.slice(1);
            
            buildHTML += `
                <div class="build-item">
                    <div>
                        <div class="fw-bold">${categoryDisplay}</div>
                        <div class="small">${product.name}</div>
                        <div class="small text-success fw-bold">€${product.price.toFixed(2)}</div>
                    </div>
                    <div class="remove-item" data-pcPartDataItem="${pcPartDataItem}">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
            `;
        }
    }
    
    // kontrola ci je zakliknuta aspon jedna polozka
    if (hasItems) {
        buildList.innerHTML = buildHTML;
        
        // event pre tlacitko na odstranenie polozky
        const removeButtons = buildList.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pcPartDataItem = this.getAttribute('data-pcPartDataItem');
                removeFromBuild(pcPartDataItem);
            });
        });
    } else { // ak nie je ziadna polozka pridana, zobraz prazdny stav
        buildList.innerHTML = `
            <div class="empty-build">
                <i class="fas fa-computer"></i>
                <p>Your build is empty.<br>Add components from the categories above.</p>
            </div>
        `;
    }
    
    // Kontrola ci su vsetky polozky vyplnene pre pokracovanie
    let buttondiv = document.getElementById('continueButton');
    if (buttondiv) buttondiv.innerHTML = '';
    let isFull = Object.values(currentBuild).every(value => value != null);
    if (isFull) {
        let continueButton = document.createElement('a');
        continueButton.href = 'druha.html';
        continueButton.className = 'btn btn-success btn-lg w-100 mt-3';
        continueButton.innerHTML = '<i class="fas fa-check-circle me-2"></i>Continue to Summary';
        
        continueButton.addEventListener('click', function() {
            localStorage.setItem('currentBuild', JSON.stringify(currentBuild));
        });
        buttondiv.appendChild(continueButton);
    }
    
    // vypocet celkovej ceny
    const formattedPrice = totalPrice.toFixed(2);
    totalPriceElement.textContent = `€${formattedPrice}`;
    headerTotalPrice.textContent = `€${formattedPrice}`;
}

// eventlistener pre tlacitko
document.getElementById('clear-build').addEventListener('click', clearBuild);

// tlacitko na odstranenie vsetkych poloziek
function clearBuild() {
    if (confirm("Are you sure you want to clear your build? This will remove all selected components.")) {
        currentBuild = {
            cpu: null,
            gpu: null,
            motherboard: null,
            ram: null,
            psu: null,
            storage: null
        };
        updateBuild();
        // odstranenie z localStorage po refreshnuti
        localStorage.removeItem('currentBuild');

        for (const pcPartDataItem in pcPartData) {
            renderProductGrid(pcPartDataItem);
        }
        
        // po stlaceni odstranit zostavu zobrazit potvrdenie
        const originalText = clearBuildButton.innerHTML;
        clearBuildButton.innerHTML = '<i class="fas fa-check me-2"></i>Build Cleared';
        clearBuildButton.classList.remove('btn-primary');
        clearBuildButton.classList.add('btn-success');
        
        setTimeout(() => {
            clearBuildButton.innerHTML = originalText;
            clearBuildButton.classList.remove('btn-success');
            clearBuildButton.classList.add('btn-primary');
        }, 2000);
    }
}

// vyhladavanie suciastok
searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        searchResults.style.display = 'none';
        return;
    }
    
    searchList.innerHTML = '';
    let found = false;
    
    // vyhľadávanie v itemList 
    for (const category in itemList) {
        itemList[category].forEach(product => {
            if (product.name.toLowerCase().includes(query) || 
                product.specs.toLowerCase().includes(query)) {
                found = true;
                const categoryDisplay = pcPartData[category]?.displayName || category;
                const resultItem = document.createElement('button');
                resultItem.type = 'button';
                resultItem.className = 'list-group-item list-group-item-action bg-dark text-light border-secondary';
                resultItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="text-start">
                            <div class="fw-bold">${product.name}</div>
                            <small class="text-muted">${categoryDisplay}</small>
                        </div>
                        <div class="text-success fw-bold">€${product.price.toFixed(2)}</div>
                    </div>
                `;
                resultItem.addEventListener('click', () => {
                    addToBuild(category, product.id);
                    searchInput.value = '';
                    searchResults.style.display = 'none';
                });
                searchList.appendChild(resultItem);
            }
        });
    }
    
    if (found) {
        searchResults.style.display = 'block';
    } else {
        searchList.innerHTML = '<div class="list-group-item bg-dark text-muted text-center py-3">No parts found</div>';
        searchResults.style.display = 'block';
    }
});

// vypnutie vysledkov vyhladavania po kliknuti mimo
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchResults.style.display = 'none';
    }
});

