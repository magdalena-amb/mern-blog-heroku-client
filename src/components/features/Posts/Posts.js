import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

class Posts extends Component  {

  // state = {
  //   pagination: true,
  //   postsPerPage: 5
  // }

  loadPostsPage = (page) => {
    const { loadPostsByPage,  postsPerPage } = this.props;
    //let { postsPerPage } = this.state; 

    loadPostsByPage(page, postsPerPage );
  }

  componentDidMount() {
    const { loadPostsByPage, initialPage,   postsPerPage} = this.props; 
    //const { postsPerPage } = this.state;
    loadPostsByPage(initialPage, postsPerPage);  
    
  }   

  render() {
        const { posts, request, pages, initialPage, pagination } = this.props;
        //const { pagination } = this.state;
        const { loadPostsPage} = this;

    return (
      <div>
        { (request.pending === false && request.success && posts.length === 0) && <Alert variant = 'info'>No posts yet.</Alert>} 
        { (request.pending || request.success === null) && < Spinner />}
        { (request.success && posts.length > 0) && 
        <div> 
          <PostsList posts={ posts } />
          {pagination && (
              <Pagination pages={pages} onPageChange={ loadPostsPage }
              initialPage={ initialPage }
               />
          )} 
        </div>}
        { (request.pending === false && request.error !== null) && <Alert variant = 'error'>{ request.error }</Alert>} 
       
      </div>
    );
  }

};

Posts.propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      })
    ),
    loadPostsByPage: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    pages: PropTypes.number.isRequired,
    initialPage: PropTypes.number.isRequired,
    pagination: PropTypes.bool.isRequired,
    postsPerPage: PropTypes.number.isRequired
  };

export default Posts;