const { Router } = require('express');
const router = Router();
const Contact = require('../model/contact');

router.get('/', async (req, res) => {
  const contacts = await new Contact().getAllContacts();

  res.render('index', { contacts });
});

router.post('/new-contact', async (req, res) => {
  /* Creating a new object with the data from the form. */
  const contact = new Contact(req.body);

  contact.save();

  res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
  const contact = new Contact();

  contact.delete(req.params.id);

  res.redirect('/');
});

module.exports = router;
