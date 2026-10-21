import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjects,
  getProjectCalls,
  getProjectBySlug,
  getProjectCallBySlug,
} from "@/lib/api";
import { ProjectDetailClient } from "@/components/portal/ProjectDetailClient";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const [projects, calls] = await Promise.all([
    getProjects(),
    getProjectCalls(),
  ]);

  const projectSlugs = projects.map((p) => ({ slug: p.slug }));
  const callSlugs = calls.map((c) => ({ slug: c.slug }));

  return [...projectSlugs, ...callSlugs];
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (project) {
    return {
      title: project.title,
      description: project.description.slice(0, 160),
    };
  }

  const call = await getProjectCallBySlug(slug);
  if (call) {
    return {
      title: call.title,
      description: call.description.slice(0, 160),
    };
  }

  return { title: "Projekt nenalezen" };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const [project, call] = await Promise.all([
    getProjectBySlug(slug),
    getProjectCallBySlug(slug),
  ]);

  if (!project && !call) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-clip">
      <ProjectDetailClient project={project} call={call} />
    </div>
  );
}
