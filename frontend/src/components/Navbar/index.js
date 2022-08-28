import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks } from './NavbarElements';
import { animateScroll as scroll} from 'react-scroll'

const Navbar = ({ toggle} ) => {
  
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >=80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, []);
  
  const toggleHome = () => {
    scroll.scrollToTop()
  }



  return (
    <>
    <IconContext.Provider value={{ color:'#fff' }}>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to='/' onClick={toggleHome}>SofL</NavLogo>
          <NavMenu>
            <NavItem>
              <NavLinks to='start'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Начало работы</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='output'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-80}
              >
                Результат</NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
    </>
  );
};

export default Navbar;