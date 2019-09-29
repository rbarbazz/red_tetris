# Sujet + correction

## PARTIE OBLIGATOIRE

### Fonctionalités du jeu:
- [x] Jeu solo avec addresse: http://.../#room[nickname]
- [x] Jeu multi avec addresse, partie terminée quand il ne reste qu'un joueur. Seul le master peut lancer. On ne peut pas rejoindre une partie en cours
- [x] Plusieurs parties simultanés
- [x] Le master peut relancer la partie, si il quitte, un autre devient master etc... entre temps, de nouveaux joueurs peuvent rejoindre.
- [x] Les pièces sont identiques pour les joueurs (ordres, positions etc...)
- [x] Les pièces tournent (mini 1 touche), vont droite/bas/gauche, tombe direct. Possibilité de de bouger une pièce pendant 1 tick une fois lock
- [x] Insertion d'une ligne incassable en bas du terrain aux adversaires à chaque ligne détruite

### Interface graphique:
- [x] Aucune balise, pas de canvas/svg, pas de DOM, mais un layout flexbox
- [x] Affichage du spectre des adversaires identifié par leur nom, maj temps réel

### Implémentation client:
- [x] socket.io par redux
- [x] Aucun appel à this (sauf pour sous-classes d'error), pures fonctions uniquement

Implémentation serveur:
- [x] Logique en POO

Tests unitaires:
- [ ] npm run coverage doit indiqué 70% statements, functions, lines et 50% branches

## BONUS

### Slider libre 0 à 5
- [ ] Lobby avancé avec connexion par pseudo, création de parties paramétrés, affichage infos, rejoindre une partie, timeline infos, mode spectateur
- [ ] Taux de tests unitaires très largement supérieur au sujet (100% client, 100% serveur ?)
- [ ] Plusieurs type de parties, implémentation des guidelines officielles (SRS, 7-bag, timer etc...)
- [x] Site responsive toute plateforme/format
- [ ] Sauvegarde des highscores par pseudo persistant
- [ ] Musique activable/desactivable
- [ ] C'est pas moche, y'a des couleurs, quelques animations etc... ça tourne bien, sympa à jouer...
- [ ] ???
