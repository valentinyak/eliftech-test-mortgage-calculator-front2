import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/management">Management</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
      </ul>
    </nav>
  );
}
