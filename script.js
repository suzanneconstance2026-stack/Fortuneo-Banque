/* =====================================
   DONNEES DES COMPTES (PROTOTYPE)
===================================== */


const accounts = {


    "450893127": {

        password: "K9#pZ!m7$",

        name: "Edmond Garnier",

        balance: 758557,

        status: "Compte sous restriction (simulation)",


        card: "**** **** **** 4582",


        history: [

            {
                date: "15/03/2023",
                label: "Virement entrant",
                amount: "+45 000,00 €"
            },

            {
                date: "08/06/2023",
                label: "Placement épargne",
                amount: "-25 000,00 €"
            },

            {
                date: "21/09/2023",
                label: "Virement reçu",
                amount: "+120 000,00 €"
            },

            {
                date: "12/01/2024",
                label: "Gestion patrimoine",
                amount: "-8 500,00 €"
            },

            {
                date: "30/05/2024",
                label: "Versement financier",
                amount: "+75 000,00 €"
            },

            {
                date: "18/02/2025",
                label: "Opération bancaire",
                amount: "-3 200,00 €"
            }

        ]

    },





    "975899351": {


        password: "D#8@Z!B€$",

        name: "Brigitte Garnier",

        balance: 1351254.50,

        status: "Compte sous restriction (simulation)",


        card: "**** **** **** 7319",


        history: [

            {
                date: "02/04/2023",
                label: "Virement reçu",
                amount: "+250 000,00 €"
            },


            {
                date: "14/08/2023",
                label: "Investissement",
                amount: "-40 000,00 €"
            },


            {
                date: "10/12/2023",
                label: "Revenu financier",
                amount: "+180 000,00 €"
            },


            {
                date: "07/03/2024",
                label: "Virement bancaire",
                amount: "-15 000,00 €"
            },


            {
                date: "22/11/2024",
                label: "Versement",
                amount: "+95 000,00 €"
            }


        ]

    }


};






let currentAccount = null;







/* =====================================
   CONNEXION
===================================== */


document
.getElementById("login-btn")
.addEventListener("click", function(){



    const id =
        document
        .getElementById("login-id")
        .value
        .trim();



    const password =
        document
        .getElementById("login-password")
        .value;



    const error =
        document
        .getElementById("login-error");





    if(
        accounts[id] &&
        accounts[id].password === password
    ){


        currentAccount =
            accounts[id];



        document
        .getElementById("login-screen")
        .style.display = "none";



        document
        .getElementById("bank-screen")
        .style.display = "block";



        loadAccount();



        error.textContent = "";


    }

    else {


        error.textContent =
        "Identifiant ou mot de passe incorrect.";


    }



});







/* =====================================
   CHARGEMENT DU PROFIL
===================================== */


function loadAccount(){



    document
    .getElementById("client-name")
    .textContent =
        currentAccount.name;



    document
    .getElementById("holder-name")
    .textContent =
        currentAccount.name;



    document
    .getElementById("card-holder")
    .textContent =
        currentAccount.name;



    document
    .getElementById("balance")
    .textContent =
        currentAccount.balance.toLocaleString(
            "fr-FR",
            {
                style:"currency",
                currency:"EUR"
            }
        );



    document
    .getElementById("account-status")
    .textContent =
        currentAccount.status;



    displayHistory();



}/* =====================================
   AFFICHAGE HISTORIQUE
===================================== */


function displayHistory(){


    const dashboardHistory =
        document.getElementById(
            "dashboard-history"
        );


    const fullHistory =
        document.getElementById(
            "full-history"
        );



    dashboardHistory.innerHTML = "";

    fullHistory.innerHTML = "";





    currentAccount.history.forEach(
        (operation, index) => {



        const item = document.createElement("div");


        item.className =
            "operation-item";



        item.innerHTML = `

            <div>

                <strong>
                    ${operation.label}
                </strong>

                <small>
                    ${operation.date}
                </small>

            </div>


            <span>
                ${operation.amount}
            </span>

        `;



        fullHistory.appendChild(item);



        if(index < 3){

            dashboardHistory
            .appendChild(
                item.cloneNode(true)
            );

        }


    });



}









/* =====================================
   NAVIGATION
===================================== */


const navigation =
document.querySelectorAll(
    "[data-page]"
);



navigation.forEach(button => {



    button.addEventListener(
        "click",
        function(){



            const page =
            this.dataset.page;



            document
            .querySelectorAll(".page")
            .forEach(section=>{

                section
                .classList
                .remove("active");

            });




            document
            .getElementById(page)
            .classList
            .add("active");




            navigation.forEach(btn=>{

                btn.classList.remove(
                    "nav-active"
                );

            });



            this.classList.add(
                "nav-active"
            );



        }

    );



});









/* =====================================
   DECONNEXION
===================================== */


document
.getElementById("logout-btn")
.addEventListener(
"click",
function(){



    currentAccount = null;



    document
    .getElementById("bank-screen")
    .style.display="none";



    document
    .getElementById("login-screen")
    .style.display="flex";



    document
    .getElementById("login-id")
    .value="";



    document
    .getElementById("login-password")
    .value="";



});









/* =====================================
   VIREMENT SIMULE
===================================== */


document
.getElementById("transfer-btn")
.addEventListener(
"click",
function(){



    const beneficiary =
    document
    .getElementById("beneficiary")
    .value.trim();



    const iban =
    document
    .getElementById("iban")
    .value.trim();



    const amount =
    document
    .getElementById("transfer-amount")
    .value;



    const reason =
    document
    .getElementById("transfer-reason")
    .value.trim();



    const result =
    document
    .getElementById("transfer-result");



    const message =
    document
    .getElementById("transfer-message");







    if(
        !beneficiary ||
        !iban ||
        !amount ||
        !reason
    ){


        alert(
            "Veuillez compléter toutes les informations."
        );


        return;

    }







    result.style.display="block";



    message.innerHTML = `


        <strong>
        Analyse de sécurité en cours...
        </strong>

        <br><br>

        Vérification des informations du bénéficiaire...

        <br><br>

        Contrôle réglementaire...

        <br><br>

        <strong class="blocked">
        Opération refusée
        </strong>

        <br><br>

        Motif :
        Le compte est actuellement sous restriction
        dans cette simulation.


    `;



});/* =====================================
   SAUVEGARDE SESSION
===================================== */


function saveSession(){


    if(currentAccount){


        localStorage.setItem(
            "fortuneo_current",
            JSON.stringify(currentAccount)
        );


    }


}







function restoreSession(){


    const saved =
    localStorage.getItem(
        "fortuneo_current"
    );



    if(saved){


        currentAccount =
        JSON.parse(saved);



        document
        .getElementById("login-screen")
        .style.display="none";



        document
        .getElementById("bank-screen")
        .style.display="block";



        loadAccount();


    }


}








/* =====================================
   MODIFICATION CHARGEMENT PROFIL
===================================== */


const oldLoadAccount = loadAccount;


loadAccount = function(){


    oldLoadAccount();



    saveSession();



};








/* =====================================
   ANIMATION VIREMENT
===================================== */


const transferButton =
document.getElementById(
    "transfer-btn"
);



transferButton.addEventListener(
"click",
function(){


    transferButton.disabled = true;


    transferButton.textContent =
    "Analyse en cours...";



    setTimeout(()=>{


        transferButton.disabled=false;


        transferButton.textContent =
        "Envoyer le virement";



    },2500);



});








/* =====================================
   NETTOYAGE FORMULAIRE
===================================== */


function clearTransfer(){


    document
    .getElementById("beneficiary")
    .value="";



    document
    .getElementById("iban")
    .value="";



    document
    .getElementById("transfer-amount")
    .value="";



    document
    .getElementById("transfer-reason")
    .value="";


}








/* =====================================
   VALIDATION IBAN SIMPLE
===================================== */


function checkIBAN(value){


    return value.length >= 10;


}








/* =====================================
   INITIALISATION
===================================== */


window.addEventListener(
"load",
function(){


    restoreSession();



});
