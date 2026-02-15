// Local storage manager for data persistence
import { Invoice, Customer, Payment, Reminder, BusinessSummary } from '../types';

const STORAGE_KEYS = {
  INVOICES: 'bharat_biz_invoices',
  CUSTOMERS: 'bharat_biz_customers',
  PAYMENTS: 'bharat_biz_payments',
  REMINDERS: 'bharat_biz_reminders',
};

// Invoice operations
export function saveInvoice(invoice: Invoice): void {
  const invoices = getInvoices();
  invoices.push(invoice);
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
}

export function getInvoices(): Invoice[] {
  const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
  return data ? JSON.parse(data) : [];
}

export function getInvoiceById(id: string): Invoice | undefined {
  return getInvoices().find(inv => inv.id === id);
}

export function updateInvoice(id: string, updates: Partial<Invoice>): void {
  const invoices = getInvoices();
  const index = invoices.findIndex(inv => inv.id === id);
  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }
}

// Customer operations
export function saveCustomer(customer: Customer): void {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.mobile === customer.mobile);
  
  if (index !== -1) {
    customers[index] = customer;
  } else {
    customers.push(customer);
  }
  
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
}

export function getCustomers(): Customer[] {
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  return data ? JSON.parse(data) : [];
}

export function getCustomerByMobile(mobile: string): Customer | undefined {
  return getCustomers().find(c => c.mobile === mobile);
}

export function updateCustomer(mobile: string, updates: Partial<Customer>): void {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.mobile === mobile);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }
}

// Payment operations
export function savePayment(payment: Payment): void {
  const payments = getPayments();
  payments.push(payment);
  localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
}

export function getPayments(): Payment[] {
  const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
  return data ? JSON.parse(data) : [];
}

export function getPaymentsByInvoice(invoiceId: string): Payment[] {
  return getPayments().filter(p => p.invoice_id === invoiceId);
}

// Reminder operations
export function saveReminder(reminder: Reminder): void {
  const reminders = getReminders();
  reminders.push(reminder);
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
}

export function getReminders(): Reminder[] {
  const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
  return data ? JSON.parse(data) : [];
}

export function updateReminder(id: string, updates: Partial<Reminder>): void {
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === id);
  if (index !== -1) {
    reminders[index] = { ...reminders[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  }
}

// Business summary
export function getBusinessSummary(): BusinessSummary {
  const invoices = getInvoices();
  const customers = getCustomers();
  const reminders = getReminders();
  const today = new Date().toISOString().split('T')[0];
  
  const todayInvoices = invoices.filter(inv => 
    inv.created_at.startsWith(today)
  );
  
  const todaySales = todayInvoices.reduce((sum, inv) => sum + inv.total_amount, 0);
  const totalSales = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
  const pendingPayments = invoices
    .filter(inv => inv.payment_status === 'pending')
    .reduce((sum, inv) => sum + inv.total_amount, 0);
  
  const pendingRemindersCount = reminders.filter(r => r.status === 'pending').length;
  
  return {
    today_sales: todaySales,
    today_bill_count: todayInvoices.length,
    pending_payments: pendingPayments,
    total_sales: totalSales,
    total_customers: customers.length,
    pending_reminders: pendingRemindersCount,
  };
}
