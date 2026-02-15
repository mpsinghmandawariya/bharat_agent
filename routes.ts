import { createBrowserRouter } from 'react-router';
import { Dashboard } from './components/Dashboard';
import { BillingChat } from './components/BillingChat';
import { Customers } from './components/Customers';
import { Invoices } from './components/Invoices';
import { Analytics } from './components/Analytics';
import { Reminders } from './components/Reminders';
import { Products } from './components/Products';
import { Settings } from './components/Settings';
import { RootLayout } from './components/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'billing', Component: BillingChat },
      { path: 'customers', Component: Customers },
      { path: 'invoices', Component: Invoices },
      { path: 'analytics', Component: Analytics },
      { path: 'reminders', Component: Reminders },
      { path: 'products', Component: Products },
      { path: 'settings', Component: Settings },
    ],
  },
]);