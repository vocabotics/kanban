import { ThemeProvider } from './components/theme-provider';
import { KanbanBoard } from './components/KanbanBoard';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <KanbanBoard />
      </div>
    </ThemeProvider>
  );
}