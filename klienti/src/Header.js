// import React from 'react';
// import './Navbar.css';

// const Header = () => {
//   return (
//     <nav className="navbar">
//     <div className="container">
//     <h1 className="navbar__logo" title="Hospital Management System">HMS</h1>
//       <ul className="navbar__list">
//         <li className="navbar__item"><a href="/Doki" className="navbar__link">Doktori</a></li>
//         <li className="navbar__item"><a href="/Infcrud" className="navbar__link">Infermieri</a></li>
//         <li className="navbar__item"><a href="/" className="navbar__link">Recepsionisti</a></li>
//         <li className="navbar__item"><a href="/" className="navbar__link">Pacienti</a></li>
//       </ul>
//     </div>
//   </nav>
// );
// };

// export default Header;
import React, { useState } from 'react';
import './Navbar.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleHover = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="navbar">
      <div className="container">
      {/* <h1 className="navbar__logo" onMouseEnter={handleHover} onMouseLeave={handleHover}>
          {expanded ? "Hospital Management System" : "HMS"}
        </h1> */}
        <h1 className="navbar__logo" onMouseEnter={handleHover} onMouseLeave={handleHover}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYYuts7OIowNO0D3K3WVNx9S36WxX664As8fCDTQeXg&s" alt="Logo" className="logo-image" />
          {expanded ? "ospital Management System" : ""}
        </h1>
        <ul className="navbar__list">
          <li className="navbar__item"><a href="/Doki" className="navbar__link">Doktori</a></li>
          <li className="navbar__item"><a href="/Infcrud" className="navbar__link">Infermieri</a></li>
          <li className="navbar__item"><a href="/" className="navbar__link">Recepsionisti</a></li>
          <li className="navbar__item"><a href="/" className="navbar__link">Pacienti</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
