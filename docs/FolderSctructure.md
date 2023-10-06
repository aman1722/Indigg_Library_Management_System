## MVC Structure

```js
├── index.js
├── config
|    └── db.js
├── models
|    └── user.model.js
|    └── blacklist.model.js
|    └── book.model.js
|    └── bookLog.model.js
├── routes
|    └── user.routes.js
|    └── admin.routes.js
|    └── book.routes.js
├──controllers
|    └── user.controllers.js
|    └── book.controllers.js
├──middlewares
|    └── auth.middleware.js
|    └── authorize.middleware.js
|    └── logger.middleware.js
|    └── rateLimiter.middleware.js
├──docs
|    └── EntityRealationDiagram.png
|    └── FolderStruture.md
|    └── swagger.js
|    └── ApiDocs.js
├──.env
├──.gitignore
├──access.logs
├──package.json
├──package-lock.json
├──README.md
```