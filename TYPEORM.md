* Migrations

Pour commencer à faire les migrations, on doit avoir : 
- Une application qui tourne avec des entités métiers
- Une data-source qui permet à notre CLI de communiquer avec la DB

Structure de la data-source => La "même" que le ForRoot
```
type: 'postgres',
host: 'db',
port: 5432,
username: 'housing',
password: '1234',
database: 'housing',
// dropSchema: true,
// synchronize: true,
autoLoadEntities: true,
logging: 'all',
```

Le fichier data-source généralement se trouve à la racine avec le nom data-source.ts

Le fichier data-source.ts va contenir une datasource avec sa définition

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'housing',
  password: '1234',
  database: 'housing',
  // dropSchema: true,
  // synchronize: true,
  logging: 'all',
});
```

Le binary a utilisé pour le CLI est : `typeorm-ts-node-commonjs`

Les commandes à utiliser sont les suivantes : 
- migration:show => Voir la liste des migrations et indique celles qui sont déjà appliquées
- migration:run => Execute toutes les migrations qui ne sont pas cochées dans show
- migration:generate => Calcule le delta entre le schéma actuel et le schéma désiré. Insert ensuite les modifications dans la migration
- migration:create => Génère une migration vide
