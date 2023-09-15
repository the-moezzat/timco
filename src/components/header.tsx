import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const NavLink = styled(Link)`
  /* className="font-medium italic hover:underline" */
  font-weight: 500;
  font-style: italic;
  &:hover {
    text-decoration: underline;
  }
`;
const Header = () => {
  return (
    <header className="flex items-center justify-center max-sm:text-sm">
      <ul className="flex items-center gap-8 max-sm:gap-4 justify-center border-y px-4 ">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/current">Current</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Writing</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">Pics</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
