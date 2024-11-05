// App.js
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import Menu from './src/components/Menu';


function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  return (
    <Menu/>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
