import { Routes, Route, Navigate } from 'react-router-dom';
import { useAgentAuth } from './lib/auth-store';
import LoginPage from './pages/Login';
import TaskListPage from './pages/TaskList';
import TaskDetailPage from './pages/TaskDetail';
import InspectionPage from './pages/Inspection';
import ShipmentPage from './pages/Shipment';
import BottomNav from './components/BottomNav';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { agent } = useAgentAuth();
  if (!agent) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <div className="flex-1">{children}</div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RequireAuth><AppLayout><TaskListPage /></AppLayout></RequireAuth>} />
      <Route path="/tasks/:id" element={<RequireAuth><AppLayout><TaskDetailPage /></AppLayout></RequireAuth>} />
      <Route path="/tasks/:id/inspection" element={<RequireAuth><AppLayout><InspectionPage /></AppLayout></RequireAuth>} />
      <Route path="/tasks/:id/shipment" element={<RequireAuth><AppLayout><ShipmentPage /></AppLayout></RequireAuth>} />
    </Routes>
  );
}
