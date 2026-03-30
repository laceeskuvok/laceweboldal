// app/robots.js
export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      sitemap: 'https://laceeskuvok.hu/sitemap.xml',
    }
  }