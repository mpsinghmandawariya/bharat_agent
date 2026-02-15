import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getReminders, updateReminder } from '../utils/storage';
import { Reminder } from '../types';
import { format } from 'date-fns';
import { Bell, Check, Clock } from 'lucide-react';

export function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');
  
  useEffect(() => {
    loadReminders();
  }, []);
  
  const loadReminders = () => {
    const allReminders = getReminders();
    setReminders(allReminders.sort((a, b) => 
      new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    ));
  };
  
  const handleComplete = (id: string) => {
    updateReminder(id, { status: 'completed' });
    loadReminders();
  };
  
  const filteredReminders = reminders.filter(r => 
    filter === 'all' || r.status === filter
  );
  
  const pendingCount = reminders.filter(r => r.status === 'pending').length;
  const completedCount = reminders.filter(r => r.status === 'completed').length;
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reminders</h1>
        <p className="text-gray-600 mt-1">Manage your tasks and reminders</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reminders.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{pendingCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{completedCount}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter Buttons */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Reminders</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredReminders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {reminders.length === 0 
                ? 'No reminders yet. Use voice billing to create reminders.' 
                : 'No reminders match your filter.'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-4 rounded-lg border-2 ${
                    reminder.status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-orange-50 border-orange-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {reminder.status === 'completed' ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-600" />
                        )}
                        <h3 className="font-semibold text-gray-900">{reminder.title}</h3>
                      </div>
                      
                      {reminder.description && (
                        <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Due: {format(new Date(reminder.due_date), 'dd MMM yyyy')}</span>
                        <Badge variant={reminder.status === 'completed' ? 'default' : 'outline'}>
                          {reminder.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {reminder.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => handleComplete(reminder.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
