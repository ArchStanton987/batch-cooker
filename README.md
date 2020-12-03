[english](#english) // [français](#français)
## **[https://batch-cooker.herokuapp.com](https://batch-cooker.herokuapp.com)**

***

# [Batch Cooker](https://batch-cooker.herokuapp.com)

<a name="english"></a>
Batch Cooker is a web app that aims to facilitate with storing cooking recipes, managing ingredients inventory and shopping lists.

***


## Purpose

Beyond the utilities of this application, this app was created to both valorize and develop my skills as a young web developper.

***

## Tech stack

- Front-end : React
- Back-end : Node.js / Express / Sequelize

***

## Notes

- `Users may experience a few seconds delay on the first connexion (10 to 20 seconds), as the host policies on free tier hosting put the server under "sleep" mode after some time of inactivity.`
- `The app is still in development process, one might encounter some issues or bugs.`
- `In order to use all the features of the app, it is required to create an account. As email are not verified, nor used yet, it takes only a few seconds to sign up and log in.`

***

## Features

- **Home page**: displays random recipes, search for a recipe within the database.
- **Favorite recipes**: keep track of recipes which are bookmarked as favorites
- **Inventory**: one can save ingredients he already possess
- **Shopping list**: one can keep track with the ingredients needed, or wishes to purchase
- **Menu**: Any recipe can be put in the "menu". A menu is a set of recipes one intends to cook in the upcoming days. Once the set of recipe is complete, we can add all the ingredients to the shopping list. The app will take care of adapting quantities, regarding what is already in inventory or already in the shopping list. The app can convert volumes (l, cl, ml) and weights (kg, g). However for other unit, quantities will simply be added.
`The ingredients names needs to match exactly (singular, plural, etc.) for the list to be exact. Or else, you will end up with two times the same ingredient, just written differently.`

***

## Future

Other features might be implemented in the future, including, but not limited to :
- Possibility for a user to comment recipes
- Rating system of recipes
- A calendar to schedule recipes
- Possibility to save a full menu, a 'batch cooking'
- Various UI improvements

***

## Feedback about the code, or user interface

* As a junior developper, who's eager to improve and develop his skills, all feedbacks, remarks and suggestions are welcome !
* In this current version, the code has many room for improvements and refactoring. This is done periodically.
* So far, automated tests are not functionnal anymore. Both app and API evolved, and I was more eager to deploy promptly the app than keep up with all endpoints testing. However it is intented to be fixed in the future.


\
\
\
\
\
\
<a name="français"></a>
# [Batch Cooker](https://batch-cooker.herokuapp.com)

Batch Cooker est une application web qui vise à stocker vos recettes de cuisine, gérer votre inventaire d'ingrédients et générer des listes de courses.

***

## Objectifs

Au delà de des fonctionnalités de cette application, elle a été créée pour me permettre de valoriser et de continuer à développer mes compétences en tant que jeune développeur web. 

***

## Stack technique

- Front-end : React
- Back-end : Node.js / Express / Sequelize

***

## Notes

- `Vous pouvez avoir un délai important lors de votre première connexion au site (10 à 20 secondes). Ceci est dû au fonctionnement de l'hébergeur sur le système d'hébergement gratuit. Après un certain temps d'inactivté, le serveur se met en veille.`
- `L'appli est toujours en développement. Il est possible de rencontrer des bugs.`
- `Afin d'utiliser toutes les fonctionnalités de l'appli, il est nécessaire de créer un compte. Etant donné qu'aucune vérification d'email n'est pour l'instant effectuée, il est possible de créer un compte et de se connecter en quelques secondes.`

***

## Fonctionnalités

- **Accueil**: affiche des recettes au hasard, permet de rechercher une recette dans la base de données
- **Recettes favorites**: permet de retrouver les recettes que l'on a enregistrées comme favorites
- **Inventaire** : un utilisateur peut enregistrer les ingrédients qu'il a déjà en sa possession
- **Liste de courses** : un utilisateur peut créer une liste de courses
- **Menu** : toutes les recettes peuvent être ajoutées au "Menu". Le menu est une série de recette que l'on prévoit de préparer dans les jours à venir. Une fois que l'on a sélectionné les recettes que l'on souhaite cuisiner, il est alors possible de générer la liste de courses avec les ingrédients contenus dans toutes les recettes du menu. L'appli adaptera la liste selon les ingrédients déjà présents dans l'inventaire ou dans la liste de course. L'appli peut convertir les volumes (l, cl, ml) et les masses (kg, g). Pour les autres unités, les quantités sont simplement additionnées. 
`Pour que la liste de courses créée soit exacte, le nom des ingrédients doit correspondre parfaitement (attention aux formes, singulier, pluriel, etc.). Si ce n'est pas le cas, un même ingrédient écrit de deux manières différentes se retrouvera dans la liste de courses.` 

***

## Futur

D'autres fonctionnalitées pourraient être ajoutées à l'avenir. Celles-ci incluent :
- Possibilité pour un utilisateur de commenter une recette
- Système de notation des recettes
- Un calendrier pour organiser les recettes
- La possibilité d'enregistrer un menu entier (un batch cooking... !)
- Divers améliorations d'interface

***

## Donnez votre avis sur le code, ou l'interface utilisateur !

* En tant que jeune développeur toujours prêt à apprendre et m'améliorer, tout les avis, retours ou suggestions concernant l'appli sont les bienvenus !
* Dans sa version actuelle, il y a encore beaucoup de place pour améliorer et refactoriser le code. Ceci est réalisé de manière périodique.
* Actuellement, les tests ne sont plus fonctionnels. L'appli et l'API ont beaucoup évolués. A un certain moment, la priorité a été mise sur l'avancement et le déploiement de l'application, plutôt que sur le test systématique de l'API. Il est toutefois prévu de récupérer ce retard.

