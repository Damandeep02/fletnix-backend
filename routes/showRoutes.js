const express = require('express');
const Show = require('../models/Show');
const router = express.Router();

router.get('/', async (req, res) => {
  const perPage = 15;
  const page = req.query.page || 1;
  const search = req.query.search || '';
  const type = req.query.type || '';

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { cast: { $regex: search, $options: 'i' } },
    ];
  }

  if (type) {
    query.type = type;
  }

  try {
    const totalShows = await Show.countDocuments(query);
    const totalPages = Math.ceil(totalShows / perPage);

    const shows = await Show.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({ shows, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;