'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Recipes',
      [
        {
          id: 1,
          creatorId: 1,
          name: 'tournedos au gibolin',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Glass_of_Red_Wine_with_a_bottle_of_Red_Wine_-_Evan_Swigart.jpg/280px-Glass_of_Red_Wine_with_a_bottle_of_Red_Wine_-_Evan_Swigart.jpg',
          url: 'https://fr.wikipedia.org/wiki/Vin',
          guests: 4,
          content:
            '1) Saisir le tournedos avec une dose généreuse de saindoux à feu vif pendant 3 minutes. \n 2) Arroser avec 10cl de gibolin, ajouter du persil \n 3) Dégustez'
        },
        {
          id: 2,
          creatorId: 1,
          name: 'salade de quinoa',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Quinoa_cuit.JPG/220px-Quinoa_cuit.JPG',
          url: 'https://fr.wikipedia.org/wiki/Quinoa',
          guests: 4,
          content:
            "1) Faire cuire du quinoa \n 2) Laver et égouttez la salade \n 3) Ajouter de l'huile d'olive et des autres trucs"
        },
        {
          id: 3,
          creatorId: 1,
          name: 'magret au four',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Magret_de_canard_et_foie_gras.jpg/280px-Magret_de_canard_et_foie_gras.jpg',
          url: 'https://fr.wikipedia.org/wiki/Magret',
          guests: 4,
          content:
            "Dégraissez le magret à l'aide d'un couteau, coupez en dés très fins et picorez en apéritif"
        },
        {
          id: 4,
          creatorId: 2,
          name: 'tartiflette sucrée',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Tartiflette_4.jpg/280px-Tartiflette_4.jpg',
          url: 'https://fr.wikipedia.org/wiki/Tartiflette',
          guests: 4,
          content:
            "Découper les pommes de terre, le reblochon et les oignons. Ajouter une dose généreuse de vore pâte à tartiner favorite. Pressez les pommes de terre jusqu'à obtenir une fine purée. Faites une montagne avec la purée avec une petite rigole par dessus. Ajouter le sirop d'érable au dessus de votre purée. Avec un peu d'échalote, c'est délicieux !"
        },
        {
          id: 5,
          creatorId: 2,
          name: "harengs pomme à l'huile",
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Aringa-marinato.jpg/220px-Aringa-marinato.jpg',
          url: 'https://fr.wikipedia.org/wiki/Harengs_marin%C3%A9s',
          guests: 4,
          content: 'Je peux vous en faire un ramequin, vous vous ferez une idée.'
        },
        {
          id: 6,
          creatorId: 3,
          name: 'blanquette de veau',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Blanquette_de_veau_%C3%A0_l%27ancienne_04.jpg/280px-Blanquette_de_veau_%C3%A0_l%27ancienne_04.jpg',
          url: 'https://fr.wikipedia.org/wiki/Blanquette_de_veau',
          guests: 4,
          content: 'Comment est votre blanquette ?'
        },
        {
          id: 7,
          creatorId: 1,
          name: 'glace au boudin',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Blood_sausage_made_in_Buryatia%2C_Russia.png/159px-Blood_sausage_made_in_Buryatia%2C_Russia.png',
          url: 'https://fr.wikipedia.org/wiki/Boudin_noir',
          guests: 4,
          content:
            "Du boudin fermier, bien malaxé, de l'huile (en fonction de son goût personnel), un peu de sirop (fraise, menthe, laissez travailler votre imagination !). Une recette originale proposée par Bruno Lochet. Avec ça, les gamins mangent leur charcuterie !"
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recipes', null, {})
  }
}
