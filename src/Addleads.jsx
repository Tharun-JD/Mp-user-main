import { useEffect, useMemo, useRef, useState } from 'react'

const countryCodes = [
  { name: 'UAE', dial: '+971' },
  { name: 'Argentina', dial: '+54' },
  { name: 'Australia', dial: '+61' },
  { name: 'Austria', dial: '+43' },
  { name: 'Bangladesh', dial: '+880' },
  { name: 'Belgium', dial: '+32' },
  { name: 'Brazil', dial: '+55' },
  { name: 'Canada', dial: '+1' },
  { name: 'China', dial: '+86' },
  { name: 'Denmark', dial: '+45' },
  { name: 'Egypt', dial: '+20' },
  { name: 'Finland', dial: '+358' },
  { name: 'France', dial: '+33' },
  { name: 'Germany', dial: '+49' },
  { name: 'Greece', dial: '+30' },
  { name: 'Hong Kong', dial: '+852' },
  { name: 'India', dial: '+91' },
  { name: 'Indonesia', dial: '+62' },
  { name: 'Ireland', dial: '+353' },
  { name: 'Israel', dial: '+972' },
  { name: 'Italy', dial: '+39' },
  { name: 'Japan', dial: '+81' },
  { name: 'Kenya', dial: '+254' },
  { name: 'Malaysia', dial: '+60' },
  { name: 'Mexico', dial: '+52' },
  { name: 'Netherlands', dial: '+31' },
  { name: 'New Zealand', dial: '+64' },
  { name: 'Nigeria', dial: '+234' },
  { name: 'Norway', dial: '+47' },
  { name: 'Pakistan', dial: '+92' },
  { name: 'Philippines', dial: '+63' },
  { name: 'Portugal', dial: '+351' },
  { name: 'Qatar', dial: '+974' },
  { name: 'Russia', dial: '+7' },
  { name: 'Saudi Arabia', dial: '+966' },
  { name: 'Singapore', dial: '+65' },
  { name: 'South Africa', dial: '+27' },
  { name: 'South Korea', dial: '+82' },
  { name: 'Spain', dial: '+34' },
  { name: 'Sri Lanka', dial: '+94' },
  { name: 'Sweden', dial: '+46' },
  { name: 'Switzerland', dial: '+41' },
  { name: 'Thailand', dial: '+66' },
  { name: 'Turkey', dial: '+90' },
  { name: 'United Kingdom', dial: '+44' },
  { name: 'United States', dial: '+1' },
  { name: 'Vietnam', dial: '+84' },
]

const projects = ['MP Amber', 'MP Bodhi', 'MP Heights', 'MP Elite', 'MP Greenview']
const configurations = ['Studio', '1 BHK', '2 BHK', '3 BHK', 'Villa']
const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Office']
const documentTypes = ['PAN Card', 'Aadhaar Card', 'Passport', 'Driving License']

function Addleads({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    project: projects[0],
    budget: 50,
    location: '',
    configuration: configurations[1],
    propertyType: propertyTypes[0],
  })
  const [selectedDocumentType, setSelectedDocumentType] = useState(documentTypes[0])
  const [uploadedDocuments, setUploadedDocuments] = useState({})
  const fileInputRef = useRef(null)

  const budgetLabel = useMemo(() => `INR ${formData.budget} Lakh`, [formData.budget])

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+91',
      phone: '',
      project: projects[0],
      budget: 50,
      location: '',
      configuration: configurations[1],
      propertyType: propertyTypes[0],
    })
    setSelectedDocumentType(documentTypes[0])
    setUploadedDocuments({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave?.(formData)
    resetForm()
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

  const inputClasses = "w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-[15px] font-medium text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-brand-blue/50 focus:bg-white focus:ring-4 focus:ring-brand-blue/5"
  const labelClasses = "block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2 ml-1"

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col bg-slate-50 animate-nav-enter font-manrope">
      {/* Top Header Bar - Full Screen Style */}
      <header className="relative flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-10">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-[#4d69ff] shadow-lg shadow-brand-blue/20">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-sora text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Create New Lead</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Partner Property Acquisition Portal</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="group flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-rose-50 hover:text-rose-600"
        >
          <span>Cancel</span>
          <svg className="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <form onSubmit={handleSubmit} autoComplete="off" className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-[95%] lg:max-w-[860px] px-6 py-6 md:px-10 md:py-8">
          <div className="space-y-10">

            {/* Left Column - Main Form Fields */}
            <div className="space-y-10">
              <section className="animate-rise rounded-[2rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-sm md:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-blue"></div>
                  <h3 className="font-sora text-sm font-bold uppercase tracking-widest text-slate-800">Primary Information</h3>
                </div>

                <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={labelClasses}>First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className={labelClasses}>Contact Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="client.name@example.com"
                        className={`${inputClasses} pl-12`}
                      />
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className={labelClasses}>Mobile Number</label>
                    <div className="flex gap-3">
                      <div className="w-[140px] shrink-0">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className={inputClasses}
                        >
                          {countryCodes.map((country) => (
                            <option key={`${country.name}-${country.dial}`} value={country.dial}>
                              {country.dial} ({country.name})
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="00000 00000"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="animate-rise rounded-[2rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-sm md:p-10" style={{ animationDelay: '100ms' }}>
                <div className="mb-8 flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-orange"></div>
                  <h3 className="font-sora text-sm font-bold uppercase tracking-widest text-slate-800">Property Interest</h3>
                </div>

                <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={labelClasses}>Select Project</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      {projects.map((project) => (
                        <option key={project} value={project}>
                          {project}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Desired Location</label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City or locality preference"
                      className={inputClasses}
                    />
                  </div>

                  {/* Budget Section with Only Manual Entry */}
                  <div className="md:col-span-2 space-y-2">
                    <label className={labelClasses}>Budget Range (in Lakhs)</label>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          min="5"
                          max="500"
                          placeholder="e.g. 50"
                          className={`${inputClasses} pr-16`}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none border-l border-slate-200 pl-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lakh</span>
                        </div>
                      </div>
                      <div className="flex h-12 items-center rounded-xl bg-slate-100 px-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">INR</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Unit Configuration</label>
                    <select
                      name="configuration"
                      value={formData.configuration}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      {configurations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      {propertyTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
              {/* Action Buttons */}
              <div className="mt-12 flex flex-col gap-4 border-t border-slate-100 pt-10 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-2xl border border-slate-200 py-4 px-8 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700 sm:w-auto"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-2xl bg-brand-blue py-4 px-10 text-sm font-bold text-white shadow-xl shadow-brand-blue/20 transition-all hover:-translate-y-1 hover:bg-brand-blue/90 active:scale-95 sm:w-auto"
                >
                  Finalize & Create Lead
                </button>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default Addleads
