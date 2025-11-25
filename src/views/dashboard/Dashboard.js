import React, { useMemo, useState, useEffect } from 'react'
import {
  CAvatar, CCard, CCardBody, CCardHeader, CCol, CRow, CProgress,
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
  CFormInput, CFormSelect
} from '@coreui/react'

import { supabase } from 'src/lib/supabase'
import MainChart from './MainChart'
import './dashboard.scss'

const Dashboard = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [filterPresensi, setFilterPresensi] = useState('all')

  // Fetch students from Supabase
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    supabase
      .from('students')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (!isMounted) return
        if (error) {
          setError(error.message)
          setStudents([])
        } else {
          setStudents(data || [])
        }
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err.message)
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })

    // cleanup
    return () => {
      isMounted = false
    }
  }, [])

  const totalSiswa = students.length
  const rataKehadiran = totalSiswa
    ? Math.round(students.reduce((sum, s) => sum + (s.kehadiran || 0), 0) / totalSiswa)
    : 0
  const siswaTerbaik = students.length ? students.reduce((a, b) => (a.kehadiran > b.kehadiran ? a : b)) : { name: '-' }
  const siswaTerendah = students.length ? students.reduce((a, b) => (a.kehadiran < b.kehadiran ? a : b)) : { name: '-' }

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = s.name?.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        filterPresensi === 'all' ? true : filterPresensi === 'hadir' ? (s.kehadiran || 0) > 0 : (s.kehadiran || 0) === 0
      return matchSearch && matchFilter
    })
  }, [students, search, filterPresensi])

  // Optional: function to update kehadiran (example)
  const updateKehadiran = async (id, newValue) => {
    const { data, error } = await supabase.from('students').update({ kehadiran: newValue }).eq('id', id)
    if (error) return setError(error.message)
    // Update local state
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, kehadiran: newValue } : s)))
  }

  return (
    <>
      <CRow className="mb-4 dashboard-widgets">
        <CCol sm={6} lg={3}>
          <div className="stat-card purple">
            <div className="stat-value">{totalSiswa}</div>
            <div className="stat-title">Total Siswa</div>
          </div>
        </CCol>

        <CCol sm={6} lg={3}>
          <div className="stat-card green">
            <div className="stat-value">{rataKehadiran}%</div>
            <div className="stat-title">Rata-rata Kehadiran</div>
          </div>
        </CCol>

        <CCol sm={6} lg={3}>
          <div className="stat-card blue">
            <div className="stat-value">{siswaTerbaik.name}</div>
            <div className="stat-title">Siswa Terajin</div>
          </div>
        </CCol>

        <CCol sm={6} lg={3}>
          <div className="stat-card red">
            <div className="stat-value">{siswaTerendah.name}</div>
            <div className="stat-title">Kehadiran Terendah</div>
          </div>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Grafik Kehadiran Siswa</strong>
        </CCardHeader>
        <CCardBody>
          <MainChart data={students} />
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Dashboard Anomali Kelas D4 IT C</strong>

          <div className="d-flex gap-2">
            <CFormInput
              placeholder="Cari nama siswa…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '250px' }}
            />

            <CFormSelect
              value={filterPresensi}
              onChange={(e) => setFilterPresensi(e.target.value)}
              style={{ width: '200px' }}
            >
              <option value="all">Semua</option>
              <option value="hadir">Pernah Hadir ( &gt; 0% )</option>
              <option value="absen">Belum Pernah Hadir ( 0% )</option>
            </CFormSelect>
          </div>
        </CCardHeader>

        <CCardBody>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">Error: {error}</div>
          ) : (
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Foto</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Nama Siswa</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Kelas</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Kehadiran</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {filteredStudents.map((item) => {
                  const color = item.kehadiran >= 80 ? 'success' : item.kehadiran >= 60 ? 'warning' : 'danger'
                  return (
                    <CTableRow key={item.id}>
                      <CTableDataCell className="text-center">
                        <CAvatar src={item.avatar_url || '/assets/images/avatars/defaultavatar.jpg'} size="md" />
                      </CTableDataCell>

                      <CTableDataCell>
                        <strong>{item.name}</strong>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">{item.kelas}</CTableDataCell>

                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.kehadiran}%</div>
                        </div>
                        <CProgress thin color={color} value={item.kehadiran} />
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
