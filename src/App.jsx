import React from 'react';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SettingsLayout from './components/Settings/SettingsLayout';
import AccountSettings from './components/Settings/settings/AccountSettings';
import Privacy from './components/terms and privicy/PrivacyPolicy';
import Terms from './components/terms and privicy/Tearms';
import PersonalSettings from './components/Settings/settings/PersonalSettings';
import TodoListApp from './pages/todoList';
import Contact from '@/pages/Contact';
import Blog from './pages/blogPage';
import Journal from './pages/Journal';
import Team from './components/team/Team';
import About from '@/components/about us/About';
import MainLayout from '@/components/layout/MainLayout';
import { ThemeProvider } from "@/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          <Route path="/home" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          
          <Route path="/Team" element={
            <MainLayout>
              <Team />
            </MainLayout>
          } />
          
          <Route path="/About" element={
            <MainLayout>
              <About />
            </MainLayout>
          } />
          
          <Route path="/settings" element={
            <MainLayout>
              <SettingsLayout />
            </MainLayout>
          }>
            <Route index element={<Navigate to="/settings/account" replace />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="Privacy" element={<Privacy />} />
            <Route path="personal" element={<PersonalSettings />} />
          </Route>
          
          <Route path="/contact" element={
            <MainLayout>
              <Contact />
            </MainLayout>
          } />
          
          <Route path="/todo-list" element={
            <MainLayout>
              <TodoListApp />
            </MainLayout>
          } />
          
          <Route path="/blog" element={
            <MainLayout>
              <Blog />
            </MainLayout>
          } />
          
          <Route path="/journal" element={
            <MainLayout>
              <Journal />
            </MainLayout>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;