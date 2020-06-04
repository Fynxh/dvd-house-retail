import React from "react"

// components
const Dashboard = React.lazy(() => import('../components/dashboard'))
const stafKeuanganPage = React.lazy(() => import('../components/stafPages/stafKeuangan/stafKeuanganPage'))
const uploadLaporanPage = React.lazy(() => import('../components/stafPages/uploadLaporanPage'))

// routes
const routes = [
    {path: '/', exact: true, nama: 'Home'},
    {path: '/dashboard', exact: true, nama: 'Dashboard', component: Dashboard},
    {path: '/keuangan', exact: true, nama: 'Keuangan', component: stafKeuanganPage},
    {path: '/upload', exact: true, nama: 'Upload Laporan', component: uploadLaporanPage}
]

export default routes