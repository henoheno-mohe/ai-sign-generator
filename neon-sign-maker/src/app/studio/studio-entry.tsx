import StudioClientV1 from "@/app/studio/studio-client";
import StudioClientV2 from "@/app/studio/studio-client-v2";

function getStudioUiVariant(): "v1" | "v2" {
  const raw = (process.env.NEXT_PUBLIC_STUDIO_UI || process.env.STUDIO_UI || "v1").toLowerCase();
  return raw === "v2" ? "v2" : "v1";
}

export default function StudioEntry() {
  const ui = getStudioUiVariant();
  return ui === "v2" ? <StudioClientV2 /> : <StudioClientV1 />;
}


