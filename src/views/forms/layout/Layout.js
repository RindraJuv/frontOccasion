import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  CRow,
} from '@coreui/react'
import Modal from 'react-modal'

const MarqueCrud = () => {
  const [marques, setMarques] = useState([])
  const [newMarqueName, setNewMarqueName] = useState('')
  const [editMarqueId, setEditMarqueId] = useState(null)
  const [editMarqueName, setEditMarqueName] = useState('')

  useEffect(() => {
    fetchMarques()
  }, [])

  const fetchMarques = async () => {
    try {
      const response = await axios.get('https://occasion1-production.up.railway.app/marques')
      setMarques(response.data)
    } catch (error) {
      console.error('Error fetching marques:', error)
    }
  }

  const addMarque = async () => {
    try {
      await axios.post('https://occasion1-production.up.railway.app/marques', {
        marqueName: newMarqueName,
      })
      setNewMarqueName('')
      fetchMarques()
    } catch (error) {
      console.error('Error adding marque:', error)
    }
  }

  const deleteMarque = async (id) => {
    try {
      await axios.delete('https://occasion1-production.up.railway.app/marques/${id}')
      fetchMarques()
    } catch (error) {
      console.error('Error deleting marque:', error)
    }
  }

  const editMarque = async (id, newName) => {
    try {
      await axios.put('https://occasion1-production.up.railway.app/marques/${id}', {
        marqueName: newName,
      })
      fetchMarques()
    } catch (error) {
      console.error('Error editing marque:', error)
    }
  }

  const handleEditMarque = async (id, currentName) => {
    setEditMarqueId(id)
    setEditMarqueName(currentName)
  }

  const handleSaveEdit = async () => {
    try {
      await editMarque(editMarqueId, editMarqueName)
      setEditMarqueId(null)
      setEditMarqueName('')
    } catch (error) {
      console.error('Error saving edited marque:', error)
    }
  }

  return (
    <div className="bg-light min-vh-88 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Marque</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre Marque</p>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        placeholder="Marque"
                        autoComplete="off"
                        value={newMarqueName}
                        onChange={(e) => setNewMarqueName(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={addMarque}
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
                    <th>Nom de la Marque</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {marques.map((marque) => (
                    <tr key={marque.id}>
                      <td>{marque.marqueName}</td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={() => handleEditMarque(marque.id, marque.marqueName)}
                        >
                          Modifier
                        </CButton>
                      </td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#e55353' }}
                          className="mr-2"
                          onClick={() => deleteMarque(marque.id)}
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
        isOpen={editMarqueId !== null}
        onRequestClose={() => setEditMarqueId(null)}
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
          <h2 style={{ marginBottom: '20px' }}>Modifier le nom de la marque</h2>
          <input
            type="text"
            placeholder="Nouveau nom de marque"
            value={editMarqueName}
            onChange={(e) => setEditMarqueName(e.target.value)}
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
            onClick={() => setEditMarqueId(null)}
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
  )
}

export default MarqueCrud
