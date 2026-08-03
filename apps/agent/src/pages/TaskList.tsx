import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { StatusBadge } from '@homebridge/ui';
import { useAgentAuth } from '../lib/auth-store';

export default function TaskListPage() {
  const { agent } = useAgentAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['agent-tasks'],
    queryFn: () => api.get('/agents/tasks').then(r => r.data),
    refetchInterval: 30_000,
  });

  return (
    <div>
      <div className="bg-indigo-700 text-white px-4 pt-12 pb-6">
        <p className="text-indigo-300 text-sm">Welcome back</p>
        <h1 className="text-2xl font-bold">{agent?.name ?? 'Agent'}</h1>
      </div>

      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-900">Assigned Tasks ({data?.length ?? 0})</h2>
          <button onClick={() => refetch()} className="text-indigo-600 text-sm">Refresh</button>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-400">Loading tasks...</div>
        ) : data?.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-4xl mb-3">✅</p>
            <p className="text-gray-500 font-medium">All clear! No assigned tasks.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data?.map((task: any) => (
              <Link key={task.id} to={`/tasks/${task.id}`}
                className="block bg-white rounded-xl p-4 shadow-sm border border-gray-200 active:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900 flex-1 pr-2">{task.title}</p>
                  <StatusBadge status={task.status} />
                </div>
                <p className="text-xs text-gray-400 font-mono">{task.orderNumber}</p>
                <p className="text-xs text-gray-500 mt-1">{task.serviceType?.replace(/_/g, ' ')}</p>
                <p className="text-xs text-gray-400 mt-2">Assigned: {new Date(task.updatedAt).toLocaleDateString()}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
