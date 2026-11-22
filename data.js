export const itemList = {
    cpu: [
        { id: 1, name: "AMD Ryzen 9 7950X", specs: "16 cores, 32 threads, 4.5GHz base, 5.7GHz boost", price: 699.99, image: "cpu1.png" },
        { id: 2, name: "Intel Core i9-13900K", specs: "24 cores, 32 threads, 3.0GHz base, 5.8GHz boost", price: 589.99, image: "cpu2.png" },
        { id: 3, name: "AMD Ryzen 7 7700X", specs: "8 cores, 16 threads, 4.5GHz base, 5.4GHz boost", price: 399.99, image: "cpu3.png" },
        { id: 4, name: "Intel Core i5-13600K", specs: "14 cores, 20 threads, 3.5GHz base, 5.1GHz boost", price: 319.99, image: "cpu4.png" }
    ],
    gpu: [
        { id: 5, name: "NVIDIA GeForce RTX 4090", specs: "24GB GDDR6X, 16384 CUDA cores, 2.52GHz boost", price: 1599.99, image: "gpu1.png" },
        { id: 6, name: "AMD Radeon RX 7900 XTX", specs: "24GB GDDR6, 6144 stream processors, 2.5GHz boost", price: 999.99, image: "gpu2.png" },
        { id: 7, name: "NVIDIA GeForce RTX 4070 Ti", specs: "12GB GDDR6X, 7680 CUDA cores, 2.61GHz boost", price: 799.99, image: "gpu3.png" },
        { id: 8, name: "AMD Radeon RX 7800 XT", specs: "16GB GDDR6, 3840 stream processors, 2.43GHz boost", price: 649.99, image: "gpu4.png" }
    ],
    motherboard: [
        { id: 9, name: "ASUS ROG Strix Z790-E", specs: "Intel Z790, LGA 1700, DDR5, Wi-Fi 6E, PCIe 5.0", price: 449.99, image: "motherboard1.png" },
        { id: 10, name: "Gigabyte X670E AORUS Master", specs: "AMD X670, AM5, DDR5, Wi-Fi 6E, PCIe 5.0", price: 499.99, image: "motherboard2.png" },
        { id: 11, name: "MSI MPG B650 Carbon WiFi", specs: "AMD B650, AM5, DDR5, Wi-Fi 6E, PCIe 4.0", price: 299.99, image: "motherboard3.png" },
        { id: 12, name: "ASRock B760 Steel Legend", specs: "Intel B760, LGA 1700, DDR5, Wi-Fi 6, PCIe 4.0", price: 189.99, image: "motherboard4.png" }
    ],
    ram: [
        { id: 13, name: "Corsair Dominator Platinum RGB 64GB", specs: "DDR5-6400, CL32, 2x32GB, RGB lighting", price: 329.99, image: "ram1.png" },
        { id: 14, name: "G.Skill Trident Z5 Neo 32GB", specs: "DDR5-6000, CL30, 2x16GB, optimized for AMD", price: 149.99, image: "ram2.png" },
        { id: 15, name: "Kingston Fury Beast 32GB", specs: "DDR5-5600, CL36, 2x16GB, low-profile design", price: 119.99, image: "ram3.png" },
        { id: 16, name: "TeamGroup T-Force Delta RGB 16GB", specs: "DDR5-6000, CL38, 2x8GB, RGB lighting", price: 79.99, image: "ram4.png" }
    ],
    psu: [
        { id: 17, name: "Corsair HX1500i", specs: "1500W, 80+ Platinum, fully modular, 10-year warranty", price: 399.99, image: "psu1.png" },
        { id: 18, name: "Seasonic Prime TX-1000", specs: "1000W, 80+ Titanium, fully modular, 12-year warranty", price: 329.99, image: "psu2.png" },
        { id: 19, name: "EVGA SuperNOVA 850 G6", specs: "850W, 80+ Gold, fully modular, 10-year warranty", price: 159.99, image: "psu3.png" },
        { id: 20, name: "Cooler Master MWE Gold 750", specs: "750W, 80+ Gold, fully modular, 10-year warranty", price: 119.99, image: "psu4.png" }
    ],
    storage: [
        { id: 21, name: "Samsung 990 Pro 2TB", specs: "PCIe 4.0 NVMe, read 7450MB/s, write 6900MB/s", price: 179.99, image: "storage1.png" },
        { id: 22, name: "WD Black SN850X 2TB", specs: "PCIe 4.0 NVMe, read 7300MB/s, write 6600MB/s", price: 159.99, image: "storage2.png" },
        { id: 23, name: "Crucial P5 Plus 1TB", specs: "PCIe 4.0 NVMe, read 6600MB/s, write 5000MB/s", price: 89.99, image: "storage3.png" },
        { id: 24, name: "Seagate BarraCuda 4TB", specs: "HDD, 5400 RPM, 256MB cache, SATA 6Gb/s", price: 79.99, image: "storage4.png" }
    ]
};



// Data pre kategorie + ikony z Font Awesome
export const pcPartData = {
    cpu: {
        displayName: "CPU (Processor)",
        description: "Central Processing Unit - The brain of your computer",
        iconClass: "fas fa-microchip", 
        collapseId: "cpuCollapse"
    },
    gpu: {
        displayName: "GPU (Graphics Card)",
        description: "Graphics Processing Unit - Handles visual output and gaming performance",
        iconClass: "fas fa-gamepad",
        collapseId: "gpuCollapse"
    },
    motherboard: {
        displayName: "Motherboard",
        description: "Main circuit board connecting all components",
        iconClass: "fas fa-project-diagram",
        collapseId: "motherboardCollapse"
    },
    ram: {
        displayName: "RAM (Memory)",
        description: "Random Access Memory - Temporary data storage for active tasks",
        iconClass: "fas fa-memory",
        collapseId: "ramCollapse"
    },
    psu: {
        displayName: "PSU (Power Supply)",
        description: "Power Supply Unit - Provides power to all components",
        iconClass: "fas fa-plug",
        collapseId: "psuCollapse"
    },
    storage: {
        displayName: "Storage (SSD/HDD)",
        description: "Long-term storage for your operating system, files, and applications",
        iconClass: "fas fa-hdd",
        collapseId: "storageCollapse"
    }
};


// Funkcia na zlúčenie vlastných častí do itemList
function mergeCustomParts(source) {
    if (!source || !source.customParts) return;
    const types = ['cpu', 'gpu', 'motherboard', 'ram', 'psu', 'storage'];
    types.forEach(t => {
        if (Array.isArray(source.customParts[t])) {
            const existingIds = new Set(itemList[t].map(p => p.id));
            source.customParts[t].forEach(p => {
                if (!existingIds.has(p.id)) itemList[t].push(p);
            });
        }
    });
}

// Načítanie vlastných častí z localStorage
export function loadCustomParts() {
    try {
        const localTxt = localStorage.getItem('customPartsTxt');
        if (localTxt) {
            const parsed = JSON.parse(localTxt);
            mergeCustomParts(parsed);
        }
    } catch (e) {
        // ignore parse errors
    }
}