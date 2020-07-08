import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import SinglePost from './pages/SinglePost';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <NavBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost}/>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
