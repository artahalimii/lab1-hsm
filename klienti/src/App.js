/*import CRUD from './CRUD';
import InfCrud  from './InfCrud ';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App(){
  return(
<div>
 <CRUD/>
<InfCrud />
</div>

  );
}

export default App;*/
/*import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CRUD from './CRUD';
import InfCrud  from './InfCrud ';
import Header  from './Header'; // Make sure this import is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Doktori" element={<CRUD />} />
        <Route path="/InfCrud" element={<InfCrud />} />
        <Route path="/Header" element={<Header />} />
      </Routes>
    </Router>
  );
}

export default App;*/
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CRUD from './CRUD';
import InfCrud  from './InfCrud '; // Make sure this import is correct
import Header from './Header'; // Make sure this import is correct
// import RegisterForm from './LoginForm';
// import LoginForm from './LoginForm';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Doki" element={<CRUD />} />
        <Route path="/InfCrud" element={<InfCrud />} /> {/* Make sure this path is correct */}
        {/* <Route path="/Header" element={<Header />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;






