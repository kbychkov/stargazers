const express = require('express');
const router = express.Router();

const stargazers = require('../lib/stargazers');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/:owner/:repo', (req, res, next) => {
  res.render('stargazers', {
    url: `${req.path}/stargazers`
  });
});

router.get('/:owner/:repo/stargazers', (req, res, next) => {
  const { owner, repo } = req.params;

  stargazers(owner, repo).then(result => {
    const data = result.reduce((accumulator, { starred_at }) => {
      const date = starred_at.split('T')[0];
      accumulator[date] = date in accumulator ? accumulator[date] + 1 : 1;
      return accumulator;
    }, {});

    res.send(data);
  }).catch(next);
});

module.exports = router;
