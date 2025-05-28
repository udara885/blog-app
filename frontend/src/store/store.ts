import { create } from 'zustand';
import { Article } from '../types/types';

interface StoreState {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  getArticles: () => Promise<
    | {
        success: boolean;
        message: string;
      }
    | undefined
  >;
  getArticle: (id: string) => Promise<
    | {
        success: boolean;
        message: string;
      }
    | {
        success: boolean;
        data: Article;
      }
  >;
  addArticle: (newArticle: Article) => Promise<{
    success: boolean;
    message: string;
  }>;
  updateArticle: (
    id: string,
    updatedArticle: Article
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  deleteArticle: (id: string) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export const useStore = create<StoreState>((set) => ({
  articles: [],
  setArticles: (articles) => set({ articles }),
  getArticles: async () => {
    const res = await fetch('http://weekly-mead-lakshandev-6b9fbd5b.koyeb.app/api/v1/articles');
    const data = await res.json();
    if (!data.success) return { success: false, message: data.error };
    set({ articles: data.data });
  },
  getArticle: async (id) => {
    const res = await fetch(
      `http://weekly-mead-lakshandev-6b9fbd5b.koyeb.app/api/v1/articles/${id}`
    );
    const data = await res.json();
    if (!data.success) return { success: false, message: data.error };
    return { success: true, data: data.data };
  },
  addArticle: async (newArticle) => {
    const res = await fetch('http://weekly-mead-lakshandev-6b9fbd5b.koyeb.app/api/v1/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.error };
    set((state) => ({ articles: [...state.articles, data.data] }));
    return { success: true, message: 'Article added successfully' };
  },
  updateArticle: async (id, updatedArticle) => {
    const res = await fetch(
      `http://weekly-mead-lakshandev-6b9fbd5b.koyeb.app/api/v1/articles/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(updatedArticle),
      }
    );
    const data = await res.json();
    if (!data.success) return { success: false, message: data.error };
    set((state) => ({
      articles: state.articles.map((article) => (article._id === id ? data.data : article)),
    }));
    return { success: true, message: 'Article updated successfully' };
  },
  deleteArticle: async (id) => {
    const res = await fetch(
      `http://weekly-mead-lakshandev-6b9fbd5b.koyeb.app/api/v1/articles/${id}`,
      {
        method: 'DELETE',
      }
    );
    const data = await res.json();
    if (!data.success) return { success: false, message: data.error };
    set((state) => ({ articles: state.articles.filter((article) => article._id === id) }));
    return { success: true, message: data.message };
  },
}));
