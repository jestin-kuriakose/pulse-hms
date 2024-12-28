import { Router } from "express";
import EmployeeController from '../controllers/EmployeeController.js';
import authMiddleware from '../middleware/Authenticate.js';
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Routes with role-based access control
router.post('/', authorizeRoles('admin', 'developer'), EmployeeController.addEmployee);
router.get('/', authorizeRoles('admin', 'developer'), EmployeeController.getEmployees);
router.get('/:id', authorizeRoles('admin', 'developer'), EmployeeController.getEmployeeById);
router.put('/:id', authorizeRoles('admin', 'developer'), EmployeeController.updateEmployee);
router.delete('/:id', authorizeRoles('admin', 'developer'), EmployeeController.deleteEmployee);

router.get('/:id/schedule', EmployeeController.getEmployeeSchedule); // Accessible by all roles
router.post('/:id/schedule', authorizeRoles('admin', 'developer'), EmployeeController.saveEmployeeSchedule);
router.put('/:id/schedule/:scheduleId', authorizeRoles('admin', 'developer'), EmployeeController.updateEmployeeSchedule);
router.delete('/:id/schedule/:scheduleId', authorizeRoles('admin', 'developer'), EmployeeController.deleteEmployeeSchedule);

router.get('/:id/audit-logs', authorizeRoles('admin', 'developer'), EmployeeController.getEmployeeAuditLogs);

export default router;