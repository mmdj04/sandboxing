"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVAILABLE_VERSIONS, type Version } from "@/lib/docs";

interface VersionSelectorProps {
  currentVersion: Version;
}

export function VersionSelector({ currentVersion }: VersionSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleVersionChange = (version: string) => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments[1]) {
      segments[1] = version;
    } else {
      segments.splice(1, 0, version);
    }

    router.push("/" + segments.join("/"));
  };

  return (
    <Select value={currentVersion} onValueChange={handleVersionChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Version" />
      </SelectTrigger>
      <SelectContent>
        {AVAILABLE_VERSIONS.map((version) => (
          <SelectItem key={version} value={version}>
            {version}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
