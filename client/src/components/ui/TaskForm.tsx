import type { Task, TaskStatus } from '../../store/useTaskStore';
import { useState, useEffect } from 'react';
import { CircleCheckBig } from 'lucide-react';

interface TaskFormProps {
  onCreate: (task: Omit<Task, 'id'>) => void;
  onUpdate: (task: Task) => void;
  initialData?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreate, onUpdate, initialData }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (initialData) {
      onUpdate({ ...initialData, title, status });
    } else {
      onCreate({ title, status });
    }

    setTitle('');
    setStatus('todo');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">{initialData ? 'Edit Task' : 'New Task'}</h2>
      <input
        type="text"
        placeholder="Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="w-full border p-2 rounded">
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <div className="flex gap-2 justify-end">
        <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer">
          {initialData ? 'Update' : <CircleCheckBig />}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
