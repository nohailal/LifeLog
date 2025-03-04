import React from 'react';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SettingsLayout from './components/Settings/SettingsLayout';
import AccountSettings from './components/Settings/settings/AccountSettings';
import PrivacySettings from './components/Settings/settings/PrivacySettings';
import PersonalSettings from './components/Settings/settings/PersonalSettings';
import TodoListApp from './pages/todoList';
import Contact from './components/contact/Contact';
import Blog from './components/blog/blogPage';
import Journal from './components/health/Journal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        
        {/* Settings routes */}
        <Route path="/settings" element={<SettingsLayout />}>
          <Route index element={<Navigate to="/settings/account" replace />} />
          <Route path="account" element={<AccountSettings />} />
          <Route path="privacy" element={<PrivacySettings />} />
          <Route path="personal" element={<PersonalSettings />} />
        </Route>
        
        {/* Add a direct route for Contact */}
        <Route path="/contact" element={<Contact />} />
        
        {/* Service routes */}
        <Route path="/todo-list" element={<TodoListApp />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;