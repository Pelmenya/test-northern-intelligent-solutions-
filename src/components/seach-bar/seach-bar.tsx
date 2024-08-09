import React from 'react';
import { TextField, Button, FormControl, OutlinedInput } from '@mui/material';
import styles from './seach-bar.module.scss';
import {
    setSearchTerm,
    searchRepositories,
    selectSearchTerm,
} from '../../store/slices/githubSlice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector(selectSearchTerm);

    const handleSearch = () => {
        dispatch(searchRepositories({ searchTerm }));
    };

    return (
        <form className={styles.form}>
            <TextField
                type="text"
                id="seachRepo"
                sx={[
                    {
                        input: {
                            backgroundColor: 'background.paper',
                            borderRadius: '4px',
                            fontWeight: 500,
                            maxWidth: '912px',
                            width: '912px',
                            height: '42px',
                            padding: '0',
                            paddingLeft: '16px',
                        },
                    },
                    {
                        'input::placeholder': {
                            color: '#828282',
                            opacity: '1',
                            fontStyle: 'italic',
                            fontSize: '14px',
                            fontWeight: 400,
                        },
                    },
                ]}
                placeholder="Введите поисковый запрос"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <Button variant="contained" sx={{
              padding: '8px 22px 8px 22px',
              borderRadius: '4px',
              letterSpacing: '1.17px'
            }} color="primary" onClick={handleSearch}>
                Искать
            </Button>
        </form>
    );
};
