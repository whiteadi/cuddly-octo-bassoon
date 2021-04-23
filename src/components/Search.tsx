import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Typography } from '@material-ui/core';

import GridListBar from './GridListBar';

interface VideoProps {
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
}

type Video = {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  genre_id: number;
  image_url: string;
};

type YEAR = {
  value: number;
  label: number;
};

type GENRE = {
  value: number;
  label: string;
};

const Search: React.FC<VideoProps> = ({ genres, videos }: VideoProps) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const allYears: number[] = videos
    .map((video) => video.release_year)
    .sort(function (a, b) {
      return a - b;
    });
  const years: YEAR[] = [...new Set(allYears)].map((year) => {
    return { value: year, label: year };
  });

  const genresFilter: GENRE[] = genres.map((genre) => {
    return { value: genre.id, label: genre.name };
  });

  const onChange = (selectedOptions: any) => setSelectedGenre(selectedOptions);

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value.toLowerCase();
    let result = [];
    result = videos.filter((video) => {
      return video.title?.toString().toLowerCase().includes(value);
    });
    setFilteredVideos(result);
  };

  useEffect(() => {
    const isThatYear = (video: Video) => {
      return video.release_year === selectedYear;
    };
    if (selectedYear !== null) {
      setFilteredVideos(videos.filter(isThatYear));
    }
  }, [videos, selectedYear]);

  useEffect(() => {
    const isThatGenre = (video: Video) => {
      return selectedGenre.some(
        (genre: GENRE) => genre.value === video.genre_id
      );
    };
    if (selectedGenre.length > 0) {
      setFilteredVideos(videos.filter(isThatGenre));
    }
  }, [videos, selectedGenre]);

  return (
    <>
      <div style={{ margin: '0 auto', marginTop: '10%' }}>
        <Typography variant="subtitle1" gutterBottom>
          Search for songs:
        </Typography>
        <input type="text" onChange={(event) => handleSearch(event)} />
      </div>
      <Select
        className="basic-single"
        value={selectedYear}
        options={years}
        onChange={(selected) => {
          if (selected !== null) {
            setSelectedYear(selected.value);
          }
        }}
      />
      <Select
        isMulti
        className="basic-multi-select"
        value={[...selectedGenre]}
        // @ts-ignore
        options={genresFilter}
        onChange={onChange}
      />
      <GridListBar videos={filteredVideos} />
    </>
  );
};

export default Search;
