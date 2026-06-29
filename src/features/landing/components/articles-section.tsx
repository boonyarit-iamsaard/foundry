import { SectionHeader } from '@/common/components/section-header';
import { ArticleCard } from '@/features/articles/components/article-card';

import { articles } from '@/velite';

export function ArticlesSection() {
  const latestArticles = articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className="container space-y-8">
      <SectionHeader
        title="Latest Articles"
        description="Long-form notes on how I build and what I've learned along the way."
        viewAllLink="/articles"
      />
      <div className="grid gap-4 sm:gap-8">
        {latestArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
