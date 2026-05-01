import { useEffect, useRef, useState } from 'react'
import Addleads from './Addleads'

const LEAD_ACTIVITY_KEY = 'mp-const-lead-activities'
const LEAD_VIEW_KEY = 'mp-const-about-view'
const LEAD_SELECTED_KEY = 'mp-const-about-selected-lead'

function getInitialLeadView() {
  const savedView = window.sessionStorage.getItem(LEAD_VIEW_KEY)
  if (
    savedView === 'lead-activities' ||
    savedView === 'customer-detail' ||
    savedView === 'emails' ||
    savedView === 'sms' ||
    savedView === 'update-document'
  ) {
    return savedView
  }
  return 'dashboard'
}

function getInitialSelectedLeadId() {
  const raw = window.sessionStorage.getItem(LEAD_SELECTED_KEY)
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isNaN(parsed) ? null : parsed
}

function DropdownChevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 transition-transform duration-200 group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 4h8l4 4v12H8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4v4h4M11 13h6M11 17h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LabelIcon({ type, className = 'size-4' }) {
  const common = { 'aria-hidden': 'true', viewBox: '0 0 24 24', className, fill: 'none', stroke: 'currentColor', strokeWidth: '2' }
  if (type === 'dashboard') {
    return (
      <svg {...common}>
        <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'activity') {
    return (
      <svg {...common}>
        <path d="M4 12h4l2-5 4 10 2-5h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'form') {
    return (
      <svg {...common}>
        <path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'more') {
    return (
      <svg {...common}>
        <circle cx="6" cy="12" r="1.7" />
        <circle cx="12" cy="12" r="1.7" />
        <circle cx="18" cy="12" r="1.7" />
      </svg>
    )
  }
  if (type === 'welcome') {
    return (
      <svg {...common}>
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'password') {
    return (
      <svg {...common}>
        <path d="M6 11V8a6 6 0 1 1 12 0v3M5 11h14v10H5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15v3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'logout') {
    return (
      <svg {...common}>
        <path d="M10 5H6v14h4M14 8l5 4-5 4M19 12h-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'email') {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m4 8 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'sms') {
    return (
      <svg {...common}>
        <path d="M4 5h16v11H8l-4 3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'docs') {
    return (
      <svg {...common}>
        <path d="M7 3h7l5 5v13H7zM14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'collaterals') {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return null
}



const documentTypes = ['PAN Card', 'Aadhaar Card', 'Passport', 'Driving License']

const validDocuments = {
  'PAN Card': ['PAN Card Scanned Copy'],
  'Aadhaar Card': ['Aadhaar Front & Back Copy'],
  Passport: ['Passport Front Page Copy'],
  'Driving License': ['Driving License Scanned Copy'],
}

function About({ currentUser, onBackToLogin, onOpenCustdetails, onOpenAddress }) {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [leadActivities, setLeadActivities] = useState([])
  const [leadsLoaded, setLeadsLoaded] = useState(false)
  const [activeView, setActiveView] = useState(getInitialLeadView)
  const [openActionMenuId, setOpenActionMenuId] = useState(null)
  const [selectedLeadId, setSelectedLeadId] = useState(getInitialSelectedLeadId)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [customerHeaderMenuOpen, setCustomerHeaderMenuOpen] = useState(false)
  const [customerDetailTab, setCustomerDetailTab] = useState('show')
  const [followUpActionMenuId, setFollowUpActionMenuId] = useState(null)
  const [isFollowUpDrawerOpen, setIsFollowUpDrawerOpen] = useState(false)
  const [editingFollowUpId, setEditingFollowUpId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [topMenuOpen, setTopMenuOpen] = useState(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [selectedDocumentType, setSelectedDocumentType] = useState(documentTypes[0])
  const [uploadedDocuments, setUploadedDocuments] = useState({})
  const documentInputRef = useRef(null)
  const [selectedEmailId, setSelectedEmailId] = useState(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    reraNumber: '',
    timeZone: 'Asia/Kolkata',
  })
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [followUpForm, setFollowUpForm] = useState({
    subject: '',
    description: '',
    reminderBefore: '15 mins',
    scheduledOn: '',
    status: 'Pending',
  })
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteText, setNewNoteText] = useState('')
  const [emailLogs, setEmailLogs] = useState([])

  const selectedLead = leadActivities.find((lead) => lead.id === selectedLeadId) || null
  const validForSelectedDocument = validDocuments[selectedDocumentType] || []
  const welcomeName = currentUser?.name?.trim() || currentUser?.email?.trim() || 'Test Company'
  const welcomeEmail = currentUser?.email?.trim() || ''

  const SEEDED_LEADS = []

  useEffect(() => {
    const savedLeads = window.localStorage.getItem(LEAD_ACTIVITY_KEY)
    if (savedLeads) {
      const parsed = JSON.parse(savedLeads)
      // Filter out any old seeded leads and keep only real user data
      const filtered = parsed.filter((l) => typeof l.id === 'string' && !l.id.startsWith('seed-'))

      setLeadActivities(filtered)
      if (filtered.length !== parsed.length) {
        window.localStorage.setItem(LEAD_ACTIVITY_KEY, JSON.stringify(filtered))
      }
    } else {
      setLeadActivities([])
    }

    // Also clear email logs if they exist as seeded data
    const savedEmails = window.localStorage.getItem('mp-email-logs')
    if (savedEmails) {
      try {
        const parsedEmails = JSON.parse(savedEmails)
        const filteredEmails = parsedEmails.filter((e) => typeof e.id === 'string' && !e.id.startsWith('seed-'))
        if (filteredEmails.length !== parsedEmails.length) {
          setEmailLogs(filteredEmails)
          window.localStorage.setItem('mp-email-logs', JSON.stringify(filteredEmails))
        }
      } catch (e) {
        console.error('Error filtering email logs', e)
      }
    }
    setLeadsLoaded(true)
  }, [])


  useEffect(() => {
    window.sessionStorage.setItem(LEAD_VIEW_KEY, activeView)
  }, [activeView])

  useEffect(() => {
    if (!isProfileModalOpen) return
    setProfileForm({
      name: '',
      email: '',
      phone: '',
      reraNumber: '',
      timeZone: 'Asia/Kolkata',
    })
  }, [isProfileModalOpen])

  useEffect(() => {
    if (selectedLeadId) {
      window.sessionStorage.setItem(LEAD_SELECTED_KEY, String(selectedLeadId))
      return
    }
    window.sessionStorage.removeItem(LEAD_SELECTED_KEY)
  }, [selectedLeadId])

  useEffect(() => {
    if (!leadsLoaded) return
    if (activeView === 'customer-detail' && !selectedLead) {
      setActiveView('lead-activities')
      setSelectedLeadId(null)
    }
  }, [activeView, selectedLead, leadsLoaded])

  useEffect(() => {
    if (!selectedLeadId) return
    const lead = leadActivities.find((item) => item.id === selectedLeadId)
    if (!lead || (lead.followUpItems && lead.followUpItems.length > 0)) return

    const nextLeads = leadActivities.map((item) =>
      item.id === selectedLeadId
        ? {
          ...item,
          followUpItems: [
            {
              id: `${item.id}-init`,
              subject: 'Initial Contact',
              description: 'Lead created and awaiting first follow up.',
              reminderBefore: '15 mins',
              scheduledOn: new Date().toISOString().slice(0, 16),
              status: item.countStatus || 'Pending',
            },
          ],
        }
        : item
    )
    persistLeads(nextLeads)
  }, [selectedLeadId, leadActivities])

  useEffect(() => {
    const savedLogs = window.localStorage.getItem('mp-email-logs')
    if (savedLogs) {
      setEmailLogs(JSON.parse(savedLogs))
    }
  }, [])

  useEffect(() => {
    if (!currentUser?.email && !currentUser?.name) return
    const displayName = currentUser.name?.trim() || currentUser.email?.trim() || 'User'
    showToast(`Welcome ${displayName}. You are signed in.`)
  }, [currentUser])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target instanceof Element && event.target.closest('[data-top-menu-root="true"]')) {
        return
      }
      if (event.target instanceof Element && event.target.closest('[data-dots-menu-root="true"]')) {
        return
      }
      setTopMenuOpen(null)
      setOpenActionMenuId(null)
      setCustomerHeaderMenuOpen(false)
      setFollowUpActionMenuId(null)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [])

  const persistLeads = (nextLeads) => {
    setLeadActivities(nextLeads)
    window.localStorage.setItem(LEAD_ACTIVITY_KEY, JSON.stringify(nextLeads))
  }

  const handleSaveLead = (leadData) => {
    const now = new Date()
    const newLead = {
      id: Date.now(),
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      name: `${leadData.firstName} ${leadData.lastName}`.trim(),
      email: leadData.email,
      phone: `${leadData.countryCode} ${leadData.phone}`.trim(),
      project: leadData.project,
      budget: `INR ${leadData.budget} Lakh`,
      location: leadData.location || '-',
      configuration: leadData.configuration,
      propertyType: leadData.propertyType,
      sellDoLeadId: `SD-${Date.now().toString().slice(-7)}`,
      leadStage: 'Fresh',
      leadStatus: 'Already Exists',
      countStatus: 'Pending',
      followUps: 0,
      registeredAt: now.toLocaleDateString(),
      leadValidityPeriod: '30 Days',
      followUpItems: [
        {
          id: `${Date.now()}-init`,
          subject: 'Initial Contact',
          description: 'Lead created and awaiting first follow up.',
          reminderBefore: '15 mins',
          scheduledOn: now.toISOString().slice(0, 16),
          status: 'Pending',
        },
      ],
    }

    persistLeads([newLead, ...leadActivities])
    setIsAddLeadOpen(false)
    showToast('Lead saved successfully.')
  }

  const handleAddFollow = (leadId) => {
    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== leadId) {
        return lead
      }

      const nextCount = (lead.followUps || 0) + 1
      return {
        ...lead,
        followUps: nextCount,
        countStatus: `${nextCount} Follow-up`,
        leadStage: 'Follow-up',
      }
    })

    persistLeads(nextLeads)
    setOpenActionMenuId(null)
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 2200)
  }

  const handleFollowUpClick = (followUpId) => {
    let leadEmail = ''
    let followUpSubject = ''

    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      leadEmail = lead.email
      const nextItems = (lead.followUpItems || []).map((item) => {
        if (item.id === followUpId) {
          followUpSubject = item.subject
          return { ...item, status: 'Followed Up' }
        }
        return item
      })
      return { ...lead, followUpItems: nextItems, countStatus: 'Followed Up' }
    })
    persistLeads(nextLeads)
    setFollowUpActionMenuId(null)
    showToast('Follow up updated.')

    // Add to email logs
    const newEmail = {
      id: Date.now(),
      to: leadEmail || 'customer@example.com',
      subject: `Follow-up: ${followUpSubject || 'Status Update'}`,
      status: 'Delivered',
      sentOn: new Date().toISOString()
    }
    const updatedEmails = [newEmail, ...emailLogs]
    setEmailLogs(updatedEmails)
    window.localStorage.setItem('mp-email-logs', JSON.stringify(updatedEmails))
  }

  const handleOpenUpdateFollowUp = (item) => {
    setEditingFollowUpId(item.id)
    setFollowUpForm({
      subject: item.subject || '',
      description: item.description || '',
      reminderBefore: item.reminderBefore || '15 mins',
      scheduledOn: item.scheduledOn || '',
      status: item.status || 'Pending',
    })
    setFollowUpActionMenuId(null)
    setIsFollowUpDrawerOpen(true)
  }

  const handleFollowUpFormChange = (e) => {
    const { name, value } = e.target
    setFollowUpForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveFollowUpStatus = (e) => {
    e.preventDefault()
    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      const nextItems = (lead.followUpItems || []).map((item) =>
        item.id === editingFollowUpId ? { ...item, ...followUpForm } : item
      )
      return { ...lead, followUpItems: nextItems, countStatus: followUpForm.status }
    })
    persistLeads(nextLeads)
    setIsFollowUpDrawerOpen(false)
    setEditingFollowUpId(null)
    showToast('Follow up status saved successfully.')
  }

  const handleOpenAddFollowUpTab = () => {
    setFollowUpForm({
      subject: '',
      description: '',
      reminderBefore: '15 mins',
      scheduledOn: new Date().toISOString().slice(0, 16),
      status: 'Pending',
    })
    setCustomerDetailTab('add-follow-up')
    setCustomerHeaderMenuOpen(false)
  }

  const handleCreateFollowUp = (e) => {
    e.preventDefault()
    const nextItem = {
      id: `${Date.now()}-manual`,
      subject: followUpForm.subject,
      description: followUpForm.description,
      reminderBefore: followUpForm.reminderBefore,
      scheduledOn: followUpForm.scheduledOn,
      status: followUpForm.status,
    }

    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      return {
        ...lead,
        followUpItems: [...(lead.followUpItems || []), nextItem],
        countStatus: followUpForm.status,
      }
    })

    persistLeads(nextLeads)
    setCustomerDetailTab('show')
    showToast('Follow up added successfully.')
  }

  const handleSaveNote = () => {
    if (!newNoteText.trim()) return

    const nextNote = {
      id: `${Date.now()}-note`,
      text: newNoteText.trim(),
      createdAt: new Date().toISOString()
    }

    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      return {
        ...lead,
        notes: [...(lead.notes || []), nextNote],
      }
    })

    persistLeads(nextLeads)
    setNewNoteText('')
    setIsAddingNote(false)
    showToast('Note added successfully.')
  }

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) {
      return
    }

    setUploadedDocuments((prev) => ({
      ...prev,
      [selectedDocumentType]: [...(prev[selectedDocumentType] ?? []), ...files],
    }))
    e.target.value = ''
  }

  const handleDeleteDocumentType = (documentType) => {
    setUploadedDocuments((prev) => {
      if (!(documentType in prev)) {
        return prev
      }
      const next = { ...prev }
      delete next[documentType]
      return next
    })
  }

  const handleSaveDocuments = () => {
    showToast('Documents saved successfully.')
  }

  const handleProfileFormChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsProfileModalOpen(false)
    showToast('Your profile details are saved.')
  }

  const handleShowEmail = (id) => {
    setSelectedEmailId(id)
    setIsEmailModalOpen(true)
  }

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Passwords do not match.')
      return
    }
    setIsPasswordModalOpen(false)
    setPasswordForm({ newPassword: '', confirmPassword: '' })
    showToast('Password changed successfully.')
  }

  const closeActiveTab = () => {
    setActiveView('dashboard')
    setTopMenuOpen(null)
    setShowFilterMenu(false)
    setOpenActionMenuId(null)
    setCustomerHeaderMenuOpen(false)
    setFollowUpActionMenuId(null)
  }

  const visibleLeads = leadActivities.filter((lead) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'fresh') return lead.leadStage === 'Fresh'
    if (activeFilter === 'follow-up') return lead.leadStage === 'Follow-up'
    if (activeFilter === 'pending') return lead.countStatus === 'Pending'
    return true
  })

  return (
    <div className="page-bg-shell font-manrope">
      <div aria-hidden="true" className="page-bg-orbs">
        <span className="page-bg-orb-left" />
        <span className="page-bg-orb-right" />
        <span className="page-bg-orb-bottom" />
      </div>

      <header className="relative z-[180] border-b border-white/60 bg-white/80 shadow-[0_16px_40px_-34px_#1e293b] backdrop-blur-xl">
        <div className="mx-auto flex h-22 w-full items-center justify-between px-6 md:px-10">
          {/* Old Logo Block */}
          <div className="flex items-center gap-2">
            <div className="font-sora text-3xl font-extrabold tracking-[-0.05em] text-brand-blue">MP</div>
            <div className="leading-none">
              <div className="text-sm font-bold text-brand-blue">Developers</div>
              <div className="text-[10px] tracking-[0.2em] text-brand-orange">TRUST FOREVER</div>
            </div>
          </div>

          {/* Centered Premium Navigation Hub */}
          <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[2.5rem] border border-[#f1f5f9] bg-white/40 p-1.5 shadow-sm backdrop-blur-xl">
            <button
              type="button"
              onClick={() => {
                setActiveView('dashboard')
                setTopMenuOpen(null)
                setOpenActionMenuId(null)
              }}
              className={`group flex items-center gap-2.5 rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                activeView === 'dashboard'
                  ? 'bg-white text-[#253eaf] shadow-[0_12px_30px_rgba(37,62,175,0.12)] ring-1 ring-[#253eaf]/10'
                  : 'text-slate-500 hover:bg-white/80 hover:text-[#0f172a]'
              }`}
            >
              <LabelIcon type="dashboard" className={`size-4 transition-transform group-hover:scale-110 ${activeView === 'dashboard' ? 'text-brand-orange' : ''}`} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveView('lead-activities')
                setTopMenuOpen(null)
                setOpenActionMenuId(null)
              }}
              className={`group flex items-center gap-2.5 rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                activeView === 'lead-activities'
                  ? 'bg-white text-[#253eaf] shadow-[0_12px_30px_rgba(37,62,175,0.12)] ring-1 ring-[#253eaf]/10'
                  : 'text-slate-500 hover:bg-white/80 hover:text-[#0f172a]'
              }`}
            >
              <LabelIcon type="activity" className={`size-4 transition-transform group-hover:scale-110 ${activeView === 'lead-activities' ? 'text-brand-orange' : ''}`} />
              <span>Activities</span>
            </button>

            <div data-top-menu-root="true" className="relative">
              <button
                type="button"
                onClick={() => setTopMenuOpen((prev) => (prev === 'application' ? null : 'application'))}
                className={`group flex items-center gap-2.5 rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                  topMenuOpen === 'application'
                    ? 'bg-white text-[#253eaf] shadow-[0_12px_30px_rgba(37,62,175,0.12)] ring-1 ring-[#253eaf]/10'
                    : 'text-slate-500 hover:bg-white/80 hover:text-[#0f172a]'
                }`}
              >
                <LabelIcon type="form" className={`size-4 transition-transform group-hover:scale-110 ${topMenuOpen === 'application' ? 'text-brand-orange' : ''}`} />
                <span>Forms</span>
                <DropdownChevron />
              </button>
              {topMenuOpen === 'application' && (
                <div className="animate-fall absolute left-1/2 top-full z-[260] mt-4 w-64 -translate-x-1/2 overflow-hidden rounded-[2rem] border border-white bg-white/95 p-2 shadow-[0_30px_70px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#253eaf]/5 to-transparent opacity-50" />
                  <div className="relative space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setTopMenuOpen(null)
                        onOpenCustdetails?.()
                      }}
                      className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 hover:bg-[#0f172a] hover:text-white"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#253eaf] transition-colors group-hover:bg-white/10 group-hover:text-white">
                        <LabelIcon type="welcome" className="size-4" />
                      </div>
                      <div>
                        <div className="text-[12px] font-black">Customer Details</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">Profile Setup</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTopMenuOpen(null)
                        onOpenAddress?.()
                      }}
                      className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 hover:bg-[#0f172a] hover:text-white"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#253eaf] transition-colors group-hover:bg-white/10 group-hover:text-white">
                        <LabelIcon type="docs" className="size-4" />
                      </div>
                      <div>
                        <div className="text-[12px] font-black">Address Info</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">Location Data</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div data-top-menu-root="true" className="relative">
              <button
                type="button"
                onClick={() => setTopMenuOpen((prev) => (prev === 'more' ? null : 'more'))}
                className={`group flex items-center gap-2.5 rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                  activeView === 'emails' || activeView === 'sms' || topMenuOpen === 'more'
                    ? 'bg-white text-[#253eaf] shadow-[0_12px_30px_rgba(37,62,175,0.12)] ring-1 ring-[#253eaf]/10'
                    : 'text-slate-500 hover:bg-white/80 hover:text-[#0f172a]'
                }`}
              >
                <LabelIcon type="more" className={`size-4 transition-transform group-hover:scale-110 ${activeView === 'emails' || activeView === 'sms' || topMenuOpen === 'more' ? 'text-brand-orange' : ''}`} />
                <span>More</span>
                <DropdownChevron />
              </button>
              {topMenuOpen === 'more' && (
                <div className="animate-fall absolute left-1/2 top-full z-[260] mt-4 w-60 -translate-x-1/2 overflow-hidden rounded-[2rem] border border-white bg-white/95 p-2 shadow-[0_30px_70px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#253eaf]/5 to-transparent opacity-50" />
                  <div className="relative space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('emails')
                        setTopMenuOpen(null)
                        setOpenActionMenuId(null)
                      }}
                      className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 hover:bg-[#0f172a] hover:text-white"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#253eaf] transition-colors group-hover:bg-white/10 group-hover:text-white">
                        <LabelIcon type="email" className="size-4" />
                      </div>
                      <div className="text-[12px] font-black">Email Logs</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveView('sms')
                        setTopMenuOpen(null)
                        setOpenActionMenuId(null)
                      }}
                      className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 hover:bg-[#0f172a] hover:text-white"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#253eaf] transition-colors group-hover:bg-white/10 group-hover:text-white">
                        <LabelIcon type="sms" className="size-4" />
                      </div>
                      <div className="text-[12px] font-black">SMS History</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* User Profile - Right */}
          <div data-top-menu-root="true" className="relative shrink-0">
            <button
              type="button"
              onClick={() => setTopMenuOpen((prev) => (prev === 'welcome' ? null : 'welcome'))}
              className={`group flex items-center gap-3 rounded-2xl px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:shadow-[0_12px_25px_rgba(0,0,0,0.08)] active:scale-95 ${
                topMenuOpen === 'welcome' ? 'bg-white text-brand-blue ring-1 ring-brand-blue/20' : 'bg-slate-50 text-slate-600 hover:bg-white'
              }`}
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${topMenuOpen === 'welcome' ? 'bg-brand-blue text-white' : 'bg-slate-200 text-slate-500'}`}>
                <LabelIcon type="welcome" className="size-4" />
              </div>
              <span className="hidden lg:inline">Welcome, {welcomeName}</span>
              <span className="lg:hidden">Account</span>
              <DropdownChevron />
            </button>
            {topMenuOpen === 'welcome' && (
              <div className="animate-fall absolute right-0 top-full z-[260] mt-4 w-72 overflow-hidden rounded-[2.5rem] border border-white bg-white/95 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#253eaf]/5 to-transparent opacity-50" />
                <div className="relative">
                  <div className="mb-4 rounded-3xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="text-sm font-black text-[#0f172a]">{welcomeName}</div>
                    <div className="mt-0.5 text-[10px] font-bold text-slate-500">{welcomeEmail || 'Channel Partner'}</div>
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileModalOpen(true)
                        setTopMenuOpen(null)
                      }}
                      className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-[#0f172a] hover:text-white"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-white/10 group-hover:text-white">
                        <LabelIcon type="welcome" className="size-5" />
                      </div>
                      <div>
                        <div className="text-[12px] font-black">Partner Profile</div>
                        <div className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Management</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPasswordModalOpen(true)
                        setTopMenuOpen(null)
                      }}
                      className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-[#0f172a] hover:text-white"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-white/10 group-hover:text-white">
                        <LabelIcon type="password" className="size-5" />
                      </div>
                      <div>
                        <div className="text-[12px] font-black">Security</div>
                        <div className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Update Password</div>
                      </div>
                    </button>
                    <div className="my-3 h-px bg-slate-100" />
                    <button
                      type="button"
                      onClick={() => {
                        setTopMenuOpen(null)
                        onBackToLogin?.()
                      }}
                      className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-rose-600 hover:text-white"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 group-hover:bg-white/20 group-hover:text-white">
                        <LabelIcon type="logout" className="size-5" />
                      </div>
                      <div className="text-[12px] font-black">Sign Out</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative isolate z-10 mx-auto w-full max-w-[95%] lg:max-w-[1440px] px-6 md:px-10 py-8">
        {activeView === 'dashboard' && (
          <div className="space-y-12 animate-rise pb-10">
            {/* Architectural Hero Experience */}
            <section className="relative overflow-hidden rounded-[3rem] bg-[#0f172a] p-1 shadow-[0_50px_100px_-40px_rgba(15,23,42,0.5)]">
              {/* Dynamic Mesh Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute -left-1/4 -top-1/4 size-[150%] animate-[spin_20s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#3b82f6_25%,#6366f1_50%,#8b5cf6_75%,transparent_100%)] opacity-30 blur-[120px]" />
                <div className="absolute inset-0 bg-slate-950/60" />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-12 px-8 py-16 text-center md:px-16 md:py-24 lg:flex-row lg:text-left">
                <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-sky-400 backdrop-blur-md ring-1 ring-white/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    Partner Dashboard Live
                  </div>
                  
                  <h1 className="font-sora text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white">
                    Experience the<br />
                    <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Future of Real Estate.</span>
                  </h1>
                  
                  <div className="space-y-4">
                    <p className="text-2xl font-bold text-white/90">
                      Welcome back, <span className="text-sky-400">"{welcomeName}"</span>
                    </p>
                    <p className="text-lg font-medium text-slate-400">
                      {welcomeEmail ? `Logged in as: ${welcomeEmail}` : 'Vendor ID: MP-PARTNER-0077'}
                    </p>
                  </div>

                  <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
                    We are building the next generation of architectural excellence. Your partnership is the foundation of this journey. Let's achieve greatness together.
                  </p>
                </div>

                {/* Integrated Action Hub */}
                <div className="grid w-full shrink-0 gap-6 sm:grid-cols-2 lg:w-[460px]">
                  <button
                    onClick={() => setIsAddLeadOpen(true)}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] p-10 text-center transition-all hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-500 text-white shadow-[0_20px_40px_-10px_rgba(14,165,233,0.5)] transition-transform group-hover:scale-110">
                      <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-widest text-white">Add Leads</h3>
                    <p className="mt-2 text-xs font-bold text-slate-500">Submit new inquiries</p>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-sky-500/0 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('lead-activities')
                      setTopMenuOpen(null)
                      setOpenActionMenuId(null)
                    }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] p-10 text-center transition-all hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500 text-white shadow-[0_20px_40px_-10px_rgba(99,102,241,0.5)] transition-transform group-hover:scale-110">
                      <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-widest text-white">Track Activities</h3>
                    <p className="mt-2 text-xs font-bold text-slate-500">Monitor lead progress</p>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>

              {/* Floating Decorative Orbs */}
              <div className="pointer-events-none absolute left-10 top-20 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
              <div className="pointer-events-none absolute right-20 bottom-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
            </section>

            {/* High-Fidelity Collaterals Section */}
            <section className="relative overflow-hidden rounded-[3rem] border border-white bg-white/70 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-10 py-8">
                <div>
                  <h2 className="font-sora flex items-center gap-4 text-3xl font-black text-slate-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                      <LabelIcon type="collaterals" className="size-6" />
                    </div>
                    <span>Marketing Collaterals</span>
                  </h2>
                  <p className="ml-16 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Project Assets & Resources</p>
                </div>
                <button className="group flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-indigo-600 hover:-translate-y-1">
                  <span>View Full Library</span>
                  <svg className="size-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </button>
              </div>

              <div className="p-16">
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <div className="group relative mb-8">
                    <div className="absolute inset-0 animate-ping rounded-full bg-indigo-100 opacity-20" />
                    <div className="relative rounded-full bg-slate-50 p-10 shadow-inner">
                      <svg className="size-16 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-800">Your digital assets are coming soon.</p>
                  <p className="mt-3 max-w-md text-center text-slate-400 font-medium">
                    Our marketing team is curating high-conversion brochures, images, and walkthroughs for your next big deal.
                  </p>
                  <button className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-indigo-500 hover:text-indigo-600 underline-offset-8 hover:underline decoration-2">Get Notified</button>
                </div>
              </div>
              
              {/* Subtle Grain Overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </section>
          </div>
        )}

        {activeView === 'lead-activities' && (
          <section className="animate-rise relative overflow-visible rounded-[2rem] border border-white/50 bg-white/70 shadow-[0_32px_64px_-16px_rgba(31,59,166,0.1)] backdrop-blur-xl">
            {/* Header Area */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/40 px-8 py-6 rounded-t-[2rem]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue shadow-inner">
                  <LabelIcon type="activity" className="size-6" />
                </div>
                <div>
                  <h2 className="font-sora text-xl font-extrabold tracking-tight text-slate-900">Lead Activities</h2>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Transaction Monitoring Portal</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-1.5 rounded-full bg-slate-100/80 px-4 py-2 md:flex">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">View:</span>
                  <span className="text-sm font-extrabold text-brand-blue">{activeFilter === 'all' ? 'All Leads' : activeFilter}</span>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-1.5 border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowFilterMenu((prev) => !prev)}
                    className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${showFilterMenu ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-600 hover:bg-white'}`}
                  >
                    <FilterIcon className="size-4" />
                    <span>Filter</span>
                    <DropdownChevron className={`transition-transform duration-300 ${showFilterMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <div className="h-6 w-px bg-slate-200 mx-1"></div>

                  <button
                    type="button"
                    onClick={closeActiveTab}
                    className="group grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-400 shadow-sm transition-all hover:bg-rose-50 hover:text-rose-600"
                  >
                    <svg className="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {showFilterMenu && (
                  <div className="animate-fall absolute right-8 top-[5.5rem] z-50 w-56 overflow-hidden rounded-2xl border border-white bg-white/90 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                    <div className="mb-1 px-3 py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Filter By Status</span>
                    </div>
                    {[
                      { id: 'all', label: 'All Leads', icon: 'M4 6h16M4 12h16M4 18h16' },
                      { id: 'fresh', label: 'Fresh Leads', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { id: 'follow-up', label: 'Follow-up', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                      { id: 'pending', label: 'Pending', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveFilter(item.id)
                          setShowFilterMenu(false)
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${activeFilter === item.id ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Table Area */}
            <div className="p-4 md:p-8">
              <div className="rounded-3xl border border-slate-100 bg-white/40 shadow-inner overflow-visible">
                <div className="custom-scrollbar overflow-visible">
                  <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <th className="px-6 py-5 align-middle">Name & Contact</th>
                        <th className="px-4 py-5 align-middle">Lead ID</th>
                        <th className="px-4 py-5 align-middle">Project</th>
                        <th className="px-4 py-5 align-middle">Stage</th>
                        <th className="px-4 py-5 align-middle">Status</th>
                        <th className="px-4 py-5 align-middle">Timeline</th>
                        <th className="px-4 py-5 align-middle">Validity</th>
                        <th className="px-6 py-5 text-center align-middle">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {visibleLeads.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-6 py-20 text-center">
                            <div className="mx-auto flex max-w-xs flex-col items-center">
                              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
                                <LabelIcon type="activity" className="size-8" />
                              </div>
                              <h3 className="font-sora text-base font-bold text-slate-800">No activities found</h3>
                              <p className="mt-1 text-sm text-slate-400">Get started by adding your first lead to the system.</p>
                              <button
                                onClick={() => setIsAddLeadOpen(true)}
                                className="mt-6 rounded-xl bg-brand-blue px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-blue/90 hover:scale-105 active:scale-95 shadow-lg shadow-brand-blue/20"
                              >
                                + Add Lead Now
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        visibleLeads.map((lead) => (
                          <tr key={lead.id} className="group transition-all hover:bg-white/60">
                            <td className="px-6 py-5 align-middle">
                              <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 text-brand-blue font-sora font-bold">
                                  {lead.name.charAt(0)}
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                  <p className="font-sora text-[15px] font-bold text-slate-900 truncate">{lead.name}</p>
                                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                    <span className="truncate">{lead.email}</span>
                                    <span className="h-1 w-1 shrink-0 rounded-full bg-slate-200"></span>
                                    <span className="whitespace-nowrap">{lead.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-600">
                                #{lead.sellDoLeadId}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <span className="font-bold text-slate-700">{lead.project}</span>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-600 ring-1 ring-inset ring-indigo-200/50">
                                <span className="h-1 w-1 rounded-full bg-indigo-500"></span>
                                {lead.leadStage}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <span className={`inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold ${lead.leadStatus.toLowerCase().includes('fresh')
                                ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50'
                                : 'bg-amber-50 text-amber-600 ring-1 ring-amber-200/50'
                                }`}>
                                {lead.leadStatus}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <div className="space-y-0.5">
                                <p className="text-[13px] font-bold text-slate-700">{lead.registeredAt}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Registered</p>
                              </div>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse"></div>
                                <span className="text-[13px] font-bold text-slate-600">{lead.leadValidityPeriod}</span>
                              </div>
                            </td>
                            <td data-dots-menu-root="true" className="relative px-6 py-5 text-center align-middle">
                              <button
                                type="button"
                                onClick={() => setOpenActionMenuId(openActionMenuId === lead.id ? null : lead.id)}
                                className={`inline-grid size-10 place-items-center rounded-xl transition-all ${openActionMenuId === lead.id ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
                              >
                                <DotsIcon className="size-5" />
                              </button>

                              {openActionMenuId === lead.id && (
                                <div className="animate-fall absolute right-0 top-full z-[100] mt-2 w-[240px] overflow-hidden rounded-[1.5rem] border border-white bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedLeadId(lead.id)
                                      setActiveView('customer-detail')
                                      setCustomerDetailTab('show')
                                      setCustomerHeaderMenuOpen(false)
                                      setOpenActionMenuId(null)
                                    }}
                                    className="group flex w-full items-center gap-3 rounded-[1rem] p-2 text-left transition-all hover:bg-slate-50"
                                  >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/80 text-blue-600 transition-colors group-hover:bg-blue-100">
                                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <div className="text-[14px] font-bold text-slate-900">Show Details</div>
                                      <div className="text-[11px] font-medium text-slate-500">View full activity logs</div>
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAddFollow(lead.id)}
                                    className="group mt-1 flex w-full items-center gap-3 rounded-[1rem] p-2 text-left transition-all hover:bg-slate-50"
                                  >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#f08028] transition-colors group-hover:bg-orange-100">
                                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                      </svg>
                                    </div>
                                    <div>
                                      <div className="text-[14px] font-bold text-slate-900">Add Follow</div>
                                      <div className="text-[11px] font-medium text-slate-500">Update stage & status</div>
                                    </div>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Stat Bar */}
              <div className="mt-8 flex items-center justify-between px-4">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Viewing</span>
                    <span className="text-sm font-extrabold text-slate-700">{visibleLeads.length} of {visibleLeads.length} Leads</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Last Sync</span>
                    <span className="text-sm font-extrabold text-slate-700">Just now</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:bg-slate-50 disabled:opacity-30" disabled>
                    <svg className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-blue shadow-sm transition-all hover:bg-slate-50">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === 'emails' && (
          <section className="animate-rise relative overflow-visible rounded-[2rem] border border-white/50 bg-white/70 shadow-[0_32px_64px_-16px_rgba(31,59,166,0.1)] backdrop-blur-xl">
            {/* Header Area */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/40 px-8 py-6 rounded-t-[2rem]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/5 text-brand-blue shadow-inner">
                  <LabelIcon type="email" className="size-6" />
                </div>
                <div>
                  <h2 className="font-sora text-xl font-extrabold tracking-tight text-slate-900">Email Logs</h2>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Communication History</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-1.5 border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowFilterMenu((prev) => !prev)}
                    className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${showFilterMenu ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-600 hover:bg-white'}`}
                  >
                    <FilterIcon className="size-4" />
                    <span>Filter</span>
                  </button>

                  <div className="h-6 w-px bg-slate-200 mx-1"></div>

                  <button
                    type="button"
                    onClick={closeActiveTab}
                    className="group grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-400 shadow-sm transition-all hover:bg-rose-50 hover:text-rose-600"
                  >
                    <svg className="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Table Area */}
            <div className="p-4 md:p-8">
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white/40 shadow-inner">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <th className="px-6 py-5 align-middle">Recipient</th>
                        <th className="px-4 py-5 align-middle">Subject Line</th>
                        <th className="px-4 py-5 align-middle">Delivery Status</th>
                        <th className="px-4 py-5 align-middle">Timestamp</th>
                        <th className="px-6 py-5 text-center align-middle">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {emailLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-20 text-center">
                            <div className="mx-auto flex max-w-xs flex-col items-center">
                              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
                                <LabelIcon type="email" className="size-8" />
                              </div>
                              <h3 className="font-sora text-base font-bold text-slate-800">No email history</h3>
                              <p className="mt-1 text-sm text-slate-400">Outbound email communications will appear here once sent.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        emailLogs.map((row) => (
                          <tr key={row.id} className="group transition-all hover:bg-white/60">
                            <td className="px-6 py-5 align-middle">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                  </svg>
                                </div>
                                <span className="font-bold text-slate-700">{row.to}</span>
                              </div>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <span className="font-medium text-slate-600">{row.subject}</span>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600 ring-1 ring-inset ring-emerald-200/50">
                                <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-middle">
                              <div className="space-y-0.5">
                                <p className="text-[13px] font-bold text-slate-700">
                                  {new Date(row.sentOn).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                  {new Date(row.sentOn).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center align-middle">
                              <button
                                onClick={() => handleShowEmail(row.id)}
                                className="inline-grid size-9 place-items-center rounded-xl bg-slate-50 text-slate-400 hover:bg-brand-blue hover:text-white transition-all shadow-sm"
                              >
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === 'sms' && (
          <section className="animate-rise relative overflow-visible rounded-[2rem] border border-white/50 bg-white/70 shadow-[0_32px_64px_-16px_rgba(31,59,166,0.1)] backdrop-blur-xl">
            {/* Header Area */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/40 px-8 py-6 rounded-t-[2rem]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 shadow-inner">
                  <LabelIcon type="sms" className="size-6" />
                </div>
                <div>
                  <h2 className="font-sora text-xl font-extrabold tracking-tight text-slate-900">SMS Logs</h2>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Mobile Messaging History</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-1.5 border border-slate-100">
                  <button
                    type="button"
                    onClick={closeActiveTab}
                    className="group grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-400 shadow-sm transition-all hover:bg-rose-50 hover:text-rose-600"
                  >
                    <svg className="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Table Area */}
            <div className="p-4 md:p-8">
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white/40 shadow-inner">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <th className="px-6 py-5 align-middle">Phone Number</th>
                        <th className="px-4 py-5 align-middle">Message Content</th>
                        <th className="px-4 py-5 align-middle">Status</th>
                        <th className="px-4 py-5 align-middle">Timestamp</th>
                        <th className="px-6 py-5 text-center align-middle">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <div className="mx-auto flex max-w-xs flex-col items-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
                              <LabelIcon type="sms" className="size-8" />
                            </div>
                            <h3 className="font-sora text-base font-bold text-slate-800">No SMS history</h3>
                            <p className="mt-1 text-sm text-slate-400">Direct mobile communications will appear here once dispatched.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === 'update-document' && (
          <section className="animate-rise relative isolate overflow-hidden rounded-2xl border border-[#c7d2fe] bg-[linear-gradient(150deg,rgba(255,255,255,0.94),rgba(237,242,255,0.88))] shadow-[0_24px_58px_-38px_#253eaf] backdrop-blur-lg">
            <div className="flex items-center justify-between border-b border-[#dbe3ff] bg-gradient-to-r from-[#253eaf] to-[#f08028] px-5 py-3 text-white">
              <h2 className="font-sora inline-flex items-center gap-2 text-[1.45rem] font-semibold">
                <LabelIcon type="docs" />
                <span>Update Documents</span>
              </h2>
              <button
                type="button"
                onClick={closeActiveTab}
                className="grid size-8 place-items-center rounded-md bg-white/20 text-2xl font-bold leading-none text-white transition hover:bg-white/30"
                aria-label="Close update document tab"
              >
                {'\u00D7'}
              </button>
            </div>

            <div className="space-y-4 p-4 md:p-5">
              <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                <select
                  value={selectedDocumentType}
                  onChange={(e) => setSelectedDocumentType(e.target.value)}
                  className="rounded-lg border border-[#c7d2fe] bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7f95e8] focus:ring-3 focus:ring-[#e4ebff]"
                >
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => documentInputRef.current?.click()}
                  className="rounded-lg bg-gradient-to-r from-[#253eaf] to-[#f08028] px-5 py-2.5 text-sm font-bold text-white shadow-[0_16px_30px_-20px_#253eaf] transition hover:-translate-y-0.5"
                >
                  Upload
                </button>
                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
              </div>

              <p className="text-sm text-slate-600">Upload documents in formats - jpg, jpeg, png, pdf</p>
              <div className="text-sm text-slate-700">
                <p className="font-semibold">
                  Valid documents for <span className="text-[#253eaf]">{selectedDocumentType}</span> -
                </p>
                <ul className="ml-5 mt-1 list-disc">
                  {validForSelectedDocument.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                {documentTypes.map((type, index) => {
                  const files = uploadedDocuments[type] ?? []
                  return (
                    <div
                      key={type}
                      className="animate-fade-slide overflow-hidden rounded-xl border border-[#dbe3ff] bg-white shadow-[0_16px_36px_-30px_#253eaf]"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <div className="flex items-center justify-between border-b border-[#dbe3ff] bg-gradient-to-r from-[#eef3ff] to-[#fff2e6] px-4 py-2.5">
                        <h3 className="text-lg font-bold text-slate-700">{type}</h3>
                        <button
                          type="button"
                          onClick={() => handleDeleteDocumentType(type)}
                          className="grid size-7 place-items-center rounded-md border border-[#c7d2fe] bg-white text-[#253eaf] transition hover:bg-[#eef3ff]"
                          aria-label={`Delete ${type} uploads`}
                        >
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M8 6V4h8v2M7 6l1 14h8l1-14" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 10v6M14 10v6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="min-h-[120px] px-4 py-4">
                        {files.length === 0 ? (
                          <p className="text-sm text-slate-500">No file uploaded.</p>
                        ) : (
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {files.map((file) => (
                              <li
                                key={`${type}-${file.name}-${file.lastModified}`}
                                className="flex items-center gap-2 rounded-lg border border-[#dbe3ff] bg-[#eef3ff]/65 px-3 py-2 text-sm text-slate-700"
                              >
                                <span
                                  className="inline-grid size-5 place-items-center rounded-sm border border-[#c7d2fe] bg-white text-[10px] font-bold text-[#253eaf]"
                                  aria-hidden="true"
                                >
                                  F
                                </span>
                                <span className="truncate">{file.name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveDocuments}
                  className="rounded-lg bg-gradient-to-r from-[#253eaf] to-[#f08028] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_-20px_#253eaf] transition hover:-translate-y-0.5"
                >
                  Save
                </button>
              </div>
            </div>
          </section>
        )}

        {activeView === 'customer-detail' && selectedLead && (
          <div className="animate-nav-enter space-y-10 pb-20">
            {/* Header / Nav Area */}
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-sm backdrop-blur-xl md:px-10">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-indigo-600 text-white shadow-xl shadow-brand-blue/20">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 7a4 4 0 110 8 4 4 0 010-8zm10 5h4m-2-2v4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-sora text-2xl font-extrabold tracking-tight text-slate-900">{selectedLead.name}</h2>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    <span>Lead ID: #{selectedLead.sellDoLeadId}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span className="text-brand-blue">{selectedLead.project}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveView('lead-activities')}
                  className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-brand-blue shadow-sm"
                >
                  <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Activities</span>
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCustomerHeaderMenuOpen((prev) => !prev)}
                    className={`inline-grid size-11 place-items-center rounded-2xl transition-all ${customerHeaderMenuOpen ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 shadow-sm'}`}
                  >
                    <DotsIcon className="size-5" />
                  </button>

                  {customerHeaderMenuOpen && (
                    <div className="animate-rise absolute right-0 top-full z-[100] mt-3 w-60 overflow-hidden rounded-[1.5rem] border border-white bg-white/90 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerDetailTab('show')
                          setCustomerHeaderMenuOpen(false)
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${customerDetailTab === 'show' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Show Records
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenAddFollowUpTab}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold mt-1 transition-all ${customerDetailTab === 'add-follow-up' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Follow Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {customerDetailTab === 'show' && (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Primary Data Card */}
                <div className="lg:col-span-2 space-y-8">
                  <section className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-sm md:p-10">
                    <div className="mb-10 flex items-center justify-between border-b border-slate-100 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue shadow-inner">
                          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-sora text-xl font-bold text-slate-800">Identity Records</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Comprehensive Customer Intelligence</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <span className="inline-flex rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-extrabold text-emerald-600 ring-1 ring-emerald-200/50 uppercase tracking-wider">
                          Active Lead
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-y-10 gap-x-12 sm:grid-cols-2">
                      {[
                        { label: 'Full Name', value: selectedLead.name, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                        { label: 'Email Address', value: selectedLead.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                        { label: 'Primary Phone', value: selectedLead.phone, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                        { label: 'Lead Stage', value: selectedLead.leadStage, icon: 'M13 10V3L4 14h7v7l9-11h-7z', badge: true, color: 'indigo' },
                        { label: 'Lead Status', value: selectedLead.leadStatus, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', badge: true, color: 'emerald' },
                        { label: 'Validity Period', value: selectedLead.leadValidityPeriod, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                        { label: 'Project Name', value: selectedLead.project, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                        { label: 'Budget Range', value: selectedLead.budget, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                      ].map((item, idx) => (
                        <div key={idx} className="group relative">
                          <div className="mb-2 flex items-center gap-2">
                            <svg className="size-3.5 text-slate-300 transition-colors group-hover:text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                            </svg>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 transition-colors group-hover:text-slate-600">{item.label}</span>
                          </div>
                          <div className="flex items-center">
                            {item.badge ? (
                              <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-[13px] font-bold ring-1 ring-inset ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 ring-emerald-200/50' : 'bg-indigo-50 text-indigo-600 ring-indigo-200/50'
                                }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
                                {item.value}
                              </span>
                            ) : (
                              <p className="font-sora text-[15px] font-extrabold text-slate-800 transition-transform group-hover:translate-x-1">{item.value || '-'}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Follow Up History */}
                  <section className="rounded-[2.5rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-sm md:p-10">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-sora text-lg font-bold text-slate-800">Engagement History</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Past & Upcoming Interactions</p>
                        </div>
                      </div>
                      <button
                        onClick={handleOpenAddFollowUpTab}
                        className="rounded-xl bg-brand-blue/5 px-4 py-2 text-xs font-bold text-brand-blue transition-all hover:bg-brand-blue hover:text-white"
                      >
                        + New Interaction
                      </button>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/40 shadow-inner">
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              <th className="px-6 py-4">Subject</th>
                              <th className="px-4 py-4">Status</th>
                              <th className="px-4 py-4">Scheduled</th>
                              <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {(selectedLead.followUpItems || []).length === 0 ? (
                              <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic font-medium">No previous engagement recorded.</td>
                              </tr>
                            ) : (
                              (selectedLead.followUpItems || []).map((item) => (
                                <tr key={item.id} className="group transition-all hover:bg-white/60">
                                  <td className="px-6 py-4 font-bold text-slate-700">{item.subject}</td>
                                  <td className="px-4 py-4">
                                    <span className={`inline-flex rounded-lg px-2 py-1 text-[11px] font-bold ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50' : 'bg-amber-50 text-amber-600 ring-1 ring-amber-200/50'
                                      }`}>
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 font-medium text-slate-600">
                                    {item.scheduledOn ? new Date(item.scheduledOn).toLocaleDateString() : '-'}
                                  </td>
                                  <td data-dots-menu-root="true" className="relative px-6 py-4 text-center">
                                    <button
                                      type="button"
                                      onClick={() => setFollowUpActionMenuId(followUpActionMenuId === item.id ? null : item.id)}
                                      className={`inline-grid size-8 place-items-center rounded-lg transition-all ${followUpActionMenuId === item.id ? 'bg-brand-blue text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                    >
                                      <DotsIcon className="size-4" />
                                    </button>

                                    {followUpActionMenuId === item.id && (
                                      <div className="animate-rise absolute right-16 top-1/2 z-50 min-w-[14rem] -translate-y-1/2 overflow-hidden rounded-xl border border-white bg-white p-1 shadow-xl shadow-slate-200/50">
                                        <button
                                          type="button"
                                          onClick={() => handleFollowUpClick(item.id)}
                                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-brand-blue"
                                        >
                                          Mark as Followed Up
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleOpenUpdateFollowUp(item)}
                                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-brand-blue"
                                        >
                                          Update Interaction Status
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                  {/* Site Visit Section */}
                  <section className="rounded-[2.5rem] border border-white bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="font-sora text-sm font-bold text-slate-800">Site Engagement</h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: 'Visit Date', value: 'Not scheduled' },
                        { label: 'Status', value: 'Pending', badge: true },
                        { label: 'Executive', value: 'Not assigned' }
                      ].map((info, i) => (
                        <div key={i} className="flex flex-col border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{info.label}</span>
                          {info.badge ? (
                            <span className="mt-1 self-start inline-flex rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-600 ring-1 ring-amber-200/50">
                              {info.value}
                            </span>
                          ) : (
                            <span className="mt-1 font-bold text-slate-700">{info.value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* System Remarks */}
                  <section className="rounded-[2.5rem] border border-white bg-white p-8 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                        <LabelIcon type="activity" className="size-5" />
                      </div>
                      <h3 className="font-sora text-sm font-bold text-slate-800">System Logs</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl bg-slate-50 p-4 text-[13px] font-medium leading-relaxed text-slate-600">
                        "Initial lead captured from panel."
                      </div>
                      <div className="rounded-2xl border border-slate-100 p-4 text-[13px] font-medium text-slate-500 italic">
                        Current status identified as: {selectedLead.leadStatus}
                      </div>
                    </div>
                  </section>

                  {/* Customer Notes */}
                  <section className="rounded-[2.5rem] border border-white bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/10">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/60">
                          <NoteIcon className="size-5" />
                        </div>
                        <h3 className="font-sora text-sm font-bold">Collaborative Notes</h3>
                      </div>
                      <button
                        onClick={() => setIsAddingNote(!isAddingNote)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white/40 transition hover:bg-white/20 hover:text-white"
                      >
                        <svg className={`size-4 transition-transform ${isAddingNote ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {isAddingNote && (
                      <div className="mb-6 animate-fade-slide space-y-3">
                        <textarea
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Type your note here..."
                          rows={3}
                          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue custom-scrollbar"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setIsAddingNote(false)
                              setNewNoteText('')
                            }}
                            className="rounded-lg px-4 py-2 text-xs font-bold text-white/50 transition hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveNote}
                            className="rounded-lg bg-brand-blue px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-blue/20 transition hover:-translate-y-0.5 active:scale-95"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {!(selectedLead.notes?.length) ? (
                        <p className="text-[13px] font-medium leading-relaxed text-white/50">
                          No internal collaboration notes have been recorded for this lead yet. Use notes to share insights with your team.
                        </p>
                      ) : (
                        selectedLead.notes.map((note) => (
                          <div key={note.id} className="rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
                            <p className="text-[13px] leading-relaxed text-white/90">{note.text}</p>
                            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
                              {new Date(note.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {customerDetailTab === 'add-follow-up' && (
              <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm">
                <h3 className="font-sora text-xl font-semibold text-slate-800">Add Follow Up</h3>
                <form onSubmit={handleCreateFollowUp} className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Subject</span>
                    <input
                      name="subject"
                      value={followUpForm.subject}
                      onChange={handleFollowUpFormChange}
                      required
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Status</span>
                    <select
                      name="status"
                      value={followUpForm.status}
                      onChange={handleFollowUpFormChange}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    >
                      <option>Pending</option>
                      <option>Followed Up</option>
                      <option>Completed</option>
                      <option>Rescheduled</option>
                    </select>
                  </label>
                  <label className="grid gap-1 md:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">Description</span>
                    <textarea
                      name="description"
                      value={followUpForm.description}
                      onChange={handleFollowUpFormChange}
                      rows={3}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Reminder Before</span>
                    <select
                      name="reminderBefore"
                      value={followUpForm.reminderBefore}
                      onChange={handleFollowUpFormChange}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    >
                      <option>5 mins</option>
                      <option>15 mins</option>
                      <option>30 mins</option>
                      <option>1 hour</option>
                      <option>1 day</option>
                    </select>
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Scheduled On</span>
                    <input
                      type="datetime-local"
                      name="scheduledOn"
                      value={followUpForm.scheduledOn}
                      onChange={handleFollowUpFormChange}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomerDetailTab('show')}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f37a2]"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </main>

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[260] grid place-items-center bg-slate-900/35 px-3">
          <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_60px_-35px_#0f172a] animate-rise">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#253eaf] to-[#f08028] px-4 py-3 text-white">
              <h3 className="font-sora text-lg font-semibold">Channel Partner Profile</h3>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="grid size-8 place-items-center rounded-md text-2xl leading-none text-white/95 transition hover:bg-white/20"
                aria-label="Close profile form"
              >
                {'\u00D7'}
              </button>
            </div>
            <form onSubmit={handleSaveProfile} autoComplete="off" className="grid gap-3 p-4 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">Name</span>
                <input
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileFormChange}
                  required
                  autoComplete="off"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileFormChange}
                  required
                  autoComplete="off"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">Phone</span>
                <input
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileFormChange}
                  required
                  autoComplete="off"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">RERA Registration Number</span>
                <input
                  name="reraNumber"
                  value={profileForm.reraNumber}
                  onChange={handleProfileFormChange}
                  required
                  autoComplete="off"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="grid gap-1 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">User Time Zone</span>
                <select
                  name="timeZone"
                  value={profileForm.timeZone}
                  onChange={handleProfileFormChange}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </label>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f37a2]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[260] grid place-items-center bg-slate-900/35 px-3">
          <div className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_60px_-35px_#0f172a] animate-rise">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#253eaf] to-[#f08028] px-4 py-3 text-white">
              <h3 className="font-sora text-lg font-semibold">Change Password</h3>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="grid size-8 place-items-center rounded-md text-2xl leading-none text-white/95 transition hover:bg-white/20"
                aria-label="Close change password form"
              >
                {'\u00D7'}
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="grid gap-3 p-4">
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">New Password</span>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFormChange}
                  required
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">Confirm Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFormChange}
                  required
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f37a2]"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isFollowUpDrawerOpen && (
        <div className="fixed right-4 top-20 z-[60] w-[min(94vw,430px)] rounded-xl border border-slate-200 bg-white shadow-[0_28px_60px_-35px_#0f172a] animate-rise">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h3 className="font-sora text-lg font-semibold text-slate-800">Update Follow Up Status</h3>
            <button
              type="button"
              onClick={() => setIsFollowUpDrawerOpen(false)}
              className="grid size-8 place-items-center rounded-md text-2xl leading-none text-slate-600 transition hover:bg-slate-100"
            >
              {'\u00D7'}
            </button>
          </div>

          <form onSubmit={handleSaveFollowUpStatus} className="space-y-3 p-4">
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Subject</span>
              <input
                name="subject"
                value={followUpForm.subject}
                onChange={handleFollowUpFormChange}
                required
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Description</span>
              <textarea
                name="description"
                value={followUpForm.description}
                onChange={handleFollowUpFormChange}
                rows={3}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Reminder Before</span>
              <select
                name="reminderBefore"
                value={followUpForm.reminderBefore}
                onChange={handleFollowUpFormChange}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              >
                <option>5 mins</option>
                <option>15 mins</option>
                <option>30 mins</option>
                <option>1 hour</option>
                <option>1 day</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Scheduled On</span>
              <input
                type="datetime-local"
                name="scheduledOn"
                value={followUpForm.scheduledOn}
                onChange={handleFollowUpFormChange}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Status</span>
              <select
                name="status"
                value={followUpForm.status}
                onChange={handleFollowUpFormChange}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              >
                <option>Pending</option>
                <option>Followed Up</option>
                <option>Completed</option>
                <option>Rescheduled</option>
              </select>
            </label>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f37a2]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {toastMessage && (
        <div className="fixed right-4 top-5 z-[320] rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      )}

      <Addleads
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onSave={handleSaveLead}
      />
      {isEmailModalOpen && selectedEmailId && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="animate-rise w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-50 bg-slate-50/50 px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                  <LabelIcon type="email" className="size-6" />
                </div>
                <div>
                  <h3 className="font-sora text-lg font-bold text-slate-800">Email Content</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Communication Record #{selectedEmailId}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="group grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-400 shadow-sm transition-all hover:bg-rose-50 hover:text-rose-600"
              >
                <svg className="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recipient</span>
                    <p className="font-bold text-slate-700">{emailLogs.find(e => e.id === selectedEmailId)?.to}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Subject</span>
                    <p className="font-bold text-slate-700">{emailLogs.find(e => e.id === selectedEmailId)?.subject}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message Body</span>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-[15px] leading-relaxed text-slate-600">
                    <p>Dear Valued Partner,</p>
                    <p className="mt-4">
                      This is a formal communication regarding your recent activity on the MP Developers platform.
                      Your status for <strong>{emailLogs.find(e => e.id === selectedEmailId)?.subject}</strong> has been logged.
                    </p>
                    <p className="mt-4 text-slate-400 italic">This is an automated system notification.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  className="rounded-2xl bg-brand-blue px-8 py-3 text-sm font-bold text-white shadow-xl shadow-brand-blue/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default About
