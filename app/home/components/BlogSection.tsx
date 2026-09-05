import Reveal from "../../components/motion/Reveal";
import SectionPill from "../../components/SectionPill";
import GetStartedFreeButton from "../../components/GetStartedFreeButton";
import BlogCard, { BlogCardSkeleton, type BlogPost } from "./BlogCard";

export type { BlogPost };

const VISIBLE_POSTS = 3;

type BlogSectionProps = {
  isWhiteBg?: boolean;
  badge?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  blogPosts: BlogPost[];
  isLoading?: boolean;
  error?: string | null;
};

const BlogSection = ({
  isWhiteBg = false,
  badge = "Insights & Updates",
  title = "Latest from Our Blog",
  description = "Stay ahead with professional career guides, healthcare recruitment insights, and administrative workflows curated by clinical staffing experts.",
  ctaLabel = "Contact Our Team",
  ctaHref = "/contact-us/",
  blogPosts,
  isLoading = false,
  error = null,
}: BlogSectionProps) => {
  const surfaceClass = isWhiteBg ? "bg-white" : "bg-surface-offwhite";
  const visiblePosts = blogPosts.slice(0, VISIBLE_POSTS);
  const hasPosts = isLoading || visiblePosts.length > 0;

  if (error) {
    return (
      <section className={`w-full ${surfaceClass}`}>
        <div className="section-container flex justify-center">
          <p role="alert" className="text-center font-inter text-base text-red-600">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full ${surfaceClass}`}>
      <div className="section-container flex flex-col gap-10 md:gap-12 lg:gap-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <SectionPill showDot>{badge}</SectionPill>
          <h2 className="max-w-190 text-[28px] font-extrabold leading-9 tracking-[-1px] text-heading text-balance sm:text-[36px] sm:leading-11 lg:text-[42px] lg:leading-13">
            {title}
          </h2>
          <p className="mx-auto max-w-160 font-inter text-sm font-normal leading-6 text-body sm:text-base sm:leading-7">
            {description}
          </p>
        </Reveal>

        {hasPosts ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: VISIBLE_POSTS }).map((_, index) => (
                  <BlogCardSkeleton key={`skeleton-${index}`} />
                ))
              : visiblePosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
          </div>
        ) : (
          <p className="text-center font-inter text-base text-neutral">
            New articles will appear here soon.
          </p>
        )}

        <Reveal className="flex justify-center">
          <GetStartedFreeButton href={ctaHref}>
            {ctaLabel}
          </GetStartedFreeButton>
        </Reveal>
      </div>
    </section>
  );
};

export default BlogSection;
