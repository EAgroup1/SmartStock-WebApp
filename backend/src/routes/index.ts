import { Router } from 'express';
import usersRouter from './users.routes';
import lotRouter from './lot.routes';

const router: Router = Router();

router.use('/users', usersRouter);
router.use('/lots', lotRouter);


/* lo exportamos para poder reutilizar esta pieza de código */
export default router;