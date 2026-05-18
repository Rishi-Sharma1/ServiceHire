import rateLimit from 'express-rate-limit';

// Global rate limiter for all API routes
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per window
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

// Stricter rate limiter for authentication routes
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 10, // Limit each IP to 10 requests per window
    message: {
        success: false,
        message: 'Too many authentication attempts from this IP, please try again after an hour'
    },
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
