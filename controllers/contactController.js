const asyncHandler = require('express-async-handler');
const { constants } = require('../constants');
const Contact = require('../models/contactModel');

// @desc  Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  if (contacts && contacts.length > 0) {
    res.status(200).json(contacts);
  } else {
    res.status(404).json({ message: 'No contacts found for this user' });
  }
});

// @desc  Create a new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res, next) => {
  console.log('The Request body is :', req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(constants.BAD_REQUEST).json({
      error: true,
      message: 'Please provide a name, email address, and phone number',
    });
    return;
  }

  if (!req.user || !req.user.id) {
    res.status(constants.UNAUTHORIZED).json({
      error: true,
      message: 'User not authorized',
    });
    return;
  }

  // Here you can add code to create the new contact in your database
  const newContact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(constants.CREATED).json({
    success: true,
    message: 'Contact created successfully',
    contact: newContact,
  });
});

// @desc  Get contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(constants.NOT_FOUND).json({
      error: true,
      message: 'Contact not found',
    });
    return;
  }

  res.status(constants.SUCCESS).json({
    success: true,
    data: contact,
  });
});

// @desc  Update a contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(constants.NOT_FOUND).json({
      error: true,
      message: 'Contact not found',
    });
    return;
  }

  // Check if the contact belongs to the user making the request
  if (contact.user_id.toString() !== req.user.id) {
    res.status(constants.UNAUTHORIZED).json({
      error: true,
      message: 'You are not authorized to update this contact',
    });
    return;
  }

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(constants.BAD_REQUEST).json({
      error: true,
      message: 'Please provide a name, email address, and phone number',
    });
    return;
  }

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  const updatedContact = await contact.save();

  res.status(constants.SUCCESS).json({
    success: true,
    message: 'Contact updated successfully',
    contact: updatedContact,
  });
});

// @desc  Delete a contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res, next) => {
  const result = await Contact.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    res.status(constants.NOT_FOUND).json({
      error: true,
      message: 'Contact not found',
    });
    return;
  }

  res.status(constants.SUCCESS).json({
    success: true,
    message: 'Contact deleted successfully',
  });
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContact,
};
