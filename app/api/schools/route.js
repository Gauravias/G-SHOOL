// app/api/schools/route.js

import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // lib/db.js से DB फ़ंक्शन आयात करें
import { writeFile } from 'fs/promises';
import path from 'path';

// फ़ाइल अपलोड के लिए डेस्टिनेशन फ़ोल्डर
const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');

// --------------------------------------------------------
// A. POST Request Handler (To Add New School Data and Image)
// --------------------------------------------------------
export async function POST(req) {
  try {
    const formData = await req.formData();

    // 1. फ़ाइल (Image) हैंडलिंग
    const imageFile = formData.get('image');
    let imagePathInDB = null; 

    if (imageFile && imageFile.name) {
      // फ़ाइल को Buffer में कन्वर्ट करें
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // फ़ाइल का एक यूनिक नाम बनाएँ
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`;
      const filePath = path.join(uploadDir, fileName);

      // फ़ाइल को डिस्क पर लिखें
      await writeFile(filePath, buffer);
      
      // डेटाबेस में सेव करने के लिए public पाथ
      imagePathInDB = `/schoolImages/${fileName}`;
    }

    // 2. बाकी फ़ील्ड्स को एक्सट्रैक्ट करें
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');

    // 3. डेटाबेस में Insertion (SQL Injection से बचने के लिए ?) का उपयोग करें
    const sql = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, address, city, state, contact, imagePathInDB, email_id];
    
    await query(sql, values);

    // 4. सफलता का जवाब (Response)
    return NextResponse.json({ 
      message: 'School data and image saved successfully!'
    }, { status: 201 });

  } catch (error) {
    console.error('API Error (POST):', error);
    // क्लाइंट को त्रुटि (error) भेजें
    return NextResponse.json({ 
      error: 'Failed to add school data.', 
      details: error.message 
    }, { status: 500 });
  }
}

// --------------------------------------------------------
// B. GET Request Handler (To Fetch Schools for Page 2)
// --------------------------------------------------------
export async function GET(req) {
  try {
    // केवल Page 2 के लिए आवश्यक फ़ील्ड्स चुनें
    const sql = 'SELECT id, name, address, city, image FROM schools ORDER BY id DESC';
    const schools = await query(sql);

    // 4. सफलता का जवाब (Response)
    return NextResponse.json(schools, { status: 200 });

  } catch (error) {
    console.error('API Error (GET):', error);
    return NextResponse.json({ error: 'Failed to fetch schools data.' }, { status: 500 });
  }
}

// Note: Next.js API Route में फाइल अपलोड के लिए यह कॉन्फ़िगरेशन ज़रूरी है
export const config = {
  api: {
    bodyParser: false,
  },
};