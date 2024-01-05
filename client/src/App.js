import MyComponent from './Components/Mainpage/Mainpage';
import './App.css';
import Singin from './Components/Auth/Singin';
import Singup from './Components/Auth/Singup';
import userpage from './Components/Specific';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Components/Admin';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Singin} />
        <Route path='/singup' Component={Singup} />
        <Route exact path='/home' Component={MyComponent}/>
        <Route path='/admin' Component={Admin}/>
        <Route path='/user' Component={userpage}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
