import type { NavigationLink, Site } from './types.ts'

export const SITE: Site = {
    author: 'Rupesh',
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

    },

    Assets: {
    },
}

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        
    },
}
