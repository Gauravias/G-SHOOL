// app/page.jsx
"use client";

import Link from 'next/link';
import { FiPlusCircle, FiList } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

// यह कंपोनेंट Next.js का होम पेज (`/`) होगा।
export default function LandingPage() {
  
  // आकर्षक, डार्क-थीम स्टाइलिंग (OpticOdds से प्रेरित)
  const cardClass = "bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-700/50 hover:border-blue-500 transition-all duration-300 transform hover:scale-[1.03] cursor-pointer block";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-4xl text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-tight leading-tight">
          School Management Portal 
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          एडमिनिस्ट्रेशन के लिए एंट्री पॉइंट (Entry Point)
        </p>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Add School */}
          {/* LINK UPDATED: /addschool -> /addSchool (कैपिटल S) */}
          <Link href="/addSchool" passHref className={cardClass}>
            <div className="flex flex-col items-center">
              <FiPlusCircle className="text-6xl text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Add New School
              </h2>
              <p className="text-gray-400 text-center">
                नया स्कूल डेटाबेस में जोड़ें और इमेज अपलोड करें।
              </p>
            </div>
          </Link>

          {/* Card 2: View Schools */}
          {/* LINK UPDATED: /showschools -> /showSchools (कैपिटल S) */}
          <Link href="/showSchools" passHref className={cardClass}>
            <div className="flex flex-col items-center">
              <FiList className="text-6xl text-purple-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                View School List
              </h2>
              <p className="text-gray-400 text-center">
                सभी रजिस्टर्ड स्कूलों को ई-कॉमर्स कार्ड फॉर्मेट में देखें।
              </p>
            </div>
          </Link>
          
        </div>
        
        <div className="mt-16 text-center text-gray-500">
            <FaGraduationCap className="inline-block text-3xl text-gray-600 mr-2" />
            <span className="text-sm">Developed with Next.js & React</span>
        </div>
        
      </div>
    </div>
  );
}
