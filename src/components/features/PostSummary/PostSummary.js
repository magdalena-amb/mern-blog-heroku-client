import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './PostSummary.scss';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import cutText from '../../../utils/cutText';

import Button from '../../common/Button/Button';
import SmallTitle from '../../common/SmallTitle/SmallTitle';

const PostSummary = ({ id, title, content, author }) => (
  <article className='post-summary'>
    <SmallTitle>{title}</SmallTitle>
    <HtmlBox>{cutText( content, 120 )}</HtmlBox>
    <p>Author: {author} </p>
    <Link to={`/posts/${id}`} >
      <Button variant='primary'>Read more</Button>
    </Link>
    <Link to={`/posts/edit/${id}`} >
      <Button variant='danger'>Update post</Button>
    </Link> 
  </article>
);

PostSummary.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
};

export default PostSummary;