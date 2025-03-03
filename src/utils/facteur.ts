interface Item {
    description: string;
    pre: string;
    quantity?: number;
}

interface LaborItem {
    nbTech: number;
    nbHours: number;
    weekend: number;
    pre: number;
}

const items: Item[] = [
    { description: 'ACETYLENE', pre: '' },
    { description: 'ANTI ROUILLE', pre: '' },
    { description: 'AZOTE', pre: '' },
    { description: 'BAGUETTE EN ARGENT', pre: '0.73' },
    { description: 'BANDE ADHESIVE ALU', pre: '14.35' },
    { description: 'BANDE ARMAFLEX', pre: '' },
    { description: 'BANDE VINYLE', pre: '1.85' },
    { description: 'BUTANE 400G', pre: '12.29' },
    { description: 'CABLE RIGIDE 3x2.5', pre: '1.81' },
    { description: 'CABLE SOUPLE 3x2.5', pre: '' },
    { description: 'COLLE ARMAFLEX', pre: '35.31' },
    { description: 'COLLE EPATEX', pre: '7.45' },
    { description: 'COUDE PVC 32MM', pre: '0.94' },
    { description: 'DILUANT', pre: '' },
    { description: 'DISJONCTEUR ELECTRONIK', pre: '64.83' },
    { description: 'FEUILLE ARMAFLEX 19', pre: '25.27' },
    { description: 'FEUILLE ARMAFLEX 25', pre: '81.37' },
    { description: 'FEUILLE ARMAFLEX 32', pre: '84.24' },
    { description: 'FILTRE DESHYDRATEUR 1/2', pre: '' },
    { description: 'FILTRE DESHYDRATEUR 3/8', pre: '32.88' },
    { description: 'FILTRE DESHYDRATEUR 5/8', pre: '' },
    { description: 'FREON R134', pre: '10.09' },
    { description: 'FREON R22', pre: '7.07' },
    { description: 'FREON R404A', pre: '12.37' },
    { description: 'FREON R407', pre: '12.96' },
    { description: 'FREON R410A', pre: '11.35' },
    { description: 'GOULOTTE', pre: '' },
    { description: 'GOULOTTE MOSAIQUE', pre: '' },
    { description: 'LAINE DE VERRE', pre: '33.76' },
    { description: 'MANCHON PVC 32MM', pre: '' },
    { description: 'OXYGENE', pre: '' },
    { description: 'SPLIT 12000BTU', pre: '362.33' },
    { description: 'SPLIT 18000BTU', pre: '523.69' },
    { description: 'SPLIT 24000BTU', pre: '651.74' },
    { description: 'SUPPORT CONDENSEUR', pre: '16.86' },
    { description: 'SUPPORT MURAL 3/24', pre: '' },
    { description: 'THINNER', pre: '' },
    { description: 'TOLE GALVA 0.6', pre: '' },
    { description: 'TOLE GALVA 0.8', pre: '32.33' },
    { description: 'TUBE ARMAFLEX MT14', pre: '62.43' },
    { description: 'TUBE ARMAFLEX MT22', pre: '11.71' },
    { description: 'TUBE ARMAFLEX M28', pre: '11.35' },
    { description: 'TUBE ARMAFLEX M32', pre: '103.58' },
    { description: 'TUBE ARMAFLEX M35', pre: '17.11' },
    { description: 'TUBE ARMAFLEX M42', pre: '19.93' },
    { description: 'TUBE ARMAFLEX M48', pre: '25.5' },
    { description: 'TUBE ARMAFLEX M76', pre: '41.45' },
    { description: 'TUBE ARMAFLEX M89', pre: '23.19' },
    { description: 'TUBE CUIVRE 1/2', pre: '8.93' },
    { description: 'TUBING 3/8', pre: '5.44' }
];

let selectedItems: Item[] = [];
let laborItems: LaborItem[] = [];
let txChg = 1.15;
let txMarge = 0.75;
let moTxChg = 1.2;
let moTxMarge = 0.8;

export const populateDropdown = () => {
    const select = document.getElementById('item-select') as HTMLSelectElement;
    if (!select) return;

    select.innerHTML = '<option value="">Sélectionner un article</option><option value="custom">+ Ajouter un nouvel article</option>';

    items.sort((a, b) => a.description.localeCompare(b.description)).forEach(item => {
        const option = document.createElement('option');
        option.value = item.description;
        option.textContent = item.description;
        select.appendChild(option);
    });

    // Hide custom form when changing selection
    select.addEventListener('change', function() {
        const customForm = document.getElementById('custom-item-form');
        if (customForm) {
            customForm.style.display = this.value === 'custom' ? 'block' : 'none';
        }
    });
};

export const calculatePVS = (pre: string) => {
    if (!pre || pre === '') return '';
    const prs = parseFloat(pre) * txChg;
    const pvus = prs / txMarge;
    return pvus.toFixed(2);
};

export const calculateMOPVS = (pre: number, weekend = 1, nbTech = 1, nbHours = 1) => {
    if (!pre) return '';
    const weekendMultiplier = parseFloat(weekend.toString());
    const prs = pre * nbTech * nbHours * weekendMultiplier * moTxChg;
    const pvs = prs / moTxMarge;
    return pvs.toFixed(2);
};

export const addSelectedItem = () => {
    const select = document.getElementById('item-select') as HTMLSelectElement;
    const selectedDescription = select.value;

    if (selectedDescription === 'custom') {
        const customForm = document.getElementById('custom-item-form');
        if (customForm) {
            customForm.style.display = 'block';
        }
        select.value = '';
        return;
    }

    if (!selectedDescription) {
        alert('Veuillez sélectionner un article');
        return;
    }

    const quantityInput = document.getElementById('item-quantity') as HTMLInputElement;
    const quantity = parseInt(quantityInput.value) || 1;

    const item = items.find(i => i.description === selectedDescription);
    if (item) {
        const existingItem = selectedItems.find(i => i.description === selectedDescription);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 0) + quantity;
        } else {
            selectedItems.push({ ...item, quantity });
        }
        updateTable();
        select.value = '';
        quantityInput.value = '1';
        const customForm = document.getElementById('custom-item-form');
        if (customForm) {
            customForm.style.display = 'none';
        }
    }
};

export const addCustomItem = () => {
    const description = (document.getElementById('custom-description') as HTMLInputElement).value;
    const pre = (document.getElementById('custom-pre') as HTMLInputElement).value;

    if (!description || !pre) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const newItem = { description, pre };
    items.push(newItem);
    selectedItems.push({ ...newItem, quantity: 1 });

    // Reset form
    (document.getElementById('custom-description') as HTMLInputElement).value = '';
    (document.getElementById('custom-pre') as HTMLInputElement).value = '';
    const customForm = document.getElementById('custom-item-form');
    if (customForm) {
        customForm.style.display = 'none';
    }

    // Update everything
    populateDropdown();
    updateTable();
};

export const addLabor = () => {
    const nbTech = parseInt((document.getElementById('mo-nb-tech') as HTMLInputElement).value) || 1;
    const nbHours = parseInt((document.getElementById('mo-nb-hours') as HTMLInputElement).value) || 1;
    const weekend = parseFloat((document.getElementById('mo-weekend') as HTMLSelectElement).value);
    const pre = parseFloat((document.getElementById('mo-pre') as HTMLInputElement).value) || 10;

    laborItems.push({ nbTech, nbHours, weekend, pre });
    updateLaborTable();
};

export const updateTable = () => {
    const tbody = document.querySelector('#fournitures-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    selectedItems.forEach(item => {
        const row = document.createElement('tr');
        const prs = item.pre ? (parseFloat(item.pre) * txChg).toFixed(2) : '';
        const pvus = calculatePVS(item.pre);
        const pvsTotal = pvus && item.quantity ? (parseFloat(pvus) * item.quantity).toFixed(2) : '';

        row.innerHTML = `
            <td>${item.description}</td>
            <td style="text-align: right;">${item.quantity}</td>
            <td>
                <input type="number" step="0.01" value="${item.pre}"
                    onchange="updateItemPrice('${item.description}', this.value)"
                    style="width: 80px; padding: 4px;">
            </td>
            <td style="text-align: right;">${prs}</td>
            <td style="text-align: right;">${pvus}</td>
            <td style="text-align: right;">${pvsTotal}</td>
            <td>
                <button onclick="removeItem('${item.description}')"
                    style="padding: 2px 5px; background-color: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer;">
                    X
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    calculateTotals();
};

export const updateLaborTable = () => {
    const tbody = document.querySelector('#labor-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    laborItems.forEach((item, index) => {
        const row = document.createElement('tr');
        const weekendText = item.weekend === 1.6 ? 'Weekend' : 'Normal';
        const prs = (item.pre * item.nbTech * item.nbHours * item.weekend * moTxChg).toFixed(2);
        const pvsTotal = calculateMOPVS(item.pre, item.weekend, item.nbTech, item.nbHours);

        row.innerHTML = `
            <td style="text-align: right;">${item.nbTech}</td>
            <td style="text-align: right;">${item.nbHours}</td>
            <td style="text-align: center;">${weekendText}</td>
            <td style="text-align: right;">${item.pre}</td>
            <td style="text-align: right;">${prs}</td>
            <td style="text-align: right;">${pvsTotal}</td>
            <td>
                <button onclick="removeLaborItem(${index})"
                    style="padding: 2px 5px; background-color: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer;">
                    X
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    calculateTotals();
};

export const updateItemPrice = (description: string, newPrice: string) => {
    const item = selectedItems.find(i => i.description === description);
    if (item) {
        item.pre = newPrice;
        updateTable();
    }
};

export const removeItem = (description: string) => {
    selectedItems = selectedItems.filter(item => item.description !== description);
    updateTable();
};

export const removeLaborItem = (index: number) => {
    laborItems.splice(index, 1);
    updateLaborTable();
};

export const calculateTotals = () => {
    let totalHT = 0;
    let totalMO = 0;

    // Calculate total HT from items
    selectedItems.forEach(item => {
        if (item.pre && item.pre !== '') {
            const pvus = parseFloat(calculatePVS(item.pre));
            const quantity = parseInt(item.quantity?.toString() || '0');
            if (!isNaN(pvus) && !isNaN(quantity)) {
                totalHT += pvus * quantity;
            }
        }
    });

    // Calculate total MO
    laborItems.forEach(item => {
        const pvs = parseFloat(calculateMOPVS(item.pre, item.weekend, item.nbTech, item.nbHours));
        if (!isNaN(pvs)) {
            totalMO += pvs;
        }
    });

    const totalOffreHT = totalHT + totalMO;
    const tva = totalOffreHT * 0.16;
    const totalTTC = totalOffreHT + tva;

    // Update all total displays
    updateElementText('total-fournitures', totalOffreHT.toFixed(2));
    updateElementText('table-total-fournitures', totalHT.toFixed(2));
    updateElementText('tva', tva.toFixed(2));
    updateElementText('total-ttc', totalTTC.toFixed(2));
    updateElementText('total-mo', totalMO.toFixed(2));
    updateElementText('table-total-mo', totalMO.toFixed(2));
    updateElementText('total-general', totalTTC.toFixed(2));
};

const updateElementText = (id: string, value: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
};

export const updateRatesAndRecalculate = () => {
    // Update rates from inputs
    const txChgInput = document.getElementById('tx-chg') as HTMLInputElement;
    const txMargeInput = document.getElementById('tx-marge') as HTMLInputElement;
    const moTxChgInput = document.getElementById('mo-tx-chg') as HTMLInputElement;
    const moTxMargeInput = document.getElementById('mo-tx-marge') as HTMLInputElement;

    txChg = parseFloat(txChgInput?.value) || 1.15;
    txMarge = parseFloat(txMargeInput?.value) || 0.75;
    moTxChg = parseFloat(moTxChgInput?.value) || 1.2;
    moTxMarge = parseFloat(moTxMargeInput?.value) || 0.8;

    // Update tables with new rates
    updateTable();
    updateLaborTable();
};

export const prepareAndPrint = () => {
    // Hide action columns in both tables
    const tables = ['fournitures-table', 'labor-table'];
    tables.forEach(tableId => {
        const table = document.getElementById(tableId);
        if (!table) return;

        const rows = table.getElementsByTagName('tr');

        // Hide the last header cell (Actions column)
        if (rows[0]) {
            const headerCells = rows[0].getElementsByTagName('th');
            if (headerCells.length > 0) {
                headerCells[headerCells.length - 1].classList.add('hidden-for-print');
            }
        }

        // Hide the last cell in each data row
        for (let i = 1; i < rows.length - 1; i++) {
            const cells = rows[i].getElementsByTagName('td');
            if (cells.length > 0) {
                cells[cells.length - 1].classList.add('hidden-for-print');
            }
        }
    });

    // Hide the add item sections
    document.querySelectorAll('.add-item-section').forEach(section => {
        section.classList.add('hidden-for-print');
    });

    // Hide the custom item form if it's visible
    const customForm = document.getElementById('custom-item-form');
    if (customForm) {
        customForm.classList.add('hidden-for-print');
    }

    // Hide the Ready button itself
    const readyButton = document.getElementById('ready-button');
    if (readyButton) {
        readyButton.classList.add('hidden-for-print');
    }

    // Trigger print dialog after a short delay to ensure styles are applied
    setTimeout(() => {
        window.print();

        // After printing, show everything again
        document.querySelectorAll('.hidden-for-print').forEach(element => {
            element.classList.remove('hidden-for-print');
        });
    }, 100);
};