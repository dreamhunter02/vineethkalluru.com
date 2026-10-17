import rss from "@astrojs/rss";
import { SITE } from "../site";
import { getPosts } from "../posts";

export function GET(context) {
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: getPosts().map((p) => ({ title: p.title, description: p.summary, pubDate: p.date, link: p.url })),
  });
}
