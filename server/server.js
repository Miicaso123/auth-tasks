const jsonServer = require('json-server');
const auth = require('json-server-auth');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(cors());
app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(auth);
app.use(router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`JSON Server with auth is running on http://localhost:${PORT}`);
});
