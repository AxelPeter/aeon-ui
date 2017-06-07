Ce thème est basé sur les frameworks Front-End **Bootstrap** (3.x) et **AngularJS** (1.5.x).<br />
Le Wiki du thème **ne comporte pas** la documentation de ces frameworks.

La compatibilité navigateur est prévu pour :

* Chrome
* Edge
* Firefox
* Internet Explorer (10+)

#### Bootstrap

Bootstrap **n'est pas requis** pour l'utilisation du thème car il est déjà intégré dans sa feuille de style.

La documentation complète de **Bootstrap** est disponible [ici](http://getbootstrap.com/).

#### AngularJS

Les nouveaux composants proposés par le thème **requiert** AngularJS pour leur utilisation.

La documentation complète de **AngularJS** est disponible [ici](https://angularjs.org/).

#### Angular UI Boostrap

Pour une utilisation des composants JavaScript de Bootstrap avec AngularJS, il vous faudra utiliser **UI Bootstrap** (2.x).

La documentation complète de **UI Bootstrap** est disponible [ici](https://angular-ui.github.io/bootstrap/).

Dans le cas où vous n'utilisez AngularJS, il vous faudra passer par les fichiers de Bootstrap pour faire fonctionner ses composants JavaScript (cf. [la documentation Bootstrap](http://getbootstrap.com/javascript/)).

<h3 id="download" ui-anchor>Téléchargements</h3>

Plusieurs moyens de téléchargement sont mis en place pour un démarrage rapide sur vos projets :

- via Git: `TODO`
- via [Bower](https://bower.io): `TODO`

#### Ce qui est inclus

Dans votre téléchargement Bower ou ZIP, vous trouverez les répertoires et les fichiers suivants :

```
dist/
├── css/
│   ├── ui-icons.css
│   └── ui-theme.css
├── js/
│   └── ui-theme.js
└── fonts/
    ├── ui-icons.eot
    ├── ui-icons.svg
    ├── ui-icons.ttf
    └── ui-icons.woff
```

Les fichiers CSS et JS fournis sont compilés et minifiés. Seule la récupération via Git nécessite une compilation [Grunt](http://gruntjs.com/) avec la commande `grunt`.

<h3 id="install-css" ui-anchor>Installation du Thème</h3>

Pour utiliser le style du thème dans votre projet, déclarez les fichiers `ui-theme.css` et `ui-theme.js` dans le HEAD de votre page.

```html
<link rel="stylesheet" href="css/ui-theme.css" />
<link rel="stylesheet" href="css/main.css" />

<script src="js/ui-theme.js"></script>
<script src="js/main.js"></script>
```