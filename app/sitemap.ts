import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lexazerbaijan.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/discussions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/lexai`,
      lastModified: new Date(),
    },
  ];
}
