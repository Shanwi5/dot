import React, { useState, useEffect } from 'react';
import { RefreshCw, BookOpen, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_PROMPT = `You are an AI educator specializing in explaining basic tech concepts in a simple, engaging way.
 Focus on fundamental topics OF AI/ML , DATA SCIENCE, CONCEPTS IN DEEP LEARNING, GENERATIVE AI, AND MORE.

For each topic:
- Start with a clear, concise definition
- Provide 2-3 key points or bullet points
- Include a simple real-world example
- Keep the total response under 100 words

Make the content beginner-friendly and practical.`;

const LearningOfTheDay: React.FC = () => {
  const [learning, setLearning] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLearning = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error('OpenRouter API key is not configured');
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Developers Of Tomorrow",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.3-8b-instruct:free",
          "messages": [
            {
              "role": "system",
              "content": SYSTEM_PROMPT
            },
            {
              "role": "user",
              "content": "Please provide today's learning point about a basic tech concept."
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error?.message || 'Failed to fetch learning');
      }

      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format');
      }

      setLearning(data.choices[0].message.content);
      setError(null);
    } catch (err) {
      console.error('Error fetching learning:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch learning');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLearning(false);
  }, []);

  const handleRefresh = () => {
    if (!refreshing) {
      fetchLearning(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background/50 backdrop-blur-sm border border-dot-cyan/30 rounded-xl p-6 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dot-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-dot-cyan" size={24} />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-dot-cyan to-dot text-transparent bg-clip-text">
              Learning of the Day
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className={`p-2 rounded-lg transition-colors ${
              refreshing || loading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-dot-cyan/10'
            }`}
            title={refreshing ? "Refreshing..." : "Refresh learning"}
          >
            <RefreshCw
              size={20}
              className={`text-dot-cyan ${refreshing ? 'animate-spin' : ''}`}
            />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <Loader2 className="animate-spin text-dot-cyan" size={24} />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-center py-4"
            >
              {error}
              <button
                onClick={() => handleRefresh()}
                className="block mx-auto mt-2 text-sm text-dot-cyan hover:underline"
              >
                Try again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="prose prose-invert max-w-none"
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-2 my-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2">
                      <span className="text-dot-cyan mt-1.5">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-dot-cyan font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-foreground/80 italic">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-dot-cyan/10 text-dot-cyan px-1.5 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  ),
                }}
              >
                {learning}
              </ReactMarkdown>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LearningOfTheDay; 