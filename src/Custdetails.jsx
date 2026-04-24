import { useState } from 'react'

function Custdetails({ onClose }) {
  const [toastMessage, setToastMessage] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    phone: '',
    email: '',
    altPhone: '',
    aadhaar: '',
    pan: '',
    occupation: '',
    rera: '',
    cpCompany: '',
    gstApplicable: 'no',
    gstNumber: '',
    bankName: '',
    branch: '',
    accountType: '',
    ifsc: '',
    accountHolder: '',
    accountNumber: '',
    bankZip: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 2200)
  }

  const handleSave = (e) => {
    e.preventDefault()
    showToast('Customer records updated successfully.')
  }

  const inputClasses = "w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-[15px] font-medium text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-brand-blue/50 focus:bg-white focus:ring-4 focus:ring-brand-blue/5"
  const labelClasses = "block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2 ml-1"

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col bg-slate-50 animate-nav-enter font-manrope">
      {/* Portal Header */}
      <header className="relative flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-10">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-brand-blue shadow-lg shadow-indigo-200">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 7a4 4 0 110 8 4 4 0 010-8zm10 5h4m-2-2v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-sora text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Customer Details</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Partner Compliance & Identity Manager</p>
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

      <form onSubmit={handleSave} autoComplete="off" className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
        <div className="w-full px-6 py-8 md:px-12 md:py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">

            {/* Main Form Sections */}
            <div className="space-y-10">
              {/* Primary Identity Section */}
              <section className="animate-rise rounded-[2.5rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-sm md:p-10">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sora text-base font-bold text-slate-800">Primary Identity</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Legal Name & Identification</p>
                  </div>
                </div>

                <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={labelClasses}>Salutation</label>
                    <select name="title" value={formData.title} onChange={handleChange} className={inputClasses}>
                      <option value="">Select Title</option>
                      <option value="mr">Mr.</option>
                      <option value="mrs">Mrs.</option>
                      <option value="ms">Ms.</option>
                      <option value="dr">Dr.</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Full Name *</label>
                    <input name="name" value={formData.name} onChange={handleChange} required placeholder="Enter complete name" className={inputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Primary Phone *</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Mobile number" className={inputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Email Address *</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" className={inputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Alternate Contact</label>
                    <input name="altPhone" value={formData.altPhone} onChange={handleChange} placeholder="Secondary number" className={inputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Aadhaar Number *</label>
                    <input name="aadhaar" value={formData.aadhaar} onChange={handleChange} required placeholder="12-digit number" className={inputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>PAN Card Number *</label>
                    <input name="pan" value={formData.pan} onChange={handleChange} required placeholder="Permanent Account Number" className={inputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>Occupation</label>
                    <input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Current profession" className={inputClasses} />
                  </div>
                </div>
              </section>

              {/* Compliance Section */}
              <section className="animate-rise rounded-[2.5rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-sm md:p-10" style={{ animationDelay: '100ms' }}>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sora text-base font-bold text-slate-800">Compliance & Registration</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">RERA & GST Records</p>
                  </div>
                </div>

                <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={labelClasses}>RERA Registration</label>
                    <input name="rera" value={formData.rera} onChange={handleChange} placeholder="RERA ID" className={inputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClasses}>CP Company Name</label>
                    <input name="cpCompany" value={formData.cpCompany} onChange={handleChange} placeholder="Organization name" className={inputClasses} />
                  </div>

                  <div className="space-y-4 rounded-3xl bg-white p-6 border border-slate-100 shadow-sm md:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Is GST Applicable? *</span>
                      <div className="flex gap-4">
                        {['yes', 'no'].map((opt) => (
                          <label key={opt} className="flex cursor-pointer items-center gap-2 group">
                            <input
                              type="radio" name="gstApplicable" value={opt}
                              checked={formData.gstApplicable === opt}
                              onChange={handleChange}
                              className="size-4 accent-brand-blue"
                            />
                            <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${formData.gstApplicable === opt ? 'text-brand-blue' : 'text-slate-400 group-hover:text-slate-600'}`}>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {formData.gstApplicable === 'yes' && (
                      <div className="mt-4 animate-fade-slide">
                        <label className={labelClasses}>GST Number</label>
                        <input name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="Enter 15-digit GSTIN" className={inputClasses} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar - Settlement Details */}
            <div className="space-y-8">
              <section className="animate-rise sticky top-8 rounded-[2.5rem] border border-white bg-white p-6 shadow-sm md:p-8" style={{ animationDelay: '200ms' }}>
                <div className="mb-6 flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sora text-sm font-bold text-slate-800">Settlement Data</h3>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Bank & Remittance Details</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className={labelClasses}>Bank Name</label>
                    <input name="bankName" value={formData.bankName} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClasses}>IFSC Code</label>
                    <input name="ifsc" value={formData.ifsc} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClasses}>Account Type</label>
                    <select name="accountType" value={formData.accountType} onChange={handleChange} className={inputClasses}>
                      <option value="">Select Type</option>
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                      <option value="salary">Salary</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClasses}>Account Number</label>
                    <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClasses}>Zip Code</label>
                    <input name="bankZip" value={formData.bankZip} onChange={handleChange} className={inputClasses} />
                  </div>

                  <div className="mt-10 space-y-3 pt-6">
                    <button
                      type="submit"
                      className="relative w-full overflow-hidden rounded-2xl bg-brand-blue py-4 text-sm font-bold text-white shadow-xl shadow-brand-blue/20 transition-all hover:-translate-y-1 hover:bg-brand-blue/90 active:scale-95"
                    >
                      Update Records
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full rounded-2xl border border-slate-200 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </form>

      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 z-[1100] -translate-x-1/2 animate-rise rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-emerald-200">
          <div className="flex items-center gap-3">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  )
}

export default Custdetails
