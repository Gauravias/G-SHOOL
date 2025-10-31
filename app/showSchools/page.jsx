// app/showSchools/page.jsx
"use client"; // यह क्लाइंट कंपोनेंट है क्योंकि यह डेटा फ़ेच कर रहा है

import { useState, useEffect } from 'react';
import Image from 'next/image'; 

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools');
        if (!response.ok) {
          throw new Error('Server response failed');
        }
        const data = await response.json();
        setSchools(data);
      } catch (err) {
        // यदि MySQL या API में कोई त्रुटि है
        setError('Failed to load schools data. Check if XAMPP/MySQL is running.');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []); // पेज लोड होने पर केवल एक बार डेटा फ़ेच करें

  // -------------------------
  // Loading & Error States
  // -------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading Schools... 🔄</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-700 bg-red-100 border border-red-400 rounded-lg m-4">
        ❌ Error: {error}
        <p className="mt-2 text-sm">Please ensure the MySQL server is active and the 'schools' table is correct.</p>
      </div>
    );
  }

  // -------------------------
  // Main Display
  // -------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900">
        All Registered Schools 🎓
      </h1>

      {schools.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl p-16 border-4 border-dashed rounded-xl bg-white shadow-xl">
          😔 No schools found. Please <a href="/addSchool" className="text-blue-600 hover:underline">add one</a> first!
        </div>
      ) : (
        // Responsive Grid Layout (1 column on mobile, 2 on tablet, 3 on desktop)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-7xl mx-auto">
          {schools.map((school) => (
            // E-commerce Product Card Style
            <div key={school.id} className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer border border-gray-100">
              
              {/* Image Section */}
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  // school.image पाथ को public फ़ोल्डर से रिलेटिव पाथ के रूप में उपयोग करें
                  src={school.image || '/default-school-placeholder.png'} 
                  alt={school.name}
                  fill // यह इमेज को कंटेनर को पूरी तरह भरने देता है
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw" // Responsiveness के लिए
                  className="transition-opacity duration-300"
                  priority={true} // ऑप्टिमाइजेशन के लिए
                  // Unoptimized को Vercel Deployment में हटाएं
                  unoptimized={true} 
                />
              </div>

              {/* Details Section */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 truncate" title={school.name}>
                  {school.name}
                </h2>
                <div className="text-md text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <span className="font-semibold text-gray-700 mr-2">📍 Address:</span> {school.address}
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold text-gray-700 mr-2">🏙️ City:</span> {school.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}