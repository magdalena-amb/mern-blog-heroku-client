import React from 'react';
import PostForm from '../../features/PostForm/PostForm';

const NewPost = ({match}) =>{
    //console.log(match.params.id);
    return(
        < PostForm post_id ={ match.params.id} />
    );   
};

export default NewPost;