import './App.css';
import { Routes, Route } from "react-router-dom";

import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './store'

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Users from './components/Users'
import UserProfile from './components/UserProfile';

import LoginRegister from './pages/LoginRegister'
import Register from './pages/Register';
import Notification from './pages/Notification';
import SendMessage from './components/SendMessage';
import EditProfile from './pages/EditProfile';
import AccountActiviation from './pages/AccountActivation';

function App() {
  return (
    <Provider store={store}>
       <PersistGate loading="null" persistor={persistor}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage /> }/>
          <Route path="/users" element={<Users />}/>
          <Route path="/user-profile" element={<UserProfile />}/>
          <Route path='/login-register' element={<LoginRegister />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/register' element={<Register />} />
          <Route path='/send-message' element={<SendMessage />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/activation' element={<AccountActiviation />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;