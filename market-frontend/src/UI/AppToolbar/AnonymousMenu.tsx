import { Grid2 } from '@mui/material';
import { StyledNavLink } from '../../constants';

const AnonymousMenu = () => {
  return (
    <Grid2>
      <StyledNavLink to="/register">Регистрация</StyledNavLink>
      <StyledNavLink to="/login">Войти</StyledNavLink>
    </Grid2>
  );
};

export default AnonymousMenu;
