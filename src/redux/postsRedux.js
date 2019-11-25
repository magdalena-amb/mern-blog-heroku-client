import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getPosts = ({ posts }) => posts.data;
export const getPostsCount = ({ posts }) => posts.data.length;
export const getRequest = ({ posts }) => posts.request;
export const getSinglePost = ({ posts }) => posts.singlePost;
export const getPages = ({ posts }) => Math.ceil(posts.amount / posts.postsPerPage);

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTIONS */

export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const CLEAR_STATE = createActionName('CLEAR_STATE');
export const GET_POST = createActionName('GET_POST');
export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE');

export const getPost = payload => ({payload, type: GET_POST});
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const clearState = () => ({ type: CLEAR_STATE });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const loadPostsByPage = payload => ({ payload, type: LOAD_POSTS_PAGE });

/* THUNKS */

export const loadPostsRequest = () => {
    return  async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/posts`);
            dispatch(loadPosts(res.data));
            dispatch(endRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }  
    }
}

export const getPostRequest = (post_id) => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/posts/${post_id}`);
            dispatch(getPost(res.data));
            dispatch(endRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }  
    }
}

export const getRandomPostRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/posts/random`);

            dispatch(getPost(res.data));
            dispatch(endRequest());

        } catch (err) {
            dispatch(errorRequest(err.message));
        }  
    }
}

export const updatePostRequest = (post_id, post) => {

    return async dispatch => {
        
        dispatch(startRequest());
        try {

            let res = await axios.put(`${API_URL}/posts/edit/${post_id}`, post);
            dispatch(endRequest());

        } catch (err) {
            dispatch(errorRequest(err.message));
        }  
    }
}

export const addPostRequest = (post) => { 

    return async dispatch => {

      dispatch(startRequest());
      try {
  
        let res = await axios.post(`${API_URL}/posts`, post);
        dispatch(endRequest());
  
      } catch(err) {
        dispatch(errorRequest(err.message));
      }
    };
  };

export const loadPostsByPageRequest = (page, postsPerPage) => {

    return async dispatch => {
  
      dispatch(startRequest());
      try {

        const startAt = (page - 1) * postsPerPage;
        const limit = postsPerPage;
  
        let res = await axios.get(`${API_URL}/posts/range/${startAt}/${limit}`);
  
        const payload = {
          posts: res.data.posts,
          amount: res.data.amount,
          postsPerPage,
          presentPage: page,
        };
  
        dispatch(loadPostsByPage(payload));
        dispatch(endRequest());

      } catch(e) {
        dispatch(errorRequest(e.message));
      }
  
    };
};


/* INITIAL STATE */

const initialState = {
    data: [],
    request: {
        pending: false,
        error: null,
        success: null,
    },
    singlePost : {},
    sent: false,
    amount: 0,
    postsPerPage: 5,
    presentPage: 1,
}

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POSTS:
        return { ...statePart, data: action.payload };
    case START_REQUEST:
        return { ...statePart, request: { pending: true, error: null, success: null } };
    case END_REQUEST:
        return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
        return { ...statePart, request: { pending: false, error: action.error, success: false } };
    case GET_POST: 
        return { ...statePart, singlePost: action.payload };
    case LOAD_POSTS_PAGE:
        return {
            ...statePart,
            postsPerPage: action.payload.postsPerPage,
            presentPage: action.payload.presentPage,
            amount: action.payload.amount,
            data: [...action.payload.posts],
            };

    case CLEAR_STATE:
        return { ...statePart,
             data: [],
            request: {
                pending: false,
                error: null,
                success: null,
            },
            sent: false,
            singlePost : {} };
    default:
        return statePart;
  }
};