import nodemailer from 'nodemailer';

export const getEmailJsConfig = () => {
  const service_id = (process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAIL_SERVICE_ID || '').trim();
  const template_id = (process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAIL_TEMPLATE_ID || '').trim();
  const user_id = (process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_USER_ID || process.env.EMAIL_PUBLIC_KEY || '').trim();
  const accessToken = (process.env.EMAILJS_PRIVATE_KEY || process.env.EMAILJS_ACCESS_TOKEN || '').trim() || undefined;

  const isConfigured = !!(service_id && template_id && user_id);
  return { isConfigured, service_id, template_id, user_id, accessToken };
};

export const isEmailJsConfigured = () => {
  return getEmailJsConfig().isConfigured;
};

const sendViaEmailJs = async (templateParams) => {
  const { isConfigured, service_id, template_id, user_id, accessToken } = getEmailJsConfig();

  if (!isConfigured) {
    throw new Error('EmailJS variables (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY) not found in environment');
  }

  const payload = {
    service_id,
    template_id,
    user_id,
    ...(accessToken ? { accessToken } : {}),
    template_params: templateParams
  };

  console.log(`📡 [EMAILJS DISPATCH] Calling EmailJS API (Service: ${service_id}, Template: ${template_id})`);

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ [EMAILJS ERROR ${response.status}]:`, errorText);
    throw new Error(`EmailJS Error (${response.status}): ${errorText}`);
  }

  console.log('✅ [EMAILJS SUCCESS] Email successfully dispatched by EmailJS');
  return true;
};

const getSmtpTransporter = () => {
  // 1. Direct Gmail Service Support
  const gmailUser = (process.env.GMAIL_USER || (process.env.SMTP_USER && process.env.SMTP_USER.includes('@gmail.com') ? process.env.SMTP_USER : '')).trim();
  const gmailPass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').trim();

  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s+/g, '') // remove any spaces in Google App Password
      }
    });
  }

  // 2. Standard SMTP Host Configuration
  const host = (process.env.SMTP_HOST || '').trim();
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

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
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'aksharcanvas@gmail.com';
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const fullPoemMessage = `Title: "${title}"\nPoet: ${poetName} (${city || 'N/A'})\nCategory: ${category}\nEmail: ${email || 'N/A'}\n\nVerses:\n${poemText}\n\nPoet Reflection: ${reflection || 'N/A'}`;

  let emailJsError = null;

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
      emailJsError = err.message;
      console.error('❌ [EMAIL SERVICE] EmailJS poem notification failed:', err.message);
    }
  }

  // 2. Try SMTP / Direct Gmail
  const transporter = getSmtpTransporter();
  if (transporter) {
    try {
      const fromEmail = process.env.EMAIL_FROM || '"Akshar Canvas Literary Portal" <aksharcanvas@gmail.com>';
      await transporter.sendMail({
        from: fromEmail,
        to: adminEmail,
        replyTo: email || undefined,
        subject: `📜 नवीन कविता प्रविष्टि: "${title}" — ${poetName}`,
        html: `
          <div style="font-family: 'Segoe UI', Georgia, serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 2px solid #C5A059; border-radius: 12px; background: #FAF8F5; color: #2C1810;">
            <div style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 12px; margin-bottom: 18px;">
              <h1 style="color: #8B0000; margin: 0; font-size: 24px;">अक्षर कैनवास (Akshar Canvas)</h1>
              <p style="color: #C5A059; margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">नवीन पाठक रचना प्रविष्टि (Reader Poem Submission)</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 15px;">
              <tr><td style="padding: 6px 0; color: #7D6B6E; width: 110px;"><strong>कवि / रचनाकार:</strong></td><td><strong>${poetName}</strong> (${city || 'N/A'})</td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>ईमेल:</strong></td><td><a href="mailto:${email}" style="color: #8B0000; text-decoration: none;">${email || 'N/A'}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>रचना शीर्षक:</strong></td><td style="color: #8B0000; font-weight: bold;">"${title}"</td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>विधा / श्रेणी:</strong></td><td>${category}</td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>समय:</strong></td><td>${currentTime}</td></tr>
            </table>
            <div style="background: #FFF9F2; border-left: 4px solid #8B0000; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <h3 style="color: #8B0000; margin: 0 0 10px 0; font-size: 16px;">काव्य पंक्तियाँ:</h3>
              <pre style="white-space: pre-wrap; font-family: 'Segoe UI', Georgia, serif; font-size: 15px; line-height: 1.8; color: #1a1a1a; margin: 0;">${poemText}</pre>
            </div>
            ${reflection ? `<p style="margin: 12px 0; font-style: italic; color: #555;"><strong>रचनाकार का विचार:</strong> "${reflection}"</p>` : ''}
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #C5A059; text-align: center;">
              <a href="mailto:${email}?subject=Re: Your poem '${encodeURIComponent(title)}' on Akshar Canvas" style="background: #8B0000; color: #FFFFFF; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">कवि को सीधे ईमेल उत्तर दें (Reply to Poet)</a>
            </div>
          </div>
        `
      });
      return { success: true, service: 'smtp' };
    } catch (err) {
      console.error('SMTP email dispatch error:', err.message);
      return { success: false, service: 'smtp', error: err.message, emailJsError };
    }
  }

  if (emailJsError) {
    return { success: false, service: 'emailjs', error: emailJsError, simulated: false };
  }

  // 3. Fallback Logger
  console.log('\n📧 [EMAIL SERVICE - MOCK DISPATCH: POEM SUBMISSION]');
  console.log(`To: ${adminEmail}`);
  console.log(`Subject: 📜 New Poem Submission: "${title}" by ${poetName}`);
  console.log(`Details: Poet: ${poetName} | Category: ${category} | Email: ${email}`);
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

  let emailJsError = null;

  // 1. Try EmailJS First
  if (isEmailJsConfigured()) {
    try {
      console.log('📬 [EMAIL DISPATCH] Sending Contact Inquiry via EmailJS to', adminEmail);
      await sendViaEmailJs({
        title: `${eventType || 'General Inquiry'} - ${name}`,
        name: name,
        time: currentTime,
        message: fullMessage,
        email: email || '',
        phone: phone || '',
        city: city || '',
        eventType: eventType || '',
        date: date || '',
        to_email: adminEmail,
        reply_to: email || undefined,
        subject: `Contact Us: ${eventType || 'Inquiry'} - ${name}`,
        inquiry_id: id
      });
      console.log('✅ [EMAIL DISPATCH] Contact Inquiry Email sent successfully via EmailJS.');
      return { success: true, service: 'emailjs' };
    } catch (err) {
      emailJsError = err.message;
      console.error('❌ [EMAIL SERVICE] EmailJS contact notification failed:', err.message);
    }
  }

  // 2. Try SMTP / Direct Gmail
  const transporter = getSmtpTransporter();
  if (transporter) {
    try {
      const fromEmail = process.env.EMAIL_FROM || '"Akshar Canvas Portal" <aksharcanvas@gmail.com>';
      await transporter.sendMail({
        from: fromEmail,
        to: adminEmail,
        replyTo: email || undefined,
        subject: `💌 नवीन संपर्क पूछताछ: ${name} (${eventType || 'आमंत्रण'})`,
        html: `
          <div style="font-family: 'Segoe UI', Georgia, serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 2px solid #C5A059; border-radius: 12px; background: #FAF8F5; color: #2C1810;">
            <div style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 12px; margin-bottom: 18px;">
              <h1 style="color: #8B0000; margin: 0; font-size: 24px;">अक्षर कैनवास (Akshar Canvas)</h1>
              <p style="color: #C5A059; margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">नवीन संपर्क एवं आमंत्रण संदेश (Contact & Literary Inquiry)</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 15px;">
              <tr><td style="padding: 6px 0; color: #7D6B6E; width: 110px;"><strong>प्रेषक (Name):</strong></td><td><strong>${name}</strong></td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>ईमेल (Email):</strong></td><td><a href="mailto:${email}" style="color: #8B0000; text-decoration: none;">${email}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>फोन / मोबाइल:</strong></td><td><a href="tel:${phone}" style="color: #8B0000; text-decoration: none;">${phone || 'N/A'}</a></td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>स्थान / शहर:</strong></td><td>${city || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>उद्देश्य / प्रसंग:</strong></td><td style="color: #8B0000; font-weight: bold;">${eventType}</td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>प्रस्तावित तिथि:</strong></td><td>${date || 'Flexible / विचारणीय'}</td></tr>
              <tr><td style="padding: 6px 0; color: #7D6B6E;"><strong>प्राप्ति समय:</strong></td><td>${currentTime}</td></tr>
            </table>
            <div style="background: #FFF9F2; border-left: 4px solid #8B0000; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <h3 style="color: #8B0000; margin: 0 0 10px 0; font-size: 16px;">संदेश विवरण:</h3>
              <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #1a1a1a; margin: 0;">${message}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #C5A059; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(eventType || 'Your Inquiry to Akshar Canvas')}" style="background: #8B0000; color: #FFFFFF; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">सीधे ईमेल उत्तर भेजें (Reply to ${name})</a>
            </div>
          </div>
        `
      });
      return { success: true, service: 'smtp' };
    } catch (err) {
      console.error('SMTP inquiry dispatch error:', err.message);
      return { success: false, service: 'smtp', error: err.message, emailJsError };
    }
  }

  // If EmailJS failed and no SMTP was configured
  if (emailJsError) {
    return { success: false, service: 'emailjs', error: emailJsError, simulated: false };
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
