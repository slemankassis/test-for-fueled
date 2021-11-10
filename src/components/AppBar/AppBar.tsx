import React from "react";
import "./AppBar.scss";

const AppBar: React.FC = ({ children }) => (
  <header className="app-bar">{children}</header>
);

export default AppBar;
