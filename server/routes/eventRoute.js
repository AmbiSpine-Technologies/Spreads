import express from 'express';
import { isAuthenticatedUser } from '../middlewares/auth.js'; // Adjust the path as necessary
import { createEvent, getEventById, getUserEvents, updateEvent, deleteEvent } from '../controllers/eventController.js'; // Adjust the path as necessary

const routerEvent = express.Router();


routerEvent.route('/new').post(isAuthenticatedUser, createEvent);
routerEvent.route('/:id').get(isAuthenticatedUser, getEventById);
routerEvent.route('/user').get(isAuthenticatedUser, getUserEvents);
routerEvent.route('/:id').put(isAuthenticatedUser, updateEvent);

routerEvent.route('/:id').delete(isAuthenticatedUser, deleteEvent);

export default routerEvent;
