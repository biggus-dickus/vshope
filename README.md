# vshope

Your typical REST client for an online shop, written in `Bun`, `TypeScript`, `Express.js` and `Sequelize`. The DB is powered by `PostgreSQL`.

Features:

- JWT-based user authentication and authorisation
- REST API for CRUD operations with entities (products, categories, users, etc.)
- User input validation with `Zod` (not all endpoints are covered, 'cause I'm lazy)
- Automatic DB seeding

## DB Seeding

Start the server and run `bun --bun seed`.
