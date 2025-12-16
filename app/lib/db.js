// lib/db.js
import fs from 'fs';
import path from 'path';

// Data klasörünün yolu
const dataDirectory = path.join(process.cwd(), 'app', 'data');

// JSON dosyasını oku
export function readData(filename) {
  try {
    const filePath = path.join(dataDirectory, filename);
    
    // Dosya yoksa oluştur
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
      return [];
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

// JSON dosyasına yaz
export function writeData(filename, data) {
  try {
    // data klasörü yoksa oluştur
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true });
    }
    
    const filePath = path.join(dataDirectory, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

// Email formatını kontrol et
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Tarih formatını kontrol et (YYYY-MM-DD)
export function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

// Geçmiş tarih mi kontrol et
export function isPastDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const inputDate = new Date(dateString);
  inputDate.setHours(0, 0, 0, 0);
  
  return inputDate < today;
}