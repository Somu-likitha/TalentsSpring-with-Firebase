import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './components/Header';

const RootLayout = () => {


  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; Footer of My Website</p>
      </footer>
    </div>
  );
};

export default RootLayout;