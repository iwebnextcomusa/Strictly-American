import React, { useState } from 'react';
import { Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="py-16 bg-[#071322] min-h-screen text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </button>

          <div className="space-y-4">
            <span className="text-xs uppercase font-bold text-[#B22234] tracking-widest">{selectedPost.category}</span>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedPost.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
            </div>
          </div>

          <div className="h-96 rounded-2xl overflow-hidden border border-[#1E3A5F]">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-8 space-y-4 font-sans-clean text-slate-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
            {selectedPost.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#071322] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B22234]">The Heritage Journal</span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold">American Craftsman Dispatch</h1>
          <p className="text-xs sm:text-sm text-slate-400">In-depth stories behind our domestic supply chains, textile history, and workshop artisans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-[#0A2342] border border-[#1E3A5F] hover:border-[#B22234] rounded-2xl overflow-hidden shadow-xl cursor-pointer group transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <span className="absolute top-3 left-3 bg-[#0A2342]/80 backdrop-blur-md text-[10px] uppercase font-bold text-red-400 px-2.5 py-1 rounded-full border border-white/10">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif-display font-bold text-lg text-white group-hover:text-amber-200 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans-clean mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1C3A63] flex items-center justify-between text-xs text-red-400 font-semibold group-hover:text-red-300">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
