import React from 'react';
import styles from './header.module.scss';
import { Box } from '@mui/material';
import { SearchBar } from '../seach-bar/seach-bar';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Box sx={{
        width: '100%',
        height: '80px',
        backgroundColor: 'secondary.main',
        paddingLeft: '32px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <h1 className={styles.h1}>GitHub Viewer</h1>
        <SearchBar />
      </Box>
    </header>
  );
};