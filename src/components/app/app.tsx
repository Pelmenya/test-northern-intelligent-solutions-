import { Header } from '../header/header';
import { RepoTable } from '../repo-table/repo-table';
import styles from './app.module.scss';
import { Box } from '@mui/material';

export const App: React.FC = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.main}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'background.default',
                        paddingBottom: '32px',
                    }}
                >
                    <Header />
                    <RepoTable />
                </Box>
            </div>
        </div>
    );
};
