import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsControllers';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// lista os itens de coleta
routes.get('/items', itemsController.index);

// Cadastro de ponto de coleta
routes.post('/points', 
upload.single('image'), 
celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    uf: Joi.string().required().max(2),
    city: Joi.string().required(),
    items: Joi.string().required(),
  })
},{
  abortEarly: false
}),
pointsController.create);

// lista um ponto de coleta específico
routes.get('/points/:id', pointsController.show);

// lista pontos filtrados
routes.get('/points', pointsController.index);

export default routes;
