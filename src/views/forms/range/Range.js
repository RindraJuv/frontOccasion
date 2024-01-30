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

const ModelCrud = () => {
  const [models, setModels] = useState([])
  const [newModelName, setNewModelName] = useState('')
  const [editModelId, setEditModelId] = useState(null)
  const [editModelName, setEditModelName] = useState('')

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const response = await axios.get('https://occasion1-production.up.railway.app/models')
      setModels(response.data)
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const addModel = async () => {
    try {
      await axios.post('https://occasion1-production.up.railway.app/models', {
        modelName: newModelName,
      })
      setNewModelName('')
      fetchModels()
    } catch (error) {
      console.error('Error adding model:', error)
    }
  }

  const deleteModel = async (id) => {
    try {
      await axios.delete('https://occasion1-production.up.railway.app/models/${id}')
      fetchModels()
    } catch (error) {
      console.error('Error deleting model:', error)
    }
  }

  const editModel = async (id, newName) => {
    try {
      await axios.put('https://occasion1-production.up.railway.app/models/${id}', {
        modelName: newName,
      })
      fetchModels()
    } catch (error) {
      console.error('Error editing model:', error)
    }
  }

  const handleEditModel = async (id, currentName) => {
    setEditModelId(id)
    setEditModelName(currentName)
  }

  const handleSaveEdit = async () => {
    try {
      await axios.put('https://occasion1-production.up.railway.app/models/${editModelId}', {
        modelName: editModelName,
      })
      fetchModels()
      setEditModelId(null)
      setEditModelName('')
    } catch (error) {
      console.error('Error editing model:', error)
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
                    <h1>Modèle</h1>
                    <p className="text-medium-emphasis">Veuillez ajouter votre modèle</p>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        placeholder="Modèle"
                        autoComplete="username"
                        value={newModelName}
                        onChange={(e) => setNewModelName(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={addModel}
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
                    <th>Nom du Modèle</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id}>
                      <td>{model.modelName}</td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#3c4b64' }}
                          className="mr-2"
                          onClick={() => handleEditModel(model.id, model.modelName)}
                        >
                          Modifier
                        </CButton>
                      </td>
                      <td>
                        <CButton
                          style={{ backgroundColor: '#e55353' }}
                          className="mr-2"
                          onClick={() => deleteModel(model.id)}
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
        isOpen={editModelId !== null}
        onRequestClose={() => setEditModelId(null)}
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
          <h2 style={{ marginBottom: '20px' }}>Modifier le nom du modèle</h2>
          <input
            type="text"
            placeholder="Nouveau nom du modèle"
            value={editModelName}
            onChange={(e) => setEditModelName(e.target.value)}
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
            onClick={() => setEditModelId(null)}
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

export default ModelCrud
