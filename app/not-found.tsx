import Link from "next/link";
import { Cpu, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-[700px] mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-sm bg-fel-blue/10 dark:bg-fel-cyan/15 border border-fel-blue/20 dark:border-fel-cyan/30 flex items-center justify-center text-fel-blue dark:text-fel-cyan mx-auto">
        <Cpu className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-fel-cyan">
          CHYBA 404 // STRÁNKA NENALEZENA
        </span>
        <h1 className="text-3xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
          Požadovaný polovodičový záznam neexistuje
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Zadaná URL adresa nebyla v databázi ČVUT FEL Polovodiče nalezena nebo byl článek přesunut.
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-fel-blue hover:bg-fel-blue-hover text-white text-xs font-mono font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zpět na hlavní portál</span>
        </Link>
      </div>
    </div>
  );
}
