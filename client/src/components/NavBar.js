import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'shareApp' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = ({ name }) => setActiveItem(name);

  return (
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
};

export default NavBar;
