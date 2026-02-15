// Demo data initializer for Bharat Biz-Agent
import { saveInvoice, saveCustomer, saveReminder } from './storage';
import { Invoice, Customer, Reminder } from '../types';
import { format, subDays } from 'date-fns';

export function initializeDemoData() {
  // Check if demo data already exists
  const existingData = localStorage.getItem('bharat_biz_demo_initialized');
  if (existingData) return;
  
  // Create demo customers
  const customers: Customer[] = [
    {
      mobile: '9876543210',
      name: 'Rajesh Kumar',
      total_purchases: 2500,
      visit_count: 5,
      last_visit: new Date().toISOString(),
      loyalty_points: 250,
    },
    {
      mobile: '9876543211',
      name: 'Priya Sharma',
      total_purchases: 1800,
      visit_count: 3,
      last_visit: subDays(new Date(), 2).toISOString(),
      loyalty_points: 180,
    },
    {
      mobile: '9876543212',
      name: 'Amit Patel',
      total_purchases: 3200,
      visit_count: 7,
      last_visit: subDays(new Date(), 1).toISOString(),
      loyalty_points: 320,
    },
  ];
  
  customers.forEach(customer => saveCustomer(customer));
  
  // Create demo invoices
  const demoInvoices: Invoice[] = [
    {
      id: '1',
      invoice_number: 'INV20240213120001',
      customer_mobile: '9876543210',
      customer_name: 'Rajesh Kumar',
      items: [
        {
          product_id: 'rice',
          product_name: 'Rice',
          quantity: 5,
          unit: 'kg',
          price_per_unit: 60,
          total_price: 315,
          gst_rate: 5,
          gst_amount: 15,
        },
        {
          product_id: 'oil',
          product_name: 'Cooking Oil',
          quantity: 2,
          unit: 'liter',
          price_per_unit: 150,
          total_price: 315,
          gst_rate: 5,
          gst_amount: 15,
        },
      ],
      subtotal: 600,
      total_gst: 30,
      total_amount: 630,
      payment_status: 'completed',
      payment_mode: 'UPI',
      created_at: new Date().toISOString(),
      upi_string: 'upi://pay?pa=merchant@upi&pn=BharatBiz&am=630&cu=INR&tn=INV20240213120001',
    },
    {
      id: '2',
      invoice_number: 'INV20240212110001',
      customer_mobile: '9876543211',
      customer_name: 'Priya Sharma',
      items: [
        {
          product_id: 'sugar',
          product_name: 'Sugar',
          quantity: 2,
          unit: 'kg',
          price_per_unit: 42,
          total_price: 88.2,
          gst_rate: 5,
          gst_amount: 4.2,
        },
        {
          product_id: 'soap',
          product_name: 'Soap',
          quantity: 5,
          unit: 'piece',
          price_per_unit: 40,
          total_price: 236,
          gst_rate: 18,
          gst_amount: 36,
        },
      ],
      subtotal: 284,
      total_gst: 40.2,
      total_amount: 324.2,
      payment_status: 'pending',
      created_at: subDays(new Date(), 1).toISOString(),
      upi_string: 'upi://pay?pa=merchant@upi&pn=BharatBiz&am=324.2&cu=INR&tn=INV20240212110001',
    },
    {
      id: '3',
      invoice_number: 'INV20240211100001',
      customer_mobile: '9876543212',
      customer_name: 'Amit Patel',
      items: [
        {
          product_id: 'dal',
          product_name: 'Dal (Lentils)',
          quantity: 3,
          unit: 'kg',
          price_per_unit: 120,
          total_price: 378,
          gst_rate: 5,
          gst_amount: 18,
        },
        {
          product_id: 'detergent',
          product_name: 'Detergent',
          quantity: 1,
          unit: 'kg',
          price_per_unit: 120,
          total_price: 141.6,
          gst_rate: 18,
          gst_amount: 21.6,
        },
        {
          product_id: 'cold_drink',
          product_name: 'Cold Drink',
          quantity: 6,
          unit: 'bottle',
          price_per_unit: 40,
          total_price: 307.2,
          gst_rate: 28,
          gst_amount: 67.2,
        },
      ],
      subtotal: 720,
      total_gst: 106.8,
      total_amount: 826.8,
      payment_status: 'completed',
      payment_mode: 'Cash',
      created_at: subDays(new Date(), 2).toISOString(),
      upi_string: 'upi://pay?pa=merchant@upi&pn=BharatBiz&am=826.8&cu=INR&tn=INV20240211100001',
    },
  ];
  
  demoInvoices.forEach(invoice => saveInvoice(invoice));
  
  // Create demo reminders
  const reminders: Reminder[] = [
    {
      id: '1',
      title: 'Call supplier for rice stock',
      description: 'Check availability and pricing',
      due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Follow up with Rajesh Kumar',
      description: 'Discuss bulk order discount',
      due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      created_at: new Date().toISOString(),
    },
  ];
  
  reminders.forEach(reminder => saveReminder(reminder));
  
  // Mark demo data as initialized
  localStorage.setItem('bharat_biz_demo_initialized', 'true');
}

// Function to clear all demo data
export function clearDemoData() {
  localStorage.removeItem('bharat_biz_invoices');
  localStorage.removeItem('bharat_biz_customers');
  localStorage.removeItem('bharat_biz_payments');
  localStorage.removeItem('bharat_biz_reminders');
  localStorage.removeItem('bharat_biz_demo_initialized');
}
