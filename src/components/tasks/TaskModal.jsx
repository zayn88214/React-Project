import Modal from '../ui/Modal';
import TaskForm from './TaskForm';

const TaskModal = ({ isOpen, onClose, onSubmit, task }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'Create New Task'}>
    <TaskForm
      initialValues={task}
      onCancel={onClose}
      onSubmit={onSubmit}
      submitLabel={task ? 'Save Changes' : 'Create Task'}
    />
  </Modal>
);

export default TaskModal;
