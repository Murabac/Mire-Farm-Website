# Custom Authentication Setup Guide

This guide explains how to set up and use the custom authentication system that replaces Supabase Auth.

## Overview

The authentication system now uses:
- A custom `users` table in your Supabase database
- JWT tokens for session management
- HTTP-only cookies for secure token storage
- bcryptjs for password hashing
- API routes for authentication endpoints

## Setup Steps

### 1. Run the Database Migration

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the migration file: `migrations/019_users_table.sql`
4. This will create the `users` table with all necessary fields and indexes

### 2. Set Environment Variables

Add a JWT secret to your `.env.local` file:

```env
JWT_SECRET=your-super-secret-key-change-this-in-production
```

**Important**: Use a strong, random secret in production. You can generate one using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Install Dependencies

The following packages have been installed:
- `bcryptjs` - For password hashing
- `jsonwebtoken` - For JWT token generation and verification
- `@types/bcryptjs` - TypeScript types
- `@types/jsonwebtoken` - TypeScript types

### 4. API Routes

The following API routes are available:

- **POST `/api/auth/signup`** - Create a new user account
- **POST `/api/auth/login`** - Sign in with email and password
- **POST `/api/auth/logout`** - Sign out (clears the auth cookie)
- **GET `/api/auth/me`** - Get the current authenticated user

### 5. How It Works

#### Sign Up Flow:
1. User submits email, password, and optional name
2. Password is hashed using bcrypt
3. User record is created in the `users` table
4. JWT token is generated and stored in an HTTP-only cookie
5. User is redirected to login page

#### Login Flow:
1. User submits email and password
2. System looks up user by email
3. Password is verified against the stored hash
4. If valid, JWT token is generated and stored in an HTTP-only cookie
5. User is redirected to dashboard

#### Authentication Check:
1. On page load, `AuthContext` calls `/api/auth/me`
2. API route reads the auth token from cookies
3. Token is verified and user data is returned
4. User state is updated in the context

#### Logout Flow:
1. User clicks logout
2. API route clears the auth cookie
3. User state is cleared
4. User is redirected to home page

## Database Schema

The `users` table has the following structure:

```sql
- id (UUID, Primary Key)
- email (TEXT, Unique, Not Null)
- password_hash (TEXT, Not Null)
- name (TEXT, Nullable)
- email_verified (BOOLEAN, Default: false)
- email_verification_token (TEXT, Nullable)
- email_verification_expires (TIMESTAMP, Nullable)
- password_reset_token (TEXT, Nullable)
- password_reset_expires (TIMESTAMP, Nullable)
- created_at (TIMESTAMP, Default: NOW())
- updated_at (TIMESTAMP, Auto-updated)
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 10
2. **JWT Tokens**: Secure token-based authentication
3. **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS attacks
4. **Secure Cookies**: Cookies are marked as secure in production
5. **SameSite Protection**: Cookies use SameSite=lax to prevent CSRF attacks

## Email Verification (Optional)

The users table includes fields for email verification, but the current implementation doesn't require it. You can add email verification later by:

1. Generating a verification token on signup
2. Sending an email with the verification link
3. Creating an API route to verify the token
4. Updating the login route to check `email_verified`

## Password Reset (Future)

The users table includes fields for password reset functionality. To implement:

1. Create an API route to request password reset
2. Generate a reset token and expiration
3. Send email with reset link
4. Create an API route to reset password with token

## Testing

1. **Sign Up**: Go to `/register` and create a new account
2. **Login**: Go to `/login` and sign in with your credentials
3. **Dashboard**: After login, you should be redirected to `/dashboard`
4. **Logout**: Click the logout button to sign out

## Troubleshooting

### "Not authenticated" error
- Check that cookies are enabled in your browser
- Verify the JWT_SECRET is set in your environment variables
- Check browser console for any errors

### "User not found" error
- Verify the user exists in the database
- Check that the token is valid and not expired

### Password not working
- Verify the password hash is correct in the database
- Check that bcrypt is working correctly

### API routes not working
- Verify Next.js API routes are working
- Check server logs for errors
- Ensure Supabase connection is configured

## Migration from Supabase Auth

If you were previously using Supabase Auth:

1. ✅ Users table migration created
2. ✅ API routes created
3. ✅ AuthContext updated
4. ✅ Login/Register pages updated
5. ✅ Dashboard page updated

The old Supabase Auth code has been replaced with the custom authentication system.

## Next Steps

- [ ] Set up email verification (optional)
- [ ] Implement password reset functionality
- [ ] Add rate limiting to API routes
- [ ] Add logging for security events
- [ ] Set up monitoring for authentication failures

