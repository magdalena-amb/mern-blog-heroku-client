import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import PageTitle from '../../common/PageTitle/PageTitle';

import { connect } from 'react-redux';
import { getSinglePost, getRequest, getRandomPostRequest } from '../../../redux/postsRedux';


class RandomPost extends Component {

  render() {
        const { singlePost, request } = this.props;
        
    return (
      <div className="random-post"> 
        { (request.pending || request.success === null) && < Spinner />}
        { request.success  && (
            <div>
                <PageTitle>{ singlePost.title }</PageTitle>
                <HtmlBox>{ singlePost.content }</HtmlBox>
                <p>Author: {singlePost.author} </p>
            </div> 
        )}
        { (request.pending === false && request.error !== null) && <Alert variant = 'error'>{ request.error }</Alert>} 
       
      </div>
    );
  }

};

RandomPost.propTypes = {
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
  getRandomPost: () => dispatch(getRandomPostRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps )(RandomPost);