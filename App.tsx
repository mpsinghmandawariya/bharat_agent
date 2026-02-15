import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { useEffect } from 'react';
import { initializeDemoData } from './utils/demoData';

export default function App() {
  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData();
  }, []);
  
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}