import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Login from './component/login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />   <Login />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
