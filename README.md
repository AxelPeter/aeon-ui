# Aeon UI

## Utilisation

Ces ressources doivent être compilées avec _Grunt_ pour être utilisable. Les fichiers compilés sont ajoutés dans un dossier `/public`. Ce dossier et les fichiers qu'il contient ne doivent pas être archivé sur _GIT_.

Un wiki est disponible dans les fichiers compilés. Il contient toutes les informations pour l'installation du thème, les composants et les icônes.

## Développement

### Récupération et installation des paquets _NPM_/_Bower_

Pour installer le projet, lancer la commande `npm install` depuis le dossier contenant le fichier `package.json`.

Une commande `postinstall` s'occupera automatiquement de récupérer les fichiers de `bower.json`, ainsi que de la compilation des fichiers avec `grunt`

### Compilation _Grunt_

Lancer les commandes grunt depuis le dossier contenant `gruntfile.js`.

`grunt` (default)

* V&eacute;rifie les erreurs JavaScript;
* Compile les fichiers et les copie dans le dossier `/public`.

**Cette commande est prévue pour la production.**

`grunt dev`

* V&eacute;rifie les erreurs JavaScript;
* Compile les fichiers avec une configuration _dev_;
* Lance une tache _watch_ pour recompiler les fichiers modifiés.

**Cette commande est prévue pour le développement.**

### Compatibilit&eacute; des navigateurs

* Internet Explorer (10+) / Edge (Version courante et pr&eacute;c&eacute;dente)
* Chrome (Version courante et pr&eacute;c&eacute;dente)
* Firefox (Version courante et pr&eacute;c&eacute;dente)