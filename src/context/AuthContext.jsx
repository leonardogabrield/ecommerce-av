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



  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuth');

    if (savedUser && savedAuth === 'true') {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuth(true);
      } catch (error) {
        // Si hay error al parsear, limpiar localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('isAuth');
      }
    }
  }, []);

  // Función para limpiar errores
  const clearErrors = () => {
    setErrors({});
  };

  // Función para validar el formulario
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

    // Limpiar errores previos
    clearErrors();

    // Validar formulario
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
        setErrors({ general: 'Credenciales inválidas' });
        setIsLoading(false);
        return { success: false, message: 'Credenciales inválidas' };
      }

      // Login exitoso
      console.log('User role:', foundUser.role);

      // Guardar datos del usuario (sin la contraseña)
      const userForStorage = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name || foundUser.email
      };

      // Actualizar estados
      setUser(userForStorage);
      setIsAuth(true);

      // Guardar en localStorage para persistir la sesión
      localStorage.setItem('user', JSON.stringify(userForStorage));
      localStorage.setItem('isAuth', 'true');

      // Limpiar formulario
      setEmail('');
      setPassword('');

      // Navegar según el rol
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

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuth(false);
    setEmail('');
    setPassword('');
    setErrors({});

    // Limpiar localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');

    navigate('/login');
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Función para verificar si el usuario está autenticado
  const checkAuth = () => {
    return isAuth && user;
  };

  const value = {
    // Estados
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

    // Funciones
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

// Hook personalizado con validación
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
};