import React, { Fragment } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from '../util/graphql';

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });
 
  // MUTATION
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {

    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: FETCH_POSTS_QUERY
    //   });
    //  // data.getPosts = [result.data.createPost, ...data.getPosts];
    //   proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: result.data.createPost, ...data.getPosts} });
    //   values.body = '';
    // },
    onError: err => {
      console.log('PostForm err', err);
    },
    variables: values,
    refetchQueries: [{ query: FETCH_POSTS_QUERY }]
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <h2>Share your thoughts:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Hi World!'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
            
          />
          <Button type='submit' color='teal'>
            Post
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className='ui error message' style={{ marginBottom: '20px' }}>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default PostForm;
