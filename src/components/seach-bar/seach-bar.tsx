import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styles from './seach-bar.module.scss';
import {
    searchRepositories,
} from '../../store/slices/githubSlice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

export const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchRepo, setSearchRepo] = useState('');
    
    const handleSearch = () => {
        dispatch(searchRepositories({ repoName : searchRepo, first: 10, after: null }));
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
                            color: 'text.secondary'
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
                value={searchRepo}
                onChange={(e) => setSearchRepo(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{
              padding: '8px 22px 8px 22px',
              borderRadius: '4px',
              letterSpacing: '1.17px'
            }} color="primary" onClick={handleSearch}>
                Искать
            </Button>
        </form>
    );
};
