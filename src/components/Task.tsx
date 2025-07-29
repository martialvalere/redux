import { useState } from 'react';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/hooks/redux';
import { toggleTodo, editTodo, deleteTodo } from '@/store/todoSlice';
import { cn } from '@/lib/utils';
import type { Todo } from '@/store/todoSlice';

interface TaskProps {
  todo: Todo;
}

const Task = ({ todo }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(todo.description);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    if (editDescription.trim() && editDescription !== todo.description) {
      dispatch(editTodo({ id: todo.id, description: editDescription.trim() }));
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-lg bg-gradient-card border border-border shadow-task transition-all duration-200",
      todo.isDone && "opacity-75"
    )}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className={cn(
          "h-6 w-6 p-0 rounded-full border-2 transition-all",
          todo.isDone 
            ? "bg-success border-success text-success-foreground hover:bg-success/90" 
            : "border-muted-foreground hover:border-primary"
        )}
      >
        {todo.isDone && <Check className="h-3 w-3" />}
      </Button>

      <div className="flex-1">
        {isEditing ? (
          <Input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            className="bg-secondary border-border"
            autoFocus
          />
        ) : (
          <span className={cn(
            "text-foreground transition-all",
            todo.isDone && "line-through text-muted-foreground"
          )}>
            {todo.description}
          </span>
        )}
      </div>

      <div className="flex gap-1">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0 text-success hover:bg-success/20"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              className="h-8 w-8 p-0 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/20"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;