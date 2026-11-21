# EmailJS order email setup

1. In EmailJS, connect the mailbox that should receive order notifications.
2. Create an email template with these settings:
   - **To Email:** `{{to_email}}` (the app supplies `crochetcloset@gmail.com`)
   - **Reply To:** `{{reply_to}}`
   - **Subject:** `New Lily Lane order {{order_id}}`
   - **Body variables:** `{{order_id}}`, `{{customer_name}}`, `{{customer_email}}`, `{{customer_phone}}`, `{{delivery_address}}`, `{{order_notes}}`, `{{order_items}}`, and `{{order_total}}`
3. Copy `.env.example` to `.env.local` and fill in the service ID, template ID, and account public key.
4. Restart the Vite development server after changing `.env.local`.

The browser app uses EmailJS's public key. Do not put an EmailJS private key or an email account password in this file.
