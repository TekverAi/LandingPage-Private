import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TekverAI",
    short_name: "TekverAI",
    description:
      "AI-powered code and system verification platform for detecting vulnerabilities, logic errors, and performance risks.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0B0F19",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
