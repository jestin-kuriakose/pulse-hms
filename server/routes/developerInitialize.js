// routes/developerInitialize.js
import express from 'express';
import { isUserTableEmpty, createInitialUser } from '../utils/initializeDeveloper.js';
import { registerSchema } from '../validations/authValidation.js';
import { validateSchema } from '../utils/validateSchema.js';

const router = express.Router();

// curl -X POST https://your-app-url.com/api/initialize-admin \
//   -H "Content-Type: application/json" \
//   -H "x-init-token: your_very_long_and_secure_random_token" \
//   -d '{"email":"admin@example.com","password":"securePassword123","firstName":"Admin","lastName":"User"}'


router.post('/initialize-dev', async (req, res) => {
  try {
    console.log(req.headers['x-init-token'])
    // Check if the initialization token is correct
    if (req.headers['x-init-token'] !== process.env.INIT_DEV_TOKEN) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check if the user table is empty
    if (!(await isUserTableEmpty())) {
      return res.status(400).json({ error: 'Dev user already exists' });
    }

    // Validate the input data
    const userData = await validateSchema(registerSchema, req.body);

    // Create the initial admin user
    const user = await createInitialUser(userData);

    // Disable the initialization token
    process.env.INIT_DEV_TOKEN = null;

    res.status(201).json({ message: 'Dev user created successfully', userId: user.id });
  } catch (error) {
    console.error('Error initializing dev:', error);
    res.status(500).json({ error: 'Failed to initialize dev user' });
  }
});

export default router;
