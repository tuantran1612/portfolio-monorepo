export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tuan Tran',
    url: 'https://portfolio-monorepo-ten.vercel.app',
    jobTitle: 'Full Stack Developer',
    worksFor: { '@type': 'Organization', name: 'Freelance' },
    address: { '@type': 'PostalAddress', addressLocality: 'Ho Chi Minh City', addressCountry: 'VN' },
    sameAs: [
      'https://github.com/tuantran1612',
      'https://linkedin.com',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ProjectJsonLd({ project }: { project: any }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.imageUrl,
    url: project.liveUrl,
    author: { '@type': 'Person', name: 'Tuan Tran' },
    keywords: project.techStack.join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}