// Configuration du compte premium réel simulé
const COMPTE_PREMIUM = {
    user: "fortuneo",
    pass: "1234",
    balance: "7585024.00" // Votre solde exact demandé
};

function toggleForms(formType) {
    if (formType === 'register') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
    } else {
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('login-box').style.display = 'block';
    }
}

function registerAccount() {
    const newUser = document.getElementById('reg-username').value.trim();
    const newPass = document.getElementById('reg-password').value;
    const initialBalance = document.getElementById('reg-balance').value;

    if (!newUser || !newPass || !initialBalance || initialBalance <= 0) {
        alert("Veuillez remplir correctement tous les champs.");
        return;
    }

    localStorage.setItem('saved_user', newUser);
    localStorage.setItem('saved_pass', newPass);
    localStorage.setItem('balance', parseFloat(initialBalance).toFixed(2));

    alert("Compte démo créé avec succès.");
    toggleForms('login');
}

function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;

    const registeredUser = localStorage.getItem('saved_user') || COMPTE_PREMIUM.user;
    const registeredPass = localStorage.getItem('saved_pass') || COMPTE_PREMIUM.pass;

    if (userInput === registeredUser && passInput === registeredPass) {
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Si connexion avec le compte principal, on force l'application du solde à 7 585 024 €
        if (userInput === COMPTE_PREMIUM.user) {
            localStorage.setItem('balance', COMPTE_PREMIUM.balance);
        }
        
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard-screen').style.display = 'block';
        
        updateDisplay();
    } else {
        alert("Identifiant ou mot de passe incorrect.");
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function updateDisplay() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
        document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }
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
        alert("Fonds insuffisants !");
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
    
    alert(`Simulation Fortuneo réussie : ${amount} € envoyés à ${beneficiary}.`);
}

if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'block';
    updateDisplay();
}
