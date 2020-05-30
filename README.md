# Adonis task manager application

This is the task manager application REST API's build in AdonisJs.

## Setup

Use the npm command to install adonisjs cli

```bash
npm i -g @adonisjs/cli
```

To start new adonis js app run this command

```bash
adonis new yardstick
```

Use the npm command to install node packages

```bash
npm install
```

### Migrations

Setup postgresql database connection using .env

```bash
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=0Uzop6gc8veSXkJcGpKG3EcfA6JvcZlP
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_DATABASE=adonis
SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```

Run the following command to run startup migrations.

```js
adonis migration:run
```

Run the following command to run startup seeds.

```js
adonis seed
```

### Create User

Run the following command to create users.

```js
adonis create:user
```

### Run

Run the following command to run app.

```js
adonis serve --dev
```

### Adonis website

[For more information] (https://adonisjs.com)


### Api document

[Click here for using REST API's] (https://documenter.getpostman.com/view/1457532/SzYgQuWg)