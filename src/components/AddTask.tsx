import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/hooks/redux';
import { addTodo } from '@/store/todoSlice';
import { useToast } from '@/hooks/use-toast';

const AddTask = () => {
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      dispatch(addTodo(description.trim()));
      setDescription('');
      toast({
        title: "Tâche ajoutée",
        description: "Votre nouvelle tâche a été ajoutée avec succès.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Ajouter une nouvelle tâche..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 bg-secondary border-border focus:ring-primary"
      />
      <Button 
        type="submit" 
        className="bg-gradient-primary hover:opacity-90 transition-opacity"
        disabled={!description.trim()}
      >
        <Plus className="h-4 w-4 mr-2" />
        Ajouter
      </Button>
    </form>
  );
};

export default AddTask;