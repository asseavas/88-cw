import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid2,
  IconButton,
  styled,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { API_URL } from '../../../constants';
import { Product } from '../../../types';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <Grid2 sx={{ width: '300px' }}>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={product.title} />
        <ImageCardMedia image={`${API_URL}/${product.image}`} title={product.title} />
        <CardContent>
          <Typography variant="h6">{product.price} KGS</Typography>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/products/${product._id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default ProductItem;
