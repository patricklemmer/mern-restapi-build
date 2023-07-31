// Express imports
import express from 'express';

// Library imports
import { get, merge } from 'lodash';

// Database imports
import { getUserBySessionToken } from '../db/users';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserid = get(req, 'identity._id') as string;

    if (!currentUserid) {
      return res.sendStatus(403);
    }

    if (currentUserid.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['PATRICK-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
