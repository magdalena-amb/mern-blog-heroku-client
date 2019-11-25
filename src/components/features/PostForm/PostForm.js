import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getRequest, addPostRequest, clearState, getSinglePost, getPostRequest, updatePostRequest } from '../../../redux/postsRedux';


// medium editor
import './PostForm.scss'
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css'; 

import TextField from '../../common/TextField/TextField';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Button from '../../common/Button/Button';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';

class PostForm extends React.Component {

    state = {
        post: {
          title: '' ,
          author: '',
          content:  '',
        },
        sent: false,
    }
   
  
  async componentDidMount(){

    const { getPost, post_id } = this.props;
    if (post_id) {
      await getPost(post_id);
      let singlePost = this.props.singlePost;
      this.setState({
        ...this.state,
        post: {
          title: singlePost.title,
          author: singlePost.author,
          content: singlePost.content,
        }
      });

    }   
  }
  componentWillUnmount(){
    const { clearState } = this.props;
    clearState();
  }

  addPost = (e) => {
    const { addPost } = this.props;
    const { post } = this.state;
    
    e.preventDefault();
    addPost(post);
    this.setState({ post: {title: '', author: '', content: ''}, sent: true });
  }

   updatePost = (e) => {
     const { updatePost, post_id } = this.props;
     const { post } = this.state;
  
     e.preventDefault();
      updatePost(post_id, post);
     this.setState({ ...this.state, sent: true });   
  }

  handleChange = (e) => {
    const { post } = this.state;
    this.setState({ post: { ...post, [e.target.name]: e.target.value }});
  }

  handleEditor = (text) => {
    const { post } = this.state;
    this.setState({ post: { ...post, content: text }});
  }


  render() {
    
    const { post, sent } = this.state;
    const { handleChange, handleEditor, addPost, updatePost } = this;
    const { request, singlePost } = this.props;
  
    if (singlePost.id ) {
      if(request.error) return <Alert variant="error">{request.error}</Alert>
      if(request.success && sent === true ) return <Alert variant="success">Post has been updated!</Alert>
      if(request.pending) return <Spinner />
      else return  (
        <form onSubmit={updatePost}>
          <TextField
            label="Title"
            value={post.title} 
            name="title"
            onChange={handleChange}
          />

          <TextField
            label="Author"
            value={post.author}
            name="author"
            onChange={handleChange}
          />

          <SectionTitle>Edit post content</SectionTitle>
          <Editor
              className="content-editor"
              text={post.content}
              options={{ placeholder: false, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'] } }}
              onChange={handleEditor}
            />
          <Button variant="primary">Update post</Button>
      </form>
      );
    } else  {
      if (request.error) return <Alert variant="error">{request.error}</Alert>
      if(request.success && sent === true) return <Alert variant="success">Post has been added!</Alert> 
      if(request.pending) return <Spinner />
      else return  (
          <form onSubmit= {addPost}>
            <TextField
              label="Title"
              value={post.title}
              name="title"
              onChange={handleChange}
            />

            <TextField
              label="Author"
              value={post.author}
              name="author"
              onChange={handleChange}
            />

            <SectionTitle>Edit post content</SectionTitle>
            <Editor
                className="content-editor"
                text={post.content}
                options={{ placeholder: false, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'] } }}
                onChange={this.handleEditor}
              />
            <Button variant="primary">Add post</Button>
          </form>
        );
    }
  }
}

PostForm.propTypes = {
  request: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  request: getRequest(state),
  singlePost: getSinglePost(state),
});

const mapDispatchToProps = dispatch => ({ 
    addPost: (post) => dispatch(addPostRequest(post)),
    clearState: () => dispatch( clearState()),
    getPost: (post_id ) => dispatch(getPostRequest(post_id)),
    updatePost: (post_id, post) =>(dispatch(updatePostRequest(post_id, post)))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
