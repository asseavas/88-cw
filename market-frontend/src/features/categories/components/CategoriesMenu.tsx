import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Category } from '../../../types';
import React from 'react';

interface Props {
  categories: Category[];
}

const CategoriesMenu: React.FC<Props> = ({ categories }) => {
  const { categoryId } = useParams();

  return (
    <List>
      <ListItem disableGutters>
        <ListItemButton component={Link} to="/" selected={!categoryId} sx={{borderRadius: '8px'}}>
          <ListItemText primary="Все продукты" />
        </ListItemButton>
      </ListItem>
      {categories.map((category) => (
        <ListItem key={category._id} disableGutters>
          <ListItemButton
            component={Link}
            to={`/categories/${category._id}`}
            selected={category._id === categoryId}
            sx={{borderRadius: '8px'}}
          >
            <ListItemText primary={category.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoriesMenu;
