import { Header } from '../header/header';
import { SearchBar } from '../seach-bar/seach-bar';
import { RepoList } from '../repo-list/repo-list';
import styles from './app.module.scss';
import { Box } from '@mui/material';

export const App: React.FC = () => {
    return (
        <div className={styles.main}>
            <Box sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'background.default',
                paddingBottom: '32px'
            }}>
                <Header />
                <SearchBar />
                <RepoList />
            </Box>
        </div>
    );
};
