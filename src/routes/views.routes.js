import { Router } from 'express';

// import { usersController } from '../controllers/views/users.controller.js';
// import { usersDetailsController } from '../controllers/views/userDetails.controller.js';
const router = Router();

router.get('/', async (req, res) => {
	res.render('home');
});

// router.get('/users', usersController);
// router.get('/users/details/:id', usersDetailsController);

export default router;
