import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { saveCharacter } from '../../redux/characterSlice';

const CharacterCard = ({ character }) => {
  const dispatch = useDispatch()
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="character"
        image={character.image}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          { character.name }
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          { character.house }
        </Typography>
        { character.titles.map((title, index) => (
          <Typography variant="body2" color="text.secondary" key={index}>
            { title }
          </Typography>
        )) }
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(saveCharacter(character))}>Save to Favorites</Button>
      </CardActions>
    </Card>
  );
}

export default CharacterCard;