import { useState, useCallback, useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import FloatingButton from './components/ui/FloatingButton';
import TaskModal from './components/tasks/TaskModal';
import DeleteModal from './components/tasks/DeleteModal';
import CommandPalette from './components/ui/CommandPalette';
import AppRoutes from './routes/AppRoutes';
import { TaskProvider, useTasks } from './context/TaskContext';
import { ToastProvider, useToast } from './components/ui/Toast';
import { useTheme } from './hooks/useTheme';

const AppShell = () => {
  useTheme();
  const { addTask, updateTask, deleteTask, undoDelete, tasks, importTasks } = useTasks();
  const { showToast } = useToast();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [taskModal, setTaskModal] = useState({ open: false, task: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, task: null });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const openCreate = useCallback(() => setTaskModal({ open: true, task: null }), []);
  const openEdit = useCallback((task) => setTaskModal({ open: true, task }), []);
  const closeTaskModal = useCallback(() => setTaskModal({ open: false, task: null }), []);

  const handleSubmitTask = (values) => {
    if (taskModal.task) {
      updateTask(taskModal.task.id, values);
      showToast('Task updated successfully');
    } else {
      addTask(values);
      showToast('Task created successfully');
    }
    closeTaskModal();
  };

  const openDelete = useCallback((task) => setDeleteModal({ open: true, task }), []);
  const closeDelete = useCallback(() => setDeleteModal({ open: false, task: null }), []);

  const confirmDelete = () => {
    const task = deleteModal.task;
    deleteTask(task.id);
    closeDelete();
    showToast(`"${task.title}" deleted`, {
      type: 'info',
      action: { label: 'Undo', onClick: () => undoDelete() },
    });
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskflow-export.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Tasks exported');
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (Array.isArray(data)) {
          importTasks(data);
          showToast('Tasks imported successfully');
        } else {
          showToast('Invalid file format', { type: 'error' });
        }
      } catch {
        showToast('Failed to parse file', { type: 'error' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar
          onMenuClick={() => setMobileOpen(true)}
          onAddTask={openCreate}
          onOpenPalette={() => setPaletteOpen(true)}
          onExport={handleExport}
          onImport={handleImport}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <AppRoutes onEdit={openEdit} onDelete={openDelete} onCreate={openCreate} />
          </div>
        </main>
        <Footer />
      </div>

      <FloatingButton onClick={openCreate} />

      <TaskModal isOpen={taskModal.open} onClose={closeTaskModal} onSubmit={handleSubmitTask} task={taskModal.task} />
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        taskTitle={deleteModal.task?.title || ''}
      />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} onAddTask={openCreate} />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ToastProvider>
      <TaskProvider>
        <AppShell />
      </TaskProvider>
    </ToastProvider>
  </BrowserRouter>
);

export default App;
