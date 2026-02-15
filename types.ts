// Data types for Bharat Biz-Agent

export interface Product {
  id: string;
  name: string;
  name_hi: string;
  category: 'food_items' | 'general_goods' | 'luxury_items';
  unit: 'kg' | 'liter' | 'piece' | 'pack' | 'box' | 'bottle' | 'gram';
  price: number;
  gst_rate: number;
  stock?: number;
}

export interface InvoiceItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  total_price: number;
  gst_rate: number;
  gst_amount: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_mobile?: string;
  customer_name?: string;
  items: InvoiceItem[];
  subtotal: number;
  total_gst: number;
  total_amount: number;
  payment_status: 'pending' | 'completed' | 'partial';
  payment_mode?: 'UPI' | 'Cash' | 'Card';
  created_at: string;
  upi_string?: string;
}

export interface Customer {
  mobile: string;
  name: string;
  total_purchases: number;
  visit_count: number;
  last_visit: string;
  loyalty_points: number;
}

export interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  mode: 'UPI' | 'Cash' | 'Card';
  status: 'pending' | 'completed';
  transaction_id?: string;
  screenshot_url?: string;
  created_at: string;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'completed';
  created_at: string;
}

export interface BusinessSummary {
  today_sales: number;
  today_bill_count: number;
  pending_payments: number;
  total_sales: number;
  total_customers: number;
  pending_reminders: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  data?: any;
}
