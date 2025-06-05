import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });

  try {
    const verified = jwt.verify(token, 'secret_key');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

const verificarRol = (rolPermitido) => {
  return (req, res, next) => {
    if (req.user?.rol !== rolPermitido) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
}

export { authMiddleware, verificarRol };