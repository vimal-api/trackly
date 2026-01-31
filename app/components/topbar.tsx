'use client'

import UserMenu from './UserMenu'

export default function Topbar() {
  return (
    <div className="flex justify-end mb-6">
      <UserMenu />
    </div>
  )
}
