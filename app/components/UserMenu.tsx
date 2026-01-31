'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { signOut } from '../lib/auth'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  if (!email) return null

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="text-gray-400">{email}</span>

      <button
  onClick={async () => {
    await signOut()
    router.push('/login')
  }}
  className="text-red-400 hover:text-red-500"
>
  Logout
</button>

    </div>  
  )
}
