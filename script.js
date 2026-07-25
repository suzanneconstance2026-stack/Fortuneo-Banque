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
            localStorage.setItem('balance', COMPTE_UNIQUE.balance);
            window.location.reload();
        }, 1000);
    } else {
        alert("Identifiant ou mot de passe incorrect.");
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.reload();
}

function updateDisplay() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const currentBalance = parseFloat(COMPTE_UNIQUE.balance);
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
    const btnTransfert = document.getElementById('btn-transfert');

    // Vérification basique des saisies avant traitement
    if (!beneficiary || !iban || !bic || isNaN(amount) || amount <= 0 || !reason) {
        alert("Veuillez remplir obligatoirement tous les champs (Nom, IBAN, BIC, Montant et Motif) avant de lancer l'opération.");
        return;
    }

    // Animation de chargement
    btnTransfert.innerText = "Traitement interbancaire en cours...";
    btnTransfert.style.background = "#475569";
    btnTransfert.disabled = true;

    // Simulation de l'échec après chargement
    setTimeout(() => {
        alert("ÉCHEC DU TRANSFERT : Le virement ne peut pas être émis car votre compte bancaire fait l'objet d'un blocage administratif. Veuillez vous rendre immédiatement en agence muni d'une pièce d'identité.");
        
        // Rétablir le bouton
        btnTransfert.innerText = "Valider et envoyer les fonds";
        btnTransfert.style.background = "#1d7132";
        btnTransfert.disabled = false;
    }, 2500);
}

if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    updateDisplay();
} else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}
