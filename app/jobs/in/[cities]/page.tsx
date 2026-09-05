import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import City from './city'
import { getSeoCities, toCitySlug } from '../../../utility/constants'
import { absoluteUrl, SITE_NAME, SITE_URL } from '../../../utility/site'
import { fetchCityJobs } from '../../../utility/jobs-api'

export const dynamicParams = false

export async function generateStaticParams() {
  const seoCities = await getSeoCities()
  return seoCities.map((item) => {
    const slug = item.slug
      ? item.slug.replace(/^\/?jobs\/in\//, '').replace(/^\/+|\/+$/g, '')
      : toCitySlug(item.city)
    return {
      cities: slug,
    }
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cities: string }>
}): Promise<Metadata> {
  const { cities } = await params
  const seoCities = await getSeoCities()
  const matched = seoCities.find(
    (item) =>
      toCitySlug(item.city) === cities ||
      (item.slug && item.slug.replace(/^\/?jobs\/in\//, '').replace(/^\/+|\/+$/g, '') === cities)
  )

  if (!matched) {
    return {}
  }

  const cityName = matched.city
  const canonicalUrl = absoluteUrl(`/jobs/in/${cities}`)

  // Fetch live SEO metadata from backend endpoint
  const apiRes = await fetchCityJobs({ citySlug: cities, page: 1, limit: 10 })
  const seoData = apiRes?.data?.seo

  const title =
    seoData?.metaTitle ||
    matched?.metaTitle ||
    `Jobs in ${cityName} | Staffton Health`

  const description =
    seoData?.metaDescription ||
    `Explore verified healthcare jobs in ${cityName} on Staffton Health.`

  const ogTitle = seoData?.ogTitle || title
  const ogDescription = seoData?.ogDescription || description
  const keywords = seoData?.seoKeywords || `healthcare jobs in ${cityName}`

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_IN',
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Healthcare Jobs in ${cityName} - Staffton Health`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@stafftonhealth',
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Healthcare Jobs in ${cityName} - Staffton Health`,
        },
      ],
    },
  }
}

export default async function IndianCities({
  params,
}: {
  params: Promise<{ cities: string }>
}) {
  const { cities } = await params
  const seoCities = await getSeoCities()
  const matched = seoCities.find(
    (item) =>
      toCitySlug(item.city) === cities ||
      (item.slug && item.slug.replace(/^\/?jobs\/in\//, '').replace(/^\/+|\/+$/g, '') === cities)
  )

  if (!matched) {
    notFound()
  }

  const apiRes = await fetchCityJobs({ citySlug: cities, page: 1, limit: 10 })

  return (
    <City
      city={matched.city}
      initialSeo={apiRes?.data?.seo}
      initialJobs={apiRes?.data?.jobs}
      initialPagination={apiRes?.data?.pagination}
    />
  )
}
