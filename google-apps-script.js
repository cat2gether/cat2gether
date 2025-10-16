// Google Apps Script code (copy this to your Google Apps Script editor)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get parameters from the POST request
    var email = e.parameter.email;
    var source = e.parameter.source || 'unknown'; // 'main' or 'mobile'
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Invalid email"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists
    var existingEmails = sheet.getRange('B:B').getValues();
    for (var i = 0; i < existingEmails.length; i++) {
      if (existingEmails[i][0] === email) {
        return ContentService
          .createTextOutput(JSON.stringify({success: false, message: "Email already registered"}))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 3).setValues([['Timestamp', 'Email', 'Source']]);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }
    
    // Append the new email registration
    sheet.appendRow([new Date(timestamp), email, source]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: "Success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: "Server error"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Test function to verify the script works
function testDoPost() {
  var mockEvent = {
    parameter: {
      email: 'test@example.com',
      source: 'main',
      timestamp: new Date().toISOString()
    }
  };
  
  var result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}