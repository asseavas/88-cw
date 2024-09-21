import ProductForm from './ProductForm';
import { Container, Grid2, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProductMutation } from '../../../types';
import { createProduct } from '../productsThunks';
import { useNavigate } from 'react-router-dom';
import { selectProductCreating } from '../productsSlice';
import { toast } from 'react-toastify';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectProductCreating);

  const onFormSubmit = async (productMutation: ProductMutation) => {
    try {
      await dispatch(createProduct(productMutation));
      navigate('/');
      toast.success('Товар создан!');
    } catch (error) {
      toast.error('Товар не был создан!');
    }
  };

  return (
    <>

      <Container maxWidth="md">
        <Grid2 container direction="column" mt={4}>
          <Grid2>
            <Typography variant="h4" mb={4} fontWeight="bold">
              Новый товар
            </Typography>
          </Grid2>
          <Grid2 justifyContent="space-between">
            <ProductForm onSubmit={onFormSubmit} isLoading={isCreating} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default NewProduct;
