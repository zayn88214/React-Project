import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import TasksPage from '../pages/TasksPage';
import Statistics from '../pages/Statistics';

const AppRoutes = ({ onEdit, onDelete, onCreate }) => (
  <Routes>
    <Route path="/" element={<Dashboard onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />} />
    <Route
      path="/tasks/:filter"
      element={<TasksPage routeType="status" onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />}
    />
    <Route
      path="/category/:id"
      element={<TasksPage routeType="category" onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />}
    />
    <Route path="/statistics" element={<Statistics />} />
  </Routes>
);

export default AppRoutes;
