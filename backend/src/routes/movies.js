const express = require('express');
const { getRandomMovieController } = require('../controllers/movieController');
const router = new express.Router();

router.get('/movie/', getRandomMovieController);

module.exports = router;