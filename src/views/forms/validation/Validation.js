import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow
} from '@coreui/react';
import Modal from 'react-modal';

const CommissionCrud = () => {
  const [commissions, setCommissions] = useState([]);
  const [newCommissionName, setNewCommissionName] = useState('');
  const [editCommissionId, setEditCommissionId] = useState(null);
  const [editCommissionName, setEditCommissionName] = useState('');

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    try {
      const response = await axios.get('https://occasion1-production.up.railway.app/commissions');
      setCommissions(response.data);
    } catch (error) {
      console.error('Error fetching commissions:', error);
    }
  };

  const addCommission = async () => {
    try {
      await axios.post('https://occasion1-production.up.railway.app/commissions', { marge: newCommissionName });
      setNewCommissionName('');
      fetchCommissions();
    } catch (error) {
      console.error('Error adding commission:', error);
    }
  };

  const deleteCommission = async (id) => {
    try {
      await axios.delete('https://occasion1-production.up.railway.app/commissions/${id}');
      fetchCommissions();
    } catch (error) {
      console.error('Error deleting commission:', error);
    }
  };

  const handleEditCommission = async (id, currentName) => {
    setEditCommissionId(id);
    setEditCommissionName(currentName);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put('https://occasion1-production.up.railway.app/commissions/${editCommissionId}', { marge: editCommissionName });
      fetchCommissions();
      setEditCommissionId(null);
      setEditCommissionName('');
    } catch (error) {
      console.error('Error editing commission:', error);
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
                    <h1>Commission</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre Commission</p>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        placeholder="Commission"
                        autoComplete="off"
                        value={newCommissionName}
                        onChange={(e) => setNewCommissionName(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={addCommission}
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
                    <th>Nom de la Commission</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.map((commission) => (
                    <tr key={commission.id}>
                      <td>{commission.marge}</td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={() => handleEditCommission(commission.id, commission.marge)}
                        >
                          Modifier
                        </CButton>
                      </td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#e55353' }}
                          className="mr-2"
                          onClick={() => deleteCommission(commission.id)}
                        >
                          Supprimer
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
        isOpen={editCommissionId !== null}
        onRequestClose={() => setEditCommissionId(null)}
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
          <h2 style={{ marginBottom: '20px' }}>Modifier le nom de la commission</h2>
          <input
            type="text"
            placeholder="Nouveau nom de commission"
            value={editCommissionName}
            onChange={(e) => setEditCommissionName(e.target.value)}
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
            onClick={() => setEditCommissionId(null)}
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

export default CommissionCrud;
