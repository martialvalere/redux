import { CheckSquare } from 'lucide-react';
import AddTask from '@/components/AddTask';
import ListTask from '@/components/ListTask';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-primary">
              <CheckSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Todo Redux
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gérez vos tâches avec Redux Toolkit
          </p>
        </div>

        {/* Application Todo */}
        <div className="bg-gradient-card rounded-xl shadow-card border border-border p-6">
          <AddTask />
          <ListTask />
        </div>
      </div>
    </div>
  );
};

export default Index;
