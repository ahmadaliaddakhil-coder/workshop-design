import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>

      <CDropdownMenu
        className="pt-0 shadow-sm"
        placement="bottom-end"
        style={{ minWidth: 240 }}
      >
        {/* User Profile Section (NO WHITE BG) */}
        <div className="d-flex align-items-center gap-2 p-3 bg-transparent">
          <CAvatar src={avatar8} size="md" />
          <div className="d-flex flex-column">
            <strong>Ahmad Ali</strong>
            <small className="text-muted">Student & Developer</small>
          </div>
        </div>

        <CDropdownHeader className="fw-semibold text-secondary mt-2">
          Dashboard
        </CDropdownHeader>

        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Notifications
          <CBadge color="primary" size="sm" className="ms-auto">
            3
          </CBadge>
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" size="sm" className="ms-auto">
            5
          </CBadge>
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" size="sm" className="ms-auto">
            4
          </CBadge>
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
        </CDropdownItem>

        <CDropdownHeader className="fw-semibold text-secondary mt-2">
          Settings
        </CDropdownHeader>

        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Preferences
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
        </CDropdownItem>

        <CDropdownDivider />

        <CDropdownItem href="#" className="text-danger">
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
