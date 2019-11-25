import { connect } from 'react-redux';
import { getRequest, addPostRequest, clearRequest } from '../../../redux/postsRedux';
import PostForm from './PostForm';


const mapStateToProps = state => ({
  request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({ 
    addPost: (post) => dispatch(addPostRequest(post)),
    clearRequest: () => dispatch( clearRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);