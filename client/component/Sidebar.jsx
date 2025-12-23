"use client"

import { useState } from "react"
import { LayoutDashboard, Users, Calendar, User, LogOut, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Sidebar({ onLogout }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Connections", icon: Users, href: "/connections" },
    { label: "Events", icon: Calendar, href: "/events" },
    { label: "Profile", icon: User, href: "/profile" },
  ]

  const handleNavClick = (href) => {
    router.push(href)
    setIsOpen(false)
  }

  const handleLogout = () => {
    onLogout?.()
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 w-64 shadow-lg flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo/Brand */}
        <div className="px-6 py-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              KK
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Kampus</h1>
              <p className="text-xs text-green-600 font-medium">Konnect</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:text-green-700 hover:bg-green-50 text-left group"
              >
                <Icon className="w-5 h-5 flex-shrink-0 group-hover:text-green-600 transition-colors duration-200" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Signout Button - Sticky at Bottom */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Spacer for lg screens */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  )
}
