import React, { useState } from 'react';

const blogs = [
  {
    category: 'Photography Tips',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'Best Camera Settings for Wedding Photography',
    summary: 'Learn the essential camera settings and techniques for capturing perfect wedding moments. From ceremony to reception, get pro tips.',
    author: 'Priya Sharma',
    date: '15/1/2025',
    readTime: '5 min read',
  },
  {
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    title: 'Lighting Equipment Guide for Video Production',
    summary: 'Complete guide to choosing the right lighting equipment for your video projects. Compare LED panels, softboxes, and more.',
    author: 'Rajesh Kumar',
    date: '12/1/2025',
    readTime: '7 min read',
  },
  {
    category: 'Drone Photography',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    title: 'Drone Photography: Legal Requirements in India',
    summary: 'Everything you need to know about drone photography regulations, permits, and best practices for aerial shoots.',
    author: 'Anita Reddy',
    date: '10/1/2025',
    readTime: '6 min read',
  },
  {
    category: 'Audio Production',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    title: 'Audio Recording Tips for Content Creators',
    summary: 'Improve your content quality with professional audio recording techniques. Learn about microphones, acoustics, and more.',
    author: 'Vikram Singh',
    date: '8/1/2025',
    readTime: '4 min read',
  },
  {
    category: 'Camera Rental',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    title: 'Why Rent Cameras Instead of Buying?',
    summary: 'Discover the benefits of renting cameras and gear for your next project. Save money, access the latest technology, and avoid maintenance hassles.',
    author: 'Ravi Kumar',
    date: '5/1/2025',
    readTime: '6 min read',
  },
  {
    category: 'Photography Tips',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    title: 'How to Choose the Right Lens for Every Shoot',
    summary: 'A practical guide to selecting the best lens for portraits, landscapes, events, and more. Learn what the pros look for.',
    author: 'Anjali Rao',
    date: '2/1/2025',
    readTime: '5 min read',
  },
  {
    category: 'Camera Rental',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    title: 'Top 5 Reasons to Rent Camera Gear for Your Next Shoot',
    summary: 'From flexibility to cost savings, see why more creators are choosing to rent their equipment. Tips for first-time renters included.',
    author: 'Suresh Menon',
    date: '28/12/2024',
    readTime: '4 min read',
  },
];

const BlogSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleBlogs = showAll ? blogs : blogs.slice(0, 4);

  return (
    <section className="py-16 bg-[#f7f6f3]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2">Latest from Our Blog</h2>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Expert tips, tutorials, and insights to help you create amazing content with professional camera gear.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {visibleBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md border-2 border-[#1A97A9] flex flex-col overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                <span className="absolute top-3 left-3 bg-[#1A97A9] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                  {blog.category}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-5">
                <h3 className="font-bold text-lg mb-2 text-gray-900 leading-snug">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">{blog.summary}</p>
                <div className="flex items-center text-gray-400 text-xs mb-2 gap-4">
                  <span className="flex items-center gap-1">{blog.author}</span>
                  <span className="flex items-center gap-1">{blog.readTime}</span>
                </div>
                <div className="flex items-center text-gray-400 text-xs mb-4 gap-2">{blog.date}</div>
                <a
                  href="#"
                  className="mt-auto text-[#1A97A9] font-semibold flex items-center gap-1 hover:underline"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="flex justify-center mt-10">
            <button
              className="bg-[#1A97A9] hover:bg-[#167a8a] text-white font-semibold px-8 py-3 rounded-lg shadow transition text-lg"
              onClick={() => setShowAll(true)}
            >
              View All Blogs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
