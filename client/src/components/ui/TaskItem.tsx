import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

import type { Task } from '../../store/useTaskStore';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center p-2 border rounded mb-2 bg-white shadow-sm">
        <div>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-sm text-gray-500 capitalize">Status: {task.status}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-2 py-1 bg-white rounded text-yellow-400 text-sm hover:text-yellow-600 cursor-pointer">
            <Pencil />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-2 py-1 bg-white rounded text-red-500 text-sm hover:text-red-600 cursor-pointer">
            <Trash />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
