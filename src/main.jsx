import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

// Import all CSS files exactly as they were in HTML to preserve styles 100%
import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/components.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/footer.css';
import './styles/responsive.css';
import './styles/auth.css';
import './styles/pages.css';
import './styles/products.css';

// Toast Notification component that listens to CartContext
const ToastManager = () => {
  const { toastMessage } = useCart();
  
  useEffect(() => {
    if (toastMessage) {
      const container = document.getElementById('toast-container');
      if (container) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.background = 'var(--clr-surface)';
        toast.style.color = 'var(--clr-text-primary)';
        toast.style.padding = 'var(--space-3) var(--space-4)';
        toast.style.borderRadius = 'var(--radius-md)';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        toast.style.border = '1px solid var(--clr-border)';
        toast.style.animation = 'slideIn 0.3s forwards';
        
        const icon = document.createElement('div');
        icon.className = 'toast-icon';
        icon.innerHTML = '✓';
        icon.style.background = 'var(--clr-success)';
        icon.style.color = 'white';
        icon.style.width = '24px';
        icon.style.height = '24px';
        icon.style.borderRadius = '50%';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.marginRight = 'var(--space-3)';
        icon.style.fontSize = 'var(--fs-xs)';
        
        const text = document.createElement('div');
        text.className = 'toast-message';
        text.innerHTML = `Added <strong>${toastMessage}</strong> to cart`;
        
        toast.appendChild(icon);
        toast.appendChild(text);
        
        // Ensure animation keyframes exist
        if (!document.getElementById('toast-animations')) {
          const style = document.createElement('style');
          style.id = 'toast-animations';
          style.innerHTML = `
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
          `;
          document.head.appendChild(style);
        }
        
        container.appendChild(toast);
        
        setTimeout(() => {
          toast.style.animation = 'slideOut 0.3s forwards';
          setTimeout(() => {
            if (toast.parentNode === container) {
              container.removeChild(toast);
            }
          }, 300);
        }, 3000);
      }
    }
  }, [toastMessage]);
  
  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <ToastManager />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
