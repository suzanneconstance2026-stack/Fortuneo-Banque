/* ======================================
   DATABASE DU SITE
====================================== */


const usersDatabase = [

    {


        id: 1,


        username: "450893127",

        password: "K9#pZ!m7$",



        profile: {

            firstName: "Edmond",

            lastName: "Garnier",

            initials: "EG",

            email: "edmond.garnier@example.com",

            phone: "06 00 00 00 01"


        },



        account: {


            name: "Compte courant",

            balance: 758557.00,

            status: "Compte disponible",


            bankingDetails: {


                iban: "FR76 0000 0000 0000 0000 001",

                bic: "FTNBFRPPXXX",

                accountNumber: "000000001"


            }


        },






        card: {


            type: "Carte Premium",

            number: "4582",

            holder: "EDMOND GARNIER",

            expiry: "12/29",

            status: "Active"


        },






        operations: [

            {

                date: "15/01/2026",

                label: "Virement reçu",

                category: "Crédit",

                amount: "+5 000,00 €"


            },


            {

                date: "20/01/2026",

                label: "Paiement carte",

                category: "Paiement",

                amount: "-245,60 €"


            },


            {

                date: "02/02/2026",

                label: "Prélèvement automatique",

                category: "Débit",

                amount: "-89,99 €"


            },


            {

                date: "12/02/2026",

                label: "Virement bancaire",

                category: "Transfert",

                amount: "-1 200,00 €"


            },


            {

                date: "25/02/2026",

                label: "Versement",

                category: "Crédit",

                amount: "+3 500,00 €"


            }


        ],






        notifications: [

            "Votre espace personnel est à jour.",

            "Une nouvelle opération est disponible.",

            "Pensez à vérifier vos informations personnelles."


        ]

    },









    {


        id: 2,


        username: "975899351",

        password: "D#8@Z!B€$",




        profile: {


            firstName: "Brigitte",

            lastName: "Garnier",

            initials: "BG",

            email: "brigitte.garnier@example.com",

            phone: "06 00 00 00 02"


        },






        account: {


            name: "Compte courant",

            balance: 1351254.50,

            status: "Compte disponible",




            bankingDetails: {


                iban: "FR76 0000 0000 0000 0000 002",

                bic: "FTNBFRPPXXX",

                accountNumber: "000000002"


            }


        },








        card: {


            type: "Carte Premium",

            number: "7741",

            holder: "BRIGITTE GARNIER",

            expiry: "06/30",

            status: "Active"


        },








        operations: [

            {

                date: "10/01/2026",

                label: "Versement",

                category: "Crédit",

                amount: "+8 000,00 €"


            },


            {

                date: "18/01/2026",

                label: "Achat carte bancaire",

                category: "Paiement",

                amount: "-340,20 €"


            },


            {

                date: "01/02/2026",

                label: "Facture mensuelle",

                category: "Débit",

                amount: "-125,00 €"


            },


            {

                date: "15/02/2026",

                label: "Virement personnel",

                category: "Transfert",

                amount: "-2 000,00 €"


            },


            {

                date: "28/02/2026",

                label: "Entrée de fonds",

                category: "Crédit",

                amount: "+4 200,00 €"


            }


        ],






        notifications: [

            "Votre historique a été actualisé.",

            "Votre carte est disponible dans votre espace.",

            "Votre sécurité est activée."


        ]

    }


];





let connectedUser = null;
