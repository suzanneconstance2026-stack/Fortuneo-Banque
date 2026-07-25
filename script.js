if (!localStorage.getItem('balance')) {
    localStorage.setItem('balance', '2500.00');
}

function updateDisplay() {
    const currentBalance = parseFloat(localStorage.getItem('balance'));
    document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function executeTransfer() {
    const beneficiary = document.getElementById('beneficiary').value;
    const amount = parseFloat(document.getElementById('amount-input').value);
    let currentBalance = parseFloat(localStorage.getItem('balance'));

    if (!beneficiary || isNaN(amount) || amount <= 0) {
        alert("Veuillez remplir correctement les champs.");
        return;
    }
    if (amount > currentBalance) {
        alert("Fonds insuffisants ! (Simulation de rejet Fortuneo)");
        return;
    }

    currentBalance -= amount;
    localStorage.setItem('balance', currentBalance.toString());

    const list = document.getElementById('transactions-list');
    const newItem = document.createElement('li');
    newItem.innerHTML = `<span>Virement vers ${beneficiary}</span> <span class="negative">-${amount.toFixed(2)} €</span>`;
    list.insertBefore(newItem, list.firstChild);

    updateDisplay();
    document.getElementById('beneficiary').value = '';
    document.getElementById('amount-input').value = '';
    /* Styles pour l'écran de connexion */
.login-container { max-width: 400px; margin: 60px auto; padding: 20px; text-align: center; }
.login-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.logout-btn { background: #ff3333 !important; width: auto !important; padding: 6px 12px !important; font-size: 0.8rem !important; margin-top: 10px; }
.logout-btn:hover { background: #cc0000 !important; }

    
    alert(`Simulation Fortuneo réussie : ${amount} € envoyés à ${beneficiary}.`);
}

updateDisplay();
