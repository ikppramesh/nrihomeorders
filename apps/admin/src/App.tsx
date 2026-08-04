import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from './lib/auth-store';
import LoginPage from './pages/Login';
import Layout from './components/Layout';
import DashboardPage from './pages/Dashboard';
import OrdersPage from './pages/Orders';
import OrderDetailPage from './pages/OrderDetail';
import CustomersPage from './pages/Customers';
import CustomerDetailPage from './pages/CustomerDetail';
import AgentsPage from './pages/Agents';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { admin } = useAdminAuth();
  if (!admin) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/:id" element={<CustomerDetailPage />} />
        <Route path="agents" element={<AgentsPage />} />
      </Route>
    </Routes>
  );
}
