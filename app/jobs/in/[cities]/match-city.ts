import { getSeoCities, toCitySlug } from "../../../utility/constants";

export type SeoCityMatch = Awaited<ReturnType<typeof getSeoCities>>[number];

export function matchCitySlug(
  seoCities: Awaited<ReturnType<typeof getSeoCities>>,
  cities: string
): SeoCityMatch | undefined {
  return seoCities.find(
    (item) =>
      toCitySlug(item.city) === cities ||
      (item.slug &&
        item.slug.replace(/^\/?jobs\/in\//, "").replace(/^\/+|\/+$/g, "") ===
          cities)
  );
}
