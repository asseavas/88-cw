import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid2, MenuItem, TextField } from '@mui/material';
import { ProductMutation } from '../../../types';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../../UI/FileInput/FileInput';
import { fetchCategories } from '../../categories/categoriesThunks';
import { selectCategories, selectCategoriesFetching } from '../../categories/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onSubmit: (product: ProductMutation) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);

  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title.trim() || !state.description.trim()) {
      setError('Title, description cannot be empty or just whitespace.');
      return;
    }

    if (state.price < '0') {
      setError('Price can\'t be less than 0');
      return;
    }

    setError(null);
    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={submitFormHandler}
    >
      <Grid2 width="100%">
        {categoriesFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Категория"
            id="category"
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
          >
            <MenuItem value="" disabled>
              Select category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid2>
      <Grid2 width="100%">
        <TextField
          required
          label="Название"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <TextField
          required
          multiline
          label="Описание"
          id="description"
          name="description"
          minRows={3}
          value={state.description}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <TextField
          required
          type="number"
          label="Цена"
          id="price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <FileInput label="Изображение" name="image" onChange={fileInputChangeHandler} />
      </Grid2>
      <Grid2 width="100%">
        <LoadingButton
          sx={{
            width: '100%',
            height: '45px',
            backgroundColor: error ? 'red' : 'primary.main',
            '&:hover': {
              backgroundColor: error ? 'darkred' : 'primary.dark',
            },
          }}
          type="submit"
          loading={isLoading}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Добавить
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default ProductForm;
