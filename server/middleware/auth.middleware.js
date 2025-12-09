
import Admin from '../model/admin.model.js';
import Alumni from '../models/alumni.model.js';
import Student from '../models/student.model.js';
import { decodeAuthToken } from '../util/jwt.util.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Check Authorization header or cookie
    const headerToken = req.headers.authorization?.split(' ')[1];
    const cookieToken = req.cookies?.token;
    const token = headerToken || cookieToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Token missing' });
    }

    const decoded = await decodeAuthToken(token);

    if (!decoded?.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }

    let user;
    if (decoded.token.role === "STUDENT") {
        user = await Student.findById(decoded.token.id)
    } else if (decoded.token.role === "ALUMNI") {
        user = await Alumni.findById(decoded.token.id)
    } else if (decoded.token.role === "ADMIN") {
        user = await Admin.findById(decoded.token.id)
    }
    else {
        return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized - Token error' });
  }
};

export default authMiddleware;