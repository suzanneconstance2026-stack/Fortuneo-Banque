/* =====================================
   CONFIGURATION APPLICATION
===================================== */


const USER_ACCOUNT = {

    username: "client123",

    password: "secure123",

    balance: 25000

};



let operations = [];






/* =====================================
   CONNEXION
===================================== */


const loginButton = document.getElementById("login-button");



loginButton.addEventListener("click", function(){


    const username =
        document.getElementById("username").value.trim();



    const password =
        document.getElementById("password").value;



    const message =
        document.getElementById("login-message");




    if(
        username === USER_ACCOUNT.username &&
        password === USER_ACCOUNT.password
    ){


        document.getElementById("login-page").hidden = true;


        document.getElementById("client-space").hidden = false;



        message.textContent = "";



        updateBalance();



    }

    else {


        message.textContent =
            "Identifiant ou mot de passe incorrect.";

    }



});







/* =====================================
   DECONNEXION
===================================== */


document
.getElementById("logout-button")
.addEventListener("click", function(){


    document.getElementById("client-space").hidden = true;


    document.getElementById("login-page").hidden = false;



    document.getElementById("password").value = "";



});








/* =====================================
   NAVIGATION ENTRE SECTIONS
===================================== */


const navigationButtons =
    document.querySelectorAll(".nav-item");



const sections =
    document.querySelectorAll(".section");




navigationButtons.forEach(button => {


    button.addEventListener("click", function(){



        const target =
            this.dataset.section;



        sections.forEach(section => {

            section.classList.remove("active");

        });



        document
        .getElementById(target)
        .classList.add("active");



        navigationButtons.forEach(btn => {

            btn.classList.remove("active");

        });



        this.classList.add("active");



    });


});








/* =====================================
   ACTIONS RAPIDES
===================================== */


const quickButtons =
    document.querySelectorAll(".quick-actions button");



quickButtons.forEach(button => {


    button.addEventListener("click", function(){


        const target =
            this.dataset.target;



        sections.forEach(section=>{

            section.classList.remove("active");

        });



        document
        .getElementById(target)
        .classList.add("active");



    });


});/* =====================================
   GESTION DES OPERATIONS
===================================== */


const operationButton =
    document.getElementById("send-operation");



operationButton.addEventListener("click", function(){


    const recipient =
        document.getElementById("recipient").value.trim();



    const amount =
        Number(
            document.getElementById("amount").value
        );



    const category =
        document.getElementById("category").value;



    const description =
        document.getElementById("description").value.trim();





    if(
        !recipient ||
        !amount ||
        amount <= 0 ||
        !description
    ){

        alert(
            "Veuillez remplir tous les champs."
        );

        return;

    }





    const operation = {

        id: Date.now(),

        recipient: recipient,

        amount: amount,

        category: category,

        description: description,

        date: new Date()
        .toLocaleDateString("fr-FR")


    };





    operations.unshift(operation);



    saveOperations();



    updateBalance();



    displayOperations();



    clearOperationForm();



    alert(
        "Opération ajoutée avec succès."
    );



});








/* =====================================
   CALCUL DU SOLDE
===================================== */


function updateBalance(){


    let currentBalance =
        USER_ACCOUNT.balance;



    operations.forEach(operation => {


        currentBalance -= operation.amount;


    });



    document
    .getElementById("balance")
    .textContent =
        currentBalance.toLocaleString(
            "fr-FR",
            {
                style:"currency",
                currency:"EUR"
            }
        );



}








/* =====================================
   AFFICHAGE HISTORIQUE
===================================== */


function displayOperations(){


    const list =
        document.getElementById(
            "operations-list"
        );



    const recent =
        document.getElementById(
            "recent-transactions"
        );



    list.innerHTML = "";

    recent.innerHTML = "";





    if(operations.length === 0){


        list.innerHTML =

        "<p>Aucune opération enregistrée.</p>";



        recent.innerHTML =

        "<p>Aucune opération récente.</p>";



        return;


    }






    operations.forEach(operation => {



        const item =
        document.createElement("div");



        item.className =
            "operation-item";



        item.innerHTML = `

            <div class="operation-info">

                <strong>
                    ${operation.recipient}
                </strong>

                <span>
                    ${operation.category}
                    •
                    ${operation.date}
                </span>

            </div>


            <div class="operation-amount amount-negative">

                -
                ${operation.amount.toLocaleString(
                    "fr-FR",
                    {
                        style:"currency",
                        currency:"EUR"
                    }
                )}

            </div>

        `;



        list.appendChild(item);



    });








    operations
    .slice(0,3)
    .forEach(operation => {


        const item =
        document.createElement("div");



        item.className =
            "operation-item";



        item.innerHTML = `

            <div class="operation-info">

                <strong>
                    ${operation.recipient}
                </strong>

                <span>
                    ${operation.date}
                </span>

            </div>


            <div class="operation-amount amount-negative">

                -
                ${operation.amount.toLocaleString(
                    "fr-FR",
                    {
                        style:"currency",
                        currency:"EUR"
                    }
                )}

            </div>

        `;



        recent.appendChild(item);



    });



}








/* =====================================
   NETTOYAGE FORMULAIRE
===================================== */


function clearOperationForm(){


    document.getElementById("recipient")
    .value = "";



    document.getElementById("amount")
    .value = "";



    document.getElementById("description")
    .value = "";



}








/* =====================================
   SAUVEGARDE LOCALE
===================================== */


function saveOperations(){


    localStorage.setItem(

        "bank_operations",

        JSON.stringify(operations)

    );


}








/* =====================================
   CHARGEMENT DES DONNEES
===================================== */


function loadOperations(){


    const saved =
        localStorage.getItem(
            "bank_operations"
        );



    if(saved){


        operations =
            JSON.parse(saved);


    }



    displayOperations();


    updateBalance();


}





loadOperations();/* =====================================
   RECHERCHE HISTORIQUE
===================================== */


const searchInput =
    document.getElementById(
        "search-operation"
    );



if(searchInput){


    searchInput.addEventListener(
        "input",
        function(){


            const search =
                this.value
                .toLowerCase()
                .trim();



            const items =
                document.querySelectorAll(
                    ".operation-item"
                );



            items.forEach(item => {


                const text =
                    item.textContent
                    .toLowerCase();



                if(
                    text.includes(search)
                ){

                    item.style.display =
                        "flex";

                }

                else {

                    item.style.display =
                        "none";

                }


            });


        }

    );


}








/* =====================================
   VERIFICATION SESSION
===================================== */


function checkSession(){


    const connected =
        localStorage.getItem(
            "connected"
        );



    if(connected === "true"){


        document
        .getElementById(
            "login-page"
        )
        .hidden = true;



        document
        .getElementById(
            "client-space"
        )
        .hidden = false;


    }



}







/* =====================================
   ENREGISTREMENT CONNEXION
===================================== */


loginButton.addEventListener(
    "click",
    function(){


        const username =
            document
            .getElementById("username")
            .value.trim();



        const password =
            document
            .getElementById("password")
            .value;




        if(
            username === USER_ACCOUNT.username &&
            password === USER_ACCOUNT.password
        ){


            localStorage.setItem(
                "connected",
                "true"
            );


        }


    }

);








/* =====================================
   MODIFICATION DECONNEXION
===================================== */


document
.getElementById("logout-button")
.addEventListener(
    "click",
    function(){


        localStorage.removeItem(
            "connected"
        );


    }

);








/* =====================================
   INITIALISATION
===================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        checkSession();


        loadOperations();


    }

);
