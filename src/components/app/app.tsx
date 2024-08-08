import { Header } from '../header/header';
import { SearchBar } from '../seach-bar/seach-bar';
import  { RepoList } from '../repo-list/repo-list';
import styles from './app.module.scss';

export const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Header />
            <SearchBar />
            <RepoList />
        </div>
    );
};
