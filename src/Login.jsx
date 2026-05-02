import { useState, useEffect, useRef } from 'react'
import { countries as countryList, statesByCountry, countryPhoneOptions } from './data/locationData'

const initialFormValues = {
  name: '',
  phonePrefix: '+91',
  phone: '',
  email: '',
  alternatePhonePrefix: '+91',
  alternateNumber: '',
  aadhaar: '',
  pan: '',
  occupation: '',
  rera: '',
  companyName: '',
  bankName: '',
  branch: '',
  accountType: 'Please select',
  ifsc: '',
  accountNumber: '',
  uploadDocuments: [],
  bankZip: '',
  gstApplicable: 'No',
  gstNumber: '',
  house: '',
  street: '',
  country: 'India',
  state: 'Maharashtra',
  city: '',
  zip: '',
}

const inputClass = "w-full rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-3 text-[0.98rem] shadow-[0_8px_20px_-18px_#1e3a8a] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
const labelClass = "text-[0.94rem] font-semibold tracking-[0.01em] text-slate-700"

function Login({ onSignIn }) {
  const [view, setView] = useState(() => localStorage.getItem('authView') || 'login')
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [registerData, setRegisterData] = useState(initialFormValues)
  const [errorMessage, setErrorMessage] = useState('')

  const [selectedDocType, setSelectedDocType] = useState('PAN Card')
  const documentTypes = ['PAN Card', 'Aadhaar Card', 'RERA Certificate', 'GST Certificate', 'Passbook/Cancelled Cheque']
  const [isPhonePrefixOpen, setIsPhonePrefixOpen] = useState(false)
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [isStateOpen, setIsStateOpen] = useState(false)
  const [stateSearch, setStateSearch] = useState('')
  const dropdownRef = useRef(null)
  const countryRef = useRef(null)
  const stateRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPhonePrefixOpen(false)
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryOpen(false)
      }
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setIsStateOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    console.log('Country List Loaded:', countryList?.length)
    localStorage.setItem('authView', view)
  }, [view])

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    if (view === 'login') {
      setFormData(prev => ({ ...prev, [name]: value }))
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }))
    }
    if (errorMessage) setErrorMessage('')
  }

  const handleRegisterFieldChange = (field, value) => {
    setRegisterData(prev => ({ ...prev, [field]: value }))
  }

  const handleUploadDocs = (event) => {
    const files = Array.from(event.target.files || [])
    const nextDocs = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: selectedDocType
    }))
    setRegisterData(prev => ({
      ...prev,
      uploadDocuments: [...(prev.uploadDocuments || []), ...nextDocs]
    }))
  }

  const handleRemoveDoc = (index) => {
    setRegisterData(prev => ({
      ...prev,
      uploadDocuments: prev.uploadDocuments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (view === 'login') {
      if (!formData.email.trim() || !formData.password.trim()) {
        setErrorMessage('Please enter Email and Password.')
        return
      }
      onSignIn?.({ name: formData.email.split('@')[0], email: formData.email.trim() })
    } else if (view === 'register') {
      console.log('Registering Partner:', registerData)

      const newPartner = {
        ...registerData,
        id: `cp-${Date.now()}`,
        status: 'Pending',
        createdAt: Date.now()
      }

      fetch('http://localhost:3000/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPartner)
      })
        .then(res => {
          if (res.ok) {
            alert('Registration submitted successfully! Your application is now visible in the Admin Portal.')
            setView('login')
          } else {
            alert('Failed to submit registration. Please try again.')
          }
        })
        .catch(err => {
          console.error('Submission error:', err)
          alert('Network error. Please make sure the backend server is running.')
        })
    } else {
      // Handle other views (OTP, Forgot, etc.)
      console.log('Action for view:', view)
      setView('login')
    }
  }

  const isLoginRelatedView = ['login', 'otp', 'forgot', 'signup', 'resend_confirmation', 'resend_unlock'].includes(view)

  return (
    <div className="page-bg-shell font-manrope min-h-screen grid grid-rows-[auto_1fr_auto]">
      <div aria-hidden="true" className="page-bg-orbs">
        <span className="page-bg-orb-left" />
        <span className="page-bg-orb-right" />
        <span className="page-bg-orb-bottom" />
      </div>

      <header className="relative z-20 flex items-center justify-between border-b border-slate-200 px-5 py-4 backdrop-blur md:px-14 md:py-5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MP Developers" className="h-10 w-auto md:h-12 object-contain" />
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => setView('login')}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md ${isLoginRelatedView ? 'border-brand-blue bg-brand-blue text-white' : 'border-transparent text-slate-700'}`}
          >
            Log in
          </button>
        </div>
      </header>

      <main className={`relative z-10 mx-auto grid w-full max-w-[95%] lg:max-w-[1440px] px-5 md:px-10 gap-6 py-6 ${isLoginRelatedView ? 'lg:grid-cols-2 lg:items-center' : 'grid-cols-1'}`}>
        <section className="hidden flex-col items-center justify-center text-center lg:flex">
          <div className="animate-float flex items-center justify-center">
            <img src="/logo.png" alt="MP Developers" className="w-full max-w-[480px] drop-shadow-2xl" />
          </div>
          <p className="mt-12 max-w-[30ch] text-2xl font-medium leading-relaxed text-slate-500">
            Designing your dreams, building your future.
          </p>
        </section>

        <section className={`animate-rise relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/85 to-[#eef3ff]/85 p-6 shadow-[0_30px_70px_-35px_#1d2f68] backdrop-blur-xl md:p-8 ${isLoginRelatedView ? 'lg:w-full' : 'mx-auto max-w-[1400px] w-full'}`}>
          <span aria-hidden="true" className="pointer-events-none absolute -left-14 -top-20 size-44 rounded-full bg-[#8fb7ff]/30 blur-2xl [animation:float_11s_ease-in-out_infinite]" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-10 size-44 rounded-full bg-[#ffc997]/35 blur-2xl [animation:float_13s_ease-in-out_infinite]" style={{ animationDelay: '-2s' }} />

          {isLoginRelatedView ? (
            <div className="relative z-10">
              {view === 'signup' ? (
                <div className="mb-6">
                  <h1 className="font-sora text-2xl font-bold leading-tight text-sky-600">Biggest real estate opportunity in Pune</h1>
                  <p className="mt-2 text-lg text-slate-600">Home buying can&apos;t get better than this</p>
                </div>
              ) : view === 'resend_unlock' ? (
                <div className="mb-6">
                  <h1 className="font-sora text-2xl font-bold text-slate-800">Resend unlock instructions</h1>
                </div>
              ) : view === 'forgot' || view === 'resend_confirmation' ? (
                <div className="mb-6">
                  <h1 className="font-sora text-2xl font-bold text-slate-800">Reset Password</h1>
                </div>
              ) : (
                <>
                  <p className="inline-flex items-center gap-1.5 text-[0.98rem] font-bold tracking-[0.03em] text-sky-600">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Welcome to MP Developers</span>
                  </p>
                  <h1 className="font-sora mt-2 bg-gradient-to-r from-slate-900 via-brand-blue to-slate-900 bg-clip-text text-[clamp(1.5rem,2.3vw,2rem)] leading-tight font-bold text-transparent">
                    Build bold partnerships with confidence.
                  </h1>
                </>
              )}

              <form className="grid gap-4 mt-8" onSubmit={handleSubmit} autoComplete="off">
                {view === 'login' ? (
                  <>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Email Address</label>
                      <input name="email" type="email" value={formData.email} onChange={handleLoginChange} placeholder="email@example.com" className={inputClass} required />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Password</label>
                      <input name="password" type="password" value={formData.password} onChange={handleLoginChange} placeholder="••••••••" className={inputClass} required />
                    </div>
                  </>
                ) : view === 'otp' ? (
                  <div className="grid gap-1.5">
                    <label className={labelClass}>Phone *</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500">
                        <span>+91</span>
                      </span>
                      <input name="phone" value={registerData.phone} onChange={handleLoginChange} placeholder="Phone" className={`${inputClass} pl-14`} required />
                    </div>
                  </div>
                ) : view === 'signup' ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-1.5">
                        <label className={labelClass}>First name *</label>
                        <input name="firstName" value={registerData.firstName} onChange={handleLoginChange} placeholder="First name" className={inputClass} required />
                      </div>
                      <div className="grid gap-1.5">
                        <label className={labelClass}>Last name *</label>
                        <input name="lastName" value={registerData.lastName} onChange={handleLoginChange} placeholder="Last name" className={inputClass} required />
                      </div>
                    </div>
                    <input name="email" type="email" value={registerData.email} onChange={handleLoginChange} placeholder="Email" className={inputClass} />
                  </>
                ) : (
                  <div className="grid gap-1.5">
                    <label className={labelClass}>{view === 'resend_unlock' ? 'Email' : 'Email / Phone'}</label>
                    <input name="email" value={formData.email} onChange={handleLoginChange} placeholder="Email / Phone" className={inputClass} required />
                  </div>
                )}

                <button type="submit" className="mt-4 rounded-lg bg-[#007ad9] px-3 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#0069ba]">
                  {view === 'login' ? 'Sign In' : view === 'otp' ? 'Get OTP' : view === 'signup' ? 'Register' : 'Submit'}
                </button>

                {errorMessage && <p className="text-sm font-semibold text-rose-600">{errorMessage}</p>}

                <div className="mt-4 flex flex-col items-start gap-1">
                  {view === 'login' && (
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Forgot your password?
                    </button>
                  )}
                  {view !== 'login' && (
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Back to Login
                    </button>
                  )}
                  {view === 'login' && (
                    <button
                      type="button"
                      onClick={() => setView('register')}
                      className="mt-8 flex w-full items-center justify-center rounded-xl bg-slate-900 py-4 font-sora text-[0.95rem] font-bold text-white shadow-xl transition-all hover:bg-slate-800 hover:shadow-2xl active:scale-[0.98]"
                    >
                      Register as Channel Partner
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="relative z-10 mx-auto w-full max-w-[900px] animate-in fade-in zoom-in-95 duration-700">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-indigo-600 ring-1 ring-indigo-100">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                  </span>
                  Partner Onboarding
                </div>
                <h1 className="font-sora mt-4 text-[clamp(2rem,4vw,2.8rem)] font-black tracking-tight text-[#1e293b]">
                  Build Bold Partnerships.
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-lg font-medium text-slate-500">
                  Join MP Developers and unlock the future of real estate with our premium partner network.
                </p>
              </div>

              <form className="flex flex-col" onSubmit={handleSubmit} autoComplete="off">
                <div className="space-y-10 pb-10 px-1">
                  {/* Basic Profile */}
                  <section className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 backdrop-blur-xl animate-in slide-in-from-bottom-6 duration-700 md:p-10">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-50/50 blur-3xl" />
                    <div className="relative mb-8 flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-[#2b45ba] font-sora text-base font-bold text-white shadow-lg shadow-indigo-100/50">1</div>
                      <h2 className="font-sora text-xl font-black tracking-tight text-[#1e293b]">Basic Profile</h2>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    
                    <div className="space-y-10">
                      {/* Row 1: Company Name */}
                      <div className="grid gap-2.5">
                        <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Company / CP Name *</label>
                        <input 
                          type="text" 
                          value={registerData.companyName} 
                          onChange={(e) => handleRegisterFieldChange('companyName', e.target.value)} 
                          className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" 
                          placeholder="Legal Business Name" 
                          required 
                        />
                      </div>

                      {/* Row 2: Owner, Phone, Email */}
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Owner Name *</label>
                          <input type="text" value={registerData.name} onChange={(e) => handleRegisterFieldChange('name', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="Full Name" required />
                        </div>
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Phone *</label>
                          <div className="flex gap-3">
                            <div className="relative" ref={dropdownRef}>
                              <button
                                type="button"
                                onClick={() => setIsPhonePrefixOpen(!isPhonePrefixOpen)}
                                className="flex h-full w-[100px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/50 px-3 font-black text-slate-700 transition hover:border-[#2b45ba]"
                              >
                                <span className="text-[10px] font-black uppercase text-slate-400">IN</span>
                                <span className="text-sm font-black">{registerData.phonePrefix}</span>
                                <svg className={`size-3 text-slate-400 transition-transform ${isPhonePrefixOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="m6 9 6 6 6-6" /></svg>
                              </button>
                              {isPhonePrefixOpen && (
                                <div className="absolute top-full left-0 mt-2 z-[100] w-64 max-h-60 overflow-y-auto rounded-[2rem] border border-slate-100 bg-white p-2 shadow-2xl no-scrollbar">
                                  {countryPhoneOptions.map((opt) => (
                                    <button
                                      key={`${opt.country}-${opt.code}`}
                                      type="button"
                                      onClick={() => {
                                        handleRegisterFieldChange('phonePrefix', opt.code)
                                        setIsPhonePrefixOpen(false)
                                      }}
                                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-[#2b45ba]"
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl">{opt.flag}</span>
                                        <span>{opt.country}</span>
                                      </div>
                                      <span className="text-slate-400">{opt.code}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <input type="text" value={registerData.phone} onChange={(e) => handleRegisterFieldChange('phone', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="Number" required />
                          </div>
                        </div>
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Email Address *</label>
                          <input type="email" value={registerData.email} onChange={(e) => handleRegisterFieldChange('email', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="email@example.com" required />
                        </div>
                      </div>

                      {/* Row 3: Aadhaar, PAN, RERA, Occupation */}
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Aadhaar *</label>
                          <input type="text" value={registerData.aadhaar} onChange={(e) => handleRegisterFieldChange('aadhaar', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="12-digit Aadhaar" required />
                        </div>
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">PAN Number *</label>
                          <input type="text" value={registerData.pan} onChange={(e) => handleRegisterFieldChange('pan', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="ABCDE1234F" required />
                        </div>
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Occupation *</label>
                          <input type="text" value={registerData.occupation} onChange={(e) => handleRegisterFieldChange('occupation', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="e.g. Real Estate Agent" required />
                        </div>
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">RERA Number</label>
                          <input type="text" value={registerData.rera} onChange={(e) => handleRegisterFieldChange('rera', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="RERA Registration" />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Address Section */}
                  <section className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 backdrop-blur-xl animate-in slide-in-from-bottom-6 duration-700 delay-150 md:p-10">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-50/50 blur-3xl" />
                    <div className="relative mb-8 flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-[#f59e0b] font-sora text-base font-bold text-white shadow-lg shadow-orange-100/50">2</div>
                      <h2 className="font-sora text-xl font-black tracking-tight text-[#1e293b]">Address Details</h2>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="grid gap-2.5 md:col-span-2">
                        <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">House / Flat / Company *</label>
                        <input type="text" value={registerData.house} onChange={(e) => handleRegisterFieldChange('house', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-4 focus:ring-orange-50" placeholder="Office / Building Name" required />
                      </div>
                      <div className="grid gap-2.5 md:col-span-2">
                        <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Street / Area *</label>
                        <input type="text" value={registerData.street} onChange={(e) => handleRegisterFieldChange('street', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-4 focus:ring-orange-50" placeholder="Street Name" required />
                      </div>
                      <div className="grid gap-2.5">
                        <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">City *</label>
                        <input type="text" value={registerData.city} onChange={(e) => handleRegisterFieldChange('city', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-4 focus:ring-orange-50" placeholder="City" required />
                      </div>
                      <div className="grid gap-2.5">
                        <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Pin Code *</label>
                        <input type="text" value={registerData.zip} onChange={(e) => handleRegisterFieldChange('zip', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-4 focus:ring-orange-50" placeholder="Pincode" required />
                      </div>
                    </div>
                  </section>

                  {/* Financial & Compliance */}
                  <section className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 backdrop-blur-xl animate-in slide-in-from-bottom-6 duration-700 delay-300 md:p-10">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-50/50 blur-3xl" />
                    <div className="relative mb-8 flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-[#10b981] font-sora text-base font-bold text-white shadow-lg shadow-emerald-100/50">3</div>
                      <h2 className="font-sora text-xl font-black tracking-tight text-[#1e293b]">Financial & Bank Details</h2>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    <div className="grid gap-10">
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Bank Name</label>
                          <input type="text" value={registerData.bankName} onChange={(e) => handleRegisterFieldChange('bankName', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#10b981] focus:bg-white focus:ring-4 focus:ring-emerald-50" placeholder="Bank Name" />
                        </div>
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Account Number</label>
                          <input type="text" value={registerData.accountNumber} onChange={(e) => handleRegisterFieldChange('accountNumber', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#10b981] focus:bg-white focus:ring-4 focus:ring-emerald-50" placeholder="Account Number" />
                        </div>
                        <div className="grid gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">IFSC Code</label>
                          <input type="text" value={registerData.ifsc} onChange={(e) => handleRegisterFieldChange('ifsc', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-[#10b981] focus:bg-white focus:ring-4 focus:ring-emerald-50" placeholder="IFSC Code" />
                        </div>
                      </div>
                      
                      <div className="rounded-[2rem] bg-slate-50/50 p-8 border border-slate-100">
                        <div className="grid gap-8 md:grid-cols-2">
                          <div className="space-y-4">
                            <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Is GST Applicable? *</label>
                            <div className="flex gap-4">
                              {['Yes', 'No'].map(val => (
                                <button key={val} type="button" onClick={() => handleRegisterFieldChange('gstApplicable', val)} className={`flex-1 rounded-2xl py-4 text-sm font-black transition-all ${registerData.gstApplicable === val ? 'bg-[#2b45ba] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-300'}`}>{val}</button>
                              ))}
                            </div>
                          </div>
                          <div className="grid gap-2.5">
                            <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">GST Number</label>
                            <input type="text" disabled={registerData.gstApplicable === 'No'} value={registerData.gstNumber} onChange={(e) => handleRegisterFieldChange('gstNumber', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition disabled:opacity-30 focus:border-[#2b45ba] focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="15-digit GSTIN" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Compliance Documents */}
                  <section className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 backdrop-blur-xl animate-in slide-in-from-bottom-6 duration-700 delay-500 md:p-10">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-slate-100/50 blur-3xl" />
                    <div className="relative mb-8 flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 font-sora text-base font-bold text-white shadow-lg shadow-slate-200/50">4</div>
                      <h2 className="font-sora text-xl font-black tracking-tight text-[#1e293b]">Compliance Documents</h2>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    
                    <div className="grid gap-8">
                      <div className="flex flex-col gap-6 md:flex-row md:items-end">
                        <div className="grid flex-1 gap-2.5">
                          <label className="ml-1 text-[0.92rem] font-black uppercase tracking-widest text-slate-600">Document Type</label>
                          <select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-100">
                            {documentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-8 transition hover:border-[#2b45ba] hover:bg-white">
                            <input type="file" multiple onChange={handleUploadDocs} className="hidden" />
                            <svg className="h-8 w-8 text-slate-400 group-hover:text-[#2b45ba]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            <p className="mt-2 text-sm font-bold text-slate-500 group-hover:text-[#2b45ba]">Drop files here or click to upload</p>
                          </label>
                        </div>
                      </div>

                      {registerData.uploadDocuments && registerData.uploadDocuments.length > 0 && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {registerData.uploadDocuments.map((doc, idx) => (
                            <div key={idx} className="group relative flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-bold text-slate-700">{doc.name}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{doc.type}</p>
                              </div>
                              <button type="button" onClick={() => handleRemoveDoc(idx)} className="rounded-lg p-2 text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Submission Footer */}
                  <div className="flex flex-col items-center gap-6 py-10">
                    <button 
                      type="submit" 
                      className="group relative flex w-full max-w-md items-center justify-center gap-3 overflow-hidden rounded-[2rem] bg-[#2b45ba] py-6 text-xl font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-[1.02] hover:bg-[#1e3291] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span>Finalize & Register Partner</span>
                      <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </button>
                    <button type="button" onClick={() => setView('login')} className="group flex items-center gap-2 text-base font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-[#2b45ba]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M15 19l-7-7 7-7" /></svg>
                      Already have an account? Login here
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Login
