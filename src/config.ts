import type { NavigationLink, Site } from './types.ts'

export const SITE: Site = {
    author: 'Godruoyi',
    url: 'https://0xrupeshsardar.github.io',
    title: 'Rupesh',
    description: 'Rupesh\'s personal blog, I enjoy the process of building something using any technology stack',
    shortDescription: '',
}

export const NavigationLinks: NavigationLink[] = [
    { name: 'Home', url: '/' },
    { name: 'Posts', url: '/posts' },
    { name: 'Category', url: '/categories' },
    { name: 'Timeline', url: '/timeline' },
    { name: 'About', url: '/posts/about-rupesh' },
]

export const FooterLinks = [
    // {
    //     section: 'Blog',
    //     links: [
    //         { name: 'Posts', url: '/posts' },
    //         { name: 'Timeline', url: '/timeline' },
    //         { name: 'Categories', url: '/categories' },
    //         { name: 'About Me', url: '/posts/about-godruoyi' },
    //     ],
    // },
    // {
    //     section: 'Other',
    //     links: [
    //         { name: 'RSS', url: '/rss.xml' },
    //         { name: 'Site Map', url: '/sitemap-index.xml' },
    //         { name: 'Twitter', url: 'https://x.com/godruoyi' },
    //     ],
    // },
]

export const Settings = {
    GoogleAnalytics: {
        enable: false,
        id: 'G-TKQ4L3ZDSF',
    },

    UmamiAnalytics: {
        enable: true,
        dataWebsiteID: 'bf63658a-9418-4f39-a6a1-5a0cedb6e429',
    },

    Comment: {

        enable: !!(process.env.COMMENT_ENABLE),

        
        giscus: {
            repo: 'godruoyi/gblog',
            repoId: 'MDEwOlJlcG9zaXRvcnkxMjcyODI0NzA',
            category: 'Announcements',
            categoryId: 'DIC_kwDOB5YtJs4CfZnX',
            darkThem: 'noborder_gray',
            lightThem: 'light',
        },
    },

    Assets: {
        uploadAssetsToS3: !!(process.env.S3_ENABLE),
        config: {
            
            paths: ['assets'],
            endpoint: process.env.S3_ENDPOINT as string,
            bucket: process.env.S3_BUCKET as string,
            accessKey: process.env.S3_ACCESS_KEY as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
            root: 'gblog',
        },
    },
}

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'inLanguage': 'en-US',
        '@id': SITE.url,
        'url': SITE.url,
        'name': SITE.title,
        'description': SITE.description,
        'isPartOf': {
            '@type': 'WebSite',
            'url': SITE.url,
            'name': SITE.title,
            'description': SITE.description,
        },
    },
}
