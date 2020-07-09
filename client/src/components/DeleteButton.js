import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';
import {
  FETCH_POSTS_QUERY,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION
} from '../util/graphql';

const DeleteButton = ({ postId, commentId, callback }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
   
  // MUTATION
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setIsOpenModal(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter(post => post.id !== postId) }
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId }
  });
  return (
    <Fragment>
      <Popup
        content={commentId ? 'Delete comment' : 'Delete post'}
        trigger={
          <Button
            as='div'
            color='red'
            onClick={() => setIsOpenModal(true)}
            floated='right'
          >
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        onConfirm={deletePostOrMutation}
      />
    </Fragment>
  );
};

export default DeleteButton;
