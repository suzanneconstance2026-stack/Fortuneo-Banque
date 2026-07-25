// Données de connexion de test définies à l'avance
const COMPTE_DEMO = {
    user: "fortuneo",
    pass: "1234",
    initialBalance: "2500.00"
};

// Fonction de connexion
function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;

    if (userInput === COMPTE_DEMO.user && passInput === COMPTE_DEMO.pass) {
        // Enregistrer la session active dans le navigateur
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Charger le solde s'il n'existe pas déjà
        if (!localStorage.getItem('balance')) {
            localStorage.setItem('balance', COMPTE_DEMO.initialBalance);
        }
        
        // Basculer l'affichage des écrans
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard-screen').style.display = 'block';
        
        updateDisplay();
    } else {
        alert("Identifiant ou mot de passe incorrect. (Utilisez 'fortuneo' et '1234')");
    }
}

// Fonction de déconnexion
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
    
    // Effacer les champs de saisie pour sécurité de simulation
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Mettre à jour l'affichage du solde si connecté
function updateDisplay() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const currentBalance = parseFloat(localStorage.getItem('balance'));
        document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }
}

// Exécuter un virement
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

// Vérifier au rafraîchissement si l'utilisateur était déjà connecté
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'block';
    updateDisplay();
}
