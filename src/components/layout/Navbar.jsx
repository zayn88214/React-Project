import { Menu, Search, Plus, Download, Upload } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

const Navbar = ({ onMenuClick, onAddTask, onOpenPalette, onExport, onImport }) => (
  <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 glass px-4 py-3 sm:px-6">
    <div className="flex items-center gap-3">
      <button
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <button
        onClick={onOpenPalette}
        className="hidden items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-sm text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 sm:flex"
      >
        <Search className="h-4 w-4" />
        Quick search...
        <kbd className="ml-4 rounded-md bg-white dark:bg-slate-700 px-1.5 py-0.5 text-xs font-mono text-slate-400 ring-1 ring-slate-200 dark:ring-slate-600">
          Ctrl K
        </kbd>
      </button>
    </div>

    <div className="flex items-center gap-2">
      <input id="import-input" type="file" accept="application/json" className="hidden" onChange={onImport} />
      <button
        onClick={() => document.getElementById('import-input').click()}
        aria-label="Import tasks"
        title="Import tasks"
        className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 sm:flex"
      >
        <Upload className="h-[18px] w-[18px]" />
      </button>
      <button
        onClick={onExport}
        aria-label="Export tasks"
        title="Export tasks"
        className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 sm:flex"
      >
        <Download className="h-[18px] w-[18px]" />
      </button>
      <ThemeToggle />
      <Button onClick={onAddTask} icon={Plus} size="md" className="hidden sm:flex">
        Add Task
      </Button>
      <Button onClick={onAddTask} icon={Plus} size="icon" className="sm:hidden" />
    </div>
  </header>
);

export default Navbar;
