import { useEffect, useRef, useReducer } from 'react';

export const useFetch = (url: string) => {
  const cache = useRef({});

  type VideosResponse = {
    genres: {
      id: number;
      name: string;
    }[];
    videos: {
      id: number;
      artist: string;
      title: string;
      release_year: number;
      genre_id: number;
      image_url: string;
    }[];
  };

  type State = {
    status: string;
    error?: any;
    data?: VideosResponse;
  };

  enum ActionKind {
    Fetch = 'FETCHING',
    Fetched = 'FETCHED',
    Error = 'FETCH_ERROR',
  }

  type Action = {
    type: ActionKind;
    payload?: VideosResponse;
  };

  const initialState = {
    status: 'idle',
    error: null,
  };

  const fetchReducer = (state: State, action: Action): State => {
    const { type, payload } = action;
    switch (type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: ActionKind.Fetch });
      // @ts-ignore
        if (cache.current[url]) {
          // @ts-ignore
          const data = cache.current[url];
          dispatch({ type: ActionKind.Fetched, payload: data });
        } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          // @ts-ignore
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: ActionKind.Fetched, payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: ActionKind.Error, payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
};
