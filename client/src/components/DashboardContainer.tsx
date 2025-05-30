import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import { useTaskStore, type Task } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../api/api';
import TaskItem from './ui/TaskItem';
import TaskForm from './ui/TaskForm';

const DashboardContainer = () => {
  const { tasks, setTasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks?userId=${user?.id}`);
        setTasks(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке задач:', err);
      }
    };

    if (user) {
      fetchTasks();
    }

  }, [setTasks, user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdd = async (task: Omit<Task, 'id'>) => {
    try {
      const res = await api.post('/tasks', {
        ...task,
        userId: user?.id,
      });
      addTask(res.data);
    } catch (err) {
      console.error('Ошибка при добавлении задачи:', err);
    }
  };

  const handleUpdate = async (task: Task) => {
    try {
      const res = await api.put(`/tasks/${task.id}`, task);
      updateTask(res.data);
      setEditingTask(null);
    } catch (err) {
      console.error('Ошибка при обновлении задачи:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      deleteTask(id);
    } catch (err) {
      console.error('Ошибка при удалении задачи:', err);
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="px-4 pt-20 mx-auto max-w-3xl w-full">
      <button
        onClick={handleLogout}
        className="px-2 py-1 absolute right-8 top-8 rounded bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
        type="button">
        <X />
      </button>
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {['all', 'todo', 'in-progress', 'done'].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded border ${
              filter === status ? 'bg-pink-500 text-white' : 'bg-white'
            }`}
            onClick={() => setFilter(status as any)}>
            {status}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <TaskForm onCreate={handleAdd} onUpdate={handleUpdate} initialData={editingTask} />
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => setEditingTask(task)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardContainer;
