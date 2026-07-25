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
            window.location.reload(); // Force le rafraîchissement automatique
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
    document.getElementById(sectionId).classList.add('active-section');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-nav'));
    
    // Correction du bug de navigation qui bloquait le script au démarrage
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
                list.insertBefore(newItem, list.firstChild);

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
        progressFill.style.width = progress + '%';
        progressText.innerText = progress + '%';
    }, 120); 
}

function openDetails(title, amount, date, reason, status) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-type').innerText = title;
    document.getElementById('modal-amount').innerText = amount;
    document.getElementById('modal-date').innerText = date;
    document.getElementById('modal-reason').innerText = reason;
    document.getElementById('modal-status').innerText = status;
    
    const statusLabel = document.getElementById('modal-status');
    if (status === 'COMPLÉTÉ' || status === 'Validé') { 
        statusLabel.style.color = '#10b981'; 
        statusLabel.style.fontWeight = 'bold';
    } else { 
        statusLabel.style.color = '#ef4444'; 
        statusLabel.style.fontWeight = 'bold'; 
    }
    document.getElementById('tx-modal').style.display = 'flex';
}

function closeDetails() {
    document.getElementById('tx-modal').style.display = 'none';
}

// Lancement automatique et attribution du solde fixe demandé
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    document.getElementById('balance').innerText = (7585024).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
} else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}
