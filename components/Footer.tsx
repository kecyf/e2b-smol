import React from 'react';
import { FooterContainer } from '../styles/Home.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={FooterContainer}>
      <p>
        © {new Date().getFullYear()} T3 App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;