import HttpError from "../helpers/HttpError.js";
import contactModel from "../models/contact.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import compareMongoIds from "../helpers/compareMongoIds.js";

const { Contact } = contactModel;

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const condition = { owner };
  if (favorite !== undefined) {
    condition.favorite = favorite;
  }

  const result = await Contact.find(condition, "", {
    skip,
    limit,
  }).populate("owner", "subscription");

  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findById(id);
  const isValidOwner = compareMongoIds(_id, result.owner);

  if (!result || !isValidOwner) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findById(id);
  const isValidOwner = compareMongoIds(_id, contact.owner);

  if (!contact || !isValidOwner) {
    throw HttpError(404, "Not Found");
  }
  const result = await Contact.findByIdAndDelete(id);

  res.json(result);
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findById(id);
  const isValidOwner = compareMongoIds(_id, contact.owner);

  if (!contact || !isValidOwner) {
    throw HttpError(404, "Not Found");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findById(id);
  const isValidOwner = compareMongoIds(_id, contact.owner);

  if (!contact || !isValidOwner) {
    throw HttpError(404, "Not Found");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  res.json(result);
};

const controls = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

export default controls;
