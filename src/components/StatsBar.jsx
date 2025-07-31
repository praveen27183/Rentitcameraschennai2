import React from 'react';

const stats = [
  { value: 2000, label: 'Happy Customers', icon: (
    <svg className="w-8 h-8 text-[#1A97A9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 2a2 2 0 11-4 0 2 2 0 014 0zm-16 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ) },
  { value: 5000, label: 'Successful Rentals', icon: (
    <svg className="w-8 h-8 text-[#1A97A9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1 2h13l1-2h2M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3m-1 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" /></svg>
  ) },
  { value: 4.9, label: 'Average Rating', icon: (
    <svg className="w-8 h-8 text-[#1A97A9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
  ) },
  { value: 24, label: 'Customer Support', sub: '/7', icon: (
    <svg className="w-8 h-8 text-[#1A97A9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636A9 9 0 115.636 18.364 9 9 0 0118.364 5.636z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" /></svg>
  ) },
];

// Count-up animation hook (supports decimals)
function useCountUp(end, duration = 1200, decimals = 0) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const step = (end / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end, duration]);
  return decimals ? count.toFixed(decimals) : Math.round(count);
}

const StatsBar = () => (
  <section className="py-12 bg-gradient-to-b from-[#f7f6f3] to-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="rounded-3xl shadow-2xl bg-white/30 backdrop-blur-md border border-white/40 flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-16 gap-8" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
        {stats.map((stat, idx) => {
          let count;
          if (idx === 2) {
            count = useCountUp(stat.value, 1200, 1); // Animate rating with 1 decimal
          } else if (typeof stat.value === 'number' && stat.value > 10) {
            count = useCountUp(stat.value);
          } else {
            count = stat.value;
          }
          return (
            <div key={idx} className="flex-1 flex flex-col items-center text-center">
              <div className="mb-2 flex items-center justify-center">
                {stat.icon}
              </div>
              <div className="text-5xl md:text-6xl font-extrabold mb-1 bg-gradient-to-r from-[#1A97A9] to-[#207687] bg-clip-text text-transparent drop-shadow-lg flex items-end">
                {count}
                {stat.sub && <span className="text-3xl font-bold text-[#1A97A9] ml-1">{stat.sub}</span>}
                {idx === 2 && <span className="text-3xl font-bold text-yellow-400 ml-2">★</span>}
                {idx === 0 && <span className="text-2xl font-bold text-[#1A97A9] ml-1">+</span>}
                {idx === 1 && <span className="text-2xl font-bold text-[#1A97A9] ml-1">+</span>}
              </div>
              <div className="text-[#1A97A9] text-lg md:text-xl font-medium opacity-80 tracking-wide">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default StatsBar; 