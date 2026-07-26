/* ======================================
   BASE DE DONNÉES DU SITE
====================================== */


const usersDatabase = [


{

id:1,


username:"450893127",

password:"K9#pZ!m7$",



profile:{


firstName:"Edmond",

lastName:"Garnier",

initials:"EG",

email:"edmond.garnier@example.com",

phone:"06 00 00 00 01"


},



account:{


name:"Compte courant",

balance:758557.00,

status:"Compte disponible",



bankingDetails:{


iban:"FR76 0000 0000 0000 0000 001",

bic:"FTNBFRPPXXX",

accountNumber:"000000001"


}


},






card:{


type:"Carte Premium",

number:"4582",

holder:"EDMOND GARNIER",

expiry:"12/29",

status:"Active"


},






operations:[



{

id:1,

date:"05/01/2023",

label:"Virement entrant",

category:"Crédit",

description:"Réception de fonds",

reference:"VIR-20230105-001",

amount:"+25 000,00 €"


},



{

id:2,

date:"18/02/2023",

label:"Paiement carte bancaire",

category:"Carte",

description:"Achat professionnel",

reference:"CB-20230218-452",

amount:"-245,80 €"


},



{

id:3,

date:"04/05/2023",

label:"Prélèvement automatique",

category:"Débit",

description:"Facture mensuelle",

reference:"PRE-20230504-883",

amount:"-129,90 €"


},



{

id:4,

date:"22/07/2023",

label:"Virement sortant",

category:"Transfert",

description:"Transfert bancaire",

reference:"VIR-20230722-741",

amount:"-5 000,00 €"


},



{

id:5,

date:"12/11/2023",

label:"Versement reçu",

category:"Crédit",

description:"Entrée de fonds",

reference:"VER-20231112-111",

amount:"+15 000,00 €"


},



{

id:6,

date:"15/03/2024",

label:"Paiement carte",

category:"Carte",

description:"Achat en ligne",

reference:"CB-20240315-982",

amount:"-79,50 €"


},



{

id:7,

date:"08/09/2024",

label:"Virement reçu",

category:"Crédit",

description:"Transfert entrant",

reference:"VIR-20240908-455",

amount:"+8 500,00 €"


},



{

id:8,

date:"20/01/2025",

label:"Abonnement",

category:"Prélèvement",

description:"Service mensuel",

reference:"PRE-20250120-332",

amount:"-39,99 €"


},



{

id:9,

date:"15/06/2025",

label:"Virement bancaire",

category:"Transfert",

description:"Opération bancaire",

reference:"VIR-20250615-778",

amount:"-2 500,00 €"


},



{

id:10,

date:"10/01/2026",

label:"Salaire",

category:"Crédit",

description:"Versement mensuel",

reference:"SAL-20260110-100",

amount:"+6 250,00 €"


}


],






notifications:[


"Nouvelle opération disponible.",

"Votre espace personnel est sécurisé.",

"Votre relevé est disponible."

]


},







{

id:2,


username:"975899351",

password:"D#8@Z!B€$",




profile:{


firstName:"Brigitte",

lastName:"Garnier",

initials:"BG",

email:"brigitte.garnier@example.com",

phone:"06 00 00 00 02"


},



account:{


name:"Compte courant",

balance:1351254.50,

status:"Compte disponible",



bankingDetails:{


iban:"FR76 0000 0000 0000 0000 002",

bic:"FTNBFRPPXXX",

accountNumber:"000000002"


}


},





card:{


type:"Carte Premium",

number:"7741",

holder:"BRIGITTE GARNIER",

expiry:"06/30",

status:"Active"


},






operations:[


{

id:1,

date:"12/02/2023",

label:"Versement",

category:"Crédit",

description:"Entrée de fonds",

reference:"VER-20230212-001",

amount:"+20 000,00 €"


},



{

id:2,

date:"25/04/2023",

label:"Paiement carte",

category:"Carte",

description:"Achat magasin",

reference:"CB-20230425-552",

amount:"-350,40 €"


},



{

id:3,

date:"10/08/2023",

label:"Prélèvement",

category:"Débit",

description:"Facture mensuelle",

reference:"PRE-20230810-332",

amount:"-180,00 €"


},



{

id:4,

date:"19/01/2024",

label:"Virement entrant",

category:"Crédit",

description:"Transfert reçu",

reference:"VIR-20240119-909",

amount:"+12 000,00 €"


},



{

id:5,

date:"30/06/2024",

label:"Paiement carte",

category:"Carte",

description:"Achat internet",

reference:"CB-20240630-221",

amount:"-560,75 €"


},



{

id:6,

date:"05/02/2025",

label:"Virement sortant",

category:"Transfert",

description:"Opération bancaire",

reference:"VIR-20250205-661",

amount:"-4 000,00 €"


},



{

id:7,

date:"15/12/2025",

label:"Entrée de fonds",

category:"Crédit",

description:"Versement",

reference:"VER-20251215-777",

amount:"+9 800,00 €"


}



],






notifications:[


"Votre historique a été mis à jour.",

"Une opération récente est disponible.",

"Votre sécurité est activée."


]


}


];



let connectedUser = null;
