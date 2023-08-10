// src/components/ItemList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem, deleteItem } from '../actions/itemActions';
import ItemForm from './ItemForm';

const itemsPerPage = 5; // Jumlah item per halaman

const ItemList = () => {
  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editedItemAttributes, setEditedItemAttributes] = useState({});
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredItems = items.filter((item) =>
    item.nama.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const displayedItems = filteredItems.slice(startIndex, endIndex);

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditedItemAttributes({
      [id]: { ...itemToEdit },
    });
  };

  const handleUpdate = (id) => {
    dispatch(updateItem(id, editedItemAttributes[id]));
    setEditedItemAttributes((prevAttributes) => {
      const newAttributes = { ...prevAttributes };
      delete newAttributes[id];
      return newAttributes;
    });
  };

  const handleDelete = (id) => {
    setDeleteConfirmationId(id);
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteItem(id));
    setDeleteConfirmationId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          onClick={openModal}
        >
          Tambah Barang
        </button>
        <div>
          <input
            type="text"
            placeholder="Cari barang..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        </div>
        <div>
          <button
            className="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => setCurrentPage(1)}
          >
            Reset Halaman
          </button>
        </div>
      </div>
      <div className="mt-4">
        {displayedItems.map((item) => (
          <div key={item.id} className="border p-4 m-2 rounded-lg shadow-md">
            <div>
              <img
                src={item.foto}
                alt={item.nama}
                className="mb-2 rounded-lg"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            {editedItemAttributes[item.id] ? (
              <div>
                {/* Edit mode */}
                <div className="mb-2">
                  <strong>Foto Barang:</strong>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={(e) =>
                      setEditedItemAttributes((prevAttributes) => ({
                        ...prevAttributes,
                        [item.id]: {
                          ...prevAttributes[item.id],
                          newFoto: e.target.files[0],
                        },
                      }))
                    }
                  />
                </div>
                <div className="mb-2">
                  <strong>Nama Barang:</strong>
                  <input
                    type="text"
                    value={editedItemAttributes[item.id].nama}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={(e) =>
                      setEditedItemAttributes((prevAttributes) => ({
                        ...prevAttributes,
                        [item.id]: {
                          ...prevAttributes[item.id],
                          nama: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="mb-2">
                  <strong>Harga Beli:</strong>
                  <input
                    type="number"
                    value={editedItemAttributes[item.id].hargaBeli}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={(e) =>
                      setEditedItemAttributes((prevAttributes) => ({
                        ...prevAttributes,
                        [item.id]: {
                          ...prevAttributes[item.id],
                          hargaBeli: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="mb-2">
                  <strong>Harga Jual:</strong>
                  <input
                    type="number"
                    value={editedItemAttributes[item.id].hargaJual}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={(e) =>
                      setEditedItemAttributes((prevAttributes) => ({
                        ...prevAttributes,
                        [item.id]: {
                          ...prevAttributes[item.id],
                          hargaJual: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="mb-2">
                  <strong>Stok:</strong>
                  <input
                    type="number"
                    value={editedItemAttributes[item.id].stok}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={(e) =>
                      setEditedItemAttributes((prevAttributes) => ({
                        ...prevAttributes,
                        [item.id]: {
                          ...prevAttributes[item.id],
                          stok: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleUpdate(item.id)}
                >
                  Simpan
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                  onClick={() =>
                    setEditedItemAttributes((prevAttributes) => {
                      const newAttributes = { ...prevAttributes };
                      delete newAttributes[item.id];
                      return newAttributes;
                    })
                  }
                >
                  Batal
                </button>
              </div>
            ) : (
              <div>
                {/* Normal mode */}
                <div className="mb-2">
                  <strong>Nama Barang:</strong> {item.nama}
                </div>
                <div className="mb-2">
                  <strong>Harga Beli:</strong> {item.hargaBeli}
                </div>
                <div className="mb-2">
                  <strong>Harga Jual:</strong> {item.hargaJual}
                </div>
                <div className="mb-2">
                  <strong>Stok:</strong> {item.stok}
                </div>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                {deleteConfirmationId === item.id ? (
                  <div>
                    <p>Anda yakin ingin menghapus data ini?</p>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleConfirmDelete(item.id)}
                    >
                      Ya
                    </button>
                    <button
                      className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 ml-2"
                      onClick={handleCancelDelete}
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 ml-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Halaman Sebelumnya
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= filteredItems.length}
        >
          Halaman Berikutnya
        </button>
      </div>
      <ItemForm isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ItemList;
