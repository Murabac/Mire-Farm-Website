# Supabase Email Configuration Guide

This guide will help you configure email sending in your Supabase project so that confirmation emails are sent when users sign up.

## Why Emails Might Not Be Sending

There are several reasons why emails might not be sent:

1. **Email confirmation is disabled** in Supabase settings
2. **Redirect URLs are not configured** in Supabase
3. **SMTP is not configured** (Supabase uses default SMTP for free tier with limits)
4. **Email is going to spam folder**
5. **Rate limiting** on the free tier

## Step-by-Step Configuration

### 1. Enable Email Confirmation

1. Go to your Supabase project dashboard: [https://app.supabase.com](https://app.supabase.com)
2. Navigate to **Authentication** → **Settings** (or **Settings** → **Auth**)
3. Scroll down to **Email Auth** section
4. Make sure **"Enable email confirmations"** is **ON** (enabled)
5. If it's disabled, toggle it ON and click **Save**

### 2. Configure Redirect URLs

Redirect URLs tell Supabase where to send users after they click the confirmation link in their email.

1. In the same **Authentication** → **Settings** page
2. Scroll to **"Redirect URLs"** or **"Site URL"** section
3. Add your application URLs:

   **For Development:**
   ```
   http://localhost:3000
   http://localhost:3000/login
   http://localhost:3000/login?confirmed=true
   ```

   **For Production:**
   ```
   https://yourdomain.com
   https://yourdomain.com/login
   https://yourdomain.com/login?confirmed=true
   ```

4. Click **Save** after adding each URL

### 3. Configure Site URL

1. In **Authentication** → **Settings**
2. Find **"Site URL"** field
3. Set it to your main application URL:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
4. Click **Save**

### 4. (Optional) Configure Custom SMTP

By default, Supabase uses their own SMTP service which has rate limits on the free tier. For production, you may want to configure your own SMTP.

1. Go to **Settings** → **Auth** → **SMTP Settings**
2. Enable **"Enable Custom SMTP"**
3. Fill in your SMTP provider details:
   - **Host**: Your SMTP server (e.g., `smtp.gmail.com`, `smtp.sendgrid.net`)
   - **Port**: Usually `587` for TLS or `465` for SSL
   - **Username**: Your SMTP username
   - **Password**: Your SMTP password
   - **Sender email**: The email address that will send emails
   - **Sender name**: The name that will appear as sender

4. Click **Save**

**Popular SMTP Providers:**
- **SendGrid**: Free tier allows 100 emails/day
- **Mailgun**: Free tier allows 5,000 emails/month
- **Amazon SES**: Pay-as-you-go pricing
- **Gmail**: Requires app-specific password

### 5. Check Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. You can customize the confirmation email template
3. Make sure the templates are enabled

### 6. Test Email Sending

1. Try signing up with a new account
2. Check your email inbox (and spam folder)
3. Check the Supabase dashboard:
   - Go to **Authentication** → **Users**
   - Find your test user
   - Check if the email was sent (you might see email logs)

## Troubleshooting

### Emails Still Not Sending?

1. **Check Supabase Logs:**
   - Go to **Logs** → **Auth Logs** in your Supabase dashboard
   - Look for any errors related to email sending

2. **Check Spam Folder:**
   - Emails might be going to spam
   - Add `noreply@mail.app.supabase.io` to your contacts

3. **Verify Email Address:**
   - Make sure you're using a valid email address
   - Some email providers block automated emails

4. **Check Rate Limits:**
   - Free tier has rate limits
   - Wait a few minutes between signup attempts

5. **Verify Configuration:**
   - Double-check that email confirmation is enabled
   - Verify redirect URLs are correctly set
   - Ensure Site URL is configured

6. **Test with Different Email:**
   - Try with a different email provider (Gmail, Outlook, etc.)
   - Some email providers are more strict about automated emails

### Common Error Messages

- **"Email rate limit exceeded"**: Too many emails sent in a short time. Wait and try again.
- **"Invalid redirect URL"**: The redirect URL is not in your allowed list. Add it to Supabase settings.
- **"Email not sent"**: Check SMTP configuration or use Supabase default SMTP.

## Development vs Production

### Development (localhost)

- Use `http://localhost:3000` as your Site URL
- Add `http://localhost:3000/login?confirmed=true` to redirect URLs
- Emails will be sent from Supabase's default SMTP

### Production

- Update Site URL to your production domain
- Add production redirect URLs
- Consider setting up custom SMTP for better deliverability
- Update environment variables if needed

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Email Configuration](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Supabase SMTP Setup](https://supabase.com/docs/guides/auth/auth-smtp)

## Quick Checklist

- [ ] Email confirmation is enabled in Supabase
- [ ] Site URL is configured
- [ ] Redirect URLs are added (including `/login?confirmed=true`)
- [ ] Tested signup with a valid email
- [ ] Checked spam folder
- [ ] (Optional) Custom SMTP configured for production

