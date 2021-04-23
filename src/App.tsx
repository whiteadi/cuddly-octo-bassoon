import { useFetch } from './hooks';
import GridListBar from './components/GridListBar';
import './App.css';

const App = () => {
  const url: string =
    'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

  const { status, data, error } = useFetch(url);

  return (
    <div className="App">
      {status === 'error' && <div>{error}</div>}
      {status === 'fetching' && <div className="loading"></div>}
      {status === 'fetched' && data && data.videos && (
        <>
          <GridListBar genres={data.genres} videos={data.videos} />
        </>
      )}
    </div>
  );
};

export default App;
