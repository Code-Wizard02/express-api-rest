import express from 'express';
import userRoutes from './user.js'

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use("/users", userRoutes)

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Corriendo en: http://localhost:${port}`);
});






