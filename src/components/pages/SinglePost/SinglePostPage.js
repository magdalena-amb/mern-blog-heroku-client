import React from 'react';
import SinglePost from '../../features/SinglePost/SinglePost';


const SinglePostPage = ( {match} ) => {
  
    const { params: { id } } = match;
    return (
      <div>
        < SinglePost post_id = { id } />
      </div>
      
    );
};

export default SinglePostPage;