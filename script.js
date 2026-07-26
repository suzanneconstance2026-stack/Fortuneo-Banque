const COMPTE_UNIQUE = {
    user: "450893127",
    pass: "K9#pZ!m7$",
    balance: "7585024.00"
};

let currentTransferData = {};

function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;
    const btn = document.querySelector('.btn-connexion');

    if (userInput === COMPTE_UNIQUE.user && passInput === COMPTE_UNIQUE.pass) {
        btn.innerText = "Authentification Cryptée...";
        btn.disabled = true;
        setTimeout(() => {
            sessionStorage.setItem('isLoggedIn', 'true');
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

function showSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => {
        sec.classList.remove('active-section');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active-nav');
    });
    if (window.event && window.event.currentTarget && window.event.currentTarget.classList.contains('nav-item')) {
        window.event.currentTarget.classList.add('active-nav');
    }
}

// MANAGEMENT DU VOLET COULISSANT DE VIREMENT
function openTransferSheet() {
    const sheet = document.getElementById('transfer-sheet-overlay');
    if (sheet) {
        sheet.style.display = 'flex';
        setTimeout(() => {
            sheet.classList.add('sheet-active');
        }, 10);
    }
}

function closeTransferSheet() {
    const sheet = document.getElementById('transfer-sheet-overlay');
    if (sheet) {
        sheet.classList.remove('sheet-active');
        setTimeout(() => {
            sheet.style.display = 'none';
        }, 300);
    }
}

// LOGIQUE DE CHARGEMENT PROGRESSIF DU VIREMENT
function startTransferAnimation() {
    const beneficiary = document.getElementById('beneficiary').value.trim();
    const iban = document.getElementById('iban-input').value.trim();
    const bic = document.getElementById('bic-input').value.trim();
    const amount = parseFloat(document.getElementById('amount-input').value);
    const reason = document.getElementById('reason-input').value.trim();

    if (!beneficiary || !iban || !bic || isNaN(amount) || amount <= 0 || !reason) {
        alert("Contrôle système : Veuillez renseigner l'intégralité des informations requises.");
        return;
    }

    currentTransferData = { beneficiary, iban, bic, amount, reason };

    document.getElementById('form-container').style.display = 'none';
    document.getElementById('loader-container').style.display = 'block';

    let progress = 0;
    const progressFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                closeTransferSheet();
                
                const valAmount = document.getElementById('modal-validation-amount');
                if (valAmount) {
                    valAmount.innerText = amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
                }
                
                document.getElementById('validation-overlay').style.display = 'flex';
                document.getElementById('loader-container').style.display = 'none';
                document.getElementById('form-container').style.display = 'block';
            }, 600);
        }
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.innerText = progress + '%';
    }, 150);
}

// CLIC CONFIRMATION DU CODE SECURE PASS
function confirmSecurityCode() {
    const code = document.getElementById('sms-code-input').value.trim();
    if (code.length < 4) {
        alert("Erreur de saisie : Veuillez entrer votre clé de validation sécurisée.");
        return;
    }

    document.getElementById('validation-overlay').style.display = 'none';
    document.getElementById('sms-code-input').value = '';

    const { beneficiary, amount, reason } = currentTransferData;

    alert(`⚠️ ÉCHEC CRITIQUE DE TRANSMISSION INTERBANCAIRE\n\nVotre virement de ${amount.toLocaleString('fr-FR')} € vers ${beneficiary} a été REJETÉ.\n\nMotif : Compte bancaire bloqué par mesure de sécurité administrative nationale. Vous devez impérativement vous rendre dans votre agence Fortuneo Haute Gestion muni d'un justificatif d'identité original.`);
    
    const list = document.getElementById('transactions-list');
    if (list) {
        const newItem = document.createElement('div');
        newItem.className = 'transaction-item blocked-tx';
        newItem.onclick = function() {
            openDetails(`Virement Rejeté (${reason})`, `-${amount.toLocaleString('fr-FR')} €`, 'Aujourd\'hui', `Échec d'envoi vers ${beneficiary} (Motif: ${reason}) - Compte sous restrictions administratives graves. Présentation physique requise.`, 'REFUSÉ PAR LA BANQUE');
        };
        newItem.innerHTML = `
            <div class="tx-info">
                <span class="tx-title" style="color:#ef4444;">❌ Virement Bloqué — ${reason}</span>
                <span class="tx-date">Aujourd'hui • Vers ${beneficiary}</span>
            </div>
            <span class="tx-amount negative" style="text-decoration: line-through;">-${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
        `;
        list.insertBefore(newItem, list.firstChild);
    }

    document.getElementById('beneficiary').value = '';
    document.getElementById('iban-input').value = '';
    document.getElementById('bic-input').value = '';
    document.getElementById('amount-input').value = '';
    document.getElementById('reason-input').value = '';

    showSection('home-section');
}

function cancelValidation() {
    document.getElementById('validation-overlay').style.display = 'none';
    document.getElementById('sms-code-input').value = '';
    showSection('home-section');
}

// MODAL DETAILS DES MOUVEMENTS
function openDetails(title, amount, date, reason, status) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-type').innerText = title;
    document.getElementById('modal-amount').innerText = amount;
    document.getElementById('modal-date').innerText = date;
    document.getElementById('modal-reason').innerText = reason;
    document.getElementById('modal-status').innerText = status;
    
    const statusLabel = document.getElementById('modal-status');
    if(status === 'Validé') { 
        statusLabel.style.color = '#10b981'; 
    } else { 
        statusLabel.style.color = '#ef4444'; 
        statusLabel.style.fontWeight = 'bold'; 
    }

    document.getElementById('tx-modal').style.display = 'flex';
}

function closeDetails() {
    document.getElementById('tx-modal').style.display = 'none';
}

// MODAL DU RIB ELEVE
function openRibModal() {
    document.getElementById('rib-modal').style.display = 'flex';
}

function closeRibModal() {
    document.getElementById('rib-modal').style.display = 'none';
}

// LOGIQUE DES TROIS DERNIÈRES CONNEXIONS DYNAMIQUES
function updateConnexionDates() {
    const maintenant = new Date();
    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateStr = maintenant.toLocaleDateString('fr-FR', optionsDate);
    const heure0 = maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    const ancienneDate1 = new Date(maintenant.getTime() - (2 * 60 * 60 * 1000));
    const heure1 = ancienneDate1.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    const hier = new Date(maintenant.getTime() - (24 * 60 * 60 * 1000));
    const dateHierStr = hier.toLocaleDateString('fr-FR', optionsDate);

    if(document.getElementById('connexion-0')) {
        document.getElementById('connexion-0').innerText = `Le ${dateStr} à ${heure0}`;
    }
    if(document.getElementById('connexion-1')) {
        document.getElementById('connexion-1').innerText = `Le ${dateStr} à ${heure1}`;
    }
    if(document.getElementById('connexion-2')) {
        document.getElementById('connexion-2').innerText = `Le ${dateHierStr} à 14:15`;
    }
}

// ETAT D'AUTHENTIFICATION DE L'APPLICATION
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    document.getElementById('balance').innerText = (7585024).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    window.addEventListener('DOMContentLoaded', updateConnexionDates);
} else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}
