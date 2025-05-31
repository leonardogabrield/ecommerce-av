import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();




  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuth');

    if (savedUser && savedAuth === 'true') {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuth(true);
      } catch (error) {
    
        localStorage.removeItem('user');
        localStorage.removeItem('isAuth');
      }
    }
  }, []);


  const clearErrors = () => {
    setErrors({});
  };


  const validateForm = () => {
    let validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'Email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'El formato del email no es válido';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password es requerido';
    } else if (password.length < 6) {
      validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    return true;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


    clearErrors();


    if (!validateForm()) {
      return { success: false, message: 'Datos inválidos' };
    }

    setIsLoading(true);

    try {
      const users = [
        {
          id: 1,
          email: "admin@test.com",
          password: "admin123",
          role: "admin",
          name: "Administrador"
        },
        {
          id: 2,
          email: "user@test.com",
          password: "user123",
          role: "user",
          name: "Usuario"
        }
      ];

      const foundUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (!foundUser) {
        alert('Credenciales incorrectas');
        setErrors({ general: 'Credenciales inválidas' });
        setIsLoading(false);
        return { success: false, message: 'Credenciales inválidas' };
      }


      console.log('User role:', foundUser.role);

     
      const userForStorage = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name || foundUser.email
      };


      setUser(userForStorage);
      setIsAuth(true);

   
      localStorage.setItem('user', JSON.stringify(userForStorage));
      localStorage.setItem('isAuth', 'true');

    
      setEmail('');
      setPassword('');

  
      if (foundUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      setIsLoading(false);
      return { success: true, user: userForStorage };

    } catch (err) {
      console.error('Error inesperado en handleSubmit:', err);
      setErrors({
        general: 'Error inesperado. Por favor, inténtalo de nuevo más tarde.'
      });
      setIsLoading(false);
      return { success: false, message: 'Error inesperado' };
    }
  };


  const logout = () => {
    setUser(null);
    setIsAuth(false);
    setEmail('');
    setPassword('');
    setErrors({});


    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');

    navigate('/login');
  };


  const hasRole = (role) => {
    return user && user.role === role;
  };


  const checkAuth = () => {
    return isAuth && user;
  };

  const value = {

    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    isAuth,
    setIsAuth,
    user,
    isLoading,

    handleSubmit,
    logout,
    clearErrors,
    hasRole,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
};