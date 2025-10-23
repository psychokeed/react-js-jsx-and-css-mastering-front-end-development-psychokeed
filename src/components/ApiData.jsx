import React, { useState, useEffect } from 'react';
import { fetchPosts, searchPosts } from '../api/fetchPosts';
import Card from './Card';
import Button from './Button';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (pageNum = 1, query = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = query
        ? await searchPosts(query, pageNum, 10)
        : await fetchPosts(pageNum, 10);

      if (pageNum === 1) {
        setPosts(data);
      } else {
        setPosts(prev => [...prev, ...data]);
      }

      setHasMore(data.length === 10);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1, searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadPosts(1, searchQuery);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPosts(nextPage, searchQuery);
  };

  return (
    <div id="api" className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">API Data</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Button type="submit">Search</Button>
          </div>
        </form>

        {/* Loading State */}
        {loading && page === 1 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <Button onClick={() => loadPosts(1, searchQuery)} className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {posts.map(post => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {post.body}
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Post ID: {post.id}
                  </p>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <Button onClick={loadMore} disabled={loading}>
                  {loading ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ApiData;
