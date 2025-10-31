import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './Providers/ThemeProvider.tsx'


const queryClinet=new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClinet}>
  <ThemeProvider>
      <App />
  
  </ThemeProvider>
  </QueryClientProvider>
)
