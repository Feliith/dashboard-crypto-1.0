import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/userContext'

import Main from "./components/Main"
import Dashboard from './components/Dashboard'
import Wallet from "./components/Wallet"
import Chart from './components/Chart'
import News from './components/News'
import Login from "./components/Login"
import Register from './components/Register'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Main />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/news" element={<News />} />
              <Route path="/login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
