import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Movie  Express API with Swagger',
        version: '1.0.0',
        description: 'This is a simple Movie API application made with Express and documented with Swagger',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Rotalarınızın bulunduğu yolu uygun şekilde güncelleyin
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
