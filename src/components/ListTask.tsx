import { CheckSquare, Square, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setFilter } from '@/store/todoSlice';
import Task from './Task';
import type { FilterType } from '@/store/todoSlice';

const ListTask = () => {
  const { todos, filter } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.isDone;
    if (filter === 'undone') return !todo.isDone;
    return true;
  });

  const todoStats = {
    total: todos.length,
    done: todos.filter(todo => todo.isDone).length,
    undone: todos.filter(todo => !todo.isDone).length,
  };

  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="space-y-6">
      {/* Filtres et statistiques */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('all')}
            className="flex items-center gap-2"
          >
            <List className="h-4 w-4" />
            Toutes ({todoStats.total})
          </Button>
          <Button
            variant={filter === 'undone' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('undone')}
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" />
            À faire ({todoStats.undone})
          </Button>
          <Button
            variant={filter === 'done' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('done')}
            className="flex items-center gap-2"
          >
            <CheckSquare className="h-4 w-4" />
            Terminées ({todoStats.done})
          </Button>
        </div>

        {todoStats.total > 0 && (
          <div className="text-sm text-muted-foreground">
            {todoStats.done}/{todoStats.total} tâches terminées
          </div>
        )}
      </div>

      {/* Liste des tâches */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-2">
              {filter === 'all' && todoStats.total === 0 && "Aucune tâche pour le moment"}
              {filter === 'done' && todoStats.done === 0 && "Aucune tâche terminée"}
              {filter === 'undone' && todoStats.undone === 0 && "Toutes les tâches sont terminées ! 🎉"}
            </div>
            {filter === 'all' && todoStats.total === 0 && (
              <p className="text-muted-foreground text-sm">
                Commencez par ajouter votre première tâche ci-dessus
              </p>
            )}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <Task key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default ListTask;