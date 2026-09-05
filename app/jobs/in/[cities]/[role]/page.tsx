import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import City from '../city'
import {
  ALL_ROLE_SLUGS,
  getSeoCities,
  toCitySlug,
  type RoleSlug,
} from '../../../../utility/constants'
import { absoluteUrl, SITE_NAME, SITE_URL } from '../../../../utility/site'
import { fetchCityJobs, roleSlugToApiRole } from '../../../../utility/jobs-api'

export const dynamicParams = false

export async function generateStaticParams() {
  const seoCities = await getSeoCities()
  const citySlugs = seoCities.map((item) =>
    item.slug
      ? item.slug.replace(/^\/?jobs\/in\//, '').replace(/^\/+|\/+$/g, '')
      : toCitySlug(item.city)
  )

  const params: { cities: string; role: string }[] = []
  for (const citySlug of citySlugs) {
    for (const role of ALL_ROLE_SLUGS) {
      params.push({
        cities: citySlug,
        role,
      })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cities: string; role: string }>
}): Promise<Metadata> {
  const { cities, role } = await params
  const seoCities = await getSeoCities()
  const matched = seoCities.find(
    (item) =>
      toCitySlug(item.city) === cities ||
      (item.slug && item.slug.replace(/^\/?jobs\/in\//, '').replace(/^\/+|\/+$/g, '') === cities)
  )
  const isRoleValid = ALL_ROLE_SLUGS.includes(role as RoleSlug)

  if (!matched || !isRoleValid) {
    return {}
  }

  const cityName = matched.city
  const apiRole = roleSlugToApiRole(role)
  const canonicalUrl = absoluteUrl(`/jobs/in/${cities}/${role}`)

  const apiRes = await fetchCityJobs({ citySlug: cities, role: apiRole, page: 1, limit: 10 })
  const seoData = apiRes?.data?.seo

  const title = seoData?.metaTitle || `${apiRole} Jobs in ${cityName} | Staffton Health`
  const description =
    seoData?.metaDescription ||
    `Explore verified ${apiRole.toLowerCase()} jobs in ${cityName} on Staffton Health.`
  const ogTitle = seoData?.ogTitle || title
  const ogDescription = seoData?.ogDescription || description
  const keywords = seoData?.seoKeywords || `${apiRole.toLowerCase()} jobs in ${cityName}`

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
          alt: `${apiRole} Jobs in ${cityName} - Staffton Health`,
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
          alt: `${apiRole} Jobs in ${cityName} - Staffton Health`,
        },
      ],
    },
  }
}

export default async function IndianCityRoleJobs({
  params,
}: {
  params: Promise<{ cities: string; role: string }>
}) {
  const { cities, role } = await params
  const seoCities = await getSeoCities()
  const matched = seoCities.find(
    (item) =>
      toCitySlug(item.city) === cities ||
      (item.slug && item.slug.replace(/^\/?jobs\/in\//, '').replace(/^\/+|\/+$/g, '') === cities)
  )
  const isRoleValid = ALL_ROLE_SLUGS.includes(role as RoleSlug)

  if (!matched || !isRoleValid) {
    notFound()
  }

  const apiRole = roleSlugToApiRole(role)
  const apiRes = await fetchCityJobs({ citySlug: cities, role: apiRole, page: 1, limit: 10 })

  return (
    <City
      city={matched.city}
      role={role}
      initialSeo={apiRes?.data?.seo}
      initialJobs={apiRes?.data?.jobs}
      initialPagination={apiRes?.data?.pagination}
    />
  )
}
