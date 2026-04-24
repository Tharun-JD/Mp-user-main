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

const emailRows = [
  {
    id: 1,
    to: 'mk.bhs97@gmail.com',
    subject: 'FollowUp Reminder',
    status: 'Draft',
    sentOn: '-',
  },
  {
    id: 2,
    to: 'mk.bhs97@gmail.com',
    subject: 'New lead has been created i...',
    status: 'Draft',
    sentOn: '-',
  },
  {
    id: 3,
    to: 'cphead@mpdevelopers.com mk.bhs97@gmail.com',
    subject: 'Account has been approved',
    status: 'Draft',
    sentOn: 'Feb 18 2026, 2:42 PM',
  },
  {
    id: 4,
    to: 'mk.bhs97@gmail.com',
    subject: 'Confirmation instructions',
    status: 'Draft',
    sentOn: 'Feb 18 2026, 11:25 AM',
  },
]

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

  const selectedLead = leadActivities.find((lead) => lead.id === selectedLeadId) || null
  const validForSelectedDocument = validDocuments[selectedDocumentType] || []
  const welcomeName = currentUser?.name?.trim() || 'Test Company'
  const welcomeEmail = currentUser?.email?.trim() || ''

  useEffect(() => {
    const savedLeads = window.localStorage.getItem(LEAD_ACTIVITY_KEY)
    if (savedLeads) {
      setLeadActivities(JSON.parse(savedLeads))
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
    if (!currentUser?.name) return
    showToast(`Welcome ${currentUser.name.trim()}. You are signed in.`)
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
    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      const nextItems = (lead.followUpItems || []).map((item) =>
        item.id === followUpId ? { ...item, status: 'Followed Up' } : item
      )
      return { ...lead, followUpItems: nextItems, countStatus: 'Followed Up' }
    })
    persistLeads(nextLeads)
    setFollowUpActionMenuId(null)
    showToast('Follow up updated.')
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
        <div className="mx-auto flex h-18 w-[94vw] max-w-[1320px] items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-sora text-3xl font-extrabold tracking-[-0.05em] text-brand-blue">MP</div>
            <div className="leading-none">
              <div className="text-sm font-bold text-brand-blue">Developers</div>
              <div className="text-[10px] tracking-[0.2em] text-brand-orange">TRUST FOREVER</div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 overflow-visible text-[1.02rem] md:flex">
            <button
              type="button"
              onClick={() => {
                setActiveView('dashboard')
                setTopMenuOpen(null)
                setOpenActionMenuId(null)
              }}
              className={`nav-link-fancy animate-nav-enter ${activeView === 'dashboard' ? 'text-brand-blue' : 'text-slate-700'}`}
              style={{ animationDelay: '120ms' }}
            >
              <span className="flex items-center gap-1.5">
                <LabelIcon type="dashboard" />
                <span>Dashboard</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveView('lead-activities')
                setTopMenuOpen(null)
                setOpenActionMenuId(null)
              }}
              className={`nav-link-fancy animate-nav-enter ${activeView === 'lead-activities' ? 'text-brand-blue' : 'text-slate-700'}`}
              style={{ animationDelay: '210ms' }}
            >
              <span className="flex items-center gap-1.5">
                <LabelIcon type="activity" />
                <span>Lead Activities</span>
              </span>
            </button>

            <div data-top-menu-root="true" className="relative animate-nav-enter" style={{ animationDelay: '300ms' }}>
              <button
                type="button"
                onClick={() => setTopMenuOpen((prev) => (prev === 'application' ? null : 'application'))}
                className="nav-link-fancy flex items-center gap-1.5 text-slate-700"
                aria-expanded={topMenuOpen === 'application'}
              >
                <LabelIcon type="form" />
                <span>Application Form</span>
                <DropdownChevron />
              </button>
              {topMenuOpen === 'application' && (
                <div className="animate-rise absolute right-0 top-11 z-[240] w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setTopMenuOpen(null)
                      onOpenCustdetails?.()
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <LabelIcon type="welcome" className="size-4" />
                      <span>Customer Details</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTopMenuOpen(null)
                      onOpenAddress?.()
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <LabelIcon type="docs" className="size-4" />
                      <span>Address</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div data-top-menu-root="true" className="relative animate-nav-enter" style={{ animationDelay: '390ms' }}>
              <button
                type="button"
                onClick={() => setTopMenuOpen((prev) => (prev === 'more' ? null : 'more'))}
                className="nav-link-fancy flex items-center gap-1.5 text-slate-700"
                aria-expanded={topMenuOpen === 'more'}
              >
                <LabelIcon type="more" />
                <span>More</span>
                <DropdownChevron />
              </button>
              {topMenuOpen === 'more' && (
                <div className="animate-rise absolute right-0 top-11 z-[240] w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('emails')
                      setTopMenuOpen(null)
                      setOpenActionMenuId(null)
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <LabelIcon type="email" className="size-4" />
                      <span>Emails</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('sms')
                      setTopMenuOpen(null)
                      setOpenActionMenuId(null)
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <LabelIcon type="sms" className="size-4" />
                      <span>Sms</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div data-top-menu-root="true" className="relative animate-nav-enter" style={{ animationDelay: '480ms' }}>
              <button
                type="button"
                onClick={() => setTopMenuOpen((prev) => (prev === 'welcome' ? null : 'welcome'))}
                className="nav-link-fancy flex items-center gap-1.5 text-slate-700"
                aria-expanded={topMenuOpen === 'welcome'}
              >
                <LabelIcon type="welcome" />
                <span>Welcome, {welcomeName}</span>
                <DropdownChevron />
              </button>
              {topMenuOpen === 'welcome' && (
                <div className="animate-rise absolute right-0 top-11 z-[240] w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
                    <div className="text-sm font-semibold text-slate-800">{welcomeName}</div>
                    <div className="text-xs text-slate-600">{welcomeEmail || 'No email on file'}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileModalOpen(true)
                      setTopMenuOpen(null)
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <LabelIcon type="welcome" className="size-4" />
                      <span>Channel Partner Profile</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPasswordModalOpen(true)
                      setTopMenuOpen(null)
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <LabelIcon type="password" className="size-4" />
                      <span>Change Password</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTopMenuOpen(null)
                      onBackToLogin?.()
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <LabelIcon type="logout" className="size-4" />
                      <span>Log Out</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="relative isolate z-10 mx-auto w-[94vw] max-w-[1320px] py-8">
        {activeView === 'dashboard' && (
          <>
            <section className="hero-shimmer animate-rise overflow-hidden rounded-2xl bg-[linear-gradient(130deg,#3f52c4_0%,#5f62da_40%,#8f47cc_100%)] px-5 py-8 text-center text-white shadow-[0_30px_65px_-35px_#4450c6] md:px-8 md:py-10">
              <h1 className="font-sora text-[clamp(1.8rem,2.6vw,3rem)] font-semibold tracking-[-0.02em]">
                Welcome ({welcomeName})
              </h1>
              <p className="mt-3 text-[1.45rem] text-white/90">
                {welcomeEmail ? `Email: ${welcomeEmail}` : 'Vendor Code: Test0077'}
              </p>
              <p className="mx-auto mt-4 max-w-[840px] text-[1.05rem] leading-relaxed text-white/90 md:text-[1.15rem]">
                Thank you for being a valued channel partner. We are committed to your success. Together, we will
                achieve great results in the real estate market.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(true)}
                  className="glass-panel hover-lift animate-fade-slide rounded-xl px-10 py-7 text-brand-blue shadow-lg"
                >
                  <div className="mx-auto mb-2 grid size-10 place-items-center rounded-lg border-2 border-brand-blue/70 text-xl">+</div>
                  <div className="text-[1.02rem] font-medium">Add Leads</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('lead-activities')
                    setTopMenuOpen(null)
                    setOpenActionMenuId(null)
                  }}
                  className="glass-panel hover-lift animate-fade-slide rounded-xl px-10 py-7 text-brand-blue shadow-lg [animation-delay:160ms]"
                >
                  <div className="mx-auto mb-2 grid size-10 place-items-center rounded-lg border-2 border-brand-blue/70 text-xl">Rs</div>
                  <div className="text-[1.02rem] font-medium">Track Lead Activities</div>
                </button>
              </div>
            </section>

            <section className="animate-rise mt-10 overflow-hidden rounded-2xl border border-[#d8dafe] bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(240,236,255,0.86))] shadow-[0_24px_58px_-38px_#4f46e5] backdrop-blur-lg [animation-delay:160ms]">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#4f5fd6] to-[#9a48d0] px-5 py-3">
                <h2 className="font-sora inline-flex items-center gap-2 text-[1.9rem] text-white">
                  <LabelIcon type="collaterals" className="size-6" />
                  <span>Collaterals</span>
                </h2>
                <a href="#" className="nav-link-soft text-[1.02rem] text-white/90 hover:text-white">View All</a>
              </div>
              <div className="p-4">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-[1.45rem] text-slate-700 transition hover:bg-slate-100">MP Amber</div>
                  <div className="px-4 py-3 text-[1.45rem] text-slate-700 transition hover:bg-slate-50">MP BODHI</div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === 'lead-activities' && (
          <section className="animate-rise relative isolate overflow-visible rounded-2xl border border-[#c7d2fe] bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(237,242,255,0.88))] shadow-[0_24px_58px_-38px_#253eaf] backdrop-blur-lg">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <span className="absolute -top-10 left-10 size-36 rounded-full bg-sky-100/45 blur-3xl" />
              <span className="absolute right-0 top-24 size-28 rounded-full bg-cyan-100/35 blur-3xl animate-float" style={{ animationDelay: '-2.5s' }} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe3ff] bg-[linear-gradient(130deg,rgba(37,62,175,0.1),rgba(240,128,40,0.08))] px-5 py-3">
              <h2 className="font-sora flex items-center gap-2 text-[1.45rem] font-semibold text-slate-800">
                <LabelIcon type="activity" />
                <span>Lead Activities</span>
              </h2>
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#5e63b8] transition hover:bg-slate-50"
                >
                  Total : {visibleLeads.length}
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilterMenu((prev) => !prev)}
                  aria-label="Filter leads"
                  className="grid size-10 place-items-center rounded-md border border-slate-300 bg-white text-[#5e63b8] transition hover:bg-slate-50"
                >
                  <FilterIcon />
                </button>
                <button
                  type="button"
                  onClick={closeActiveTab}
                  className="grid size-10 place-items-center rounded-md border border-slate-300 bg-white text-lg font-bold text-slate-700 transition hover:bg-slate-50"
                  aria-label="Close lead activities tab"
                >
                  {'\u00D7'}
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 top-12 z-20 w-40 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg animate-rise">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('all')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      All Leads
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('fresh')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Fresh
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('follow-up')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Follow-up
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('pending')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Pending
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="relative overflow-x-auto overflow-y-visible p-4">
              <table className="w-full table-fixed text-[13px]">
                <thead>
                  <tr className="bg-gradient-to-r from-[#253eaf] to-[#f08028] text-left text-[0.72rem] uppercase tracking-[0.04em] text-white">
                    <th className="w-[19%] px-2 py-2.5 align-middle">Name/Email/Phone</th>
                    <th className="w-[10%] px-2 py-2.5 align-middle">Sell Do Lead ID</th>
                    <th className="w-[8%] px-2 py-2.5 align-middle">Project</th>
                    <th className="w-[8%] px-2 py-2.5 align-middle">Lead Stage</th>
                    <th className="w-[11%] px-2 py-2.5 align-middle">Lead Status</th>
                    <th className="w-[11%] px-2 py-2.5 align-middle">Count Status</th>
                    <th className="w-[10%] px-2 py-2.5 align-middle">Registered At</th>
                    <th className="w-[15%] px-2 py-2.5 align-middle">Lead validity period</th>
                    <th className="w-[8%] px-2 py-2.5 text-center align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLeads.length === 0 && (
                    <tr>
                      <td colSpan={9} className="border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center text-slate-600">
                        No lead activity found. Click Add Lead and save a lead.
                      </td>
                    </tr>
                  )}

                  {visibleLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-200 bg-white text-slate-700">
                      <td className="px-2 py-2.5 align-top">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 font-semibold text-[#1f3ca6]">
                            <span className="inline-block size-2 rounded-full bg-yellow-400" />
                            <span>{lead.name}</span>
                          </p>
                          <p className="flex items-center gap-2 text-xs text-slate-600">
                            <span>@</span>
                            <span className="break-all">{lead.email}</span>
                          </p>
                          <p className="flex items-center gap-2 text-xs text-slate-600">
                            <span>#</span>
                            <span className="break-all">{lead.phone}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-2.5 align-top font-medium text-[#3247b8]">{lead.sellDoLeadId}</td>
                      <td className="px-2 py-2.5 align-top">{lead.project}</td>
                      <td className="px-2 py-2.5 align-top">
                        <span className="rounded-full bg-[#e4e9ff] px-2.5 py-1 text-xs font-semibold text-[#3247b8]">{lead.leadStage}</span>
                      </td>
                      <td className="px-2 py-2.5 align-top">{lead.leadStatus}</td>
                      <td className="px-2 py-2.5 align-top">{lead.countStatus}</td>
                      <td className="px-2 py-2.5 align-top">{lead.registeredAt}</td>
                      <td className="px-2 py-2.5 align-top">{lead.leadValidityPeriod}</td>
                      <td data-dots-menu-root="true" className="relative overflow-visible px-2 py-2.5 text-center align-top">
                        <button
                          type="button"
                          onClick={() => setOpenActionMenuId(openActionMenuId === lead.id ? null : lead.id)}
                          className="inline-grid size-8 place-items-center rounded-md text-slate-600 transition hover:bg-slate-200"
                          aria-label="Open actions"
                        >
                          <DotsIcon />
                        </button>

                        {openActionMenuId === lead.id && (
                          <div className="absolute right-2 top-11 z-20 min-w-[11rem] overflow-visible rounded-lg border border-slate-200 bg-white p-1.5 text-left shadow-lg animate-rise">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedLeadId(lead.id)
                                setActiveView('customer-detail')
                                setCustomerDetailTab('show')
                                setCustomerHeaderMenuOpen(false)
                                setOpenActionMenuId(null)
                              }}
                              className="block w-full rounded-md px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                            >
                              Show
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddFollow(lead.id)}
                              className="block w-full rounded-md px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                            >
                              Add Follow
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeView === 'emails' && (
          <section className="animate-rise relative isolate overflow-hidden rounded-2xl border border-[#c7d2fe] bg-[linear-gradient(150deg,rgba(255,255,255,0.94),rgba(237,242,255,0.88))] shadow-[0_24px_58px_-38px_#253eaf] backdrop-blur-lg">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <span className="absolute -left-8 top-4 size-40 rounded-full bg-indigo-100/45 blur-3xl animate-float" />
              <span className="absolute right-8 bottom-0 size-36 rounded-full bg-orange-100/35 blur-3xl animate-float" style={{ animationDelay: '-2.2s' }} />
            </div>

            <div className="flex items-center justify-between border-b border-[#dbe3ff] bg-gradient-to-r from-[#253eaf] to-[#f08028] px-5 py-3 text-white">
              <h2 className="font-sora inline-flex items-center gap-2 text-[1.45rem] font-semibold">
                <LabelIcon type="email" />
                <span>Emails</span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilterMenu((prev) => !prev)}
                  aria-label="Filter emails"
                  className="grid size-8 place-items-center rounded-md bg-white/20 text-white transition hover:bg-white/30"
                >
                  <FilterIcon />
                </button>
                <button
                  type="button"
                  onClick={closeActiveTab}
                  className="grid size-8 place-items-center rounded-md bg-white/20 text-2xl font-bold leading-none text-white transition hover:bg-white/30"
                  aria-label="Close emails tab"
                >
                  {'\u00D7'}
                </button>
              </div>
            </div>

            <div className="p-4 md:p-5">
              <div className="overflow-x-auto rounded-xl border border-[#dbe3ff] bg-white/95 shadow-[0_16px_36px_-30px_#253eaf]">
                <table className="w-full min-w-[760px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#253eaf] to-[#f08028] text-left text-white">
                      <th className="px-3 py-2.5">To</th>
                      <th className="px-3 py-2.5">Subject</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5">Sent On</th>
                      <th className="px-3 py-2.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailRows.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-7 text-center text-slate-500">
                          No emails available.
                        </td>
                      </tr>
                    )}
                    {emailRows.map((row, index) => (
                      <tr
                        key={row.id}
                        className="animate-fade-slide border-b border-slate-100 text-slate-700"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <td className="max-w-[260px] truncate px-3 py-2.5 font-medium text-sky-700" />
                        <td className="max-w-[260px] truncate px-3 py-2.5 font-semibold text-indigo-700" />
                        <td className="px-3 py-2.5" />
                        <td className="px-3 py-2.5" />
                        <td className="px-3 py-2.5" />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeView === 'sms' && (
          <section className="animate-rise relative isolate overflow-hidden rounded-2xl border border-[#c7d2fe] bg-[linear-gradient(150deg,rgba(255,255,255,0.94),rgba(237,242,255,0.88))] p-5 shadow-[0_24px_58px_-38px_#253eaf] backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <h2 className="font-sora inline-flex items-center gap-2 text-[1.4rem] font-semibold text-slate-800">
                <LabelIcon type="sms" />
                <span>Sms</span>
              </h2>
              <button
                type="button"
                onClick={closeActiveTab}
                className="grid size-8 place-items-center rounded-md border border-slate-300 bg-white text-2xl font-bold leading-none text-slate-700 transition hover:bg-slate-50"
                aria-label="Close sms tab"
              >
                {'\u00D7'}
              </button>
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
          <section className="animate-rise relative isolate space-y-5">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <span className="absolute -left-8 top-12 size-36 rounded-full bg-emerald-100/45 blur-3xl animate-float" />
              <span className="absolute right-10 top-8 size-28 rounded-full bg-amber-100/45 blur-3xl animate-float" style={{ animationDelay: '-3.1s' }} />
            </div>

            <div className="relative z-[120] overflow-visible rounded-2xl border border-[#c7d2fe] bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(237,242,255,0.88))] px-5 py-4 shadow-[0_24px_58px_-38px_#253eaf] backdrop-blur-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-sora inline-flex items-center gap-2 text-[1.5rem] font-semibold text-slate-800">
                  <LabelIcon type="welcome" />
                  <span>Customer Detail</span>
                </h2>
                <div data-dots-menu-root="true" className="relative z-[80] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('lead-activities')}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Back to Lead Activities
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerHeaderMenuOpen((prev) => !prev)}
                    className="inline-grid size-8 place-items-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                    aria-label="Customer detail menu"
                  >
                    <DotsIcon />
                  </button>

                  {customerHeaderMenuOpen && (
                    <div className="animate-rise absolute right-0 top-full z-[200] mt-2 grid w-56 gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-[0_24px_45px_-28px_#0f172a]">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerDetailTab('show')
                          setCustomerHeaderMenuOpen(false)
                        }}
                        className="block w-full rounded-md bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Show Details
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenAddFollowUpTab}
                        className="block w-full rounded-md bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Update Follow Up
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={closeActiveTab}
                    className="grid size-8 place-items-center rounded-md border border-slate-300 bg-white text-2xl font-bold leading-none text-slate-700 transition hover:bg-slate-50"
                    aria-label="Close customer detail tab"
                  >
                    {'\u00D7'}
                  </button>
                </div>
              </div>
            </div>

            {customerDetailTab === 'show' && (
              <>
                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Customer Detail</h3>
              <div className="mt-3 grid gap-3 text-slate-700 md:grid-cols-2">
                <p><strong>First Name:</strong> {selectedLead.firstName}</p>
                <p><strong>Last Name:</strong> {selectedLead.lastName}</p>
                <p><strong>Name:</strong> {selectedLead.name}</p>
                <p><strong>Email:</strong> {selectedLead.email}</p>
                <p><strong>Phone:</strong> {selectedLead.phone}</p>
                <p><strong>Sell Do Lead ID:</strong> {selectedLead.sellDoLeadId}</p>
                <p><strong>Project:</strong> {selectedLead.project}</p>
                <p><strong>Lead Stage:</strong> {selectedLead.leadStage}</p>
                <p><strong>Lead Status:</strong> {selectedLead.leadStatus}</p>
                <p><strong>Count Status:</strong> {selectedLead.countStatus}</p>
                <p><strong>Registered At:</strong> {selectedLead.registeredAt}</p>
                <p><strong>Lead Validity Period:</strong> {selectedLead.leadValidityPeriod}</p>
                <p><strong>Budget:</strong> {selectedLead.budget}</p>
                <p><strong>Location:</strong> {selectedLead.location}</p>
                <p><strong>Configuration:</strong> {selectedLead.configuration}</p>
                <p><strong>Property Type:</strong> {selectedLead.propertyType}</p>
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:90ms]">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Sell Do Lead Site Visit</h3>
              <div className="mt-3 grid gap-3 text-slate-700 md:grid-cols-2">
                <p><strong>Lead ID:</strong> {selectedLead.sellDoLeadId}</p>
                <p><strong>Project:</strong> {selectedLead.project}</p>
                <p><strong>Visit Date:</strong> Not scheduled</p>
                <p><strong>Visit Status:</strong> Pending</p>
                <p><strong>Assigned Executive:</strong> Not assigned</p>
                <p><strong>Remarks:</strong> No site visit remark yet.</p>
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:140ms]">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Remark from Selldo</h3>
              <div className="mt-3 space-y-2 text-slate-700">
                <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Initial lead captured from panel.</p>
                <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Current status: {selectedLead.leadStatus}</p>
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:190ms]">
              <div className="flex items-center justify-between">
                <h3 className="font-sora text-xl font-semibold text-slate-800">Notes</h3>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-slate-600">
                  <NoteIcon />
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
                No additional notes available for this customer.
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:240ms]">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Follow Up</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#5868ea] to-[#9155e6] text-left text-white">
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Schedule On</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedLead.followUpItems || []).map((item) => (
                      <tr key={item.id} className="border-b border-slate-200">
                        <td className="px-3 py-2">{item.subject}</td>
                        <td className="px-3 py-2">{item.status}</td>
                        <td className="px-3 py-2">
                          {item.scheduledOn ? new Date(item.scheduledOn).toLocaleString() : '-'}
                        </td>
                        <td data-dots-menu-root="true" className="relative px-3 py-2">
                          <button
                            type="button"
                            onClick={() => setFollowUpActionMenuId(followUpActionMenuId === item.id ? null : item.id)}
                            className="inline-grid size-8 place-items-center rounded-md text-slate-600 transition hover:bg-slate-100"
                          >
                            <DotsIcon />
                          </button>

                          {followUpActionMenuId === item.id && (
                            <div className="absolute right-0 top-10 z-20 min-w-[14rem] overflow-visible rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg animate-rise">
                              <button
                                type="button"
                                onClick={() => handleFollowUpClick(item.id)}
                                className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                              >
                                Follow Up
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenUpdateFollowUp(item)}
                                className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                              >
                                Update Follow Up Status
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                </div>
              </>
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
          </section>
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
    </div>
  )
}

export default About
