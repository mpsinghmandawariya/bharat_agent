import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { clearDemoData, initializeDemoData } from '../utils/demoData';
import { Download, Trash2, RefreshCw, Database } from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const [loading, setLoading] = useState(false);
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setLoading(true);
      clearDemoData();
      setTimeout(() => {
        setLoading(false);
        toast.success('All data cleared successfully!');
        window.location.reload();
      }, 500);
    }
  };
  
  const handleReloadDemo = () => {
    setLoading(true);
    clearDemoData();
    setTimeout(() => {
      initializeDemoData();
      setLoading(false);
      toast.success('Demo data reloaded successfully!');
      window.location.reload();
    }, 500);
  };
  
  const handleExportData = () => {
    const data = {
      invoices: localStorage.getItem('bharat_biz_invoices'),
      customers: localStorage.getItem('bharat_biz_customers'),
      payments: localStorage.getItem('bharat_biz_payments'),
      reminders: localStorage.getItem('bharat_biz_reminders'),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bharat-biz-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    toast.success('Data exported successfully!');
  };
  
  const storageSize = () => {
    let total = 0;
    for (let key in localStorage) {
      if (key.startsWith('bharat_biz_')) {
        total += localStorage[key].length;
      }
    }
    return (total / 1024).toFixed(2);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your app preferences and data</p>
      </div>
      
      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle>Application Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Version</div>
              <div className="text-2xl font-bold text-blue-900">1.0.0</div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Storage Used</div>
              <div className="text-2xl font-bold text-green-900">{storageSize()} KB</div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">Active</Badge>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Note</h3>
            <p className="text-sm text-yellow-800">
              This application stores all data locally in your browser's localStorage. 
              Data is not synced to any server and will be lost if you clear browser data.
              Use the export feature to backup your data regularly.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              '🎤 Multilingual Voice Input (Hindi, Hinglish, English)',
              '🔊 Text-to-Speech Responses',
              '💰 Automatic GST Calculation (5%, 18%, 28%)',
              '📄 PDF Invoice Generation',
              '👥 Customer Management & Tracking',
              '📊 Real-time Business Analytics',
              '🔔 Task Reminders',
              '📦 50+ Pre-loaded Products',
              '💳 UPI Payment Integration',
              '📱 Fully Responsive Design',
              '🌐 Offline-First Architecture',
              '🇮🇳 Made for Indian Small Businesses',
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            
            <Button
              onClick={handleReloadDemo}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Reload Demo Data
            </Button>
            
            <Button
              onClick={handleClearData}
              variant="destructive"
              className="w-full"
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li><strong>Export Data:</strong> Download a JSON backup of all your business data</li>
              <li><strong>Reload Demo:</strong> Reset and reload sample data to explore features</li>
              <li><strong>Clear All:</strong> Permanently delete all stored data (use with caution)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {/* Voice Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Voice & Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Supported Languages</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-600">🇮🇳 Hindi (हिंदी)</Badge>
                <Badge className="bg-blue-600">🇬🇧 Hinglish (Hindi+English)</Badge>
                <Badge className="bg-purple-600">🇺🇸 English</Badge>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Example Voice Commands</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>"2 kilo chawal 60 rupaye"</li>
                <li>"1 liter oil 150"</li>
                <li>"5 piece soap 40, 2 kg sugar 42"</li>
                <li>"आज की बिक्री कितनी है?"</li>
                <li>"Remind me to call supplier tomorrow"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
