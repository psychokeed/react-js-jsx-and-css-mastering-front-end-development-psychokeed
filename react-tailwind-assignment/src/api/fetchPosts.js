/**
 * Fetch posts from JSONPlaceholder API
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of posts per page
 * @returns {Promise<Object>} - API response with posts and pagination info
 */
export const fetchPosts = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    const totalCount = response.headers.get('x-total-count');
    const totalPages = Math.ceil(totalCount / limit);

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: parseInt(totalCount),
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Search posts by title or body
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} limit - Number of posts per page
 * @returns {Promise<Object>} - Filtered posts with pagination
 */
export const searchPosts = async (query, page = 1, limit = 10) => {
  try {
    // First fetch all posts (in a real app, you'd use a search endpoint)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allPosts = await response.json();

    // Filter posts based on search query
    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
    );

    // Implement pagination on filtered results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredPosts.length / limit),
        totalCount: filteredPosts.length,
        hasNextPage: endIndex < filteredPosts.length,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};
