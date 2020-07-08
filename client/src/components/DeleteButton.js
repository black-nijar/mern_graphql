import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const DeleteButton = ({ postId, callback }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setIsOpenModal(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: data.getPosts.filter(post => post.id !== postId) }
      });
      if (callback) callback();
    },
    variables: { postId }
  });
  return (
    <Fragment>
      <Button
        as='div'
        color='red'
        onClick={() => setIsOpenModal(true)}
        floated='right'
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        onConfirm={deletePost}
      />
    </Fragment>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
export default DeleteButton;
