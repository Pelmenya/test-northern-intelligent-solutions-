import React from 'react';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>GitHub Viewer</h1>
    </header>
  );
};