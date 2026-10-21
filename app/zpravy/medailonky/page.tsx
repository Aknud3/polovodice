import type { Metadata } from "next";
import { getProfiles } from "@/lib/api";
import { ProfilesClient } from "@/components/portal/ProfilesClient";

export const metadata: Metadata = {
  title: "Medailonky",
  description: "Medailonky osobností a výzkumníků stojících za polovodičovými technologiemi a výukou na FEL ČVUT.",
};

export default async function ProfilesPage() {
  const profiles = await getProfiles();

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-clip">
      <ProfilesClient profiles={profiles} />
    </div>
  );
}
