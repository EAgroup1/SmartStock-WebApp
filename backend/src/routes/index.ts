import { Router } from 'express';
import usersRouter from './users.routes';

const router: Router = Router();
router.use('/users', usersRouter);

/* lo exportamos para poder reutilizar esta pieza de código */
export default router;