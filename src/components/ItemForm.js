// src/components/ItemForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../actions/itemActions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

const ItemForm = ({ isOpen, onClose, existingItemNames }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  const [formData, setFormData] = useState({
    foto: null,
    nama: '',
    hargaBeli: '',
    hargaJual: '',
    stok: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (attribute, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [attribute]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate image format and size
    if (formData.foto) {
      const allowedFormats = ['image/jpeg', 'image/png'];
      const allowedSize = 100 * 1024; // 100 KB in bytes

      if (!allowedFormats.includes(formData.foto.type)) {
        setError('Format gambar harus JPG atau PNG.');
        return;
      }

      if (formData.foto.size > allowedSize) {
        setError('Ukuran gambar maksimal 100 KB.');
        return;
      }
    }

    // Validate unique item name
    if (items.some((item) => item.nama === formData.nama)) {
      setError('Nama barang harus unik.');
      return;
    }

    dispatch(addItem(formData));
    setFormData({
      foto: null,
      nama: '',
      hargaBeli: '',
      hargaJual: '',
      stok: '',
    });
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Tambah Barang"
    >
      <div className="border p-4 m-2 rounded-lg shadow-md">
        <h2 className="text-xl mb-4">Tambah Barang</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="foto">Foto Barang (JPG/PNG, maksimal 100KB):</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => handleInputChange('foto', e.target.files[0])}
              className="mt-1 p-2 border rounded-md w-full"
              id="foto"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="nama">Nama Barang:</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => handleInputChange('nama', e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              id="nama"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="hargaBeli">Harga Beli:</label>
            <input
              type="number"
              value={formData.hargaBeli}
              onChange={(e) => handleInputChange('hargaBeli', e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              id="hargaBeli"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="hargaJual">Harga Jual:</label>
            <input
              type="number"
              value={formData.hargaJual}
              onChange={(e) => handleInputChange('hargaJual', e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              id="hargaJual"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="stok">Stok:</label>
            <input
              type="number"
              value={formData.stok}
              onChange={(e) => handleInputChange('stok', e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              id="stok"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Tambah
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </Modal>
  );
};

export default ItemForm;
