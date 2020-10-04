{
    // method to submit the form data using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                // serialize converts it into json form
                data : newPostForm.serialize(),
                success : function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    // ul inside post list container and pre setting the post in list  
                    $('#posts-list-container>ul').prepend(newPost);
                },error : function(err){
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
         <small>
             <a class="delete-post-button" href="/posts/destroy/${ post.id }" ><bold style="color: red;">X</bold></a>
         </small>

         Post -
             ${post.content}
         <br>
         <small> User who posted -
                 ${ post.user.name }
         </small>
        </p>
        <div class="post-comments">
     
             <form action="/comments/create" method="POST">
                 <input type="text" name="content" placeholder="Type here to add Comment.." required>
                 <input type="hidden" name="post" value="${ post._id }">
                 <input type="submit" value="Add Comment">
             </form>
    
             <div class="post-comments-list">
                 <ul id="post-comments-${ post._id }">
                    
                 </ul>
    
             </div>
        </div>
     </li>`)
    }
    createPost();
}