import { pcPartData } from './data.js';

function formatPrice(price) {
    return `€${price.toFixed(2)}`;
}

function renderSummary() {
    const build = JSON.parse(localStorage.getItem('currentBuild')) || {};

    const summaryContainer = document.getElementById('summary-list');
    const totalPriceElement = document.getElementById('summary-total-price');

    let totalPrice = 0;
    let summaryHTML = '';

    for (const partKey in pcPartData) {
        const part = build[partKey];
        if (part) {
            totalPrice += part.price;
            const category = pcPartData[partKey]?.displayName || partKey;
            summaryHTML += `
                <div class="build-item d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                        <div class="fw-bold">${category}</div>
                        <div class="small">${part.name}</div>
                    </div>
                    <div class="text-success fw-bold">${formatPrice(part.price)}</div>
                </div>
            `;
        }
    }

    if (!summaryHTML) {
        summaryHTML = `
            <div class="empty-build text-center py-4">
                <i class="fas fa-computer fa-2x mb-2"></i>
                <p>No build data found.<br>Please select your components first.</p>
            </div>
        `;
    }

    if (summaryContainer) summaryContainer.innerHTML = summaryHTML;
    if (totalPriceElement) totalPriceElement.textContent = formatPrice(totalPrice);

    // Aktualizácia celkovej ceny v hlavičke
    const headerTargets = document.querySelectorAll('.total-price-display, #top-total-price');
    if (headerTargets.length) {
        headerTargets.forEach(el => el.textContent = formatPrice(totalPrice));
    } else {
        // Vytvorenie a zobrazenie banneru s celkovou cenou, ak neexistuje žiadny cieľ v hlavičke
        let banner = document.getElementById('summary-top-total');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'summary-top-total';
            banner.style.cssText = 'position:sticky;top:0;z-index:999;padding:8px 12px;background:#111;border-bottom:1px solid #2b2b2b;color:#fff;text-align:right;font-weight:600;';
            document.body.insertBefore(banner, document.body.firstChild);
        }
        banner.textContent = `Total: ${formatPrice(totalPrice)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    window.addEventListener('storage', (e) => {
        if (e.key === 'currentBuild') renderSummary();
    });
});
