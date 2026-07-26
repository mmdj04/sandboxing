import { NextResponse } from "next/server";

interface AnalyticsEvent {
  type: "pageview" | "search" | "click";
  path: string;
  query?: string;
  timestamp: string;
  userAgent?: string;
}

const analyticsStore: AnalyticsEvent[] = [];

export async function POST(request: Request) {
  try {
    const event: AnalyticsEvent = await request.json();
    analyticsStore.push(event);

    if (analyticsStore.length > 1000) {
      analyticsStore.splice(0, analyticsStore.length - 1000);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const pageViews = analyticsStore.filter((e) => e.type === "pageview");
  const searches = analyticsStore.filter((e) => e.type === "search");

  const topPages = pageViews.reduce(
    (acc, event) => {
      acc[event.path] = (acc[event.path] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topSearches = searches.reduce(
    (acc, event) => {
      if (event.query) {
        acc[event.query] = (acc[event.query] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedPages = Object.entries(topPages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const sortedSearches = Object.entries(topSearches)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return NextResponse.json({
    totalPageViews: pageViews.length,
    totalSearches: searches.length,
    topPages: sortedPages,
    topSearches: sortedSearches,
  });
}
