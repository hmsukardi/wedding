"use client";
import { useState } from "react";

export default function RSVPModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    attending: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RSVP data:", formData);
    alert("Terima kasih atas konfirmasinya 💖");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 animate-fade-in">
        <h2 className="text-xl font-semibold text-center mb-4 text-pink-600">
          Konfirmasi Kehadiran 💌
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Nama kamu"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md text-sm"
            required
          />

          <select
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            className="border p-2 rounded-md text-sm"
            required
          >
            <option value="">Apakah kamu akan hadir?</option>
            <option value="yes">Ya</option>
            <option value="no">Tidak</option>
          </select>

          <input
            type="number"
            name="guests"
            min="1"
            placeholder="Jumlah tamu"
            value={formData.guests}
            onChange={handleChange}
            className="border p-2 rounded-md text-sm"
          />

          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition"
          >
            Kirim
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
