import { useState } from 'react'

function Address({ onClose }) {
  const [toastMessage, setToastMessage] = useState('')
  const [addressForm, setAddressForm] = useState({
    house: '',
    street: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddressForm((prev) => ({ ...prev, [name]: value }))
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 2200)
  }

  const handleSaveAddress = () => {
    showToast('Customer address saved successfully.')
  }

  return (
    <div className="page-bg-shell font-manrope px-3 py-4 md:px-6 md:py-6">
      <div className="page-bg-orbs">
        <span className="page-bg-orb-left" />
        <span className="page-bg-orb-right" />
        <span className="page-bg-orb-bottom" />
      </div>

      <div className="animate-rise relative mx-auto w-full max-w-[980px] overflow-hidden rounded-2xl border border-[#c7d2fe] bg-white/95 shadow-[0_35px_70px_-40px_#253eaf] backdrop-blur">
        <div className="animate-doc-glow flex items-center justify-between bg-gradient-to-r from-[#1f7ed8] to-[#00b8d4] px-4 py-4 md:px-5">
          <h1 className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-[0.01em] text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 10l8-6 8 6v8H4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Address</span>
          </h1>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-md text-2xl font-bold leading-none text-white/90 transition hover:bg-white/20 hover:text-white"
            aria-label="Close address form"
          >
            {'\u00D7'}
          </button>
        </div>

        <form className="space-y-4 p-4 md:p-5" onSubmit={(e) => e.preventDefault()}>
          <section className="animate-fade-slide space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">House/Flat/Company</span>
                <input
                  name="house"
                  value={addressForm.house}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Street</span>
                <input
                  name="street"
                  value={addressForm.street}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Country</span>
                <input
                  name="country"
                  value={addressForm.country}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">State / Region</span>
                <input
                  name="state"
                  value={addressForm.state}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">City</span>
                <input
                  name="city"
                  value={addressForm.city}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">Zip / Pin Code</span>
                <input
                  name="zip"
                  value={addressForm.zip}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-300 focus:ring-3 focus:ring-cyan-100"
                />
              </label>
            </div>
          </section>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleSaveAddress}
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

export default Address
