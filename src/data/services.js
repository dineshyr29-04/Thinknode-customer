export const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    tagline: 'Professional websites that convert',
    description:
      'Get a fully custom, responsive website built with modern technologies. Perfect for businesses, portfolios, and landing pages.',
    startingPrice: '$500',
    deliveryTime: '7–14 days',
    icon: '🌐',
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Custom responsive design',
      'SEO optimized structure',
      'Performance optimized',
      'CMS integration (optional)',
      'E-commerce support (optional)',
      'Contact forms',
      '3 months support',
    ],
    tiers: [
      {
        name: 'Starter',
        price: '$500',
        features: ['Responsive design', 'Contact form', 'Basic SEO'],
      },
      {
        name: 'Business',
        price: '$1,200',
        features: ['Everything in Starter', 'CMS', 'Analytics', 'Blog'],
      },
      {
        name: 'Enterprise',
        price: '$3,000+',
        features: [
          'Everything in Business',
          'E-commerce',
          'Custom integrations',
          'Priority support',
        ],
      },
    ],
  },
  {
    id: 'frontend-app',
    title: 'Frontend Applications',
    tagline: 'Scalable React & Vue applications',
    description:
      'Modern single-page applications and dashboards built with React or Vue.js. Integrated with REST APIs and designed for scale.',
    startingPrice: '$800',
    deliveryTime: '10–21 days',
    icon: '⚛️',
    color: 'from-cyan-500 to-blue-500',
    features: [
      'React / Vue.js',
      'REST API integration',
      'Authentication flows',
      'State management',
      'Component library',
      'Performance optimization',
      'Unit tests',
    ],
    tiers: [
      {
        name: 'Basic',
        price: '$800',
        features: ['Single page app', 'API integration', 'Basic auth'],
      },
      {
        name: 'Professional',
        price: '$2,000',
        features: ['Multi-page app', 'Complex state', 'Auth + roles', 'Dashboard'],
      },
      {
        name: 'Enterprise',
        price: '$5,000+',
        features: ['Full platform', 'Microservices', 'CI/CD', 'Full test suite'],
      },
    ],
  },
  {
    id: 'e-poster-design',
    title: 'E-Poster Design',
    tagline: 'Eye-catching digital visuals',
    description:
      'Professional digital posters, banners, and graphics for social media, events, and digital marketing campaigns.',
    startingPrice: '$80',
    deliveryTime: '2–5 days',
    icon: '🎨',
    color: 'from-pink-500 to-violet-500',
    features: [
      'Custom branding',
      'Multiple formats',
      'Print & digital ready',
      'Unlimited revisions (Pro)',
      'Social media sizes',
      'Source files included',
      'Fast delivery',
    ],
    tiers: [
      {
        name: 'Basic',
        price: '$80',
        features: ['1 design', '2 revisions', 'Digital format'],
      },
      {
        name: 'Pro',
        price: '$200',
        features: ['3 designs', 'Unlimited revisions', 'All formats', 'Source files'],
      },
      {
        name: 'Campaign',
        price: '$500+',
        features: ['Full campaign', 'Social media set', 'Branding guide', 'Rush delivery'],
      },
    ],
  },
  {
    id: 'n8n-automation',
    title: 'n8n Automation Workflows',
    tagline: 'Automate your business processes',
    description:
      'Custom n8n automation workflows to connect your tools, automate repetitive tasks, and integrate APIs without writing code.',
    startingPrice: '$300',
    deliveryTime: '5–10 days',
    icon: '⚡',
    color: 'from-amber-500 to-orange-500',
    features: [
      'Custom n8n workflows',
      'API integrations',
      'Webhook triggers',
      'Scheduled automation',
      'Error handling',
      'Documentation',
      'Deployment support',
    ],
    tiers: [
      {
        name: 'Simple',
        price: '$300',
        features: ['1 workflow', '3 integrations', 'Basic triggers'],
      },
      {
        name: 'Advanced',
        price: '$800',
        features: ['3 workflows', 'Unlimited integrations', 'Complex logic'],
      },
      {
        name: 'Enterprise',
        price: '$2,000+',
        features: ['Full automation suite', 'Multi-step flows', 'Monitoring', 'Ongoing support'],
      },
    ],
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    tagline: 'Cinematic edits that stop the scroll',
    description:
      'Professional video editing for YouTube, social media, ads, and promotional content. Fast turnaround, polished results.',
    startingPrice: '$80',
    deliveryTime: '2–5 days',
    icon: '🎬',
    color: 'from-rose-500 to-pink-600',
    features: [
      'Professional cuts & transitions',
      'Color correction & grading',
      'Sound design & enhancement',
      'Text overlays & subtitles',
      'Social media optimized formats',
      'Motion graphics (Pro+)',
      'Background music licensing',
    ],
    tiers: [
      {
        name: 'Quick Cut',
        price: '$80',
        features: ['Up to 3 min', 'Basic cuts', 'Colour correction', '1 revision'],
      },
      {
        name: 'Pro Edit',
        price: '$200',
        features: ['Up to 10 min', 'Transitions & effects', 'Subtitles', 'Sound design', '3 revisions'],
      },
      {
        name: 'Cinematic',
        price: '$500+',
        features: ['Unlimited length', 'Motion graphics', 'Full colour grade', 'Music licensing', 'Unlimited revisions'],
      },
    ],
  },
];

export const getServiceById = (id) => SERVICES.find((s) => s.id === id);
