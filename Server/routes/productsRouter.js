import express from 'express';
import { productsController } from '../controllers/productsConttroller.js';

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/', productsController.getById);
router.post('/:id', productsController.add);
router.delete('/:id', productsController.delete);
router.put('/:id', productsController.update);

export default router;
