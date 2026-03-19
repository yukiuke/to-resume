import '../../../scss/admin.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import MainApp from '../../MainApp';
import AdminLayout from './AdminLayout';
import EventsManager from './EventsManager';
import LoginPage from './LoginPage';

const theme = createTheme();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter basename="/baalsdepe">
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="admin/login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="events" replace />} />
            <Route path="events" element={<EventsManager />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
