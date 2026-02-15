import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, Mic, FileText, TrendingUp, Users, Languages } from 'lucide-react';

interface WelcomeBannerProps {
  onClose: () => void;
}

export function WelcomeBanner({ onClose }: WelcomeBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-none shadow-xl">
      <CardHeader className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <CardTitle className="text-2xl">
          🎉 Welcome to Bharat Biz-Agent!
        </CardTitle>
        <p className="text-white/90 mt-2">
          Your intelligent multilingual business assistant for Indian small businesses
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <Mic className="h-6 w-6" />
              <h3 className="font-semibold">Voice-Powered Billing</h3>
            </div>
            <p className="text-sm text-white/80">
              Create bills by speaking naturally in Hindi, Hinglish, or English
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <Languages className="h-6 w-6" />
              <h3 className="font-semibold">Multilingual Support</h3>
            </div>
            <p className="text-sm text-white/80">
              Works with Hindi, Hinglish (Hindi+English mix), and English
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6" />
              <h3 className="font-semibold">Smart GST Calculation</h3>
            </div>
            <p className="text-sm text-white/80">
              Automatic GST calculation based on product categories (5%, 18%, 28%)
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6" />
              <h3 className="font-semibold">Customer Management</h3>
            </div>
            <p className="text-sm text-white/80">
              Track customer visits, purchases, and loyalty points automatically
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-6 w-6" />
              <h3 className="font-semibold">Business Analytics</h3>
            </div>
            <p className="text-sm text-white/80">
              Real-time insights on sales, popular products, and payment status
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6" />
              <h3 className="font-semibold">PDF Invoices</h3>
            </div>
            <p className="text-sm text-white/80">
              Generate professional invoices with UPI payment integration
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur mt-4">
          <h3 className="font-semibold mb-2">🚀 Quick Start Tips:</h3>
          <ul className="text-sm text-white/80 space-y-1 list-disc list-inside">
            <li>Go to <strong>Billing</strong> to create your first voice-powered bill</li>
            <li>Try saying: "2 kilo chawal 60 rupaye, 1 liter tel 150 rupaye"</li>
            <li>Check out the <strong>Products</strong> page to see all 50+ available items</li>
            <li>View <strong>Analytics</strong> for business insights and charts</li>
            <li>Demo data is pre-loaded to help you explore all features</li>
          </ul>
        </div>
        
        <div className="flex gap-3 mt-4">
          <Button
            onClick={onClose}
            className="bg-white text-blue-600 hover:bg-white/90"
          >
            Get Started
          </Button>
          <Button
            onClick={() => window.location.href = '/billing'}
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Create First Bill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
