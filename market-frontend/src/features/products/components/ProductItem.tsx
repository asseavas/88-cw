import React from 'react';
import { Card, CardContent, CardMedia, Grid2, styled, Typography } from '@mui/material';
import { API_URL, CardItem } from '../../../constants';
import { Product } from '../../../types';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({product}) => {
  return (
    <Grid2 sx={{width: '280px'}} mb={3} component={CardItem} to={`/products/${product._id}`}>
      <Card sx={{
        height: '330px', borderRadius: '10px', transition: 'background-color 0.3s ease', '&:hover': {
          backgroundColor: '#262626',
        }
      }}>
        <ImageCardMedia image={`${API_URL}/${product.image}`} title={product.title}/>
        <CardContent  sx={{padding: '20px 16px 10px'}}>
          <Typography variant="h5" sx={{fontWeight: 'bolder'}}>{product.price} KGS</Typography>
        </CardContent>
        <Typography variant="h6" sx={{padding: '0 16px 10px'}}>{product.title}</Typography>
      </Card>
    </Grid2>
  );
};

export default ProductItem;
