import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import PageTitle from '../../common/PageTitle/PageTitle';
import { FaFacebookF } from 'react-icons/fa';
import './SinglePost.scss';

import { FacebookProvider, Comments, ShareButton } from 'react-facebook';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { getSinglePost, getRequest, getPostRequest } from '../../../redux/postsRedux';
import { BASE_URL } from '../../../config';


class SinglePost extends Component {
    
    componentDidMount() {
        const { getPost, post_id } = this.props;
        getPost(post_id);
      }   

  render() {
        const { singlePost, request } = this.props;
        
    return (
      <div className="single-post"> 
        { (request.pending || request.success === null) && < Spinner />}
        { request.success  && (
            <div>
                <PageTitle>{ singlePost.title }</PageTitle>
                <p>Author: {singlePost.author} </p>
                <HtmlBox>{ singlePost.content }</HtmlBox>
        
                <FacebookProvider appId="1464353420407801">
                <ShareButton className='btnFacebook' href={BASE_URL}>
                  <FaFacebookF/>
                  Share
                </ShareButton>
                
                  <Comments href={BASE_URL} />
                </FacebookProvider>
                
            </div> 
        )}
        { (request.pending === false && request.error !== null) && <Alert variant = 'error'>{ request.error }</Alert>} 
       
      </div>
    );
  }

};

SinglePost.propTypes = {
    getPost: PropTypes.func.isRequired,
    singlePost: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  };

const mapStateToProps = state => ({
  singlePost: getSinglePost(state),
  request: getRequest(state),
});

const mapDispatchToProps = (dispatch ) => ({
  getPost: (post_id ) => dispatch(getPostRequest(post_id)),
});

//export default withRouter(props => <SinglePost {...props}/>);

export default withRouter(connect(mapStateToProps, mapDispatchToProps )((props => <SinglePost {...props}/>)));