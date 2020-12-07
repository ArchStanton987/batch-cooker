const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Recipe.bulkCreate(
      [
        {
          id: 1,
          creatorId: 1,
          name: 'poulet basquaise',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Poulet_basquaise_01.jpg/280px-Poulet_basquaise_01.jpg',
          url: 'https://www.marmiton.org/recettes/recette_poulet-basquaise_16969.aspx',
          guests: 6,
          content: `
            Hacher l'oignon et l'ail. Couper les tomates en morceaux et détailler les poivrons en lanières.
            Faire chauffer 4 cuillères à soupe d'huile dans une cocotte. Y faire dorer les oignons, l'ail et les poivron. Laisser cuire 5 min.
            Ajouter les tomates à la cocotte, saler, poivrer. Couvrir et laisser mijoter 20 min.
            Dans une sauteuse, faire dorer dans l'huile d'olive les morceaux de poulet salés et poivrés.
            Lorsqu'ils sont dorés, les ajouter aux légumes, couvrir, ajouter le bouquet garni et le vin blanc et c'est parti pour 35 min de cuisson.`
        },
        {
          id: 2,
          creatorId: 1,
          name: 'risotto au chorizo',
          image: 'https://assets.afcdn.com/recipe/20200828/113382_w600.jpg',
          url: 'https://www.marmiton.org/recettes/recette_risotto-au-chorizo_17724.aspx',
          guests: 4,
          content: ` Faire bouillir 1,5 litre d'eau puis ajoutez les 2 cubes de bouillon.
            Emincer les échalotes et couper le chorizo selon votre goût (en 2 ou en 4).
            Dans un fait-tout faire chauffer l'huile, faire revenir les échalotes 2 min, puis ajoutez le riz cru. Laisser chauffez jusqu'à ce que les grains deviennent translucides.
            Ajouter le bouillon au fur et à mesure jusqu'au raz du riz. Couvrir, et ajouter du bouillon quand le niveau du liquide est trop bas.
            Goûter le riz de temps en temps et continuer jusqu'à épuisement du bouillon.
            Ajouter la crème, le sel, le poivre, le paprika, le chorizo et le parmesan. Laisser cuire encore 5 min. `
        },
        {
          id: 3,
          creatorId: 1,
          name: 'magret de canard au miel',
          image: 'https://assets.afcdn.com/recipe/20180503/79000_w600.jpg',
          url:
            'https://www.marmiton.org/recettes/recette_magrets-de-canard-au-miel_11774.aspx#d79000-p2',
          guests: 2,
          content: ` Inciser les magrets côté peau en quadrillage sans couper la viande.
            Cuire les magrets à feu vif dans une cocotte en fonte, en commençant par le coté peau.
            Le temps de cuisson dépend du fait qu'on aime la viande plus ou moins saignante. Compter environ 5 min de chaque côté. Retirer régulièrement la graisse en cours de cuisson.
            Réserver les magrets au chaud (au four, couverts par une feuille d'aluminium).
            Déglacer la cocotte avec le miel et le vinaigre balsamique. Ne pas faire bouillir, la préparation tournerait au caramel. Bien poivrer.
            Mettre en saucière accompagnant le magret coupé en tranches. `
        },
        {
          id: 4,
          creatorId: 1,
          name: 'pâtes carbonara',
          image: 'https://assets.afcdn.com/recipe/20180716/81306_w600.jpg',
          url:
            'https://www.marmiton.org/recettes/recette_pates-a-la-carbonara_80453.aspx#d81306-p2',
          guests: 4,
          content: ` Cuire les pâtes dans un grand volume d'eau bouillante salée.
            Emincer les oignons et les faire revenir à la poêle. Dès qu'ils ont bien dorés, y ajouter les lardons.
            Préparer dans un saladier la crème fraîche, les oeufs, le sel, le poivre et mélanger.
            Retirer les lardons du feu dès qu'ils sont dorés et les ajouter à la crème.
            Une fois les pâtes cuite al dente, les égoutter et y incorporer la crème. Remettre sur le feu si le plat a refroidi. `
        },
        {
          id: 5,
          creatorId: 1,
          name: "harengs pomme à l'huile",
          image: 'https://assets.afcdn.com/recipe/20130627/43460_w600.jpg',
          url: 'https://www.cuisineactuelle.fr/recettes/hareng-pomme-a-l-huile-348661#',
          guests: 2,
          content: `Pelez les pommes de terre. Faites-les cuire dans une casserole remplie d’eau froide salée pendant une trentaine de minutes. Vérifiez la cuisson à l’aide de la pointe d’un couteau. Egouttez-les. Coupez-les en tranches.
          Otez la première peau de votre échalote et ciselez-la.
          Otez la première peau de vos oignons nouveaux puis coupez-les en rondelles. Séparez les anneaux.
          Dans un bol, mélangez le vinaigre avec du sel et du poivre puis ajoutez l’huile ainsi que l’échalote.
          Servez vos filets de harengs en les accompagnant de tranches pommes de terre. Arrosez l’ensemble de vinaigrette. Agrémentez d’anneaux d’oignons nouveaux.`
        },
        {
          id: 6,
          creatorId: 1,
          name: 'tarte aux pommes',
          image: 'https://assets.afcdn.com/recipe/20120905/13569_w600.jpg',
          url: 'https://www.marmiton.org/recettes/recette_tarte-aux-pommes_18588.aspx#d13569-p1',
          guests: 4,
          content: `Éplucher et découper en morceaux 4 Golden.
          Faire une compote : les mettre dans une casserole avec un peu d'eau (1 verre ou 2). Bien remuer. Quand les pommes commencent à ramollir, ajouter un sachet ou un sachet et demi de sucre vanillé. Ajouter un peu d'eau si nécessaire.
          Vous saurez si la compote est prête une fois que les pommes ne seront plus dures du tout. Ce n'est pas grave s'il reste quelques morceaux.
          Pendant que la compote cuit, éplucher et couper en quatre les deux dernières pommes, puis, couper les quartiers en fines lamelles (elles serviront à être posées sur la compote).
          Préchauffer le four à 210°C (thermostat 7).
          Laisser un peu refroidir la compote et étaler la pâte brisée dans un moule et la piquer avec une fourchette.
          Verser la compote sur la pâte et placer les lamelles de pommes en formant une spirale ou plusieurs cercles, au choix ! Disposer des lamelles de beurre dessus.
          Mettre au four et laisser cuire pendant 30 min max. Surveiller la cuisson. Vous pouvez ajouter un peu de sucre vanillé sur la tarte pendant que çà cuit pour caraméliser un peu.`
        },
        {
          id: 7,
          creatorId: 1,
          name: 'boudin blanc au maroilles',
          image:
            'https://www.ptitchef.com/imgupl/recipe/boudin-blanc-gratine-au-maroilles--md-423263p659412.jpg',
          url:
            'https://www.ptitchef.com/recettes/plat/boudin-blanc-gratine-au-maroilles-fid-1227497',
          guests: 4,
          content: `Préchauffer le four à 210°c.
            Découper le boudin en tronçons, et le mettre dans un petit plat à gratin individuel, mélanger la crème et la moutarde, saler, et verser sur le boudin blanc.
            Déposer sur le dessus le Maroilles.
            Enfourner 15 à 20 minutes, le temps que le tout soit bien doré.`
        }
      ],
      {
        fields: ['id', 'creatorId', 'name', 'image', 'url', 'guests', 'content']
      }
    )
    const existingRows = await models.Recipe.count();
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Recipes_id_seq" RESTART WITH ${existingRows + 1}`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recipes', null, {})
  }
}
