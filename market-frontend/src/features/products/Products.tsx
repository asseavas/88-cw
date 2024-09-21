import { Alert, CircularProgress, Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { selectProducts, selectProductsFetching } from './productsSlice';
import ProductItem from './components/ProductItem';
import React, { useEffect, useMemo } from 'react';
import { fetchProducts } from './productsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from '../categories/categoriesSlice';
import { fetchCategories } from '../categories/categoriesThunks';
import CategoriesMenu from '../categories/components/CategoriesMenu';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const isFetching = useAppSelector(selectProductsFetching);
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(categoryId));
  }, [dispatch, categoryId]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      Товаров еще нет!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (products.length > 0) {
    content = products.map((product) => (
      <ProductItem
        key={product._id}
        product={product}
      />
    ));
  }

  const pageTitle = useMemo(() => {
    if (!categoryId) {
      return 'Все товары';
    }

    const category = categories.find((category) => category._id === categoryId);

    if (!category) {
      return '...';
    }
    return category.title;
  }, [categories, categoryId]);

  return (
    <Grid2 container spacing={5} mb={5}>
      <Grid2 size={2} mt={5}>
        <CategoriesMenu categories={categories} />
      </Grid2>
      <Grid2 container direction="column" spacing={2} size={10}  >
        <Grid2>
          <Typography variant="h4">{pageTitle}</Typography>
        </Grid2>
        <Grid2 container sx={{gap: '3%'}}>
          {content}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Products;
