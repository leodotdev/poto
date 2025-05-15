import { Metadata } from 'next';

// Default metadata values
const defaultMetadata: Metadata = {
  title: {
    default: 'The Poetic Toolbox',
    template: '%s | The Poetic Toolbox',
  },
  description: 'A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, recovering perfectionists, and overthinkers with good hearts.',
  keywords: ['creativity', 'art', 'poetry', 'self-expression', 'mindfulness', 'creative rituals'],
  authors: [{ name: 'The Poetic Toolbox Team' }],
  creator: 'The Poetic Toolbox',
  publisher: 'The Poetic Toolbox',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://poetictoolbox.com',
    siteName: 'The Poetic Toolbox',
    title: 'The Poetic Toolbox',
    description: 'A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, recovering perfectionists, and overthinkers with good hearts.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Poetic Toolbox',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Poetic Toolbox',
    description: 'A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, recovering perfectionists, and overthinkers with good hearts.',
    images: ['/og-image.jpg'],
    creator: '@poetictoolbox',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://poetictoolbox.com'),
  alternates: {
    canonical: '/',
  },
};

export default defaultMetadata;