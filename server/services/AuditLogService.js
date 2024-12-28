import prisma from "../DB/db.config.js";

const AuditLogService = {
  async logAction(entityId, userId, action, details, metadata = {}) {
    const logEntry = {
      entityId,
      entityType: metadata.entityType || null,
      userId,
      action,
      details: JSON.stringify(details),
      createdAt: new Date()
    };

    await prisma.auditLog.create({ data: logEntry });
  }
};

export default AuditLogService;
