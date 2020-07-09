import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import { LIKE_POST_MUTATION } from '../util/graphql';

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);

  // LIKE & UNLIKE
  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  // MUTATION
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err);
    }
  });
  
  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to='/login' color='teal' basic>
      <Icon name='heart' />
    </Button>
  );
  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <Popup content={liked ? 'Unlike' : 'Like'} trigger={likeButton} />
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
