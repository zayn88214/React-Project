import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, taskTitle }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete Task" maxWidth="max-w-sm">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-500/15">
        <AlertTriangle className="h-7 w-7 text-rose-500" />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Are you sure you want to delete{' '}
        <span className="font-semibold text-slate-800 dark:text-slate-100">"{taskTitle}"</span>? This action can be undone briefly after deleting.
      </p>
      <div className="mt-6 flex w-full justify-center gap-3">
        <Button variant="ghost" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} className="flex-1">
          Delete
        </Button>
      </div>
    </div>
  </Modal>
);

export default DeleteModal;
