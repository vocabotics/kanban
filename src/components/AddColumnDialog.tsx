import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useKanbanStore } from '@/store/kanbanStore';
import { HiPlus } from 'react-icons/hi';

export function AddColumnDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const addColumn = useKanbanStore((state) => state.addColumn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addColumn(title.trim());
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <HiPlus className="mr-2 h-4 w-4" />
          Add Column
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Column Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter column title"
            />
          </div>
          <Button type="submit">Create Column</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}