import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

interface VideoProps {
  videos: {
    id: number;
    artist: string;
    title: string;
    release_year: number;
    genre_id: number;
    image_url: string;
  }[];
}

const GridListBar: React.FC<VideoProps> = ({ videos }: VideoProps) => {
  const classes = useStyles();

  const theme = useTheme();

  const screenExtraLarge = useMediaQuery(theme.breakpoints.only('xl'));
  const screenLarge = useMediaQuery(theme.breakpoints.only('lg'));
  const screenMedium = useMediaQuery(theme.breakpoints.only('md'));
  const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));
  const screenExtraSmall = useMediaQuery(theme.breakpoints.only('xs'));
  const screenNarrow = useMediaQuery('(max-width:340px)');

  const getScreenWidth = () => {
    if (screenExtraLarge) {
      return 6;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 5;
    } else if (screenMedium) {
      return 4;
    } else if (screenSmall) {
      return 3;
    } else if (screenExtraSmall) {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <div className={classes.root}>
      <GridList cols={getScreenWidth()} cellHeight={300} spacing={15}>
        {videos.map((video) => (
          <GridListTile rows={1.25} key={video.image_url}>
            <img src={video.image_url} alt={video.title} />
            <GridListTileBar title={video.title} subtitle={video.artist} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default GridListBar;
