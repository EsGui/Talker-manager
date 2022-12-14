function checkTalkWatchedAt(req, res, next) {
    const { talk } = req.body;
    // O Regex abaixo de validação de data eu peguei no course.
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
      } if (talk.watchedAt && !dateRegex.test(talk.watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      }

    next();
}

module.exports = checkTalkWatchedAt;