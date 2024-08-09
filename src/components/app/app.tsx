import { Box } from '@mui/material';
import { Header } from '../header/header';
import { Main } from '../main/main';

import styles from './app.module.scss';

export const App: React.FC = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.wrapper}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'background.default',
                        paddingBottom: '32px',
                    }}
                >
                    <Header />
                    <Main />
                </Box>
            </div>
        </div>
    );
};
