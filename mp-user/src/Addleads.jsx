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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-[1px]">
      <div className="relative absolute left-3 top-3 h-[calc(100%-1.5rem)] w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-30px_#0f172a] md:left-5 md:top-5 md:h-[calc(100%-2.5rem)]">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#3650c8] to-[#8b46cd] px-4 py-3">
          <h2 className="font-sora inline-flex items-center gap-2 text-xl font-semibold text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Add Lead Form</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="h-[calc(100%-3.2rem)] overflow-y-auto p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">First Name</span>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Last Name</span>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Phone Number</span>
              <div className="grid grid-cols-[minmax(120px,220px)_1fr] gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-2 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
                >
                  {countryCodes.map((country) => (
                    <option key={`${country.name}-${country.dial}`} value={country.dial}>
                      {country.name} ({country.dial})
                    </option>
                  ))}
                </select>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  autoComplete="off"
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
                />
              </div>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Project</span>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              >
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Location</span>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Area"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5 md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Budget Range</span>
                <span className="text-sm font-semibold text-brand-blue">{budgetLabel}</span>
              </div>
              <input
                type="number"
                name="budget"
                min="5"
                max="500"
                step="1"
                value={formData.budget}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
                aria-label="Budget in Lakh"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Configuration Type</span>
              <select
                name="configuration"
                value={formData.configuration}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              >
                {configurations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Property Type</span>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              >
                {propertyTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <div className="animate-rise md:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 shadow-[0_20px_40px_-34px_#0f766e]">
                <div className="bg-gradient-to-r from-cyan-600 to-emerald-500 px-4 py-2.5">
                  <h3 className="font-sora text-base font-semibold text-white">Document</h3>
                </div>

                <div className="space-y-3 px-4 py-4">
                  <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                    <select
                      value={selectedDocumentType}
                      onChange={(e) => setSelectedDocumentType(e.target.value)}
                      className="rounded-lg border border-cyan-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 focus:ring-3 focus:ring-cyan-100"
                    >
                      {documentTypes.map((documentType) => (
                        <option key={documentType} value={documentType}>
                          {documentType}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-700"
                    >
                      Upload
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                  </div>

                  <p className="text-xs text-slate-600">
                    Upload documents in formats: <span className="font-semibold">jpg, jpeg, png, pdf</span>
                  </p>

                  <div className="space-y-2.5">
                    {Object.keys(uploadedDocuments).length === 0 ? (
                      <div className="rounded-xl border border-dashed border-cyan-300 bg-white/75 px-3 py-5 text-center text-sm text-slate-500">
                        No documents uploaded yet.
                      </div>
                    ) : (
                      Object.entries(uploadedDocuments).map(([docType, files]) => (
                        <div
                          key={docType}
                          className="animate-fade-slide rounded-xl border border-cyan-100 bg-white px-3 py-3 shadow-[0_12px_24px_-28px_#0f766e]"
                        >
                          <h4 className="text-sm font-semibold text-cyan-800">{docType}</h4>
                          <ul className="mt-2 space-y-1.5">
                            {files.map((file) => (
                              <li
                                key={`${docType}-${file.name}-${file.lastModified}`}
                                className="rounded-md bg-cyan-50/70 px-2.5 py-1.5 text-xs text-slate-700"
                              >
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-700 shadow-[0_10px_20px_-18px_#f43f5e] transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100 hover:shadow-[0_16px_28px_-18px_#f43f5e]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_#1e40af] transition hover:-translate-y-0.5 hover:bg-[#1f37a2]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addleads

