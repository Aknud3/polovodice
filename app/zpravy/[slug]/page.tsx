import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles, getRelatedArticles } from "@/lib/api";
import { ArticleDetailClient } from "@/components/portal/ArticleDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Článek nenalezen - Polovodiče" };
  }

  return {
    title: `${article.title} - Polovodiče`,
    description: article.perex,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedArticles(article.slug, 3);

  return <ArticleDetailClient article={article} related={related} />;
}
