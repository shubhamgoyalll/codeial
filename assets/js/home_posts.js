{
    // method to submit the form data for new post using AJAX so that it does not refresh everytime
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
                    // must have space before .
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

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
             <a class="delete-post-button" href="/posts/destroy/${ post._id }" ><bold style="color: red;">X</bold></a>
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

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }










    createPost();
}