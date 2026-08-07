import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://luxe-earth-artifact.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
