# Chat Mistral

App web minimale de chat avec l'API Mistral, utilisant le SDK TypeScript officiel [`@mistralai/mistralai`](https://github.com/mistralai/client-js).

- Modèle : `mistral-small-latest`
- Stack : Node.js + Express (serveur) / HTML + JS vanilla (client)
- La clé `MISTRAL_API_KEY` n'est utilisée **que côté serveur** (`server.mjs`) ; elle n'est jamais exposée au navigateur.

## Installation et lancement

Une seule commande prépare tout (crée `.env` s'il n'existe pas + installe les dépendances) :

```bash
npm run setup
```

Puis renseignez votre clé dans `.env` et lancez :

```bash
npm start        # production
npm run dev      # développement (rechargement auto via node --watch)
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000).

## Structure

```
server.mjs         Serveur Express + appel SDK Mistral (POST /api/chat)
public/index.html  Interface de chat (client)
.env.example       Modèle de configuration
```
