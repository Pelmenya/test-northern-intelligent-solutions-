import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './seach-bar.module.scss';
import { setSearchTerm, searchRepositories, selectSearchTerm } from '../../store/slices/githubSlice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);

  const handleSearch = () => {
    dispatch(searchRepositories({ searchTerm }));
  };

  return (
    <div className={styles.searchBar}>
      <TextField
        label="Search Repositories"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};