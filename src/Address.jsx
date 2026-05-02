import { useEffect, useState } from 'react'

const ADDRESS_EDIT_KEY = 'mp-edit-address-info'

function Address({ currentUser, onClose }) {
  const emptyAddressForm = {
    id: '',
    house: '',
    street: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  }

  const [toastMessage, setToastMessage] = useState('')
  const [addressForm, setAddressForm] = useState(emptyAddressForm)

  useEffect(() => {
    const isEditMode = window.sessionStorage.getItem(ADDRESS_EDIT_KEY) === '1'
    window.sessionStorage.removeItem(ADDRESS_EDIT_KEY)

    if (!isEditMode) {
      setAddressForm(emptyAddressForm)
      return
    }

    const userEmail = currentUser?.email || ''
    const applySavedAddress = (savedAddress) => {
      if (!savedAddress) return
      setAddressForm((prev) => ({
        ...prev,
        ...savedAddress,
        id: savedAddress.id || '',
      }))
    }

    const getLatestForUser = (items) => {
      if (!Array.isArray(items)) return null
      return [...items].reverse().find((item) => item.userEmail === userEmail) || null
    }

    fetch('http://localhost:3000/addressInfo')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Unable to load address details'))))
      .then((items) => applySavedAddress(getLatestForUser(items)))
      .catch(() => {
        const localItems = JSON.parse(window.localStorage.getItem('mp_address_info') || '[]')
        applySavedAddress(getLatestForUser(localItems))
      })
  }, [currentUser?.email])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddressForm((prev) => ({ ...prev, [name]: value }))
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 2200)
  }

  const handleSaveAddress = (e) => {
    e.preventDefault()

    const isExistingRecord = Boolean(addressForm.id)
    const payload = {
      ...addressForm,
      id: addressForm.id || Date.now().toString(),
      userEmail: currentUser?.email || '',
      updatedAt: new Date().toISOString()
    }

    fetch(`http://localhost:3000/addressInfo${isExistingRecord ? `/${addressForm.id}` : ''}`, {
      method: isExistingRecord ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(() => {
        showToast('Location records updated successfully.')
        setTimeout(onClose, 1000)
      })
      .catch((err) => {
        console.error('API Error, saving locally:', err)
        const localData = JSON.parse(window.localStorage.getItem('mp_address_info') || '[]')
        const existingIndex = localData.findIndex((item) => item.id === payload.id)
        const nextData = existingIndex >= 0
          ? localData.map((item) => item.id === payload.id ? payload : item)
          : [...localData, payload]
        window.localStorage.setItem('mp_address_info', JSON.stringify(nextData))
        showToast('Saved locally (Offline mode).')
        setTimeout(onClose, 1000)
      })
  }

  const inputClasses = "w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-[15px] font-medium text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-brand-blue/50 focus:bg-white focus:ring-4 focus:ring-brand-blue/5"
  const labelClasses = "block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-2 ml-1"

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col bg-slate-50 animate-nav-enter font-manrope">
      {/* Portal Header */}
      <header className="relative flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-10">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-sora text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">Address Details</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Geographic Location & Delivery Records</p>
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

      <form onSubmit={handleSaveAddress} autoComplete="off" className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-[95%] lg:max-w-[800px] px-6 py-6 md:px-10 md:py-8">
          <section className="animate-rise rounded-[2.5rem] border border-white bg-white/60 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm md:p-12">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 shadow-inner">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="font-sora text-lg font-bold text-slate-800">Location Information</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Please provide the complete registered address</p>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <label className={labelClasses}>House / Flat / Company Name</label>
                <input name="house" value={addressForm.house} onChange={handleChange} placeholder="Unit or Building details" className={inputClasses} />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className={labelClasses}>Street & Area</label>
                <input name="street" value={addressForm.street} onChange={handleChange} placeholder="Locality or Landmark" className={inputClasses} />
              </div>

              <div className="space-y-1.5">
                <label className={labelClasses}>Country</label>
                <input name="country" value={addressForm.country} onChange={handleChange} placeholder="e.g. India" className={inputClasses} />
              </div>

              <div className="space-y-1.5">
                <label className={labelClasses}>State / Region</label>
                <input name="state" value={addressForm.state} onChange={handleChange} placeholder="e.g. Maharashtra" className={inputClasses} />
              </div>

              <div className="space-y-1.5">
                <label className={labelClasses}>City</label>
                <input name="city" value={addressForm.city} onChange={handleChange} placeholder="Enter city name" className={inputClasses} />
              </div>

              <div className="space-y-1.5">
                <label className={labelClasses}>Zip / Pin Code</label>
                <input name="zip" value={addressForm.zip} onChange={handleChange} placeholder="6-digit PIN" className={inputClasses} />
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-100 pt-10 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-2xl border border-slate-200 py-4 px-8 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700 sm:w-auto"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="relative w-full overflow-hidden rounded-2xl bg-brand-blue py-4 px-10 text-sm font-bold text-white shadow-xl shadow-brand-blue/20 transition-all hover:-translate-y-1 hover:bg-brand-blue/90 active:scale-95 sm:w-auto"
              >
                Save Location Details
              </button>
            </div>
          </section>
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

export default Address
