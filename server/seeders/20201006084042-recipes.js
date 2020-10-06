'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Recipes',
      [
        { creatorId: 1, name: 'tournedos au gibolin', image: null, url: null, content: '1) Saisir le tournedos avec une dose généreuse de saindoux à feu vif pendant 3 minutes. \n 2) Arroser avec 10cl de gibolin, ajouter du persil \n 3) Dégustez' },
        { creatorId: 1, name: 'salade de quinoa', image: null, url: null, content: '1) Faire cuire du quinoa \n 2) Laver et égouttez la salade \n 3) Ajouter de l\'huile d\'olive et des autres trucs' },
        { creatorId: 1, name: 'magret au four', image: null, url: null, content: "Dégraissez le magret à l'aide d'un couteau, coupez en dés très fins et picorez en apéritif" },
        { creatorId: 2, name: 'tartiflette sucrée', image: null, url: null, content: "Découper les pommes de terre, le reblochon et les oignons. Ajouter une dose généreuse de vore pâte à tartiner favorite. Pressez les pommes de terre jusqu'à obtenir une fine purée. Faites une montagne avec la purée avec une petite rigole par dessus. Ajouter le sirop d'érable au dessus de votre purée. Avec un peu d'échalote, c'est délicieux !" },
        { creatorId: 2, name: "harengs pomme à l'huile", image: null, url: null, content: 'Je peux vous en faire un ramequin, vous vous ferez une idée.' },
        { creatorId: 3, name: 'blanquette de veau', image: null, url: null, content: 'Comment est votre blanquette ?' },
        { creatorId: 1, name: 'glace au boudin', image: null, url: null, content: "Du boudin fermier, bien malaxé, de l'huile (en fonction de son goût personnel), un peu de sirop (fraise, menthe, laissez travailler votre imagination !). Une recette originale proposée par Bruno Lochet. Avec ça, les gamins mangent leur charcuterie !" }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Recipes', null, {})
  }
}
