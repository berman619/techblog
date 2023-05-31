const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sess = {
  secret: 'nO88bOllW6GTOwi4T2kiRy75vcUnICy9DQ5ZJLdZmVkC79lAfz2Sc4JLF8c',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: { secure: false }
};

app.use(session(sess));

// app.use(routes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
  })
  .catch((error) => {
    console.error('Unable to sync the database:', error);
  });