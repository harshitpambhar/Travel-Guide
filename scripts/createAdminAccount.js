/**
 * Development Script: Create Admin Account
 * 
 * This script can be used during development to add new admin accounts
 * to the localStorage. In production, admin accounts should be managed
 * through a secure backend system.
 * 
 * Usage: Run this in the browser console while on the GlobeTrotter site
 */

function createAdminAccount(adminData) {
  // Get existing admin accounts or initialize empty array
  let adminAccounts = JSON.parse(localStorage.getItem('adminAccounts') || '[]');
  
  // Add new admin account
  adminAccounts.push({
    id: `admin_${Date.now()}`,
    name: adminData.name,
    email: adminData.email,
    password: adminData.password,
    type: "admin",
    phone: adminData.phone || "+1 (555) 000-0000",
    createdAt: new Date().toISOString()
  });
  
  // Save back to localStorage
  localStorage.setItem('adminAccounts', JSON.stringify(adminAccounts));
  
  console.log('Admin account created successfully:', adminData.email);
  return adminAccounts;
}

// Example usage:
// createAdminAccount({
//   name: "New Admin",
//   email: "newadmin@globetrotter.com",
//   password: "newadmin123",
//   phone: "+1 (555) 111-1111"
// });

// List all admin accounts
function listAdminAccounts() {
  const adminAccounts = JSON.parse(localStorage.getItem('adminAccounts') || '[]');
  console.log('Current admin accounts:', adminAccounts);
  return adminAccounts;
}

// Remove admin account
function removeAdminAccount(email) {
  let adminAccounts = JSON.parse(localStorage.getItem('adminAccounts') || '[]');
  adminAccounts = adminAccounts.filter(admin => admin.email !== email);
  localStorage.setItem('adminAccounts', JSON.stringify(adminAccounts));
  console.log('Admin account removed:', email);
  return adminAccounts;
}

// Clear all admin accounts
function clearAdminAccounts() {
  localStorage.removeItem('adminAccounts');
  console.log('All admin accounts cleared');
}

// Export functions for use in console
window.createAdminAccount = createAdminAccount;
window.listAdminAccounts = listAdminAccounts;
window.removeAdminAccount = removeAdminAccount;
window.clearAdminAccounts = clearAdminAccounts;

console.log('Admin account management functions loaded. Use:');
console.log('- createAdminAccount({name, email, password, phone})');
console.log('- listAdminAccounts()');
console.log('- removeAdminAccount(email)');
console.log('- clearAdminAccounts()');
