import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    const applyThemeStyles = () => {
      if (chartRef.current) {
        setTimeout(() => {
          const chart = chartRef.current

          chart.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent')
          chart.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chart.options.scales.x.ticks.color = getStyle('--cui-body-color')

          chart.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent')
          chart.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chart.options.scales.y.ticks.color = getStyle('--cui-body-color')

          chart.options.plugins.legend.labels.color = getStyle('--cui-body-color')
          chart.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', applyThemeStyles)
    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', applyThemeStyles)
    }
  }, [])

  // DATA DUMMY
  const attendanceTrend = [85, 88, 82, 90, 87, 92, 89]

  return (
    <div
      className="chart-card"
      style={{
        padding: '20px',
        borderRadius: '18px',
        background: getStyle('--cui-body-bg'),
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <h5
        style={{
          marginBottom: '10px',
          fontWeight: '600',
          color: getStyle('--cui-body-color'),
        }}
      >
        Rata-rata Kehadiran Siswa
      </h5>

      <CChartLine
        ref={chartRef}
        style={{ height: '300px' }}
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Kehadiran (%)',
              backgroundColor: `rgba(${getStyle('--cui-success-rgb')}, .12)`,
              borderColor: getStyle('--cui-success'),
              borderWidth: 3,
              data: attendanceTrend,
              fill: true,
              tension: 0.45,
              pointRadius: 4,
              pointHoverRadius: 7,
              pointBackgroundColor: getStyle('--cui-success'),
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                font: { size: 12 },
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
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
        }}
      />
    </div>
  )
}

export default MainChart
