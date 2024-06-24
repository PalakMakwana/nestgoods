import React from 'react';

const Header = () => {
  return (
    <header className="w-full p-4  flex justify-between items-center">
      <div className="logo">Logo</div>
      <input type="text" placeholder="Search" className="p-2 rounded-md" />
      <select className="p-2 rounded-md">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <button className="p-2 bg-green-500 rounded-md">Login/Register</button>
    </header>
  );
};

export default Header;
