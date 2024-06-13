import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from 'react-oidc-context';
import './index.css'

// const oidcConfig = {
//   authority: 'http://localhost:5009/auth/steam', // URL нашего сервера аутентификации
//   client_id: '', // Идентифиатор клиента (для Steam можно использовать любой уникальный идентификатор)
//   redirect_uri: 'http://localhost:5173/auth/steam/return', // URL для перенаправления после успешной аутентификации
//   response_type: 'code', // Тип ответа (можно изменить в зависимости от ваших требований)
//   scope: 'key', // Запрашиваемые области (openid и profile)
// };

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <AuthProvider > 
        <App />
    </AuthProvider>
  </React.StrictMode>
)
