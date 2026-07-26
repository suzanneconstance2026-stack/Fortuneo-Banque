/* ======================================
   SCRIPT PRINCIPAL - ESPACE CLIENT WEB
====================================== */


let connectedUser = null;



document.addEventListener("DOMContentLoaded", () => {



const loginForm = document.getElementById("login-form");

const logoutButton =
document.getElementById("logout-button");





/* ==========================
   RESTAURATION SESSION
========================== */


const savedUser =
localStorage.getItem("connectedUser");



if(savedUser){


const user =
usersDatabase.find(
u => u.id == savedUser
);



if(user){

connectedUser = user;

openClientSpace();

}


}









/* ==========================
   CONNEXION
========================== */


loginForm.addEventListener(
"submit",
(event)=>{


event.preventDefault();



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


document.getElementById("login-message")
.innerText =
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
   OUVERTURE ESPACE CLIENT
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
   CHARGEMENT UTILISATEUR
========================== */


function loadUserInformation(){



if(!connectedUser) return;



const user = connectedUser;



document
.getElementById("client-name")
.innerText =
`${user.profile.firstName} ${user.profile.lastName}`;



document
.getElementById("account-balance")
.innerText =
formatMoney(user.account.balance);




document
.getElementById("account-status")
.innerText =
user.account.status;






/* Profil */


document
.getElementById("profile-full-name")
.innerText =
`${user.profile.firstName} ${user.profile.lastName}`;



document
.getElementById("profile-login")
.innerText =
user.username;



document
.getElementById("profile-email")
.innerText =
user.profile.email;



document
.getElementById("profile-phone")
.innerText =
user.profile.phone;






/* RIB interne */


document
.getElementById("rib-name")
.innerText =
`${user.profile.firstName} ${user.profile.lastName}`;



document
.getElementById("rib-iban")
.innerText =
user.account.bankingDetails.iban;



document
.getElementById("rib-bic")
.innerText =
user.account.bankingDetails.bic;



document
.getElementById("rib-number")
.innerText =
user.account.bankingDetails.accountNumber;





loadAccounts();

loadHistory();

loadDashboardHistory();

loadCard();

loadNotifications();



}









/* ==========================
   FORMAT €
========================== */


function formatMoney(amount){


return new Intl.NumberFormat(
"fr-FR",
{
style:"currency",
currency:"EUR"
}
).format(amount);



}









/* ==========================
   NAVIGATION
========================== */


window.showPage=function(page){



document
.querySelectorAll(".website-page")
.forEach(
section =>
section.classList.remove("active-page")
);



const target =
document.getElementById(page);



if(target){

target.classList.add("active-page");

}



};









/* ==========================
   COMPTES
========================== */


function loadAccounts(){


const box =
document.getElementById("accounts-container");



box.innerHTML = `

<h3>
${connectedUser.account.name}
</h3>


<p>
Solde actuel :
<strong>
${formatMoney(
connectedUser.account.balance
)}
</strong>
</p>


<p>
${connectedUser.account.status}
</p>

`;



}









/* ==========================
   HISTORIQUE
========================== */


function createOperation(operation){


const div =
document.createElement("div");



div.className="operation";



div.innerHTML=`

<div>

<strong>
${operation.label}
</strong>

<br>

<small>
${operation.date}
</small>

</div>


<b>
${operation.amount}
</b>

`;



div.onclick=()=>openOperation(operation);



return div;


}






function loadHistory(){


const box =
document.getElementById("history-container");



box.innerHTML="";



connectedUser.operations.forEach(op=>{


box.appendChild(
createOperation(op)
);


});


}









function loadDashboardHistory(){



const box =
document.getElementById("dashboard-history");



box.innerHTML="";



connectedUser.operations
.slice(0,3)
.forEach(op=>{


box.appendChild(
createOperation(op)
);



});


}









/* ==========================
   DETAIL OPERATION
========================== */


function openOperation(operation){



const modal =
document.getElementById("operation-modal");



document
.getElementById("operation-details")
.innerHTML=`

<p>
<strong>Opération :</strong>
${operation.label}
</p>


<p>
<strong>Date :</strong>
${operation.date}
</p>


<p>
<strong>Catégorie :</strong>
${operation.category}
</p>


<p>
<strong>Montant :</strong>
${operation.amount}
</p>

`;



modal.classList.remove("hidden");


}






document
.getElementById("close-modal")
.onclick=()=>{


document
.getElementById("operation-modal")
.classList.add("hidden");


};









/* ==========================
   CARTE
========================== */


function loadCard(){


const box =
document.getElementById("cards-container");



const card =
connectedUser.card;



box.innerHTML=`

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
Expire ${card.expiry}
</p>


</div>

`;



}









/* ==========================
   NOTIFICATIONS
========================== */


function loadNotifications(){


const box =
document.getElementById("notifications-container");


box.innerHTML="";



connectedUser.notifications
.forEach(note=>{


const item =
document.createElement("p");


item.innerText =
note;



box.appendChild(item);



});


}









/* ==========================
   RECHERCHE
========================== */


document
.getElementById("history-search")
.addEventListener(
"input",
function(){


const value =
this.value.toLowerCase();



document
.querySelectorAll(".operation")
.forEach(item=>{


item.style.display =
item.innerText
.toLowerCase()
.includes(value)
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
.onclick=()=>{


const amount =
Number(
document.getElementById("transfer-amount").value
);



if(!amount || amount <=0){


document
.getElementById("transfer-result")
.innerText =
"Montant incorrect.";


return;


}



document
.getElementById("transfer-result")
.innerText =
"Demande enregistrée.";



};









/* ==========================
   DECONNEXION
========================== */


logoutButton.onclick=()=>{


localStorage.removeItem(
"connectedUser"
);



connectedUser=null;



location.reload();



};



});
