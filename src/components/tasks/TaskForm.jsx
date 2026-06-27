import { useState } from 'react';
import { Input, Textarea, Select } from '../ui/Input';
import Button from '../ui/Button';
import { CATEGORIES } from '../../constants/categories';
import { PRIORITIES } from '../../constants/priority';
import { todayInputValue } from '../../utils/dateHelpers';

const TaskForm = ({ initialValues, onSubmit, onCancel, submitLabel = 'Create Task' }) => {
  const [values, setValues] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    category: initialValues?.category || 'work',
    priority: initialValues?.priority || 'medium',
    dueDate: initialValues?.dueDate || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.title.trim()) newErrors.title = 'Title is required';
    if (values.dueDate && values.dueDate < todayInputValue()) {
      newErrors.dueDate = 'Due date must be today or in the future';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...values, title: values.title.trim(), dueDate: values.dueDate || null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        label="Title"
        placeholder="What needs to be done?"
        value={values.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        autoFocus
      />
      <Textarea
        id="description"
        label="Description"
        placeholder="Add more details..."
        value={values.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Select
          id="category"
          label="Category"
          value={values.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
        <Select
          id="priority"
          label="Priority"
          value={values.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>
      <Input
        id="dueDate"
        type="date"
        label="Due Date"
        min={todayInputValue()}
        value={values.dueDate || ''}
        onChange={(e) => handleChange('dueDate', e.target.value)}
        error={errors.dueDate}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};

export default TaskForm;
