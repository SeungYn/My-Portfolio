import { MetadataRoute } from 'next';

const domain = 'https://seungyn.com';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: domain,
			lastModified: new Date(),
			changeFrequency: 'always',
			priority: 1,
		},
	];
}
