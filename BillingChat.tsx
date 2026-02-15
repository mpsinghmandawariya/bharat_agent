import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Mic, Volume2, VolumeX, Send, Loader2, Download } from 'lucide-react';
import { voiceRecognition, textToSpeech } from '../utils/voice';
import { extractItemsFromText, findProduct, PRODUCTS } from '../utils/products';
import { saveInvoice, saveCustomer, getCustomerByMobile, updateCustomer, saveReminder } from '../utils/storage';
import { Invoice, InvoiceItem, ChatMessage, Customer, Reminder } from '../types';
import { generateInvoicePDF } from '../utils/pdf';
import { format } from 'date-fns';

export function BillingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'नमस्ते! मैं Bharat Biz-Agent हूं। आप बिलिंग के लिए बोल सकते हैं या टाइप कर सकते हैं। उदाहरण: "2 किलो चावल 60 रुपये, 1 लीटर तेल 150 रुपये"',
      timestamp: new Date().toISOString(),
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [language, setLanguage] = useState<'hi-IN' | 'en-IN' | 'en-US'>('hi-IN');
  const [draftInvoice, setDraftInvoice] = useState<Invoice | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    textToSpeech.setEnabled(isSpeechEnabled);
  }, [isSpeechEnabled]);
  
  const addMessage = (type: 'user' | 'assistant' | 'system', content: string, data?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date().toISOString(),
      data,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (type === 'assistant' && isSpeechEnabled) {
      textToSpeech.speak(content, language);
    }
  };
  
  const handleVoiceInput = () => {
    if (!voiceRecognition.isSupported()) {
      addMessage('system', 'Voice recognition is not supported in this browser');
      return;
    }
    
    if (isListening) {
      voiceRecognition.stopListening();
      setIsListening(false);
      return;
    }
    
    setIsListening(true);
    voiceRecognition.startListening(
      language,
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
        processInput(transcript);
      },
      (error) => {
        addMessage('system', `Voice error: ${error}`);
        setIsListening(false);
      }
    );
  };
  
  const processInput = (text: string) => {
    if (!text.trim()) return;
    
    addMessage('user', text);
    setInputText('');
    setIsProcessing(true);
    
    setTimeout(() => {
      handleUserInput(text);
      setIsProcessing(false);
    }, 500);
  };
  
  const handleUserInput = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Check for billing intent
    if (lowerText.includes('bill') || lowerText.includes('invoice') || 
        lowerText.includes('बिल') || /\d+.*rupaye|rupee|rs|रुपये/.test(lowerText)) {
      handleBillingRequest(text);
      return;
    }
    
    // Check for reminder intent
    if (lowerText.includes('remind') || lowerText.includes('याद दिला')) {
      handleReminderRequest(text);
      return;
    }
    
    // Check for sales query
    if (lowerText.includes('sales') || lowerText.includes('today') || 
        lowerText.includes('kitna') || lowerText.includes('कितना')) {
      handleSalesQuery();
      return;
    }
    
    // Default response
    addMessage('assistant', 'मैं आपकी मदद करने के लिए तैयार हूं। आप बिलिंग, रिमाइंडर, या सेल्स की जानकारी के लिए पूछ सकते हैं।');
  };
  
  const handleBillingRequest = (text: string) => {
    const extractedItems = extractItemsFromText(text);
    
    if (extractedItems.length === 0) {
      addMessage('assistant', 'कृपया सही फॉर्मेट में बोलें: "2 किलो चावल 60 रुपये"');
      return;
    }
    
    // Create invoice items
    const items: InvoiceItem[] = extractedItems.map(item => {
      const product = findProduct(item.productName) || {
        id: 'unknown',
        name: item.productName,
        category: 'general_goods' as const,
        gst_rate: 18,
      };
      
      const subtotal = item.quantity * item.price;
      const gstAmount = subtotal * (product.gst_rate / 100);
      const totalPrice = subtotal + gstAmount;
      
      return {
        product_id: product.id,
        product_name: product.name || item.productName,
        quantity: item.quantity,
        unit: item.unit,
        price_per_unit: item.price,
        total_price: totalPrice,
        gst_rate: product.gst_rate,
        gst_amount: gstAmount,
      };
    });
    
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price_per_unit), 0);
    const totalGST = items.reduce((sum, item) => sum + item.gst_amount, 0);
    const totalAmount = subtotal + totalGST;
    
    const invoiceNumber = `INV${format(new Date(), 'yyyyMMddHHmmss')}`;
    
    const invoice: Invoice = {
      id: Date.now().toString(),
      invoice_number: invoiceNumber,
      items,
      subtotal,
      total_gst: totalGST,
      total_amount: totalAmount,
      payment_status: 'pending',
      created_at: new Date().toISOString(),
      upi_string: `upi://pay?pa=merchant@upi&pn=BharatBiz&am=${totalAmount}&cu=INR&tn=${invoiceNumber}`,
    };
    
    setDraftInvoice(invoice);
    
    const itemsList = items.map(item => 
      `${item.quantity} ${item.unit} ${item.product_name} - ₹${item.total_price.toFixed(2)}`
    ).join('\n');
    
    addMessage('assistant', 
      `बिल तैयार है:\n\n${itemsList}\n\nSubtotal: ₹${subtotal.toFixed(2)}\nGST: ₹${totalGST.toFixed(2)}\nTotal: ₹${totalAmount.toFixed(2)}\n\nक्या यह सही है? "हाँ" बोलें कन्फर्म करने के लिए।`,
      { invoice }
    );
  };
  
  const handleSalesQuery = () => {
    const summary = require('../utils/storage').getBusinessSummary();
    addMessage('assistant', 
      `आज की बिक्री: ₹${summary.today_sales.toFixed(2)}\n` +
      `आज के बिल: ${summary.today_bill_count}\n` +
      `कुल बिक्री: ₹${summary.total_sales.toFixed(2)}`
    );
  };
  
  const handleReminderRequest = (text: string) => {
    // Simple reminder extraction
    const reminder: Reminder = {
      id: Date.now().toString(),
      title: text,
      due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    
    saveReminder(reminder);
    addMessage('assistant', 'रिमाइंडर सेव हो गया है।');
  };
  
  const handleConfirmBill = () => {
    if (!draftInvoice) return;
    
    saveInvoice(draftInvoice);
    
    addMessage('assistant', 
      `बिल सेव हो गया! Invoice Number: ${draftInvoice.invoice_number}`,
      { invoice: draftInvoice, showDownload: true }
    );
    
    setDraftInvoice(null);
  };
  
  const handleDownloadInvoice = (invoice: Invoice) => {
    generateInvoicePDF(invoice);
    addMessage('system', 'PDF downloaded successfully!');
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4">
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Voice Billing Assistant</h2>
            <p className="text-sm text-gray-600">Speak or type to create bills</p>
          </div>
          
          <div className="flex gap-2">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="hi-IN">हिंदी (Hindi)</option>
              <option value="en-IN">Hinglish</option>
              <option value="en-US">English</option>
            </select>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
            >
              {isSpeechEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 whitespace-pre-wrap ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.type === 'system'
                    ? 'bg-gray-200 text-gray-700 text-sm'
                    : 'bg-green-100 text-gray-900'
                }`}
              >
                {message.content}
                
                {message.data?.showDownload && message.data?.invoice && (
                  <Button
                    onClick={() => handleDownloadInvoice(message.data.invoice)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {draftInvoice && (
            <div className="flex justify-center">
              <Button 
                onClick={handleConfirmBill}
                className="bg-green-600 hover:bg-green-700"
              >
                ✓ Confirm Bill
              </Button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="icon"
              onClick={handleVoiceInput}
              disabled={isProcessing}
              className={isListening ? 'animate-pulse' : ''}
            >
              {isListening ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && processInput(inputText)}
              placeholder="Type your message or use voice..."
              disabled={isProcessing}
              className="flex-1"
            />
            
            <Button 
              onClick={() => processInput(inputText)}
              disabled={isProcessing || !inputText.trim()}
            >
              {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Quick action buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => processInput("आज की बिक्री कितनी है?")}
            >
              Today's Sales
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => processInput("2 kg rice 60, 1 liter oil 150")}
            >
              Sample Bill
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
