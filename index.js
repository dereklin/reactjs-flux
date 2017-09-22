const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      Task = require('./models/task').Task,
      app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/to-do', (err) => {
  err && console.error(err);
});    

app.use(express.static('deploy'));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.set('view engine', 'ejs');
app.get("/", (req, res) => {
  res.render('blank', {
    title: 'Mastering Flux',
    body: '<div id="root"></div>'
  });
});

app.get('/all', (req, res) => {
  Task.find({}, (err, tasks) => {
    res.send(tasks);
  });
});

app.post('/add-task', (req, res) => {
  const task = new Task(req.body);

  task.save((err, task) => {
    if (err || !task) {
      // deal with problem
    }
  });

  res.send(task);
});

app.post('/remove', (req, res) => {
  const _id = req.body._id;
  console.log(_id);
  Task.remove({_id}, (err) => {
    console.log(err);
    res.send({removed: Boolean(!err)});
  });
});

app.listen(3000, () => {
  console.log('we are running a server on port 3000')
});
