'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { theme } from '@/constants/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import userData from '../../mocks/UserData';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const validation = { email: userData.email, password: userData.senha };

  const navigateToPlatform = () => {
    let error = false;
    if (email !== validation.email) {
      setEmailError(true);
      error = true;
    } else {
      setEmailError(false);
    }

    if (password !== validation.password) {
      setPasswordError(true);
      error = true;
    } else {
      setPasswordError(false);
    }

    if (!error) {
      router.push('/RegistrationForm');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          <Box>
            <Typography variant="h5" className="text-customGray text-2xl">
              LOGO
            </Typography>
            <Typography className="text-customGrayDark text-xl mt-4 mb-4">
              Bem-vindo(a)
            </Typography>

            <Typography className="text-customGray text-base font-normal mt-2 leading-3">
              Acesse sua conta para iniciar a sessão
            </Typography>
          </Box>
          <Box component="form" noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              className="mt-8"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={emailError}
              helperText={
                emailError
                  ? 'Email não encontrado. Confira e tente novamente.'
                  : ''
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Senha"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={passwordError}
              helperText={
                passwordError
                  ? 'Senha incorreta. Por favor, verifique e tente novamente.'
                  : ''
              }
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Typography className="text-customPurple mt-4">
              Esqueceu sua senha?
            </Typography>

            <Button
              className="bg-customPurple text-white p-3 mt-8 text-base normal-case hover:bg-customPurple"
              variant="contained"
              onClick={navigateToPlatform}
            >
              Acessar plataforma
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={false}
        sm={6}
        sx={{ backgroundColor: theme.palette.primary.main }}
      />
    </Grid>
  );
}
