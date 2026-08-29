import nodemailer from 'nodemailer';

const isEmailJsConfigured = () => {
  return !!(
    process.env.EMAILJS_SERVICE_ID &&
    process.env.EMAILJS_TEMPLATE_ID &&
    process.env.EMAILJS_PUBLIC_KEY
  );
};

const sendViaEmailJs = async (templateParams) => {
  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY || undefined,
    template_params: templateParams
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS Error (${response.status}): ${errorText}`);
  }

  return true;
};

const getSmtpTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === 'true';

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
};

/**
 * Dispatches automated email notification for a new reader poem submission
 */
export const notifyPoemSubmission = async (submissionData) => {
  const { poetName, city, email, title, category, poemText, reflection, id } = submissionData;
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const fullPoemMessage = `Title: "${title}"\nPoet: ${poetName} (${city || 'N/A'})\nCategory: ${category}\nEmail: ${email || 'N/A'}\n\nVerses:\n${poemText}\n\nPoet Reflection: ${reflection || 'N/A'}`;

  // 1. Try EmailJS First
  if (isEmailJsConfigured()) {
    try {
      console.log('📬 [EMAIL DISPATCH] Sending Poem Submission via EmailJS to', adminEmail);
      await sendViaEmailJs({
        title: `Poem Submission: "${title}"`,
        name: poetName,
        time: currentTime,
        message: fullPoemMessage,
        email: email || '',
        to_email: adminEmail,
        reply_to: email || undefined,
        subject: `Contact Us: Poem Submission "${title}" by ${poetName}`,
        submission_id: id
      });
      console.log('✅ [EMAIL DISPATCH] Poem Submission Email sent successfully via EmailJS.');
      return { success: true, service: 'emailjs' };
    } catch (err) {
      console.error('❌ [EMAIL SERVICE] EmailJS poem notification failed:', err.message);
    }
  }

  // 2. Try SMTP
  const transporter = getSmtpTransporter();
  if (transporter) {
    try {
      const fromEmail = process.env.EMAIL_FROM || '"Akshar Canvas Literary Portal" <notifications@aksharcanvas.com>';
      await transporter.sendMail({
        from: fromEmail,
        to: adminEmail,
        subject: `📜 New Poem Submission: "${title}" by ${poetName}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; padding: 20px; border: 1px solid #C5A059; background: #FAF8F5;">
            <h2 style="color: #8B0000;">New Reader Poem: "${title}"</h2>
            <p><strong>Poet:</strong> ${poetName} (${city || 'N/A'})</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            <p><strong>Category:</strong> ${category}</p>
            <hr/>
            <pre style="white-space: pre-wrap; font-family: Georgia, serif; line-height: 1.8;">${poemText}</pre>
            ${reflection ? `<p><em>Poet Note: ${reflection}</em></p>` : ''}
          </div>
        `
      });
      return { success: true, service: 'smtp' };
    } catch (err) {
      console.error('SMTP email dispatch error:', err);
    }
  }

  // 3. Fallback Logger
  console.log('\n📧 [EMAIL SERVICE - MOCK DISPATCH: POEM SUBMISSION]');
  console.log(`To: ${adminEmail}`);
  console.log(`Subject: 📜 New Poem Submission: "${title}" by ${poetName}`);
  console.log(`Details: ${poetName} (${city || 'N/A'}) - ${email || 'N/A'}`);
  console.log(`Excerpt: ${poemText.slice(0, 80)}...`);
  console.log('---------------------------------------------------\n');
  return { success: true, simulated: true };
};

/**
 * Dispatches automated email notification for a new contact / booking inquiry
 */
export const notifyContactInquiry = async (inquiryData) => {
  const { name, email, phone, city, eventType, date, message, id } = inquiryData;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'aksharcanvas@gmail.com';

  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const fullMessage = `${message}\n\n────────────────────\n📞 Contact: ${phone || 'N/A'}\n📍 City: ${city || 'N/A'}\n🎭 Purpose: ${eventType || 'General Inquiry'}\n🗓️ Date: ${date || 'Flexible'}`;

  // 1. Try EmailJS First
  if (isEmailJsConfigured()) {
    try {
      console.log('📬 [EMAIL DISPATCH] Sending Contact Inquiry via EmailJS to', adminEmail);
      await sendViaEmailJs({
        title: `${eventType || 'General Inquiry'} - ${name}`,
        name: name,
        time: currentTime,
        message: fullMessage,
        email: email,
        phone: phone || '',
        city: city || '',
        eventType: eventType || '',
        date: date || '',
        to_email: adminEmail,
        reply_to: email,
        subject: `Contact Us: ${eventType || 'Inquiry'} - ${name}`,
        inquiry_id: id
      });
      console.log('✅ [EMAIL DISPATCH] Contact Inquiry Email sent successfully via EmailJS.');
      return { success: true, service: 'emailjs' };
    } catch (err) {
      console.error('❌ [EMAIL SERVICE] EmailJS contact notification failed:', err.message);
    }
  }

  // 2. Try SMTP
  const transporter = getSmtpTransporter();
  if (transporter) {
    try {
      const fromEmail = process.env.EMAIL_FROM || '"Akshar Canvas Portal" <notifications@aksharcanvas.com>';
      await transporter.sendMail({
        from: fromEmail,
        to: adminEmail,
        subject: `💌 New Contact Inquiry from ${name} (${eventType})`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; padding: 20px; border: 1px solid #C5A059; background: #FAF8F5;">
            <h2 style="color: #8B0000;">New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City:</strong> ${city || 'N/A'}</p>
            <p><strong>Event:</strong> ${eventType}</p>
            <p><strong>Date:</strong> ${date || 'Flexible'}</p>
            <hr/>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `
      });
      return { success: true, service: 'smtp' };
    } catch (err) {
      console.error('SMTP inquiry dispatch error:', err);
    }
  }

  // 3. Fallback Logger
  console.log('\n📧 [EMAIL SERVICE - MOCK DISPATCH: CONTACT INQUIRY]');
  console.log(`To: ${adminEmail}`);
  console.log(`Subject: 💌 New Event/Reader Inquiry from ${name} (${eventType})`);
  console.log(`Details: Phone: ${phone} | Email: ${email} | City: ${city || 'N/A'}`);
  console.log(`Message: ${message.slice(0, 100)}...`);
  console.log('---------------------------------------------------\n');
  return { success: true, simulated: true };
};
