import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/user.repository';
import { authService } from '../../services/auth.service';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await authService.comparePassword(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = authService.generateToken(user);
    res.json({ token, user: { email: user.email, role: user.role } });
  }

  static async register(req: Request, res: Response) {
    const { email, password, fullName, role } = req.body;
    
    const passwordHash = await authService.hashPassword(password);
    try {
      const user = await UserRepository.create({ 
        email, 
        password_hash: passwordHash, 
        role, 
        fullName 
      });
      res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (e) {
      res.status(400).json({ error: 'Email already exists' });
    }
  }
}
