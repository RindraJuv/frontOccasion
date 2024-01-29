import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CRow } from '@coreui/react';
import Modal from 'react-modal'; 

const Select = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://occasion1-production.up.railway.app/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post('https://occasion1-production.up.railway.app/categories', { categorieName: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete('https://occasion1-production.up.railway.app/categories/${id}');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const editCategory = async (id, newName) => {
    try {
      await axios.put('https://occasion1-production.up.railway.app/categories/${id}', { categorieName: newName });
      fetchCategories();
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleEditCategory = async (id, currentName) => {
    setEditCategoryId(id);
    setEditCategoryName(currentName);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put('https://occasion1-production.up.railway.app/categories/${editCategoryId}', { categorieName: editCategoryName });
      fetchCategories();
      setEditCategoryId(null);
      setEditCategoryName('');
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  return (
    <div className="bg-light min-vh-88 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Categorie</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre categorie</p>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        placeholder="categorie"
                        autoComplete="username"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={addCategory}
                        >
                          Ajouter
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
            <br />
            <br />
            <CCardBody>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom_Categorie</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.categorieName}</td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={() => handleEditCategory(category.id, category.categorieName)}
                        >
                          Modifier
                        </CButton>
                      </td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#e55353' }}
                          className="mr-2"
                          onClick={() => deleteCategory(category.id)}
                        >
                          Suprimer
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCol>
        </CRow>
      </CContainer>
      <Modal
        isOpen={editCategoryId !== null}
        onRequestClose={() => setEditCategoryId(null)}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            transform: 'none',
            width: '50%',
            maxWidth: '600px',
            maxHeight: '80%',
            overflow: 'auto',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#fff',
            padding: '20px',
          },
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Modifier le nom de la catégorie</h2>
          <input
            type="text"
            placeholder="Nouveau nom de catégorie"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              width: '100%',
            }}
          />
          <br />
          <br />
          <button
            onClick={handleSaveEdit}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Enregistrer
          </button>
          <button
            onClick={() => setEditCategoryId(null)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Annuler
          </button>
        </div>
      </Modal>


    </div>
  );
};

export default Select;
