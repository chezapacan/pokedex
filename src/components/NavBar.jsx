import React from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearch, setPage } from '../redux/slices/pokemonSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 'auto',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: 120,
    '&:focus': {
      width: 150,
    },
  },
}));

export const NavBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if (search) {
        navigate('/');
        dispatch(changeSearch(search));
        dispatch(setPage(0));
        setSearch('');
      }
    }
  };

  const handleSearch = () => {
    if (search) {
      navigate('/');
      dispatch(changeSearch(search));
      dispatch(setPage(0));
      setSearch('');
    }
  };

  const handleClickLogo = () => {
    dispatch(changeSearch(''));
    dispatch(setPage(0));
  };

  return (
    <AppBar position='static' elevation={0} sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link to='/' onClick={handleClickLogo}>
              <Typography variant='h6'>Pokedex</Typography>
            </Link>
            <Box sx={{ display: 'flex' }}>
              <Search>
                <StyledInputBase
                  placeholder='Search…'
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleChangeSearch}
                  value={search}
                  onKeyDown={handleEnter}
                />
              </Search>
              <IconButton
                color='inherit'
                sx={{ marginLeft: 1 }}
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
