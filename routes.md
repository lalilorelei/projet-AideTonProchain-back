# Routes

| URL | Titre | Description de la page | Méthode HTTP | Controller | Méthode | commentaire |
| --- | ----- | ---------------------- | ------------ | ---------- | ------- | ----------- |

| `/` | Home | HomePage | GET | MainController | home | |
| `/contact` | Contact | Formulaire | GET | MainController | contact | |
| `/contact` | Contact | Traitement du formulaire | POST | MainController | contactPost | |

## Route donneur

| `/register` | Inscription | formulaire d'inscription | GET | DonorController | register | |
| `/register` | Inscription | Traitement du formulaire d'inscription | POST | DonorController | registerPost | |
| `/connexion` | Connexion | formulaire de connexion | GET | DonorController | connexion | |
| `/connexion` | Connexion | formulaire de connexion | POST | DonorController | connexionPost | |
| `/profil` | Mon compte | Page profil du donateur connecté | GET | DonorController | profile | |
| `/profil_update` | Mon compte | Modification du profile du donateur | GET | DonorController | profilUpdate | |
| `/profil-update` | Mon compte | Modification du profile du donateur | POST | DonorController | profilUpdatePost | |
| `/localisation` | Localisation | Localisation du doneur et choix de la liste | GET | DonorController | localisation |
| `/beneficary` | Liste de bénéficiaire | Liste des bénéficaires à proximité de la localistaion | GET | DonorController | localisationBeneficiary | |
| `/beneficary/[id]` | détail du bénéficiaire | Liste des bénéficaires à proximité de la localistaion | GET | BeneficairyController | localisationBeneficiary | |
| `/shopkeeper` | Liste de commerçants | Liste des commerçants à proximité de la localistaion | GET | DonorController | localisationShopKeeper | |
| `/shopkeeper/[id]` | détail du commerçant | Détail du commerçant à proximité de la localistaion séléctionné| GET | ShopKeeperController | localisationShopKeeper | |
| `/donations` | Dons effectués| Liste des dons effectués en cours et consommés | GET | DonationController | donations |
| `/donations/[id]` | Don effectué | détail du don en cours ou consommé | GET | DonationController | donations | |

## Route beneficiaire

| `/register` | Inscription | formulaire d'inscription | GET | BeneficiaryController | register | |
| `/register` | Inscription | Traitement du formulaire d'inscription | POST | BeneficiaryController | registerPost | |
| `/connexion` | Connexion | formulaire de connexion | GET | BeneficiaryController | connexion | |
| `/connexion` | Connexion | formulaire de connexion | POST | BeneficiaryController | connexionPost | |
| `/profil` | Mon compte | Page profil du bénéficiaire connecté | GET | BeneficairyController | profile | |
| `/profil-update` | Mon compte | Modification du profile du bénéficiaire | GET | BeneficairyController | profilUpdate |
| `/profil-update` | Mon compte | Modification du profile du bénéficiaire | POST | BeneficairyController | profilUpdatePost | |
| `/donations` | Dons reçus | Liste des dons reçus en cours et consommés | GET | DonationController | donations | |
| `/donations/[id]` | Don reçu| détail du don reçu | GET | DonationController | donations | |
| `/shopkeeper-details` | Détails du commerçant | Détails du commerçant séléctionné | GET | BeneficiaryController | shopKeeperDetails | |

## Route commerçant

| `/register` | Inscription | formulaire d'inscription | GET | ShopKeeperController | register | |
| `/register` | Inscription | Traitement du formulaire d'inscription | POST | ShopKeeperController | registerPost | |
| `/connexion` | Connexion | formulaire de connexion | GET | ShopKeeperController | connexion | |
| `/connexion` | Connexion | formulaire de connexion | POST | ShopKeeperController | connexionPost | |
| `/profil` | Mon compte | Page profil du commerçant connecté | GET | ShopKeeperController | profile | |
| `/profil-update` | Mon compte | Modification du profile du commerçant | GET | ShopKeeperController | profilUpdate | |
| `/profil-update` | Mon compte | Modification du profile du commerçant | POST | ShopKeeperController | profilUpdatePost | |
| `/products` | liste des produits | Liste des produits du commerçant | GET | ShopKeeperController | listProducts | |
| `/products/[id]` | Détail du produit | Détail du produit séléctionné | GET | ShopKeeperController | product | |
| `/products/[id]` | Détail du produit | Modification/Suppression du détail du produit séléctionné | POST | ShopKeeperController | productPost | |
| `/donations` | Dons | Liste des dons en cours et consommés | GET | DonationController | donations | |
| `/donations/[id]` | Don en cours ou consommé | détail du don en cours ou consommé | GET | DonationController | donations | |
