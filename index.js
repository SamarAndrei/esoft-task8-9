const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const UserModel = require('./reposio/userDal'); 
const userRoutes = require('./routes/userRoutes');
const UserController = require('./controllers/userController');
const UserService = require('./services/userService');

const CarModel = require('./reposio/carDal'); 
const carRoutes = require('./routes/carRoutes');
const CarController = require('./controllers/carController');
const CarService = require('./services/carService');

const userService = new UserService(UserModel);
const userController = new UserController(userService);

const carService = new CarService(CarModel);
const carController = new CarController(carService);

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API Documentation',
            description: 'Description of my API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/carRoutes.js', './routes/userRoutes.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/api', userRoutes(userController));
app.use('/api', carRoutes(carController));


app.listen(3000, 'localhost', () => 
    console.log('Server listens http://localhost:3000')
);