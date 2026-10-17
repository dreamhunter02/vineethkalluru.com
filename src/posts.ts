// Every Markdown file in src/pages/blog is a post. Set `draft: true` in its frontmatter to hide it.
export interface Post {
  url: string;
  title: string;
  summary: string;
  date: Date;
}

export function getPosts(): Post[] {
  const files = import.meta.glob("./pages/blog/*.md", { eager: true }) as Record<string, any>;
  return Object.values(files)
    .filter((f) => !f.frontmatter.draft)
    .map((f) => ({
      url: f.url,
      title: f.frontmatter.title,
      summary: f.frontmatter.summary,
      date: new Date(f.frontmatter.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
