function checkTalkRateRequired(req, res, next) {
    const { talk } = req.body;
    if (!talk.rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
  next();
}

function checkTalkRate1a5(req, res, next) {
    const { talk } = req.body;
    if (talk && talk.rate < 1) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
      } if (talk && talk.rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
      }

    next();
}

module.exports = { checkTalkRateRequired, checkTalkRate1a5 };