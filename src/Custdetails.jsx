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

  const handleSave = () => {
    showToast('Customer details saved successfully.')
  }

  return (
    <div className="page-bg-shell font-manrope px-3 py-4 md:px-6 md:py-6">
      <div className="page-bg-orbs">
        <span className="page-bg-orb-left" />
        <span className="page-bg-orb-right" />
        <span className="page-bg-orb-bottom" />
      </div>

      <div className="animate-rise relative mx-auto w-full max-w-[980px] overflow-hidden rounded-2xl border border-[#c7d2fe] bg-white/95 shadow-[0_35px_70px_-40px_#253eaf] backdrop-blur">
        <div className="animate-doc-glow flex items-center justify-between bg-gradient-to-r from-[#7a6af2] to-[#9d7af5] px-4 py-4 md:px-5">
          <h1 className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-[0.01em] text-white">
            <span>Customer Details</span>
          </h1>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-md text-2xl font-bold leading-none text-white/90 transition hover:bg-white/20 hover:text-white"
            aria-label="Close customer detail form"
          >
            {'\u00D7'}
          </button>
        </div>

        <form className="space-y-4 p-4 md:p-5" onSubmit={(e) => e.preventDefault()}>
          <section className="animate-fade-slide space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Title</span>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                >
                  <option value="" />
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="ms">Ms</option>
                  <option value="dr">Dr</option>
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Name *</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Phone *</span>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Email *</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Alternate Number</span>
                <input
                  name="altPhone"
                  value={formData.altPhone}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Aadhaar *</span>
                <input
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">PAN Number *</span>
                <input
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Occupation</span>
                <input
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">RERA Registration Number</span>
                <input
                  name="rera"
                  value={formData.rera}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">CP Company Name/ CP Name</span>
                <input
                  name="cpCompany"
                  value={formData.cpCompany}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100"
                />
              </label>

              <div className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Is GST Applicable? *</span>
                <div className="flex items-center gap-4 text-sm text-slate-700">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="gstApplicable"
                      value="yes"
                      checked={formData.gstApplicable === 'yes'}
                      onChange={handleChange}
                      className="accent-violet-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="gstApplicable"
                      value="no"
                      checked={formData.gstApplicable === 'no'}
                      onChange={handleChange}
                      className="accent-violet-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">GST Number</span>
                <input
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  disabled={formData.gstApplicable !== 'yes'}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-3 focus:ring-violet-100 disabled:bg-slate-100"
                />
              </label>
            </div>
          </section>

          <section className="animate-fade-slide overflow-hidden rounded-2xl border border-[#c7d2fe] bg-white shadow-[0_16px_36px_-30px_#253eaf]">
            <div className="bg-gradient-to-r from-[#1f7ed8] to-[#00b8d4] px-4 py-3 text-white">
              <h2 className="text-lg font-bold">Bank Details</h2>
            </div>
            <div className="grid gap-4 p-4 md:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Bank Name</span>
                <input
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Branch</span>
                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Account Type</span>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                >
                  <option value="" />
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                  <option value="salary">Salary</option>
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">IFSC Code</span>
                <input
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Account Holder&apos;s Name</span>
                <input
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Account Number</span>
                <input
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Zip / Pin Code</span>
                <input
                  name="bankZip"
                  value={formData.bankZip}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>
            </div>
          </section>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-[#1783c5] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0f6fb0]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back
            </button>
          </div>
        </form>
      </div>

      {toastMessage && (
        <div className="fixed right-4 top-5 z-[320] rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default Custdetails
