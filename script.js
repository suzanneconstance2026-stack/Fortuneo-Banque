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
        btn.innerText = "Chiffrement AES-256...";
        btn.disabled = true;
        setTimeout(() => {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.reload(); // Force le rafraîchissement automatique clean
        }, 800);
    } else {
        alert("Accès refusé. Les identifiants saisis ne correspondent à aucun compte Fortuneo Privilège.");
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.reload();
}

function showSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active-section'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-nav'));
    
    const activeNavButton = Array.from(document.querySelectorAll('.nav-item')).find(item => {
        const attr = item.getAttribute('onclick');
        return attr && attr.includes(sectionId);
    });
    if (activeNavButton) {
        activeNavButton.classList.add('active-nav');
    }
}

function startTransferAnimation() {
    const beneficiary = document.getElementById('beneficiary').value.trim();
    const iban = document.getElementById('iban-input').value.trim();
    const bic = document.getElementById('bic-input').value.trim();
    const amount = parseFloat(document.getElementById('amount-input').value);
    const reason = document.getElementById('reason-input').value.trim();

    if (!beneficiary || !iban || !bic || isNaN(amount) || amount <= 0 || !reason) {
        alert("Régulation bancaire : Veuillez remplir l'intégralité des variables (Nom, IBAN, BIC, Montant et Motif) avant de signer l'ordre.");
        return;
    }

    document.getElementById('form-container').style.display = 'none';
    document.getElementById('loader-container').style.display = 'block';

    let progress = 0;
    const progressFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 9) + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                alert(`⚠️ TRANSACTION COMPROMISE - BLOCK REJET SYSTÈME\n\nL'ordre d'émission de ${amount.toLocaleString('fr-FR')} € à destination de "${beneficiary}" n'a pas pu aboutir.\n\nRaison administrative : Ce compte fait l'objet d'un gel conservatoire des fonds. Aucun virement sortant ne peut être signé en ligne. Rendez-vous dans votre agence Arkéa Direct Bank avec vos documents d'identité pour lever la restriction.`);
                
                const list = document.getElementById('transactions-list');
                const newItem = document.createElement('div');
                newItem.className = 'transaction-item';
                newItem.onclick = function() {
                    openDetails(`Virement SEPA Rejeté`, `-${amount.toLocaleString('fr-FR')} €`, 'Aujourd\'hui', `Tentative de transfert vers ${beneficiary} (IBAN: ${iban}). Libellé: ${reason}. Bloqué par l'autorité de contrôle bancaire (Mesure Conservatoire).`, 'REFUSÉ PAR L\'ÉTABLISSEMENT');
                };
                newItem.innerHTML = `
                    <div class="tx-info">
                        <span class="tx-title" style="color:#ef4444;">❌ Virement Rejeté — ${reason}</span>
                        <span class="tx-date">Aujourd'hui • Destinataire : ${beneficiary}</span>
                    </div>
                    <span class="tx-amount negative" style="text-decoration: line-through; color: #94a3b8;">-${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                `;
                if (list && list.firstChild) {
                    list.insertBefore(newItem, list.firstChild);
                } else if (list) {
                    list.appendChild(newItem);
                }

                document.getElementById('beneficiary').value = '';
                document.getElementById('iban-input').value = '';
                document.getElementById('bic-input').value = '';
                document.getElementById('amount-input').value = '';
                document.getElementById('reason-input').value = '';

                document.getElementById('loader-container').style.display = 'none';
                document.getElementById('form-container').style.display = 'block';
                showSection('home-section');
            }, 500);
        }
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.innerText = progress + '%';
    }, 120); 
}

function openDetails(title, amount, date, reason, status) {
    if(document.getElementById('modal-type')) document.getElementById('modal-type').innerText = title;
    if(document.getElementById('modal-amount')) document.getElementById('modal-amount').innerText = amount;
    if(document.getElementById('modal-date')) document.getElementById('modal-date').innerText = date;
    if(document.getElementById('modal-reason')) document.getElementById('modal-reason').innerText = reason;
    if(document.getElementById('modal-status')) document.getElementById('modal-status').innerText = status;
    
    const statusLabel = document.getElementById('modal-status');
    if (statusLabel) {
        if (status === 'COMPLÉTÉ' || status === 'Validé') { 
            statusLabel.style.color = '#10b981'; 
            statusLabel.style.fontWeight = 'bold';
        } else { 
            statusLabel.style.color = '#ef4444'; 
            statusLabel.style.fontWeight = 'bold'; 
        }
    }
    if(document.getElementById('tx-modal')) document.getElementById('tx-modal').style.display = 'flex';
}

function closeDetails() {
    if(document.getElementById('tx-modal')) document.getElementById('tx-modal').style.display = 'none';
}

// Initialisation sécurisée post-chargement DOM
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        if (document.getElementById('login-screen')) document.getElementById('login-screen').style.display = 'none';
        if (document.getElementById('app-screen')) document.getElementById('app-screen').style.display = 'flex';
        
        const balanceElement = document.getElementById('balance');
        if (balanceElement) {
            balanceElement.innerText = parseFloat(COMPTE_UNIQUE.balance).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
        }
    } else {
        if (document.getElementById('login-screen')) document.getElementById('login-screen').style.display = 'flex';
        if (document.getElementById('app-screen')) document.getElementById('app-screen').style.display = 'none';
    }
});
