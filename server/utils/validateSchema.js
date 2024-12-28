import vine from '@vinejs/vine';
import { errors } from '@vinejs/vine';

/**
 * Validates data against a given schema.
 * @param {Object} schema - The validation schema.
 * @param {Object} data - The data to validate.
 * @returns {Object} - The validated data.
 * @throws Will throw an error if validation fails.
 */
export const validateSchema = async (schema, data) => {
  try {
    const validator = vine.compile(schema);
    return await validator.validate(data);
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      throw {
        status: 400,
        message: 'Validation failed',
        errors: error.messages,
      };
    }
    throw error;
  }
};
