import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter
      className="px-4 py-2 bg-body border-top"
      style={{ borderColor: 'var(--cui-border-color-translucent)' }}
    >
      {/* Left content */}
      <div className="d-flex align-items-center gap-1 fw-semibold">
        <span>© 2025</span>
        <span>ITCore</span>
      </div>

      {/* Right content */}
      <div className="ms-auto text-end">
        <small className="text-body-secondary">
          Developed by{' '}
          <a
            href="https://coreui.io/react"
            target="_blank"
            rel="noopener noreferrer"
            className="fw-medium footer-link"
          >
            MANUSIA
          </a>
        </small>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
