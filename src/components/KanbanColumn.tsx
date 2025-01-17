import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HiOutlineTrash } from 'react-icons/hi';
import { useKanbanStore } from '@/store/kanbanStore';
import { KanbanCard } from './KanbanCard';
import { AddCardDialog } from './AddCardDialog';
import type { Column } from '@/types/kanban';

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const removeColumn = useKanbanStore((state) => state.removeColumn);
  const moveCard = useKanbanStore((state) => state.moveCard);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId');
    const fromColumnId = e.dataTransfer.getData('fromColumnId');
    
    if (fromColumnId !== column.id) {
      moveCard(cardId, fromColumnId, column.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-80 shrink-0"
    >
      <Card
        className="h-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{column.title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeColumn(column.id)}
            >
              <HiOutlineTrash className="h-4 w-4" />
            </Button>
          </div>
          <AddCardDialog columnId={column.id} />
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-4 pt-0">
          {column.cards.map((card) => (
            <KanbanCard key={card.id} card={card} columnId={column.id} />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}