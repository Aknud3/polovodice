import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfiles, getProfileBySlug } from "@/lib/api";
import { ProfileDetailClient } from "@/components/portal/ProfileDetailClient";

interface ProfileDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const profiles = await getProfiles();
  return profiles.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProfileDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return { title: "Medailonek nenalezen" };
  }

  return {
    title: `${profile.name} - Medailonek`,
    description: profile.title,
  };
}

export default async function ProfileDetailPage({ params }: ProfileDetailPageProps) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-clip">
      <ProfileDetailClient profile={profile} />
    </div>
  );
}
