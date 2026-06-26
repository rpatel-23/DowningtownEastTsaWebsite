import Link from "next/link";
import {
  ArrowRight,
  Compass,
  LifeBuoy,
  Sparkles,
  Users,
} from "lucide-react";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
} from "@/components/ui";
import { ImagePlaceholder } from "@/components/placeholder";
import { events, EVENT_CATEGORIES } from "@/data/events";
import { officers } from "@/data/officers";
import { news } from "@/data/news";
import { site } from "@/data/site";
import { formatDate } from "@/lib/utils";

const stats = [
  { value: `${events.length}`, label: "Competitive events" },
  { value: `${EVENT_CATEGORIES.length}`, label: "Event categories" },
  { value: "3", label: "Levels: regional, state, national" },
  { value: `${officers.length}`, label: "Student officers" },
];

const whyJoin = [
  {
    title: "Compete in real events",
    body: "From robotics and coding to video, design, and engineering, there is something for everyone.",
  },
  {
    title: "Build something real",
    body: "Work hands on, on your own or with a team, and take your project all the way to competition.",
  },
  {
    title: "Grow and lead",
    body: "Make friends, learn from older members, and build skills that help with college and beyond.",
  },
];

const categoryBlurbs: Record<string, string> = {
  "Creative & Design":
    "Design and create, from games and fashion to virtual reality and web design.",
  "Engineering & Technology":
    "Robotics, CAD, structures, drones, and other hands on builds.",
  "Science & Research":
    "Data science, biotechnology, forensics, and geospatial problem solving.",
  "Media & Communication":
    "Video, public speaking, writing, and presentations.",
  "Academic & Competition":
    "Coding, debate, parliamentary procedure, and knowledge events.",
};

const explore = [
  {
    title: "Competitive Events",
    body: "Look through every event and find the right one for you.",
    href: "/events",
    Icon: Compass,
  },
  {
    title: "Event Support",
    body: "Rules, forms, templates, and prep resources in one place.",
    href: "/support",
    Icon: LifeBuoy,
  },
  {
    title: "Officer Team",
    body: "Meet the officers running the club this year.",
    href: "/officers",
    Icon: Users,
  },
];

export default function HomePage() {
  const latestNews = news.slice(0, 3);
  const categories = EVENT_CATEGORIES.map((name) => ({
    name,
    count: events.filter((e) => e.category === name).length,
    blurb: categoryBlurbs[name],
  }));

  return (
    <>
      {/* 1. Opening (split intro, intentionally NOT a full hero) */}
      <Section className="relative isolate overflow-hidden">
        <div className="grid-backdrop absolute inset-0 -z-10 opacity-50" aria-hidden />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>{site.schoolName}</Eyebrow>
              <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
                Welcome to Downingtown East TSA
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                {site.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/events" variant="primary" size="lg">
                  Browse Events <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/quiz" variant="outline" size="lg">
                  Find My Event
                </ButtonLink>
              </div>
            </div>
            <ImagePlaceholder
              label="Add a club photo here"
              aspect="aspect-[4/3]"
              className="shadow-soft-lg"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Stats strip (social-proof analog) */}
      <Section className="border-y bg-muted/40 !py-12">
        <Container>
          <dl className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                  {s.value}
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 3. Why join (value proposition) */}
      <Section>
        <Container>
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
            <Eyebrow>Why join</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A place to make, compete, and belong
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {whyJoin.map((item, i) => (
              <Card key={item.title} className="p-7">
                <span className="text-4xl font-extrabold text-accent/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Event categories (numbered "stack" analog) */}
      <Section className="border-t bg-muted/40">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>What you can compete in</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore by category
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every event falls into one of these areas. Browse them all on the
              events page.
            </p>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-[var(--radius-base)] border bg-card shadow-soft">
            {categories.map((c, i) => (
              <Link
                key={c.name}
                href="/events"
                className="group flex items-center gap-5 p-6 transition-colors hover:bg-muted/60"
              >
                <span className="text-lg font-bold tabular-nums text-accent/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                </div>
                <span className="hidden shrink-0 text-sm text-muted-foreground sm:block">
                  {c.count} events
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. HERO #1 (interior, full-bleed gradient): find your event */}
      <section className="hero-bg relative isolate overflow-hidden text-white">
        <div className="hero-dots absolute inset-0 -z-10 opacity-[0.06]" />
        <Container className="py-24 text-center sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="h-4 w-4" />
            New here?
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Find the event that fits you
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            Answer a few quick questions and we will point you to events that
            match your interests.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/quiz" variant="accent" size="lg">
              Take the Quiz <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/events"
              size="lg"
              className="border border-white/30 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/20"
            >
              Browse all events
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 6. Explore the club (card grid) */}
      <Section>
        <Container>
          <div className="mb-12 flex flex-col items-center text-center">
            <Eyebrow>Get started</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore the club
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {explore.map(({ title, body, href, Icon }) => (
              <Link key={href} href={href} className="group">
                <Card className="flex h-full flex-col p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{body}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Latest news (content hub) */}
      {latestNews.length > 0 && (
        <Section className="border-t bg-muted/40">
          <Container>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Stay in the loop</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Latest news
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
              >
                All news <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestNews.map((post) => (
                <Link key={post.slug} href={`/news/${post.slug}`} className="group">
                  <Card className="flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
                    <time className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {formatDate(post.date)}
                    </time>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 8. HERO #2 (closing CTA, full-bleed gradient) */}
      <section className="hero-bg relative isolate overflow-hidden text-white">
        <div className="hero-dots absolute inset-0 -z-10 opacity-[0.06]" />
        <Container className="py-24 text-center sm:py-28">
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ready to join Downingtown East TSA?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            Come build, compete, and meet people who like the same things you
            do. We would love to have you.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="accent" size="lg">
              Get in touch
            </ButtonLink>
            <a
              href={site.socials.schoology}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              Join us on Schoology
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
