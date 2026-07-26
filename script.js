/* ======================================
   SCRIPT PRINCIPAL
   FORTUNEO BANQUE - SITE WEB
====================================== */


let connectedUser = null;




document.addEventListener("DOMContentLoaded", () => {



const loginForm =
document.getElementById("login-form");


const logoutButton =
document.getElementById("logout-button");






/* ======================================
   RESTAURATION SESSION
====================================== */


const saved =
localStorage.getItem("connectedUser");



if(saved){


const user =
usersDatabase.find(
u => u.id == saved
);



if(user){

connectedUser = user;

openClientSpace();

}


}









/* ======================================
   CONNEXION
====================================== */


loginForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const username =
document.getElementById("username").value.trim();



const password =
document.getElementById("password").value;





const user =
usersDatabase.find(
u =>
u.username === username &&
u.password === password
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









/* ======================================
   OUVERTURE ESPACE
====================================== */


function openClientSpace(){



document
.getElementById("login-page")
.style.display="none";



document
.getElementById("client-space")
.classList.remove("hidden");



loadAll();



}









/* ======================================
   CHARGEMENT GENERAL
====================================== */


function loadAll(){


const user =
connectedUser;



document
.getElementById("client-name")
.innerText =
`${user.profile.firstName} ${user.profile.lastName}`;




document
.getElementById("account-balance")
.innerText =
money(user.account.balance);




document
.getElementById("account-status")
.innerText =
user.account.status;





loadProfile();

loadAccounts();

loadHistory();

loadDashboard();

loadCard();

loadNotifications();

loadStatistics();



}









/* ======================================
   PROFIL
====================================== */


function loadProfile(){


const p =
connectedUser.profile;



document
.getElementById("profile-full-name")
.innerText =
`${p.firstName} ${p.lastName}`;



document
.getElementById("profile-login")
.innerText =
connectedUser.username;



document
.getElementById("profile-email")
.innerText =
p.email;



document
.getElementById("profile-phone")
.innerText =
p.phone;



}









/* ======================================
   COMPTE
====================================== */


function loadAccounts(){


const user =
connectedUser;



document
.getElementById("accounts-container")
.innerHTML = `


<h3>
${user.account.name}
</h3>


<p>
Solde :
<strong>
${money(user.account.balance)}
</strong>
</p>


<p>
${user.account.status}
</p>


`;



document
.getElementById("rib-holder")
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



}









/* ======================================
   HISTORIQUE
====================================== */


function loadHistory(){


const box =
document.getElementById("history-container");



box.innerHTML="";



connectedUser.operations.forEach(op=>{


const item =
document.createElement("div");


item.className="operation";



item.innerHTML=`


<div>

<strong>
${op.label}
</strong>

<br>

<small>
${op.date}
</small>

</div>


<div>

<b>
${op.amount}
</b>

<br>

<small>
${op.category}
</small>

</div>


`;



item.onclick=()=>showOperation(op);



box.appendChild(item);



});


}









function loadDashboard(){


const box =
document.getElementById("dashboard-history");



box.innerHTML="";



connectedUser.operations
.slice(0,3)
.forEach(op=>{


const div =
document.createElement("div");


div.className="operation";


div.innerHTML=`

<strong>
${op.label}
</strong>

<span>
${op.amount}
</span>

`;



box.appendChild(div);


});



}









/* ======================================
   CARTE
====================================== */


function loadCard(){



const box =
document.getElementById("cards-container");



const card =
connectedUser.card;



box.innerHTML = `


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
Expire : ${card.expiry}
</p>


</div>


`;



}









/* ======================================
   NOTIFICATIONS
====================================== */


function loadNotifications(){


const box =
document.getElementById("notifications-container");


box.innerHTML="";



connectedUser.notifications.forEach(n=>{


const p =
document.createElement("p");


p.innerText=n;


box.appendChild(p);



});


}









/* ======================================
   STATISTIQUES
====================================== */


function loadStatistics(){



let income=0;

let expense=0;



connectedUser.operations.forEach(op=>{


const amount =
Number(
op.amount
.replace("€","")
.replace(/\s/g,"")
.replace(",",".")
);



if(amount>0){

income+=amount;

}

else{

expense+=Math.abs(amount);

}


});





document.getElementById("operation-count")
.innerText =
connectedUser.operations.length;



document.getElementById("income-total")
.innerText =
money(income);



document.getElementById("expense-total")
.innerText =
money(expense);



}









/* ======================================
   DETAIL OPERATION
====================================== */


function showOperation(op){



document
.getElementById("operation-details")
.innerHTML = `


<p>
Libellé : ${op.label}
</p>


<p>
Date : ${op.date}
</p>


<p>
Référence : ${op.reference}
</p>


<p>
Montant : ${op.amount}
</p>


`;



document
.getElementById("operation-modal")
.classList.remove("hidden");



}








document
.getElementById("close-modal")
.onclick=()=>{


document
.getElementById("operation-modal")
.classList.add("hidden");


};









/* ======================================
   NAVIGATION
====================================== */


window.showPage=function(page){


document
.querySelectorAll(".website-page")
.forEach(p=>{

p.classList.remove("active-page");

});



document
.getElementById(page)
.classList.add("active-page");



};









/* ======================================
   RECHERCHE
====================================== */


document
.getElementById("history-search")
.addEventListener(
"input",
function(){


const value =
this.value.toLowerCase();



document
.querySelectorAll(".operation")
.forEach(op=>{


op.style.display =
op.innerText
.toLowerCase()
.includes(value)
?
"flex"
:
"none";


});


});









/* ======================================
   VIREMENT
====================================== */


document
.getElementById("transfer-button")
.onclick=()=>{


const amount =
document
.getElementById("transfer-amount")
.value;



if(!amount){


document
.getElementById("transfer-result")
.innerText =
"Veuillez saisir un montant.";


return;


}



document
.getElementById("transfer-result")
.innerText =
"Votre demande a été enregistrée.";


};









/* ======================================
   DECONNEXION
====================================== */


logoutButton.onclick=()=>{


localStorage.removeItem(
"connectedUser"
);



location.reload();



};









function money(value){


return new Intl.NumberFormat(
"fr-FR",
{
style:"currency",
currency:"EUR"
}
).format(value);


}



});
