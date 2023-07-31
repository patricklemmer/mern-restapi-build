// Express imports
import express from 'express';

// Controller imports
import { updateUser, deleteUser, getAllUsers } from '../controllers/users';

// Middleware imports
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
