import express from "express";
import authenticate from "../middlewares/authenticate.js";
import controls from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import contactModel from "../models/contact.js";
import isValidId from "../middlewares/isValidId.js";

const { createContactSchema, updateContactSchema, updateStatusContactSchema } =
  contactModel;

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, controls.getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, controls.getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, controls.deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  controls.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  authenticate,
  validateBody(updateContactSchema),
  controls.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  authenticate,
  validateBody(updateStatusContactSchema),
  controls.updateStatusContact
);

export default contactsRouter;
