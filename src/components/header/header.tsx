import React from 'react';
import styles from './header.module.scss';
import { Box } from '@mui/material';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Box sx={{
        width: '100%',
        height: '80px',
        backgroundColor: 'secondary.main'
      }}>
        <h1 className={styles.h1}>GitHub Viewer</h1>

      </Box>
    </header>
  );
};