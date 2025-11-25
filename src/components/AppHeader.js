import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          'shadow-sm',
          document.documentElement.scrollTop > 0,
        )
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-3 p-0 bg-body" ref={headerRef}>
      <CContainer
        className="px-4 py-2 border-bottom"
        style={{ borderColor: 'var(--cui-border-color-translucent)' }}
        fluid
      >
        {/* Toggler */}
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          className="me-4 text-body"
          style={{ marginInlineStart: '-8px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/* Navigation */}
        <CHeaderNav className="d-none d-md-flex gap-2">
          <CNavItem>
            <CNavLink as={NavLink} to="/dashboard">
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>

        {/* Right Icons */}
        <CHeaderNav className="ms-auto d-flex align-items-center gap-2">

          {/* Notifications */}
          <CNavItem>
            <CNavLink href="#" className="position-relative icon-hover">
              <CIcon icon={cilBell} size="lg" />
              <CBadge
                color="danger"
                size="sm"
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
              >
                3
              </CBadge>
            </CNavLink>
          </CNavItem>

          {/* Task */}
          <CNavItem>
            <CNavLink href="#" className="icon-hover">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>

          {/* Messages */}
          <CNavItem>
            <CNavLink href="#" className="icon-hover">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>

          {/* Divider */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-50"></div>
          </li>

          {/* Color Mode Switch */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false} className="icon-hover">
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu className="py-1">
              <CDropdownItem
                active={colorMode === 'light'}
                as="button"
                className="d-flex align-items-center gap-2"
                onClick={() => setColorMode('light')}
              >
                <CIcon icon={cilSun} size="lg" />
                Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                as="button"
                className="d-flex align-items-center gap-2"
                onClick={() => setColorMode('dark')}
              >
                <CIcon icon={cilMoon} size="lg" />
                Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                as="button"
                className="d-flex align-items-center gap-2"
                onClick={() => setColorMode('auto')}
              >
                <CIcon icon={cilContrast} size="lg" />
                Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          {/* Divider */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-50"></div>
          </li>

          {/* Profile Dropdown */}
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      {/* Breadcrumb */}
      <CContainer className="px-4 py-2" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
