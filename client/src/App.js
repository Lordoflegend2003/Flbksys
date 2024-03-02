import MyComponent from "./Components/Mainpage/Mainpage";
import Singin from "./Components/Auth/Singin";
import Singup from "./Components/Auth/Singup";
import Userpage from "./Components/Specific";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import AuthProvider from "./Context/AuthContext";
import Adminauth from "./Components/Auth/Adminauth";
import Newflight from "./Components/Admin/Newbook";
import Booktickets from "./Components/Mainpage/Booktickets";
import { useContext, useState } from "react";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/booktickets" Component={Booktickets} />
          <Route path="/" Component={Singin} />
          <Route path="/adminauth" Component={Adminauth} />
          <Route path="/signup" Component={Singup} />
          <Route path="/admin" Component={Admin} />
          <Route path="/home" Component={MyComponent} />
          <Route path="/user" Component={Userpage} />
          <Route path="/admin/nb" Component={Newflight} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
