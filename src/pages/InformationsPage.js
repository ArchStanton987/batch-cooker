import React from 'react'

import Section from '../components/page_layout/Section'
import '../sass/pages/_Informations.scss'

export default function InformationsPage() {
  return (
    <>
      <div className="informations page">
        <h2>Informations</h2>
        <Section>
          <h3>A propos de Batch Cooker ....</h3>
          <h4>Concept</h4>
          <p>
            Batch Cooker est une application web qui vise à stocker vos recettes de cuisine, gérer
            votre inventaire d'ingrédients et générer des listes de courses. <br />
            L'objectif est de pouvoir générer rapidement et facilement des listes de courses, en
            fonction de des recettes que vous envisagez de préparer et des ingrédients que vous avez
            déjà en inventaire.
          </p>
          <hr />
          <h4>Notes</h4>
          <ul>
            <li>
              <p>
                <strong>
                  - Vous pouvez avoir un délai important lors de votre première connexion au site (10
                  à 20 secondes). Ceci est dû au fonctionnement de l'hébergeur. Après un certain
                  temps d'inactivité, le serveur se met en veille.
                </strong>
              </p>
            </li>
            <li>
              <p>
                <strong>
                  - L'appli est toujours en développement. Il est possible de rencontrer des bugs.
                </strong>
              </p>
            </li>
            <li>
              <p>
                <strong>
                  - Afin d'utiliser toutes les fonctionnalités de l'appli, il est nécessaire de créer
                  un compte. Etant donné qu'aucune vérification d'email n'est pour l'instant
                  effectuée, il est possible de créer un compte et de se connecter en quelques
                  secondes.
                </strong>
              </p>
            </li>
          </ul>
          <hr />
          <h4>Utilisation</h4>
          <ul>
            <li>
              <p>
                - Accueil : vous pouvez y rechercher les recettes enregistrées en base de données et
                les consulter.
              </p>
            </li>
            <li>
              <p>
                - Inventaire : vous pouvez enregistrer les ingrédients que vous avez déjà en votre
                possession.
              </p>
            </li>
            <li>
              <p>
                - Recettes favorites : vous pouvez y retrouver toutes les recettes que vous aurez
                enregistrées comme favorites. Pour mettre une recette en favoris, cliquez sur le
                bouton étoile lorsque vous êtes sur la page d'une recette.
              </p>
            </li>
            <li>
              <p>
                - Liste de courses : on peut ajouter un à un les ingrédients sur une liste de course.
                Toutefois, l'objectif est de générer cette liste automatiquement via la page "menu".
              </p>
            </li>
            <li>
              <p>
                - Menu : toutes les recettes peuvent être ajoutées au "Menu". Le menu est une série de
                recettes que l'on prévoit de préparer dans les jours à venir. Une fois que l'on a
                sélectionné les recettes que l'on souhaite cuisiner, il est alors possible de
                générer la liste de courses avec les ingrédients contenus dans toutes les recettes
                du menu. <br />
                L'appli adaptera la liste selon les ingrédients déjà présents dans l'inventaire ou
                dans la liste de course. <br />
                L'appli peut convertir les volumes (l, cl, ml) et les masses (kg, g). Pour les
                autres unités, les quantités sont simplement additionnées. <br />
                <br />
                <strong>
                  Pour que la liste de courses créée soit exacte, le nom des ingrédients doit
                  correspondre parfaitement (attention aux formes, singulier, pluriel, etc.). Si ce
                  n'est pas le cas, un même ingrédient écrit de deux manières différentes se
                  retrouvera dans la liste de courses.
                </strong>
              </p>
            </li>
          </ul>
          <hr />
          <h4>Futur</h4>
          <p>D'autres fonctionnalitées pourraient être ajoutées à l'avenir. Celles-ci incluent :</p>
          <ul>
            <li>
              <p>- Possibilité pour un utilisateur de commenter une recette</p>
            </li>
            <li>
              <p>- Système de notation des recettes</p>
            </li>
            <li>
              <p>- Un calendrier pour organiser les recettes</p>
            </li>
            <li>
              <p>- La possibilité d'enregistrer un menu entier (un batch cooking... !)</p>
            </li>
            <li>
              <p>- Divers améliorations d'interface</p>
            </li>
          </ul>
          <hr />
          <h4>Donnez votre avis sur le code, ou l'interface utilisateur !</h4>
          <p>
            Lien vers mon profil{' '}
            <a href="https://github.com/ArchStanton987" rel="noopener noreferrer" target="_blank">
              GitHub
            </a>
          </p>
        </Section>
      </div>
    </>
  )
}
