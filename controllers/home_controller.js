const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 21);

    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title : "Codeial | Home",
    //         posts : posts
    //         });
    // });

   try{
    //populate the user of ecch post
   let posts = await Post.find({})
    // to sort post in an order by date
   .sort('-createdAt')
   .populate('user')
   .populate({
       path : 'comments',
       populate : {
           path : 'user',
       }
   });
   

    let users = await User.find({});

    return res.render('home',{
        title : "Codeial | Home",
        posts : posts,
        all_users : users
       });

   }catch(err){
        console.log('Error', err);
        return;
   }
}

//module.exports.actionname = function(req, res){}

// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()