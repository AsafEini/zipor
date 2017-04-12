
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds159670.mlab.com:59670/asaftodo');

var todoSchema = new mongoose.Schema({
    username: String,
    item: String,
    todoDate: String
});

var Todo = mongoose.model('Todo',todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function(app){

    app.get('/todo/:username',function(req,res){
        var suffix = req.params.username;
        Todo.find({username: suffix},function(err,data){
            if (err) throw err;



            function custom_sort(a, b) {
                return new Date(a.todoDate).getTime() - new Date(b.todoDate).getTime();
            }
            var sortingTheData = data;


            var sortedResults =sortingTheData.sort(custom_sort);




            res.render('todo',{todo: data,id: suffix});
        });

    });

    app.post('/todo',urlencodedParser,function(req,res){

        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        })
    });


    app.delete('/todo/:item',function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);

        })
    });

};