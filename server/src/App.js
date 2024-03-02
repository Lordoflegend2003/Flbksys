import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import Adminauth from "./Auth/Admin";
import AuthProvider from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Adminauth />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
