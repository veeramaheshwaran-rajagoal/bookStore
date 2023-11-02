const joi = require('joi');
//validation schema for user login
const adminLoginSchema = joi
    .object({
        body: joi.object({
            email: joi
                .string()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net', 'in', 'co', 'org', 'guru', 'etc', 'info'],
                    },
                })
                .strict()
                .trim()
                .required(),
            //.error(new Error('Invalid email')),
            password: joi.string().strict().trim().required().error(new Error('Invalid password')),
            type: joi.string().strict().trim().valid('user', 'admin').required(),
        }),
    })
    .unknown(true);
//validation schema for add admin
const addUserSchema = joi
    .object({
        body: joi.object({
            name: joi
                .string()
                .regex(/^[A-Za-z\s]+$/)
                .min(3)
                .trim()
                .required(),
            email: joi
                .string()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net', 'in', 'co', 'org', 'guru', 'etc', 'info'],
                    },
                })
                .strict()
                .trim()
                .required(),
            phoneNumber: joi
                .string()
                .regex(/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/)
                .length(10)
                .trim()
                .required()
                .error(new Error('Valid phone number only allowed')),
            password: joi.string().strict().trim().required(),
            roleType: joi.string().strict().trim().valid('admin').required(),
        }),
    })
    .unknown(true);
//validation schema for for update user data
const updateUserSchema = joi
    .object({
        body: joi.object({
            name: joi
                .string()
                .regex(/^[A-Za-z\s]+$/)
                .min(3)
                .trim()
                .optional(),
            email: joi
                .string()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net', 'in', 'co', 'org', 'guru', 'etc', 'info'],
                    },
                })
                .strict()
                .trim()
                .optional(),
            phoneNumber: joi
                .string()
                .regex(/^[0-9]+$/)
                .length(10)
                .trim()
                .optional()
                .error(new Error('Valid phone number only allowed')),
            roleType: joi.string().strict().trim().optional(),
        }),
        params: {
            id: joi.string().optional(),
        }
    })
    .unknown(true);
//validation schema for update user password
const updatePasswordSchema = joi
    .object({
        body: joi.object({
            password: joi.string().strict().trim().required().error(new Error('Invalid password')),
        }),
    })
    .unknown(true);
//validation schema for get all sub users
const getusersSchema = joi
    .object({
        query: joi.object({
            pageNo: joi.number().optional(),
            limit: joi.number().optional(),
            role: joi.string().strict().trim().valid('admin', 'user').optional(),
        }),
    })
    .unknown(true);

// Creates a validation schema for signing up a new users.
const userSignupValidationSchema = joi
    .object({
        body: joi.object({
            name: joi
                .string()
                .regex(/^[A-Za-z\s]+$/)
                .required(),
            lastName: joi
                .string()
                .regex(/^[A-Za-z\s]+$/)
                .optional(),
            phoneNumber: joi
                .string()
                .regex(/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/)
                .length(10)
                .trim()
                .required()
                .error(new Error('Valid phone number only allowed')),
            email: joi
                .string()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ['com', 'net', 'in', 'co', 'org', 'guru', 'etc', 'info'],
                    },
                })
                .strict()
                .trim()
                .required(),
            password: joi.string().required(),
            roleType: joi.string().valid('user').strict().trim().required(),
        }),
    })
    .unknown(true);
//validation schema for delete user
const deleteUserSchema = joi
    .object({
        params: {
            userId: joi.string().required(),
        },
        body: {
            isActive: joi.boolean().required(),
        }
    })
    .unknown(true);
module.exports = {
    adminLoginSchema,
    addUserSchema,
    updateUserSchema,
    updatePasswordSchema,
    getusersSchema,
    userSignupValidationSchema,
    deleteUserSchema
};
