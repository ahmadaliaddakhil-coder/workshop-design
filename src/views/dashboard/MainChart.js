import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    const handleColorScheme = () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')

          chartRef.current.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')

          chartRef.current.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorScheme)
    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorScheme)
    }
  }, [])

  // ---- DATA GRAFIK ----
  // Ini data rata-rata kehadiran kelas per bulan (dummy)
  const attendanceTrend = [85, 88, 82, 90, 87, 92, 89]

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Rata-rata Kehadiran (%)',
              backgroundColor: `rgba(${getStyle('--cui-success-rgb')}, .1)`,
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: attendanceTrend,
              fill: true,
              tension: 0.4,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
                stepSize: 20,
              },
            },
          },
          elements: {
            point: {
              radius: 3,
              hitRadius: 10,
              hoverRadius: 6,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
