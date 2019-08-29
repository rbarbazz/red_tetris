/*
- Quand le client envoie une requête au serveur -> il attend systématiquement une réponse
- Quand le serveur envoie une requête -> il n'attend PAS de réponse du client
- La réponse du serveur est: event SERVER_RESPONSE
  - Cas échec: type ERROR + error code + error message
  - Cas succès: type SUCCESS + payload demandé

Events de gestion des connexions (inscriptions, lobby, déconnexions...):
  Client:
    - Connexion avec pseudo (pour entrer dans le lobby)
    - Recuperer les infos du lobby (rooms + personnes connectées)
    - Rejoindre une partie (la créer si elle n'existe pas, et spectateur si une partie est en cours)
    - Lancer une partie (que le master)
    - Quitter une partie (quitte la partie en cours et retourne au lobby)

  Serveur:
    - Déconnecter un client

  Commun:
    - Ping/Pong
    - Deconnexion propre

Events en jeu (une fois la partie lancée pour les joueurs présents):
  Client:
    - Envoyer les inputs (fléches de déplacement, autres...)
    - ... c'est tout ?

  Serveur:
    - Envoie des données initiales au lancement de la partie
    - Envoie des "ticks" (enclencher le mouvement, infos des spectres/scores etc...,
        aussi pour le 1er tick de départ)
    - Fin de la partie (pour un joueur ayant fini, il doit attendre les autres avant de recevoir le
        rapport de fin, il passe spectateur en attendant)
    - Envoie du rapport de fin de partie (quand tous les joueurs présents ont finis)
    - ... c'est tout ?

NBs cas pratiques:
  - Si un joueur quitte la partie, il y aura une infos dans le payload du "ticks",
      pour que les autres clients puissent ajouter un message dans le timeline ?
  - Si un client passe master pendant une partie, il le saura à la fin de la partie ?
  - Si le serveur timeout sur un client, alors il le déco et delete tout sur lui
      (+ préviens les autres normalement)
  - Si il n'y a plus aucun joueur dans la partie, le serveur delete la room


Event SERVEUR_RESPONSE {
  type: msgType,          -> same as the client request
  error: int,             -> 0 = success, >0 = error code
  message: string,        -> message to print to client (even if no error, can be usefull)
  payload: object         -> data requested by client
}
*/

// Type of player when he join a party
export const playerType = {
  NONE: 'none',
  MASTER: 'master',
  SLAVE: 'slave',
  SPECTATOR: 'spectator',
};

// Socket.io custom type of message (socket.on(eventType)
export const eventType = {
  GAME: 'GAME',
  LOBBY: 'LOBBY',
  SERVER_RESPONSE: 'SERVER_RESPONSE',
};

export const msgType = {
  // Common type (2-way)
  PINGPONG: 'PINGPONG',
  DISCONNECT: 'DISCONNECT',
  // only sent by client to server
  CLIENT: {
    CONNECT_WITH_NAME: 'CONNECT_WITH_NAME', // Connect to lobby with a nickname
    GET_LOBBY: 'GET_LOBBY', // Retrieve lobby informations
    JOIN_PARTY: 'JOIN_PARTY', // Join a party (create/join/spectator)
    START_PARTY: 'START_PARTY', // Only for master
    LEAVE_PARTY: 'LEAVE_PARTY', // Anyone
  },
  // only sent by server to clients
  SERVER: {
    DISCONNECT_CLIENT: 'DISCONNECT_CLIENT',
    GAME_INIT: 'GAME_INIT',
    GAME_TICK: 'GAME_TICK',
    GAME_END: 'GAME_END',
    GAME_REPORT: 'GAME_REPORT',
  },
};
