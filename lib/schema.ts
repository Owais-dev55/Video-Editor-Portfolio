export interface PersonSchema {
  "@context": string
  "@type": string
  name: string
  url: string
  image: {
    "@type": string
    url: string
    width: number
    height: number
  }
  sameAs: string[]
  jobTitle: string
  worksFor: {
    "@type": string
    name: string
  }
}

export interface ReviewListSchema {
  "@context": string
  "@type": string
  itemReviewed: {
    "@type": string
    name: string
    url: string
  }
  reviewRating: Array<{
    "@type": string
    ratingValue: number
    bestRating: number
    worstRating: number
  }>
}

export interface LocalBusinessSchema {
  "@context": string
  "@type": string
  name: string
  image: string
  description: string
  address: {
    "@type": string
    addressCountry: string
  }
  contactPoint: {
    "@type": string
    contactType: string
    telephone: string
  }
}
