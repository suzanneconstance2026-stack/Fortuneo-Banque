// Données de connexion par défaut si aucun compte n'est créé
const COMPTE_PAR_DEFAUT = {
    user: "fortuneo",
    pass: "1234",
    balance: "2500.00"
};

// Fonction pour basculer entre Connexion et Inscription
function toggleForms(formType) {
    if (formType === 'register') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
    } else {
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('login-box').style.display = 'block';
    }
}

// Fonction pour enregistrer un nouveau compte démo
function registerAccount() {
    const newUser = document.getElementById('reg-username').value.trim();
    const newPass = document.getElementById('reg-password').value;
    const initialBalance = document.getElementById('reg-balance').value;

    if (!newUser || !newPass || !initialBalance || initialBalance <= 0) {
        alert("Veuillez remplir correctement tous les champs.");
        return;
    }

    // Sauvegarder les identifiants créés dans le navigateur
    localStorage.setItem('saved_user', newUser);
    localStorage.setItem('saved_pass', newPass);
    localStorage.setItem('balance', parseFloat(initialBalance).toFixed(2));

    alert("Félicitations ! Votre compte démo Fortuneo a été créé. Vous pouvez maintenant vous connecter.");
    toggleForms('login');
}

// Fonction de connexion (prend en compte le compte par défaut OU le compte créé)
function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;

    // Récupérer le compte personnalisé s'il existe
    const registeredUser = localStorage.getItem('saved_user') || COMPTE_PAR_DEFAUT.user;
    const registeredPass = localStorage.getItem('saved_pass') || COMPTE_PAR_DEFAUT.pass;

    if (userInput === registeredUser && passInput === registeredPass) {
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Si c'est la connexion du compte par défaut, initialiser son solde de base
        if (userInput === COMPTE_PAR_DEFAUT.user && !localStorage.getItem('balance')) {
            localStorage.setItem('balance', COMPTE_PAR_DEFAUT.balance);
        }
        
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard-screen').style.display = 'block';
        
        updateDisplay();
    } else {
        alert("Identifiant ou mot de passe incorrect.");
    }
}

// Fonction de déconnexion
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Mettre à jour le solde à l'écran
function updateDisplay() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
        document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }
}

// Simulation de virement
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
    
    alert(`Simulation Fortuneo réussie : ${amount} € envoyés à ${beneficiary}.`);
}

// Persistance de session au rafraîchissement
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'block';
    updateDisplay();
}
