import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'react-icons/hi';
import { useKanbanStore } from '@/store/kanbanStore';
import type { Card as CardType } from '@/types/kanban';

interface KanbanCardProps {
  card: CardType;
  columnId: string;
}

export function KanbanCard({ card, columnId }: KanbanCardProps) {
  const removeCard = useKanbanStore((state) => state.removeCard);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group relative"
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('cardId', card.id);
        e.dataTransfer.setData('fromColumnId', columnId);
      }}
    >
      <Card className="cursor-grab active:cursor-grabbing">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium">{card.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100"
              onClick={() => removeCard(columnId, card.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        {card.description && (
          <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
            {card.description}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}