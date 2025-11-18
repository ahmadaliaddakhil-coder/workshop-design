import React, { useMemo, useState } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

import defaultAvatar from 'src/assets/images/avatars/defaultavatar.jpg'
import MainChart from './MainChart'
import './dashboard.scss'

const studentsData = [
  { avatar: defaultAvatar, name: 'Reza Ali Muhammad', kelas: 'D4 IT C', kehadiran: 92 },
  { avatar: defaultAvatar, name: 'Unggul Eko Prastyo', kelas: 'D4 IT C', kehadiran: 81 },
  { avatar: defaultAvatar, name: 'Moch Djauharil Ilmi', kelas: 'D4 IT C', kehadiran: 74 },
  { avatar: defaultAvatar, name: 'Husni Muszdalifah', kelas: 'D4 IT C', kehadiran: 64 },
  { avatar: defaultAvatar, name: 'Mustofa Barakbah', kelas: 'D4 IT C', kehadiran: 59 },
  { avatar: defaultAvatar, name: 'Muhammad Baihaqi Hakim', kelas: 'D4 IT C', kehadiran: 48 },
  { avatar: defaultAvatar, name: 'Ahmad Lu`ay Gufrol Masawi', kelas: 'D4 IT C', kehadiran: 67 },
  { avatar: defaultAvatar, name: 'Zinedine Zaine Arthurio Yusuf Pratama', kelas: 'D4 IT C', kehadiran: 12 },
  { avatar: defaultAvatar, name: 'Luthfi Bahrur Rozaq', kelas: 'D4 IT C', kehadiran: 30 },
  { avatar: defaultAvatar, name: 'Aisyah Mahadma Shaquilla Brahmasari Putri', kelas: 'D4 IT C', kehadiran: 55 },
  { avatar: defaultAvatar, name: 'Muhammad Alfan Alauddin', kelas: 'D4 IT C', kehadiran: 44 },
  { avatar: defaultAvatar, name: 'Izzal Maula Al Faqiih', kelas: 'D4 IT C', kehadiran: 39 },
  { avatar: defaultAvatar, name: 'Ayfaa Hafni Khansasy', kelas: 'D4 IT C', kehadiran: 62 },
  { avatar: defaultAvatar, name: 'Ganis Ahmad Darpita', kelas: 'D4 IT C', kehadiran: 70 },
  { avatar: defaultAvatar, name: 'Lulu`atul Mahfudoh', kelas: 'D4 IT C', kehadiran: 46 },
  { avatar: defaultAvatar, name: 'Khairullah Muyassir Sudarwin', kelas: 'D4 IT C', kehadiran: 18 },
  { avatar: defaultAvatar, name: 'Muhammad Ravi Ghazaly Rahman', kelas: 'D4 IT C', kehadiran: 53 },
  { avatar: defaultAvatar, name: 'Arinnisa` Mahdiyyah', kelas: 'D4 IT C', kehadiran: 32 },
  { avatar: defaultAvatar, name: 'Ragil Rohmat Dinata', kelas: 'D4 IT C', kehadiran: 41 },
  { avatar: defaultAvatar, name: 'Ahmad Ali Addakhil', kelas: 'D4 IT C', kehadiran: 100 }, 
  { avatar: defaultAvatar, name: 'Irtadho Zainul Falah', kelas: 'D4 IT C', kehadiran: 15 },
  { avatar: defaultAvatar, name: 'Aslam Aji Prasetyo', kelas: 'D4 IT C', kehadiran: 65 },
  { avatar: defaultAvatar, name: 'Erlandio Bahy Atmajaya', kelas: 'D4 IT C', kehadiran: 28 },
  { avatar: defaultAvatar, name: 'Muhammad Irfan As Sidiq', kelas: 'D4 IT C', kehadiran: 36 },
  { avatar: defaultAvatar, name: 'Rheza Zulfan Hendrawan', kelas: 'D4 IT C', kehadiran: 74 },
  { avatar: defaultAvatar, name: 'Athallah Keisha Ancana Hendra Jaya', kelas: 'D4 IT C', kehadiran: 20 },
  { avatar: defaultAvatar, name: 'Prinsa Daffa Nanda Arifin', kelas: 'D4 IT C', kehadiran: 82 },
  { avatar: defaultAvatar, name: 'Moses Evan Hartono', kelas: 'D4 IT C', kehadiran: 47 },
]


const Dashboard = () => {
  const [search, setSearch] = useState('')
  const [filterPresensi, setFilterPresensi] = useState('all')

  const totalSiswa = studentsData.length
  const rataKehadiran = Math.round(
    studentsData.reduce((sum, s) => sum + s.kehadiran, 0) / totalSiswa,
  )
  const siswaTerbaik = studentsData.reduce((a, b) => (a.kehadiran > b.kehadiran ? a : b))
  const siswaTerendah = studentsData.reduce((a, b) => (a.kehadiran < b.kehadiran ? a : b))

  const filteredStudents = useMemo(() => {
    return studentsData.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())

      const matchFilter =
        filterPresensi === 'all'
          ? true
          : filterPresensi === 'hadir'
          ? s.kehadiran > 0
          : s.kehadiran === 0

      return matchSearch && matchFilter
    })
  }, [search, filterPresensi])

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
          <MainChart />
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
              {filteredStudents.map((item, index) => {
                const color =
                  item.kehadiran >= 80 ? 'success' : item.kehadiran >= 60 ? 'warning' : 'danger'

                return (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar src={item.avatar} size="md" />
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
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
