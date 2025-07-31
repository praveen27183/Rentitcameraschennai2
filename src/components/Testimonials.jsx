import React, { useState } from 'react';

const testimonials = [
  {
    text: '"We rented a camera for our 6-day event and had a great experience. The camera was user-friendly and performed really well throughout the event. The rental service was smooth. Everything was delivered on time, and the overall support exceeded our expectations. Highly recommend their service."',
    equipment: 'Canon EOS R10 + RF-S 18-150mm',
    project: 'COOPERATE EVENT',
    user: {
      name: 'Pravalika Pravali',
      role: 'manager',
      company: '  ZOHO',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXp4RkfBm8J1MNQhUD27PxcxMHJfCnAeltwVu69eq-ZYKhOXA8=w65-h65-p-rp-mo-br100',
    },
    stars: 5,
    equipmentIcon: (
      <svg className="w-5 h-5 ml-2 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /></svg>
    ),
  },
  {
    text: '"Prompt service, good quality products to rent at affordable rates! They helped in choosing a product suitable for my immediate need and they had a wide range of cameras available with supporting accessories. Rentit is a very professional and reliable platform in Chennai. Will surely rent again and recommend for all your camera needs!We rented a camera for our 6-day event and had a great experience. The camera was user-friendly and performed really well throughout the event. The rental service was smooth. Everything was delivered on time, and the overall support exceeded our expectations. Highly recommend their service."',
    equipment: 'Canon EOS 80D + 18-135mm',
    project: 'Wedding Photography',
    user: {
      name: 'Abinaya Ravichandran',
      role: 'EVENT MANAGEMENT',
      company: 'A TO Z ENTERPRISES',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXR0jHR06P4Uqcci4mk7yYfWSXY6kwmCPOuk1PgtkWtf4tSm9P6=w65-h65-p-rp-mo-br100',
    },
    stars: 5,
    equipmentIcon: (
      <svg className="w-5 h-5 ml-2 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /></svg>
    ),
  },
  {
    text: '"We rented a camera for our 6-day event and had a great experience. The camera was user-friendly and performed really well throughout the event. The rental service was smooth. Everything was delivered on time, and the overall support exceeded our expectations. Highly recommend their service."',
    equipment: 'Canon EOS 80D + 18-135mm',
    project: 'TRIP',
    user: {
      name: 'Jaikrishnan R',
      role: 'OWNER',
      company: '  Endless cafe',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjV0KuiqUL1OB_KehgYMERicikvm1pL_S0JGYasNYorccvSKq4Mp=w65-h65-p-rp-mo-ba4-br100',
    },
    stars: 4,
    equipmentIcon: (
      <svg className="w-5 h-5 ml-2 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /></svg>
    ),
  },
  {
    text: '"We had borrowed a camera for 3 days and the service was very well they had a variety of camera we had taken canon 1300d and it was very good. Highly recommended this shop if u need cameras for rental!."',
    equipment: 'Canon EOS 200D II + 18-55mm',
    project: 'SCHOOL PROJECT',
    user: {
      name: 'Sabitha',
      role: 'STUDENT',
      company: '  KENDRIYA VIDYALAYA',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUz0489fY7bivhCOsBL3WkHwU3L6Tr0aW4jQJ9LWlIikEZTTXvCag=w65-h65-p-rp-mo-br100',
    },
    stars: 5,
    equipmentIcon: (
      <svg className="w-5 h-5 ml-2 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /></svg>
    ),
  },
  {
    text: '"I had a great experience. Since 2023, renting a GoPro and Insta360for bike trips. The rental process was smooth and hassle-free, and they provided all the necessary accessories. Communication was prompt and professional, making the entire experience stress-free. Highly recommend their service."',
    equipment: 'GoPro + Insta360',
    project: 'BIKE TRIPS',
    user: {
      name: 'Kevin',
      role: 'bike rider',
      company: '',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXAWigdf6JZ5TdHdwltHxzVEdSAwd2cKISpQZkHfxNS5FcIZ7_l=w65-h65-p-rp-mo-br100',
    },
    stars: 5,
    equipmentIcon: (
      <svg className="w-5 h-5 ml-2 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /></svg>
    ),
  },
  {
    text: '"My experience with Rent it was excellent. They had a wide range of equipment, and the camera I rented performed flawlessly. The staff was super helpful and made the entire process easy. I will recommend this shop to my friends looking to rent gear!"',
    equipment: 'Godox Lighting Kit + Gimbal',
    project: 'Commercial Video',
    user: {
      name: 'Dhana',
      role: 'college student',
      company: 'ETHIRAJ',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUCOXD-E4kDRWmazcUigjSph9tBnrrJCH6hoUaDa9vgBLADxEA=w65-h65-p-rp-mo-br100',
    },
    stars: 5,
    equipmentIcon: (
      <svg className="w-5 h-5 ml-2 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>
    ),    
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState({});
  const total = testimonials.length;
  const visibleCount = 3;
  const maxWords = 30;

  const prev = () => setIndex((prev) => (prev - 1 + total) % total);
  const next = () => setIndex((prev) => (prev + 1) % total);

  const getVisible = () => {
    const arr = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push(testimonials[(index + i) % total]);
    }
    return arr;
  };

  const visible = getVisible();

  const toggleExpand = (idx) => {
    setExpanded(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const renderText = (text, idx) => {
    const words = text.split(' ');
    const isExpanded = expanded[idx];
    const displayText = isExpanded ? text : words.slice(0, maxWords).join(' ');
    const shouldShowButton = words.length > maxWords;

    return (
      <div className="mb-6 mt-2 text-white/90 text-base leading-relaxed">
        {displayText}
        {shouldShowButton && (
          <button 
            onClick={() => toggleExpand(idx)}
            className="text-cyan-200 hover:text-white font-medium ml-1 focus:outline-none transition-colors"
          >
            {isExpanded ? ' ...Show Less' : ' ...Read More'}
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#1A97A9] to-[#0f2e34] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 drop-shadow-lg">What Our Customers Say</h2>
        <p className="text-center text-white mb-12 text-lg max-w-2xl mx-auto">
          Join thousands of satisfied photographers, videographers, and content creators who trust RentIt Cameras for their projects.
        </p>
        <div className="flex justify-center items-center gap-6 mb-8">
          <button
            onClick={prev}
            className="bg-[#1A97A9]/80 hover:bg-[#1A97A9] text-white rounded-full w-12 h-12 flex items-center justify-center shadow transition text-2xl font-bold"
            aria-label="Previous testimonial"
          >
            &#8592;
          </button>
          <div className="w-full max-w-6xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
              {visible.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white/20 border-2 border-white/30 rounded-2xl shadow-lg p-7 transition hover:shadow-2xl hover:bg-white/30 relative text-white h-full min-h-[500px] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/32/32355.png" 
                      alt="quote icon" 
                      className="w-8 h-8 opacity-80 drop-shadow-sm white filter invert brightness-0" 
                    />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 transition duration-500 ease-in-out transform ${i < t.stars ? 'text-[#FFD700] scale-125 rotate-6' : 'text-[#ccc] scale-100'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.382 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.382-2.455a1 1 0 00-1.175 0l-3.382 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  {renderText(t.text, idx)}
                  <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-xl p-4 mb-5 flex items-center gap-3">
                    <div>
                      <div className="font-semibold text-white text-sm" style={{ WebkitTextStroke: '0.2px black', fontWeight: 700 }}>Equipment Used:</div>
                      <div className="text-cyan-200 text-sm font-medium flex items-center gap-1" style={{ WebkitTextStroke: '0.2px black', fontWeight: 700 }}>
                        {t.equipment} {t.equipmentIcon}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'white', WebkitTextStroke: '0.2px black', textShadow: '0 0 3px rgba(0,0,0,0.7)', fontWeight: 600 }}>
                        Project: {t.project}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-2">
                    <img src={t.user.avatar} alt={t.user.name} className="w-12 h-12 rounded-full border-2 border-[#1A97A9] object-cover" />
                    <div className="text-left">
                      <div className="font-bold text-white leading-tight">{t.user.name}</div>
                      <div className="text-sm text-white/80 leading-tight">{t.user.role}</div>
                      <div className="text-xs text-white/50 leading-tight">{t.user.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={next}
            className="bg-[#1A97A9]/80 hover:bg-[#1A97A9] text-white rounded-full w-12 h-12 flex items-center justify-center shadow transition text-2xl font-bold"
            aria-label="Next testimonial"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
