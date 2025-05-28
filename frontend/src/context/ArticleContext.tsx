import { createContext, ReactNode, useContext, useState } from 'react';
import { Article } from '../types/types';

interface ArticleContextType {
  currentArticle: Article | null;
  setCurrentArticle: (article: Article | null) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  return (
    <ArticleContext.Provider value={{ currentArticle, setCurrentArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) throw new Error('useArticle must be use within an ArticleProvider');
  return context;
};
