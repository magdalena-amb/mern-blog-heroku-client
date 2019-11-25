import { connect } from 'react-redux';
import React from 'react';
import { getPosts, loadPostsByPageRequest, getRequest, getPages } from '../../../redux/postsRedux';
import Posts from  './Posts';



const PostsContainer = ({ pagination=true, postsPerPage=5, children, ...otherProps }) => (
    
        <Posts {...otherProps} pagination={pagination} postsPerPage={postsPerPage} >
            {/* {children} */}
        </Posts>
    )


const mapStateToProps = state => ({
    posts: getPosts(state),
    request: getRequest(state),
    pages: getPages(state),
    initialPage: state.posts.presentPage

});

const mapDispatchToProps = dispatch => ({
    loadPostsByPage: (page, postsPerPage) => dispatch(loadPostsByPageRequest(page, postsPerPage)),
});

export default connect(mapStateToProps, mapDispatchToProps )(PostsContainer);