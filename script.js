/* ======================================
   SCRIPT PRINCIPAL DU SITE
====================================== */


document.addEventListener("DOMContentLoaded", () => {



const loginForm = document.getElementById("login-form");

const logoutButton =
document.getElementById("logout-button");





/* ==========================
   CONNEXION
========================== */


loginForm.addEventListener("submit", function(e){


e.preventDefault();



const username =
document.getElementById("username").value.trim();



const password =
document.getElementById("password").value;



const user =
usersDatabase.find(
item =>
item.username === username &&
item.password === password
);




if(!user){


document.getElementById("login-message").innerText =
"Identifiant ou mot de passe incorrect.";


return;

}





connectedUser = user;



localStorage.setItem(
"connectedUser",
user.id
);



openClientSpace();



});









/* ==========================
   OUVRIR ESPACE CLIENT
========================== */


function openClientSpace(){



document
.getElementById("login-page")
.style.display="none";



document
.getElementById("client-space")
.classList.remove("hidden");



loadUserInformation();



}









/* ==========================
   CHARGEMENT INFORMATIONS
========================== */


function loadUserInformation(){



const user = connectedUser;



/* En-tête */


document.getElementById("client-name")
.innerText =
`${user.profile.firstName} ${user.profile.lastName}`;







/* Solde */


document.getElementById("account-balance")
.innerText =
formatMoney(user.account.balance);



document.getElementById("account-status")
.innerText =
user.account.status;









/* Profil */


document.getElementById("profile-full-name")
.innerText =
`${user.profile.firstName} ${user.profile.lastName}`;


document.getElementById("profile-login")
.innerText =
user.username;


document.getElementById("profile-email")
.innerText =
user.profile.email;


document.getElementById("profile-phone")
.innerText =
user.profile.phone;









/* Coordonnées bancaires */


document.getElementById("rib-name")
.innerText =
`${user.profile.firstName} ${user.profile.lastName}`;


document.getElementById("rib-iban")
.innerText =
user.account.bankingDetails.iban;


document.getElementById("rib-bic")
.innerText =
user.account.bankingDetails.bic;


document.getElementById("rib-number")
.innerText =
user.account.bankingDetails.accountNumber;







loadAccounts();

loadHistory();

loadDashboardHistory();

loadCard();

loadNotifications();



}









/* ==========================
   FORMAT MONETAIRE
========================== */


function formatMoney(value){


return value.toLocaleString(
"fr-FR",
{
style:"currency",
currency:"EUR"
}
);


}









/* ==========================
   NAVIGATION
========================== */


window.showPage = function(pageId){



document
.querySelectorAll(".website-page")
.forEach(page=>{

page.classList.remove("active-page");

});



document
.getElementById(pageId)
.classList.add("active-page");



};









/* ==========================
   COMPTES
========================== */


function loadAccounts(){


const container =
document.getElementById("accounts-container");


container.innerHTML = `


<h3>
${connectedUser.account.name}
</h3>


<p>
Solde :
<strong>
${formatMoney(
connectedUser.account.balance
)}
</strong>
</p>


<p>
Statut :
${connectedUser.account.status}
</p>


`;



}









/* ==========================
   HISTORIQUE
========================== */


function loadHistory(){



const container =
document.getElementById("history-container");



container.innerHTML="";



connectedUser.operations.forEach(operation=>{


const div =
document.createElement("div");



div.className="operation";



div.innerHTML=`


<div>

<strong>
${operation.label}
</strong>

<br>

<span>
${operation.date}
</span>

</div>


<b>
${operation.amount}
</b>


`;



div.onclick=function(){

showOperation(operation);

};



container.appendChild(div);



});



}








/* ==========================
   HISTORIQUE ACCUEIL
========================== */


function loadDashboardHistory(){



const box =
document.getElementById("dashboard-history");


box.innerHTML="";



connectedUser.operations
.slice(0,3)
.forEach(operation=>{


const div =
document.createElement("div");


div.className="operation";


div.innerHTML=`

<strong>
${operation.label}
</strong>

<span>
${operation.amount}
</span>


`;


box.appendChild(div);



});



}









/* ==========================
   CARTE
========================== */


function loadCard(){


const container =
document.getElementById("cards-container");



const card =
connectedUser.card;



container.innerHTML = `


<div class="bank-card">


<h3>
Fortuneo Banque
</h3>


<div class="chip"></div>


<h2>
**** **** **** ${card.number}
</h2>


<p>
${card.holder}
</p>


<p>
Expiration : ${card.expiry}
</p>


</div>


`;



}









/* ==========================
   NOTIFICATIONS
========================== */


function loadNotifications(){


const container =
document.getElementById("notifications-container");



container.innerHTML="";



connectedUser.notifications.forEach(note=>{


const div =
document.createElement("div");


div.className="notification";


div.innerText=note;


container.appendChild(div);



});


}









/* ==========================
   DETAIL OPERATION
========================== */


function showOperation(operation){



const modal =
document.getElementById("operation-modal");



document.getElementById("operation-details")
.innerHTML=`


<p>
Libellé :
${operation.label}
</p>


<p>
Catégorie :
${operation.category}
</p>


<p>
Date :
${operation.date}
</p>


<p>
Montant :
${operation.amount}
</p>


`;



modal.classList.remove("hidden");


}





document
.getElementById("close-modal")
.onclick=function(){


document
.getElementById("operation-modal")
.classList.add("hidden");


};









/* ==========================
   RECHERCHE HISTORIQUE
========================== */


document
.getElementById("history-search")
.addEventListener("input",function(){


const search =
this.value.toLowerCase();



document
.querySelectorAll(".operation")
.forEach(item=>{


item.style.display =
item.innerText
.toLowerCase()
.includes(search)
?
"flex"
:
"none";


});



});









/* ==========================
   VIREMENT
========================== */


document
.getElementById("transfer-button")
.addEventListener("click",()=>{


const amount =
Number(
document.getElementById("transfer-amount").value
);



if(!amount || amount<=0){


document.getElementById("transfer-result")
.innerText =
"Veuillez saisir un montant valide.";


return;

}



document.getElementById("transfer-result")
.innerText =
"Votre demande a été prise en compte.";





});









/* ==========================
   DECONNEXION
========================== */


logoutButton.addEventListener("click",()=>{


connectedUser=null;


localStorage.removeItem(
"connectedUser"
);



location.reload();



});



});
