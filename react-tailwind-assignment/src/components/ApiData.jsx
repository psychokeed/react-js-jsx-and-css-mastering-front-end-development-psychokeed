import React, { useState, useEffect } from 'react';
import { fetchPosts, searchPosts } from '../api/fetchPosts';
import Card from './Card';
import Button from './Button';

/**
 * ApiData component for displaying posts from JSONPlaceholder
 * @returns {JSX.Element} - ApiData component
 */
const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const postsPerPage = 10;

  // Fetch posts on component mount and page change
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        let result;
        if (isSearching && searchQuery.trim()) {
          result = await searchPosts(searchQuery, currentPage, postsPerPage);
        } else {
          result = await fetchPosts(currentPage, postsPerPage);
        }

        setPosts(result.posts);
        setPagination(result.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage, isSearching, searchQuery]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsSearching(searchQuery.trim() !== '');
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setCurrentPage(1);
  };

  return (
    <div id="api-data" className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card>
        <h2 className="text-2xl font-bold mb-6">API Data - Posts</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by title or content..."
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
            {isSearching && (
              <Button type="button" variant="secondary" onClick={clearSearch}>
                Clear
              </Button>
            )}
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400 font-medium">Error loading posts</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{error}</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Posts List */}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {posts.map((post) => (
                <Card key={post.id} hover={true} className="h-full">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {post.body}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Post ID: {post.id} | User ID: {post.userId}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && posts.length === 0 && isSearching && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No posts found matching "{searchQuery}"
            </p>
            <Button variant="secondary" className="mt-4" onClick={clearSearch}>
              Clear Search
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ApiData;
