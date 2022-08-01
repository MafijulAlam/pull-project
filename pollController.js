const Poll = require('./pull');

exports.createGetController = (req, res, next) => {
  res.render('create');
};

exports.createPostController = async (req, res, next) => {
  let { title, description, options } = req.body;

  options = options.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });

  let poll = new Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect('/polls');
  } catch (e) {
    console.log(e);
  }

  res.render('create');
};

exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find();
    res.render('polls', { polls });
  } catch (e) {
    console.log(e);
  }
};

exports.viewPortGetController = async (req, res, next) => {
  let id = req.params.id;

  try {
    let poll = await Poll.findById(id);
    let options = [...poll.options];
    let result = [];
    options.forEach((option) => {
      let percentage = (option.vote * 100) / poll.totalVoat;
      result.push({
        ...option._doc,
        percentage: percentage ? percentage : 0,
      });
    });

    res.render('viewPoll', { poll, result });
  } catch (e) {
    console.log(e);
  }
};

exports.viewPortPostcontroller = async (req, res, next) => {
  let id = req.params.id;
  let optionId = req.body.option;

  try {
    let poll = await Poll.findById(id);
    let options = [...poll.options];

    let index = options.findIndex((o) => o.id === optionId);
    options[index].vote = options[index].vote + 1;
    let totalVoat = poll.totalVoat + 1;
    await Poll.findOneAndUpdate(
      { _id: poll._id },
      { $set: { options, totalVoat } }
    );
    res.redirect('/polls/' + id);
  } catch (e) {
    console.log(e);
  }
};
