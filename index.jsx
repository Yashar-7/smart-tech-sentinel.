import React from 'react';
import ReactDOM from 'react-dom/client';
import WarRoom from './WarRoom';
import './index.css'; // Si tienes un archivo de estilos, si no, borra esta línea

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WarRoom />
  </React.StrictMode>
);