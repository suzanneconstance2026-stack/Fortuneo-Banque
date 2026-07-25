// Unique compte autorisé avec la somme demandée
const COMPTE_UNIQUE = {
    user: "450893127",
    pass: "K9#pZ!m7$",
    balance: "7585024.00"
};

function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;

    // Vérification stricte des identifiants
    if (userInput === COMPTE_UNIQUE.user && passInput === COMPTE_UNIQUE.pass) {
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Fixe définitivement le solde du compte unique
        localStorage.setItem('balance', COMPTE_PREMIUM.balance);
        
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
        // Affiche directement le solde fixe pour ce compte
        const currentBalance = parseFloat(COMPTE_UNIQUE.balance);
        document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }
}

function executeTransfer() {
    const beneficiary = document.getElementById('beneficiary').value;
    const amount = parseFloat(document.getElementById('amount-input').value);

    if (!beneficiary || isNaN(amount) || amount <= 0) {
        alert("Veuillez remplir correctement les champs.");
        return;
    }
    if (amount > parseFloat(COMPTE_UNIQUE.balance)) {
        alert("Fonds insuffisants !");
        return;
    }
    
    alert(`Simulation Fortuneo réussie : ${amount} € envoyés à ${beneficiary}.`);
    document.getElementById('beneficiary').value = '';
    document.getElementById('amount-input').value = '';
}

if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'block';
    updateDisplay();
}
