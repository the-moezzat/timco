import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const NavItem = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;

  &.active {
    background-color: #f1f3f5;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white p-1 rounded-md ">
      <ul className="flex items-center gap-1">
        <li>
          <NavItem to="gallery">Gallery</NavItem>
        </li>
        <li>
          <NavItem to="blog">Blog</NavItem>
        </li>
        <li>
          <NavItem to="current">Current</NavItem>
        </li>
      </ul>
      <Link to="/">
        <Button
          variant={'outline'}
          size={'sm'}
          className="max-md:text-xs max-md:h-7"
        >
          Back to Main
        </Button>
      </Link>
    </header>
  );
}
