import { MetadataRoute } from "next";
import { MOCK_PRODUCTS } from "@/data/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://luxe-earth-artifact.vercel.app";

  const staticRoutes = [
    "",
    "/shop",
    "/checkout",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
