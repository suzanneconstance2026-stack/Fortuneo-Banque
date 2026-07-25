const COMPTE_UNIQUE = {
    user: "450893127",
    pass: "K9#pZ!m7$",
    balance: "7585024.00"
};

function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;
    const btn = document.querySelector('.btn-connexion');

    if (userInput === COMPTE_UNIQUE.user && passInput === COMPTE_UNIQUE.pass) {
        btn.innerText = "Connexion en cours...";
        btn.disabled = true;

        setTimeout(() => {
            sessionStorage.setItem('isLoggedIn', 'true');
            if (!localStorage.getItem('balance')) {
                localStorage.setItem('balance', COMPTE_UNIQUE.balance);
            }
            window.location.reload();
        }, 1000);
    } else {
        alert("Identifiant ou mot de passe incorrect.");
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('balance');
    window.location.reload();
}

function updateDisplay() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const currentBalance = parseFloat(localStorage.getItem('balance') || COMPTE_UNIQUE.balance);
        document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-nav'));
    event.currentTarget.classList.add('active-nav');
}

function executeTransfer() {
    const beneficiary = document.getElementById('beneficiary').value.trim();
    const iban = document.getElementById('iban-input').value.trim();
    const bic = document.getElementById('bic-input').value.trim();
    const amount = parseFloat(document.getElementById('amount-input').value);
    const reason = document.getElementById('reason-input').value.trim();
    let currentBalance = parseFloat(localStorage.getItem('balance') || COMPTE_UNIQUE.balance);

    // Vérification de la présence de toutes les informations requises
    if (!beneficiary || !iban || !bic || isNaN(amount) || amount <= 0 || !reason) {
        alert("Veuillez remplir obligatoirement tous les champs (Nom, IBAN, BIC, Montant et Motif).");
        return;
    }
    if (amount > currentBalance) {
        alert("Action impossible : Solde insuffisant pour ce virement SEPA.");
        return;
    }

    currentBalance -= amount;
    localStorage.setItem('balance', currentBalance.toString());

    // Ajout à l'historique en incluant le motif saisi
    const list = document.getElementById('transactions-list');
    const newItem = document.createElement('div');
    newItem.className = 'transaction-item';
    newItem.innerHTML = `
        <div class="tx-info">
            <span class="tx-title">Virement SEPA émis — ${reason}</span>
            <span class="tx-date">Aujourd'hui • Vers ${beneficiary}</span>
        </div>
        <span class="tx-amount negative">-${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
    `;
    list.insertBefore(newItem, list.firstChild);

    updateDisplay();
    
    // Réinitialisation de tous les champs du formulaire
    document.getElementById('beneficiary').value = '';
    document.getElementById('iban-input').value = '';
    document.getElementById('bic-input').value = '';
    document.getElementById('amount-input').value = '';
    document.getElementById('reason-input').value = '';
    
    alert(`Ordre de transfert validé. Le virement de ${amount.toLocaleString('fr-FR')} € a bien été transmis à votre conseiller pour exécution.`);
    showSection('home-section');
}

if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    updateDisplay();
} else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}
function executeTransfer() {
    alert("Opération refusée : Ce compte fait l'objet d'une restriction administrative. Tout transfert de fonds est bloqué.");
    return false;
}
