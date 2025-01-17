import { create } from 'zustand';
import { KanbanState, Column, Card } from '@/types/kanban';

export const useKanbanStore = create<KanbanState>((set) => ({
  columns: [],
  addColumn: (title: string) =>
    set((state) => ({
      columns: [...state.columns, { id: crypto.randomUUID(), title, cards: [] }],
    })),
  removeColumn: (columnId: string) =>
    set((state) => ({
      columns: state.columns.filter((column) => column.id !== columnId),
    })),
  addCard: (columnId: string, title: string, description?: string) =>
    set((state) => ({
      columns: state.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: [
                ...column.cards,
                {
                  id: crypto.randomUUID(),
                  title,
                  description,
                  createdAt: new Date(),
                },
              ],
            }
          : column
      ),
    })),
  removeCard: (columnId: string, cardId: string) =>
    set((state) => ({
      columns: state.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId),
            }
          : column
      ),
    })),
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string) =>
    set((state) => {
      const fromColumn = state.columns.find((col) => col.id === fromColumnId);
      const card = fromColumn?.cards.find((c) => c.id === cardId);
      if (!fromColumn || !card) return state;

      return {
        columns: state.columns.map((column) => {
          if (column.id === fromColumnId) {
            return {
              ...column,
              cards: column.cards.filter((c) => c.id !== cardId),
            };
          }
          if (column.id === toColumnId) {
            return {
              ...column,
              cards: [...column.cards, card],
            };
          }
          return column;
        }),
      };
    }),
}));