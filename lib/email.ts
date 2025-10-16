// Email submission utility for Google Apps Script integration
export interface EmailSubmission {
  email: string;
  source: 'main' | 'mobile';
  timestamp: string;
}

export interface EmailSubmissionResponse {
  success: boolean;
  message: string;
}

// Replace this URL with your actual Google Apps Script Web App URL
// To get this URL: Deploy your Apps Script as a Web App and copy the URL
const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export async function submitEmail(email: string, source: 'main' | 'mobile'): Promise<EmailSubmissionResponse> {
  try {
    // Basic email validation
    if (!email || !isValidEmail(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.error('Google Apps Script URL not configured');
      return {
        success: false,
        message: 'Email service not configured. Please try again later.'
      };
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('source', source);
    formData.append('timestamp', new Date().toISOString());

    // Submit to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Apps Script
    });

    // Note: With mode: 'no-cors', we can't read the response
    // But the request will still be processed by Google Apps Script
    return {
      success: true,
      message: 'Thanks for signing up! We\'ll notify you when we launch. 🎉'
    };

  } catch (error) {
    console.error('Email submission error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}