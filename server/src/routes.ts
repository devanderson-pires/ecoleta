import express from 'express';

import PointsController from './controllers/PointsControllers';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// lista os itens de coleta
routes.get('/items', itemsController.index);

// Cadastro de ponto de coleta
routes.post('/points', pointsController.create);

// lista um ponto de coleta específico
routes.get('/points/:id', pointsController.show);

// lista pontos filtrados
routes.get('/points', pointsController.index);

export default routes;
