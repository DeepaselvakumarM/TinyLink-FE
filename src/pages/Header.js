import { Link } from "react-router-dom";
import "../index.css"


const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">TinyLink</Link>

        <nav className="nav">
          <Link to="/" className="nav-item">Dashboard</Link>
          <Link to="/about" className="nav-item">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
