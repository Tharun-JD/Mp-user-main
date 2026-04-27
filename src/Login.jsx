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

  useEffect(() => {
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
      alert('Registration submitted successfully!')
      setView('login')
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
            onClick={() => setView('register')}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md ${view === 'register' ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 bg-white text-slate-700'}`}
          >
            Register as Channel Partner
          </button>
          <button
            type="button"
            onClick={() => setView('login')}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md ${isLoginRelatedView ? 'border-brand-blue bg-brand-blue text-white' : 'border-transparent text-slate-700'}`}
          >
            Log in
          </button>
        </div>
      </header>

      <main className={`relative z-10 mx-auto grid w-full max-w-[1536px] px-5 md:px-14 gap-8 py-8 ${isLoginRelatedView ? 'lg:grid-cols-2 lg:items-center' : 'grid-cols-1'}`}>
        <section className="hidden flex-col items-center justify-center text-center lg:flex">
          <div className="animate-float flex items-center justify-center">
            <img src="/logo.png" alt="MP Developers" className="w-full max-w-[480px] drop-shadow-2xl" />
          </div>
          <p className="mt-12 max-w-[30ch] text-2xl font-medium leading-relaxed text-slate-500">
            Designing your dreams, building your future.
          </p>
        </section>

        <section className={`animate-rise relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/85 to-[#eef3ff]/85 p-6 shadow-[0_30px_70px_-35px_#1d2f68] backdrop-blur-xl md:p-8 ${isLoginRelatedView ? 'lg:w-full' : 'mx-auto max-w-5xl w-full'}`}>
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
                      onClick={() => setView('otp')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Login with OTP instead
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
                  {view !== 'forgot' && (
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Forgot your password?
                    </button>
                  )}
                  {view !== 'resend_confirmation' && (
                    <button
                      type="button"
                      onClick={() => setView('resend_confirmation')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Didn&apos;t receive confirmation instructions?
                    </button>
                  )}
                  {view !== 'resend_unlock' && (
                    <button
                      type="button"
                      onClick={() => setView('resend_unlock')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Didn&apos;t receive unlock instructions?
                    </button>
                  )}
                  {view === 'login' && (
                    <p className="mt-6 text-[0.95rem] font-bold text-brand-blue">
                      Don&apos;t have account ?{' '}
                      <button
                        type="button"
                        onClick={() => setView('register')}
                        className="font-bold transition-colors hover:text-brand-orange"
                      >
                        Sign Up
                      </button>
                    </p>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="relative z-10 animate-fade-in mx-auto w-full">
              <div className="mb-10 text-center">
                <h1 className="font-sora bg-gradient-to-r from-slate-900 via-brand-blue to-slate-900 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">Channel Partner Registration</h1>
                <p className="mt-3 text-lg font-medium text-slate-500">Join MP Developers and build the future with us.</p>
              </div>

              <form className="flex flex-col h-[70vh]" onSubmit={handleSubmit} autoComplete="off">
                <div className="flex-1 overflow-y-auto space-y-10 px-1 py-4 no-scrollbar">
                  {/* Basic Profile */}
                  <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 backdrop-blur-md md:p-8">
                    <div className="mb-8 flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-brand-blue font-sora text-lg font-bold text-white shadow-lg">1</div>
                      <h2 className="font-sora text-xl font-bold tracking-tight text-slate-800">Basic Profile</h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <div className="md:col-span-1 lg:col-span-3 grid gap-2">
                        <label className={labelClass}>Company / CP Name *</label>
                        <input type="text" value={registerData.companyName} onChange={(e) => handleRegisterFieldChange('companyName', e.target.value)} className={inputClass} placeholder="Legal Business Name" required />
                      </div>
                      <div className="grid gap-2">
                        <label className={labelClass}>Owner Name *</label>
                        <input type="text" value={registerData.name} onChange={(e) => handleRegisterFieldChange('name', e.target.value)} className={inputClass} placeholder="Full Name" required />
                      </div>
                      <div className="grid gap-2">
                        <label className={labelClass}>Phone *</label>
                        <div className="flex gap-2">
                          <input type="text" value={registerData.phonePrefix} onChange={(e) => handleRegisterFieldChange('phonePrefix', e.target.value)} className="w-20 text-center rounded-xl border border-slate-200 bg-white/90 px-2 py-3 font-bold text-slate-700" />
                          <input type="text" value={registerData.phone} onChange={(e) => handleRegisterFieldChange('phone', e.target.value)} className={inputClass} placeholder="Number" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className={labelClass}>Email *</label>
                        <input type="email" value={registerData.email} onChange={(e) => handleRegisterFieldChange('email', e.target.value)} className={inputClass} placeholder="email@example.com" required />
                      </div>
                      <div className="grid gap-2">
                        <label className={labelClass}>Aadhaar *</label>
                        <input type="text" value={registerData.aadhaar} onChange={(e) => handleRegisterFieldChange('aadhaar', e.target.value)} className={inputClass} placeholder="12-digit Aadhaar" required />
                      </div>
                      <div className="grid gap-2">
                        <label className={labelClass}>PAN Number *</label>
                        <input type="text" value={registerData.pan} onChange={(e) => handleRegisterFieldChange('pan', e.target.value)} className={inputClass} placeholder="ABCDE1234F" required />
                      </div>
                      <div className="grid gap-2">
                        <label className={labelClass}>RERA Number</label>
                        <input type="text" value={registerData.rera} onChange={(e) => handleRegisterFieldChange('rera', e.target.value)} className={inputClass} placeholder="RERA Registration" />
                      </div>
                    </div>
                  </section>

                  {/* GST & Bank */}
                  <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-slate-50/50 p-6 backdrop-blur-md md:p-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        <label className={labelClass}>Is GST Applicable? *</label>
                        <div className="flex gap-4">
                          {['Yes', 'No'].map(val => (
                            <button key={val} type="button" onClick={() => handleRegisterFieldChange('gstApplicable', val)} className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${registerData.gstApplicable === val ? 'bg-brand-blue text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>{val}</button>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className={labelClass}>GST Number</label>
                        <input type="text" disabled={registerData.gstApplicable === 'No'} value={registerData.gstNumber} onChange={(e) => handleRegisterFieldChange('gstNumber', e.target.value)} className={inputClass} placeholder="15-digit GSTIN" />
                      </div>
                    </div>
                  </section>

                  {/* Bank Details */}
                  <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 backdrop-blur-md md:p-8">
                    <div className="mb-8 flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500 font-sora text-lg font-bold text-white shadow-lg">2</div>
                      <h2 className="font-sora text-xl font-bold tracking-tight text-slate-800">Bank Details</h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <input type="text" value={registerData.bankName} onChange={(e) => handleRegisterFieldChange('bankName', e.target.value)} className={inputClass} placeholder="Bank Name" />
                      <input type="text" value={registerData.accountNumber} onChange={(e) => handleRegisterFieldChange('accountNumber', e.target.value)} className={inputClass} placeholder="Account Number" />
                      <input type="text" value={registerData.ifsc} onChange={(e) => handleRegisterFieldChange('ifsc', e.target.value)} className={inputClass} placeholder="IFSC Code" />
                    </div>
                  </section>

                  {/* KYC Verification */}
                  <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-slate-50/50 p-6 backdrop-blur-md md:p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <h2 className="font-sora text-xl font-bold text-slate-800">KYC VERIFICATION</h2>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black text-orange-600 border border-orange-100">MANDATORY</span>
                    </div>
                    <div className="space-y-6">
                      <select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold">
                        {documentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <div onClick={() => document.getElementById('final-doc-upload').click()} className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 p-10 text-center hover:border-brand-blue hover:bg-brand-blue/5 transition-all">
                        <input id="final-doc-upload" type="file" multiple className="hidden" onChange={handleUploadDocs} />
                        <div className="flex flex-col items-center">
                          <svg className="h-10 w-10 text-brand-blue mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m8-8H4" /></svg>
                          <p className="text-sm font-bold text-slate-600">Click to Upload Documents</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {registerData.uploadDocuments?.map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 border border-slate-100 shadow-sm">
                            <span className="text-[10px] font-black text-brand-blue">{doc.type}</span>
                            <span className="text-xs font-bold text-slate-700 truncate max-w-[100px]">{doc.name}</span>
                            <button type="button" onClick={() => handleRemoveDoc(idx)} className="text-rose-500 font-bold">&times;</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Address */}
                  <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 backdrop-blur-md md:p-8">
                    <div className="mb-8 flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500 font-sora text-lg font-bold text-white shadow-lg">3</div>
                      <h2 className="font-sora text-xl font-bold tracking-tight text-slate-800">Address Details</h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <input type="text" value={registerData.house} onChange={(e) => handleRegisterFieldChange('house', e.target.value)} className={inputClass} placeholder="House / Flat / Company" required />
                      <input type="text" value={registerData.street} onChange={(e) => handleRegisterFieldChange('street', e.target.value)} className={inputClass} placeholder="Street / Area" required />
                      <input type="text" value={registerData.city} onChange={(e) => handleRegisterFieldChange('city', e.target.value)} className={inputClass} placeholder="City" required />
                      <input type="text" value={registerData.zip} onChange={(e) => handleRegisterFieldChange('zip', e.target.value)} className={inputClass} placeholder="Pin Code" required />
                      <select value={registerData.country} onChange={(e) => handleRegisterFieldChange('country', e.target.value)} className={inputClass}>
                        <option value="India">India</option>
                        {countryList.filter(c => c.name !== 'India').map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                      </select>
                      <input type="text" value={registerData.state} onChange={(e) => handleRegisterFieldChange('state', e.target.value)} className={inputClass} placeholder="State" required />
                    </div>
                  </section>
                </div>

                <div className="flex flex-col items-center gap-4 pt-6 border-t border-slate-100 bg-white/50 backdrop-blur-sm -mx-8 px-8">
                  <button type="submit" className="w-full max-w-md rounded-2xl bg-brand-blue py-4 text-lg font-bold text-white shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
                    Finalize & Register Partner
                  </button>
                  <button type="button" onClick={() => setView('login')} className="text-sm font-bold text-slate-400 hover:text-brand-blue">Already have an account? Login here</button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-20 border-t border-slate-200 bg-white/80 px-14 py-6 backdrop-blur-md">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} MP Developers. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Login
