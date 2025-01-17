export interface Card {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface KanbanState {
  columns: Column[];
  addColumn: (title: string) => void;
  removeColumn: (columnId: string) => void;
  addCard: (columnId: string, title: string, description?: string) => void;
  removeCard: (columnId: string, cardId: string) => void;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string) => void;
}