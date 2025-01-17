import { ScrollArea } from '@/components/ui/scroll-area';
import { useKanbanStore } from '@/store/kanbanStore';
import { KanbanColumn } from './KanbanColumn';
import { AddColumnDialog } from './AddColumnDialog';

export function KanbanBoard() {
  const columns = useKanbanStore((state) => state.columns);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <AddColumnDialog />
      </div>
      <ScrollArea className="h-full">
        <div className="flex h-full gap-4 p-4">
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}