// Express imports
import express from 'express';

// Router imports
import authentication from './authentication';
import users from './users';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  return router;
};
