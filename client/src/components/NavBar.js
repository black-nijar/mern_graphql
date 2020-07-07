import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'shareApp' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = ({ name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name={user.username} active as={Link} to='/' />

      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='shareApp'
        active={activeItem === 'shareApp'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default NavBar;
