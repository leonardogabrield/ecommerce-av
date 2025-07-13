import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../page-layout/Header'
import Footer from '../page-layout/Footer'


const Login = () => {

  const { email, setEmail, password, setPassword, handleSubmit, setIsAuth } = useAuth();


  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });


  const [isLoading, setIsLoading] = useState(false);


  const validateForm = () => {
    const newErrors = {};


    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato del email no es válido';
    }


    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const onSubmit = async (e) => {
    e.preventDefault();


    setErrors({});


    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);


      const result = await handleSubmit(e);


      if (result && result.success) {
        setIsAuth(true);
        setEmail('');
        setPassword('');
      }

    } catch (error) {
      console.error('Error en el login:', error);
      setErrors({
        general: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  return (


    <>
      <Header />
      <div className="container mb-5 pb-5">
        <main>




          <div style={{ padding: '2rem' }}>
            <h2 className="h2 text-center mx-5 py-5 mb-5">Iniciar Sesión</h2>

            <form
              onSubmit={onSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '400px',
                margin: 'auto',
              }}
            >

              {errors.general && (
                <div style={{
                  color: 'red',
                  backgroundColor: '#ffe6e6',
                  padding: '0.75rem',
                  borderRadius: '0.25rem',
                  border: '1px solid red',
                  textAlign: 'center'
                }}>
                  {errors.general}
                </div>
              )}


              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="formBasicEmail" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Email address
                </label>
                <input
                  id="formBasicEmail"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  style={{
                    padding: '0.5rem',
                    border: `1px solid ${errors.email ? 'red' : '#ced4da'}`,
                    borderRadius: '0.25rem',
                    fontSize: '1rem',
                  }}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <div
                    id="email-error"
                    style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}
                    role="alert"
                  >
                    {errors.email}
                  </div>
                )}
              </div>


              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="formBasicPassword" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Password
                </label>
                <input
                  id="formBasicPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  style={{
                    padding: '0.5rem',
                    border: `1px solid ${errors.password ? 'red' : '#ced4da'}`,
                    borderRadius: '0.25rem',
                    fontSize: '1rem',
                  }}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && (
                  <div
                    id="password-error"
                    style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}
                    role="alert"
                  >
                    {errors.password}
                  </div>
                )}
              </div>


              <button
                type="submit"
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? '#6c757d' : '#007bff',
                  color: 'white',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s',
                }}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>


        </main>
      </div>
      <Footer />
    </>


  );
};

export default Login;
