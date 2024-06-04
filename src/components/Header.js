import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Logo</div>
      <nav className="flex gap-4">
        <a href="#home" className="hover:text-gray-400">Home</a>
        <a href="#about" className="hover:text-gray-400">About</a>
        <a href="#services" className="hover:text-gray-400">Services</a>
        <a href="#contact" className="hover:text-gray-400">Contact</a>
      </nav>
      <div className="bg-gray-700 px-4 py-2 rounded">Dropdown</div>
    </header>
  );
};

export default Header;
