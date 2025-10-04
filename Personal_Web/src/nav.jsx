import "./css/nav.css";


function Nav() {
    return (
    <> 
      <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <div className="nav__brand">
          <a href="#" className="nav__logo">Erik Tierendi</a>
        </div>

        <ul className="nav__list" id="nav-list">
          <li className="nav__item"><a href="#home" className="nav__link" id="home">Home</a></li>
          <li className="nav__item"><a href="#about" className="nav__link" id="about">About</a></li>
          <li className="nav__item"><a href="#projects" className="nav__link" id="project">Projects</a></li>
          <li className="nav__item"><a href="#contact" className="nav__link" id="contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    </>
)}

export default Nav;