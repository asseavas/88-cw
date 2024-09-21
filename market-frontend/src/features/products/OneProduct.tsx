import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { selectOneProduct, selectOneProductFetching, selectProductDeleting } from './productsSlice';
import { deleteProduct, fetchOneProduct } from './productsThunks';
import { Button, CardMedia, CircularProgress, Container, Grid2, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectUser } from '../users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { API_URL } from '../../constants';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

const OneProduct = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const isFetching = useAppSelector(selectOneProductFetching);
  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectProductDeleting);

  const handleDeleteProduct = async (id: string) => {
    try {
      if (window.confirm('Вы уверены, что хотите удалить товар?')) {
        await dispatch(deleteProduct(id)).unwrap();
        navigate('/');
        toast.success('Удалено!');
      }
    } catch (error) {
      toast.error('Товар не удален!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneProduct(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="md">
      <Grid2 container direction="column" spacing={2} mb={5}>
        <Grid2>
          <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to="/">
            На главную
          </Button>
        </Grid2>
        <Grid2>
          {isFetching && (
            <Grid2>
              <CircularProgress/>
            </Grid2>
          )}
          {product && (
            <Grid2 container spacing={2} direction="column">
              <Grid2>
                <CardMedia
                  component="img"
                  sx={{width: '100%', height: '300px', borderRadius: '10px'}}
                  image={`${API_URL}/${product.image}`}
                  alt={product.title}
                />
              </Grid2>
              <Grid2 container direction="column">
                <Grid2 component={Typography} variant="h4" sx={{fontWeight: 'bold'}}>
                  {product.price} KGS
                </Grid2>
                <Grid2 component={Typography} variant="h6" color="text.secondary">
                  {product.user.nickname}
                </Grid2>
                <Grid2 component={Typography} variant="body1" color="text.secondary">{product.user.phone}</Grid2>

                <Grid2 component={Typography} variant="h5" sx={{fontWeight: 'bold'}}>
                  {product.title}
                </Grid2>
                <Grid2 component={Typography} variant="body2" color="text.secondary">{product.category.title}</Grid2>
                <Grid2 component={Typography} sx={{borderTop: '1px solid rgba(80, 80, 80, 0.7)', pt: 3, mt: 1}}>
                  {product.description}
                </Grid2>
                {user?._id === product.user._id && (
                  <Grid2 mt={3}>
                    <LoadingButton
                      loading={isDeleting}
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      onClick={() => handleDeleteProduct(id)}
                    >
                      Удалить
                    </LoadingButton>
                  </Grid2>
                )}
              </Grid2>
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </Container>

  );
};

export default OneProduct;
