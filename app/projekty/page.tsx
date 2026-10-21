import type { Metadata } from "next";
import { getProjects, getProjectCalls } from "@/lib/api";
import { ProjectsClient } from "@/components/portal/ProjectsClient";

export const metadata: Metadata = {
  title: "Projekty",
  description: "Výzkumné projekty a projektové výzvy napříč fakultami a součástmi ČVUT.",
};

export default async function ProjectsPage() {
  const [projects, calls] = await Promise.all([
    getProjects(),
    getProjectCalls(),
  ]);

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-clip">
      <ProjectsClient projects={projects} calls={calls} />
    </div>
  );
}
