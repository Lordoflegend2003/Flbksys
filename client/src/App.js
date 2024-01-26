import MyComponent from './Components/Mainpage/Mainpage';
import './App.css';
import Singin from './Components/Auth/Singin';
import Singup from './Components/Auth/Singup';
import Userpage from './Components/Specific';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Components/Admin';
import Newflight from './Components/Admin/Newbook';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Singin} />
        <Route path='/signup' Component={Singup} />
        <Route exact path='/home' Component={MyComponent}/>
        <Route path='/admin' Component={Admin}/>
        <Route path='/user' Component={Userpage}/>
        <Route path='/admin/nb' Component={Newflight}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
