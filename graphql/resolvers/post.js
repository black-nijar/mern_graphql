const Post = require('../../models/Post');
const auth = require('../../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    // CREATE POST
    async createPost(_, { body }, context) {
      const user = auth(context);
      // Create new Post
      const newPost = new Post({
        body,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      // Save post to mongoDB
      const post = await newPost.save();
      return post;
    },

    // DELETE POST
    async deletePost(_, { postId }, context) {
      const user = auth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.deleteOne();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    // ADD COMMENT
    createComment: async (_, { postId, body }, context) => {
      const { username } = auth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be emty'
          }
        });
      }

      // Find post
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },

    // DELETE COMMENT
    async deleteComment(_, { postId, commentId }, context){
      const { username } = auth(context);

      const post  = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(comm => comm.id === commentId);

        if (post.comments[commentIndex].username === username){
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else throw new AuthenticationError('Action not allowed')
      } else throw new UserInputError('Post not found')
    }
  }
};
