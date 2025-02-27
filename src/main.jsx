// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import CalculatorApp from './CalculatorApp/CalculatorApp.jsx'
import LoginPage from './LoginPage/LoginPage.jsx'


createRoot(document.getElementById('root'))
.render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <CalculatorApp/>
//  <LoginPage/>
)
