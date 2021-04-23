import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useFetch } from './hooks';
import Search from './components/Search';
import './App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(5),
      },
    },
  })
);

const App = () => {
  const url: string =
    'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

  const { status, data, error } = useFetch(url);
  const classes = useStyles();

  return (
    <div className="App">
      {status === 'error' && <div>{error}</div>}
      {status === 'fetching' && (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}
      {status === 'fetched' && data && data.videos && (
        <>
          <Search genres={data.genres} videos={data.videos} />
        </>
      )}
    </div>
  );
};

export default App;
