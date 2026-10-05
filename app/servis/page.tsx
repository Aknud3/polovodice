import type { Metadata } from "next";
import { BookOpen, GraduationCap, Building2, MapPin, ExternalLink, ShieldAlert, Sparkles, Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "Servis, laboratoře a rozcestník // POLOVODIČE ČVUT FEL",
  description:
    "Kompletní studentský a laboratorní servis Fakulty elektrotechnické ČVUT v Praze: KOS, Moodle, čisté prostory KN:E a menzy.",
};

export default function ServicePage() {
  const centralServices = [
    {
      name: "KOS (Komponenta Studium)",
      desc: "Zápisy předmětů, rozvrhy, kontrola studijních plánů a zkouškové termíny.",
      url: "https://kos.cvut.cz",
      category: "Studium",
    },
    {
      name: "Moodle FEL",
      desc: "E-learningový systém, odevzdávání semestrálních úloh, laboratorní protokoly.",
      url: "https://moodle.fel.cvut.cz",
      category: "Výuka",
    },
    {
      name: "CourseWare FEL",
      desc: "Veřejný repozitář podkladů k přednáškám a cvičením všech kateder.",
      url: "https://cw.fel.cvut.cz",
      category: "Materiály",
    },
    {
      name: "Usermap ČVUT",
      desc: "Centrální adresář zaměstnanců, vyučujících, laboratoří a kontaktů.",
      url: "https://usermap.cvut.cz",
      category: "Adresář",
    },
    {
      name: "Knihovna ČVUT & NTK",
      desc: "Přístup k mezinárodním vědeckým databázím IEEE Xplore, ScienceDirect a Scopus.",
      url: "https://knihovna.cvut.cz",
      category: "Výzkum",
    },
    {
      name: "Menzy & Koleje SÚZ",
      desc: "Jídelníčky v Menze Technická, Studentském domě a Karlově náměstí.",
      url: "https://suz.cvut.cz/menzy",
      category: "Stravování",
    },
  ];

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Záhlaví */}
      <div className="space-y-2 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-fel-blue/10 dark:bg-fel-cyan/15 text-fel-blue dark:text-fel-cyan text-xs font-mono font-bold uppercase tracking-wider">
          PORTÁLOVÝ ROZCESTNÍK ČVUT FEL
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
          Akademický servis, laboratoře & Kampus
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Rychlý přístup do centrálních univerzitních systémů ČVUT, informace o provozu čistých prostorů
          Katedry mikroelektroniky na Karlově náměstí a orientace v kampusech.
        </p>
      </div>

      {/* 1. Mřížka centrálních systémů ČVUT */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-fel-blue dark:text-fel-cyan" />
          <span>Centrální informační systémy univerzity</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centralServices.map((srv) => (
            <a
              key={srv.name}
              href={srv.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846] hover:border-fel-blue/50 dark:hover:border-fel-cyan/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span className="px-1.5 py-0.2 rounded-xs bg-neutral-100 dark:bg-neutral-800 font-semibold uppercase text-[10px]">
                    {srv.category}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-fel-cyan transition-colors" />
                </div>
                <h3 className="text-base font-bold font-sans text-neutral-900 dark:text-white group-hover:text-fel-blue dark:group-hover:text-fel-cyan transition-colors">
                  {srv.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-mono text-fel-blue dark:text-fel-cyan font-semibold flex items-center gap-1">
                <span>Přejít do systému</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 2. Zázemí čistých prostorů a pravidla vstupu */}
      <section className="p-8 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846] space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Provozní řád // Laboratoře čistých prostor KN:E</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
          Podmínky vstupu do mikroelektronických laboratoří (ISO 6)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <div className="p-4 rounded-xs bg-neutral-50 dark:bg-[#0A0D30] border border-neutral-200 dark:border-neutral-800/80 space-y-1">
            <strong className="text-neutral-900 dark:text-white block font-mono text-xs uppercase text-fel-cyan">
              1. Školení bezpečnosti
            </strong>
            <p className="text-xs">
              Před prvním vstupem je nutné absolvovat bezpečnostní školení pro práci s chemikáliemi a UV litografií.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-neutral-50 dark:bg-[#0A0D30] border border-neutral-200 dark:border-neutral-800/80 space-y-1">
            <strong className="text-neutral-900 dark:text-white block font-mono text-xs uppercase text-fel-cyan">
              2. Čistý ochranný oděv
            </strong>
            <p className="text-xs">
              V přechodové komoře je vyžadován kompletní antistatický overal, kukla, návleky a nitrilové rukavice.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-neutral-50 dark:bg-[#0A0D30] border border-neutral-200 dark:border-neutral-800/80 space-y-1">
            <strong className="text-neutral-900 dark:text-white block font-mono text-xs uppercase text-fel-cyan">
              3. Rezervace přístrojů
            </strong>
            <p className="text-xs">
              Mask aligner a vakuová napařovačka vyžadují předchozí rezervaci v univerzitním laboratorním kalendáři.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Kampusy a orientace */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dejvice */}
        <div className="p-6 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-fel-cyan uppercase">
            <Building2 className="w-4 h-4" /> Areál Dejvice
          </div>
          <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
            Technická 2, 166 27 Praha 6
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Děkanát fakulty, centrální přednáškové auly, Katedra teorie obvodů, Katedra radioelektroniky,
            Menza Technická a Studentský dům.
          </p>
          <div className="pt-2 text-xs font-mono text-neutral-400">
            Doprava: Metro A (stanice Dejvická), tramvaje 18, 20, 26 (zastávka Lotyšská / Dejvická).
          </div>
        </div>

        {/* Karlovo náměstí */}
        <div className="p-6 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141846] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-fel-cyan uppercase">
            <Building2 className="w-4 h-4" /> Areál Karlovo náměstí
          </div>
          <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
            Karlovo náměstí 13, 121 35 Praha 2
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Sídlo Katedry mikroelektroniky, laboratorní komplex čistých prostorů KN:E, Zengerova posluchárna KN:E-107,
            Katedra počítačů a Katedra kybernetiky.
          </p>
          <div className="pt-2 text-xs font-mono text-neutral-400">
            Doprava: Metro B (stanice Karlovo náměstí), tramvaje 2, 3, 4, 6, 10, 16, 22, 24.
          </div>
        </div>
      </section>
    </div>
  );
}
