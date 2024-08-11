import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styles from './seach-bar.module.scss';
import {
    searchRepositories,
    setSeachRepoName,
} from '../../store/slices/github-slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
    selectRowsPerPage,
    selectSorts,
} from '../../store/selectors/github-selectors';

export const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const sorts = useAppSelector(selectSorts);
    const currentSort = Object.values(sorts).filter((item) => item !== null);
    const [repoName, setRepoName] = useState('');

    const handleSearch = () => {
        if (repoName) {
            dispatch(
                searchRepositories({
                    name: repoName + ' ' + currentSort,
                    first: rowsPerPage,
                    after: null,
                })
            );
            dispatch(setSeachRepoName(repoName));
        }
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
                            maxWidth: '896px',
                            width: '896px',
                            height: '42px',
                            padding: '0',
                            paddingLeft: '16px',
                            color: 'text.secondary',
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
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    padding: '8px 22px 8px 22px',
                    borderRadius: '4px',
                    letterSpacing: '1.17px',
                }}
                color="primary"
                onClick={handleSearch}
            >
                Искать
            </Button>
        </form>
    );
};
