import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { IndianRupee, FileText, Users, Bell, TrendingUp } from 'lucide-react';
import { getBusinessSummary } from '../utils/storage';
import { useEffect, useState } from 'react';
import { BusinessSummary } from '../types';
import { WelcomeBanner } from './WelcomeBanner';

export function Dashboard() {
  const [summary, setSummary] = useState<BusinessSummary>({
    today_sales: 0,
    today_bill_count: 0,
    pending_payments: 0,
    total_sales: 0,
    total_customers: 0,
    pending_reminders: 0,
  });
  
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('bharat_biz_welcome_dismissed');
  });
  
  useEffect(() => {
    const loadSummary = () => {
      setSummary(getBusinessSummary());
    };
    
    loadSummary();
    
    // Refresh every 5 seconds
    const interval = setInterval(loadSummary, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const handleCloseWelcome = () => {
    localStorage.setItem('bharat_biz_welcome_dismissed', 'true');
    setShowWelcome(false);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to Bharat Biz-Agent</p>
      </div>
      
      {showWelcome && (
        <WelcomeBanner onClose={handleCloseWelcome} />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Today's Sales
            </CardTitle>
            <IndianRupee className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              ₹{summary.today_sales.toFixed(2)}
            </div>
            <p className="text-xs text-green-700 mt-1">
              {summary.today_bill_count} bills today
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Pending Payments
            </CardTitle>
            <FileText className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              ₹{summary.pending_payments.toFixed(2)}
            </div>
            <p className="text-xs text-orange-700 mt-1">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Customers
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {summary.total_customers}
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Registered customers
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Pending Reminders
            </CardTitle>
            <Bell className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {summary.pending_reminders}
            </div>
            <p className="text-xs text-purple-700 mt-1">
              Tasks to complete
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 md:col-span-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-indigo-900">
              Total Sales (All Time)
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900">
              ₹{summary.total_sales.toFixed(2)}
            </div>
            <p className="text-xs text-indigo-700 mt-1">
              Lifetime revenue
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="/billing" 
              className="p-4 border-2 border-green-200 rounded-lg text-center hover:bg-green-50 transition-colors"
            >
              <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="font-semibold text-sm">Create Bill</div>
            </a>
            <a 
              href="/products" 
              className="p-4 border-2 border-purple-200 rounded-lg text-center hover:bg-purple-50 transition-colors"
            >
              <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold text-sm">View Products</div>
            </a>
            <a 
              href="/customers" 
              className="p-4 border-2 border-blue-200 rounded-lg text-center hover:bg-blue-50 transition-colors"
            >
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold text-sm">View Customers</div>
            </a>
            <a 
              href="/invoices" 
              className="p-4 border-2 border-orange-200 rounded-lg text-center hover:bg-orange-50 transition-colors"
            >
              <FileText className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="font-semibold text-sm">View Invoices</div>
            </a>
            <a 
              href="/analytics" 
              className="p-4 border-2 border-red-200 rounded-lg text-center hover:bg-red-50 transition-colors"
            >
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <div className="font-semibold text-sm">Analytics</div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}