import React, { useEffect } from 'react';
import './Facteur.css';
import {
  populateDropdown,
  addSelectedItem,
  addCustomItem,
  addLabor,
  updateRatesAndRecalculate,
  prepareAndPrint
} from '../utils/facteur';

declare global {
  interface Window {
    populateDropdown: typeof populateDropdown;
    addSelectedItem: typeof addSelectedItem;
    addCustomItem: typeof addCustomItem;
    addLabor: typeof addLabor;
    updateRatesAndRecalculate: typeof updateRatesAndRecalculate;
    prepareAndPrint: typeof prepareAndPrint;
  }
}

// Add functions to window object
window.populateDropdown = populateDropdown;
window.addSelectedItem = addSelectedItem;
window.addCustomItem = addCustomItem;
window.addLabor = addLabor;
window.updateRatesAndRecalculate = updateRatesAndRecalculate;
window.prepareAndPrint = prepareAndPrint;

const Facteur: React.FC = () => {
  useEffect(() => {
    // Initialize the page when component mounts
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize page functionality
    const initializePage = () => {
      populateDropdown();
      // Set default date to today
      const dateInput = document.getElementById('date-input') as HTMLInputElement;
      if (dateInput) {
        dateInput.valueAsDate = new Date();
      }
    };

    // Wait for script to load before initializing
    script.onload = initializePage;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="facteur-container">
      <button id="ready-button" onClick={prepareAndPrint}>Ready</button>
      <div className="header">
        <h1>CALCUL DE PRIX OFFRE CLIMATISATION</h1>
      </div>

      <div className="info-section">
        <div className="info-grid">
          <div className="info-label">CLIENT:</div>
          <div className="info-value">
            <input type="text" id="client-input" placeholder="Nom du client" />
          </div>
          <div className="info-label">SITE:</div>
          <div className="info-value">
            <input type="text" id="site-input" placeholder="Adresse du site" />
          </div>
          <div className="info-label">OBJET:</div>
          <div className="info-value">
            <input type="text" id="object-input" placeholder="Objet de l'intervention" />
          </div>
          <div className="info-label">DATE:</div>
          <div className="info-value">
            <input type="date" id="date-input" />
          </div>
        </div>
      </div>

      <table className="total-table">
        <tbody>
          <tr>
            <td>TOTAL OFFRE USD HT:</td>
            <td><span id="total-fournitures">-</span></td>
          </tr>
          <tr>
            <td>TVA:</td>
            <td><span id="tva">-</span></td>
          </tr>
          <tr>
            <td>TOTAL OFFRE USD TTC:</td>
            <td><span id="total-ttc">-</span></td>
          </tr>
        </tbody>
      </table>

      <div className="add-item-section">
        <h3>Ajouter un article</h3>
        <div className="add-item-controls">
          <select id="item-select">
            <option value="">Sélectionner un article</option>
            <option value="custom">+ Ajouter un nouvel article</option>
          </select>
          <input
            type="number"
            id="item-quantity"
            defaultValue={1}
            min={1}
            placeholder="Quantité"
          />
          <button onClick={addSelectedItem}>Ajouter</button>
        </div>
      </div>

      <div id="custom-item-form" style={{ display: 'none' }}>
        <h3>Nouvel Article</h3>
        <div className="custom-item-grid">
          <div>
            <label>Description:</label>
            <input type="text" id="custom-description" />
          </div>
          <div>
            <label>PR £:</label>
            <input type="number" id="custom-pre" step="0.01" />
          </div>
          <button onClick={addCustomItem}>Ajouter l'article</button>
        </div>
      </div>

      <h2>FOURNITURES</h2>

      <div className="rates-section">
        <div className="rate-item">
          <span>Tx de chg:</span>
          <input
            type="number"
            id="tx-chg"
            defaultValue={1.15}
            step="0.01"
            onChange={updateRatesAndRecalculate}
          />
        </div>
        <div className="rate-item">
          <span>Tx de marge:</span>
          <input
            type="number"
            id="tx-marge"
            defaultValue={0.75}
            step="0.01"
            onChange={updateRatesAndRecalculate}
          />
        </div>
      </div>

      <table id="fournitures-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qté</th>
            <th>PR €</th>
            <th>PR $</th>
            <th>PV/u $</th>
            <th>PV $ Total HT</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>TOTAL FOURNITURE $ HT:</td>
            <td id="table-total-fournitures">-</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <h2>MAIN D'OEUVRE</h2>
      <p>
        Chef main d'oeuvre (en Arrêt de la machine, découpage de l'ancienne isolation,
        fourniture, et pose de la nouvelle isolation, séchage et remise en service)
      </p>

      <div className="rates-section">
        <div className="rate-item">
          <span>Tx de chg:</span>
          <input
            type="number"
            id="mo-tx-chg"
            defaultValue={1.2}
            step="0.01"
            onChange={updateRatesAndRecalculate}
          />
        </div>
        <div className="rate-item">
          <span>Tx de marge:</span>
          <input
            type="number"
            id="mo-tx-marge"
            defaultValue={0.8}
            step="0.01"
            onChange={updateRatesAndRecalculate}
          />
        </div>
      </div>

      <div className="add-item-section">
        <h3>Ajouter Main d'oeuvre</h3>
        <div className="labor-controls">
          <input
            type="number"
            id="mo-nb-tech"
            defaultValue={1}
            min={1}
            placeholder="Nb technicien"
          />
          <input
            type="number"
            id="mo-nb-hours"
            defaultValue={1}
            min={1}
            placeholder="Nb heures"
          />
          <select id="mo-weekend">
            <option value="1">1</option>
            <option value="1.6">1.6</option>
          </select>
          <input
            type="number"
            id="mo-pre"
            defaultValue={10.0}
            step="0.01"
            placeholder="PRÉ"
          />
          <button onClick={addLabor}>Ajouter</button>
        </div>
      </div>

      <table id="labor-table">
        <thead>
          <tr>
            <th>Nb technicien</th>
            <th>Nb heures</th>
            <th>Majo Weekend</th>
            <th>PR €</th>
            <th>PR $</th>
            <th>PV/u $</th>
            <th>PV $ Total HT</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>TOTAL MO $ HT:</td>
            <td id="table-total-mo">-</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div className="total-section">
        <div>TOTAL MO $ HT: <span id="total-mo">-</span></div>
      </div>

      <div className="total-section total-general">
        <div>
          TOTAL GENERAL: <span id="total-general">-</span>
        </div>
      </div>
    </div>
  );
};

export default Facteur;