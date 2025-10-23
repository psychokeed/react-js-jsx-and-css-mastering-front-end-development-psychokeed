const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const searchPosts = async (query, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?q=${encodeURIComponent(query)}&_page=${page}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to search posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};
