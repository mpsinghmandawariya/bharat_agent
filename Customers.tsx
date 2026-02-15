import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { getCustomers } from '../utils/storage';
import { Customer } from '../types';
import { format } from 'date-fns';
import { Users, TrendingUp, Calendar } from 'lucide-react';

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'purchases' | 'visits'>('purchases');
  
  useEffect(() => {
    loadCustomers();
  }, []);
  
  const loadCustomers = () => {
    const allCustomers = getCustomers();
    setCustomers(allCustomers);
  };
  
  const sortedCustomers = [...customers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'purchases':
        return b.total_purchases - a.total_purchases;
      case 'visits':
        return b.visit_count - a.visit_count;
      default:
        return 0;
    }
  });
  
  const topCustomers = sortedCustomers.slice(0, 5);
  const totalRevenue = customers.reduce((sum, c) => sum + c.total_purchases, 0);
  const avgPurchase = customers.length > 0 ? totalRevenue / customers.length : 0;
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage and view customer information</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Purchase</CardTitle>
            <Calendar className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgPurchase.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Customers by Spending</CardTitle>
        </CardHeader>
        <CardContent>
          {topCustomers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No customers yet</p>
          ) : (
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div 
                  key={customer.mobile}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-600">{customer.mobile}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-700">₹{customer.total_purchases.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{customer.visit_count} visits</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* All Customers Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Customers</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('name')}
              className={`px-3 py-1 rounded text-sm ${sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy('purchases')}
              className={`px-3 py-1 rounded text-sm ${sortBy === 'purchases' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Purchases
            </button>
            <button
              onClick={() => setSortBy('visits')}
              className={`px-3 py-1 rounded text-sm ${sortBy === 'visits' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Visits
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No customers yet. Create bills with customer mobile numbers to see them here.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Total Purchases</TableHead>
                    <TableHead>Visits</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Loyalty Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCustomers.map((customer) => (
                    <TableRow key={customer.mobile}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.mobile}</TableCell>
                      <TableCell className="text-green-700 font-semibold">
                        ₹{customer.total_purchases.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{customer.visit_count}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {format(new Date(customer.last_visit), 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{customer.loyalty_points} pts</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
