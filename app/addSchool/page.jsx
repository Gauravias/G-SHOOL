// app/addSchool/page.jsx
"use client"; // यह Next.js को बताता है कि यह क्लाइंट कंपोनेंट है

import { useForm } from 'react-hook-form';
import { useState } from 'react';

// फ़ॉर्म के डेटा फ़ील्ड्स
const schoolFormFields = {
  name: '',
  address: '',
  city: '',
  state: '',
  contact: '',
  image: null, 
  email_id: '',
};

export default function AddSchoolPage() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: schoolFormFields,
  });

  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setMessage(''); // पिछली स्थिति साफ करें

    // Next.js API Route में भेजने के लिए FormData ऑब्जेक्ट बनाएँ
    const formData = new FormData();
    
    // फ़ाइल को FormData में append करें
    // data.image एक FileList होता है
    if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
    }

    // बाकी टेक्स्ट फ़ील्ड्स को append करें
    for (const key in data) {
        if (key !== 'image') {
            formData.append(key, data[key]);
        }
    }

    try {
      // POST request को /api/schools API Route में भेजें
      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData, // FormData का उपयोग करते समय Content-Type सेट करने की ज़रूरत नहीं है
      });

      if (response.ok) {
        setMessage('School added successfully!');
        reset(); // फ़ॉर्म रीसेट करें
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to add school.'} Details: ${errorData.details || ''}`);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setMessage('Network error or server connection failed.');
    }
  };

  // Tailwind CSS classes for responsiveness and clean UI
  const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150";
  const errorClass = "text-red-500 text-sm mt-1";
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-800 text-center">🏫 Add New School Data</h2>
        
        {/* Success/Error Message Display */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg font-medium text-center ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. School Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">School Name</label>
              <input
                id="name"
                type="text"
                placeholder="D.P.S. (Delhi Public School)"
                {...register("name", { required: "School Name is required" })}
                className={inputClass}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>

            {/* 2. Email ID (with Validation) */}
            <div>
              <label htmlFor="email_id" className="block text-sm font-semibold text-gray-700 mb-1">Email ID</label>
              <input
                id="email_id"
                type="email"
                placeholder="contact@schoolname.com"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: "Invalid email address format",
                  },
                })}
                className={inputClass}
              />
              {errors.email_id && <p className={errorClass}>{errors.email_id.message}</p>}
            </div>

            {/* 3. Contact Number (with Validation) */}
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
              <input
                id="contact"
                type="text"
                placeholder="9876543210"
                {...register("contact", { 
                  required: "Contact Number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/, // 10 से 15 अंक
                    message: "Contact must be 10-15 digits only",
                  }
                })}
                className={inputClass}
              />
              {errors.contact && <p className={errorClass}>{errors.contact.message}</p>}
            </div>

            {/* 4. City */}
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">City</label>
              <input
                id="city"
                type="text"
                placeholder="New Delhi"
                {...register("city", { required: "City is required" })}
                className={inputClass}
              />
              {errors.city && <p className={errorClass}>{errors.city.message}</p>}
            </div>

            {/* 5. State */}
            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1">State</label>
              <input
                id="state"
                type="text"
                placeholder="Delhi"
                {...register("state", { required: "State is required" })}
                className={inputClass}
              />
              {errors.state && <p className={errorClass}>{errors.state.message}</p>}
            </div>

            {/* 6. Image (File Upload) */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">School Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", { required: "School Image is required" })}
                className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150"
              />
              {errors.image && <p className={errorClass}>{errors.image.message}</p>}
            </div>
            
          </div>
          
          {/* 7. Address (Full Width) */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">Full Address</label>
            <textarea
              id="address"
              rows="3"
              placeholder="123, Main Road, Karol Bagh"
              {...register("address", { required: "Address is required" })}
              className={inputClass}
            />
            {errors.address && <p className={errorClass}>{errors.address.message}</p>}
          </div>

          {/* Submission Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-2/5 py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : '➕ Add School Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}