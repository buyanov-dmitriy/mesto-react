import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__content">
      <img src={logo} alt="Логотип страницы" className="header__logo" />
    </header>
  )
}

export default Header;
