import { useState } from 'react'

function Login({ onSignIn }) {
  const [view, setView] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [registerData, setRegisterData] = useState({
    title: 'Mr',
    name: '',
    phone: '',
    email: '',
    alternateNumber: '',
    aadhaar: '',
    pan: '',
    occupation: '',
    rera: '',
    company: '',
    house: '',
    street: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (view === 'login') {
      setFormData((prev) => ({ ...prev, [name]: value }))
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }))
    }
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (view === 'login') {
      if (!formData.email.trim() || !formData.password.trim()) {
        setErrorMessage('Please enter Email and Password.')
        return
      }
      onSignIn?.({ email: formData.email.trim() })
    } else if (view === 'otp') {
      console.log('Getting OTP for:', registerData.phone)
    } else if (view === 'forgot') {
      console.log('Sending reset instructions for:', registerData.email)
      setView('login')
    } else if (view === 'resend_confirmation') {
      console.log('Resending confirmation for:', registerData.email)
      setView('login')
    } else if (view === 'resend_unlock') {
      console.log('Resending unlock instructions for:', registerData.email)
      setView('login')
    } else if (view === 'signup') {
      console.log('Customer Signup:', registerData)
      setView('login')
    } else {
      // Handle registration logic here
      console.log('Registering:', registerData)
      setView('login')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-3 text-[0.98rem] shadow-[0_8px_20px_-18px_#1e3a8a] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100'
  const labelClass = 'text-[0.94rem] font-semibold tracking-[0.01em] text-slate-700'

  return (
    <div className="page-bg-shell font-manrope min-h-screen grid grid-rows-[auto_1fr_auto]">
      <div aria-hidden="true" className="page-bg-orbs">
        <span className="page-bg-orb-left" />
        <span className="page-bg-orb-right" />
        <span className="page-bg-orb-bottom" />
      </div>

      <header className="relative z-20 flex items-center justify-between border-b border-slate-200 px-5 py-4 backdrop-blur md:px-14 md:py-5">
        <div className="flex items-center gap-3">
          <div className="font-sora text-3xl leading-none font-extrabold tracking-[-0.04em] text-brand-blue">MP</div>
          <div className="grid leading-none">
            <strong className="text-sm text-brand-blue">Developers</strong>
            <span className="text-[11px] tracking-[0.2em] text-brand-orange">TRUST FOREVER</span>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => setView('register')}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md ${view === 'register' ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 bg-white text-slate-700'
              }`}
          >
            Register as Channel Partner
          </button>
          <button
            type="button"
            onClick={() => setView('login')}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md ${view === 'login' || view === 'otp' || view === 'forgot' || view === 'signup' || view === 'resend_confirmation' || view === 'resend_unlock' ? 'border-brand-blue bg-brand-blue text-white' : 'border-transparent text-slate-700'
              }`}
          >
            Log in
          </button>
        </div>
      </header>

      <main
        className={`relative z-10 mx-auto grid w-[94vw] max-w-[1320px] gap-12 py-8 ${view === 'login' || view === 'otp' || view === 'forgot' || view === 'signup' || view === 'resend_confirmation' || view === 'resend_unlock' ? 'lg:grid-cols-2 lg:items-center' : 'grid-cols-1'
          }`}
      >
        <section className="hidden flex-col items-center justify-center text-center lg:flex">
          <div className="animate-float flex items-center gap-2 font-sora text-[12rem] font-extrabold leading-none tracking-tighter">
            <span className="text-brand-blue">m</span>
            <span className="text-brand-orange">P</span>
          </div>
          <div className="mt-2 text-5xl font-bold tracking-tight text-brand-blue/90">Developers</div>
          <div className="mt-6 flex gap-4 text-xl font-bold tracking-[0.4em]">
            <span className="text-brand-blue">TRUST</span>
            <span className="text-brand-orange">FOREVER</span>
          </div>
          <p className="mt-12 max-w-[30ch] text-2xl font-medium leading-relaxed text-slate-500">
            Designing your dreams, building your future.
          </p>
        </section>

        <section
          className={`animate-rise relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/85 to-[#eef3ff]/85 p-6 shadow-[0_30px_70px_-35px_#1d2f68] backdrop-blur-xl md:p-8 ${view === 'login' || view === 'otp' || view === 'forgot' || view === 'signup' || view === 'resend_confirmation' || view === 'resend_unlock' ? 'lg:w-full' : 'mx-auto max-w-4xl w-full'
            }`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-14 -top-20 size-44 rounded-full bg-[#8fb7ff]/30 blur-2xl [animation:float_11s_ease-in-out_infinite]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 size-44 rounded-full bg-[#ffc997]/35 blur-2xl [animation:float_13s_ease-in-out_infinite]"
            style={{ animationDelay: '-2s' }}
          />

          {view === 'login' || view === 'otp' || view === 'forgot' || view === 'signup' || view === 'resend_confirmation' || view === 'resend_unlock' ? (
            <>
              {view === 'signup' ? (
                <div className="mb-6">
                  <h1 className="font-sora text-2xl font-bold leading-tight text-sky-600">
                    Biggest real estate opportunity in Pune Introducing exclusive Bed residences starting from ₹ lakhs
                  </h1>
                  <p className="mt-2 text-lg text-slate-600">Home buying can&apos;t get better than this</p>
                  <p className="mt-6 text-xl font-bold text-slate-800">
                    Register Now <span className="font-medium text-slate-600 text-base">to Book Online</span>
                  </p>
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
                  <p className="mb-6 mt-2 max-w-[48ch] text-[1.02rem] leading-relaxed text-slate-600">
                    We value your partnership and are excited to provide the resources you need for successful collaboration.
                  </p>
                </>
              )}

              <form className="grid gap-4" onSubmit={handleSubmit} autoComplete="off">
                {view === 'login' ? (
                  <>
                    <div className="grid gap-1.5">
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <label htmlFor="password" className={labelClass}>
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="new-password"
                        className={inputClass}
                      />
                    </div>
                  </>
                ) : view === 'otp' ? (
                  <div className="grid gap-1.5">
                    <label className={labelClass}>Phone *</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500">
                        <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5" />
                        <span>+91</span>
                      </span>
                      <input
                        name="phone"
                        value={registerData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={`${inputClass} pl-20`}
                        required
                      />
                    </div>
                  </div>
                ) : view === 'signup' ? (
                  <>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>First name *</label>
                      <input
                        name="firstName"
                        value={registerData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Last name *</label>
                      <input
                        name="lastName"
                        value={registerData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Email</label>
                      <input
                        name="email"
                        type="email"
                        value={registerData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Phone</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500">
                          <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5" />
                          <span>+91</span>
                        </span>
                        <input
                          name="phone"
                          value={registerData.phone}
                          onChange={handleChange}
                          placeholder="81234 56789"
                          className={`${inputClass} pl-20`}
                        />
                      </div>
                    </div>
                  </>
                ) : view === 'forgot' || view === 'resend_confirmation' || view === 'resend_unlock' ? (
                  <div className="grid gap-2">
                    <label className="text-[0.94rem] font-bold text-slate-700">{view === 'resend_unlock' ? 'Email' : 'Email / Phone'}</label>
                    <input
                      name="email"
                      value={view === 'resend_unlock' ? registerData.email : formData.email}
                      onChange={handleChange}
                      placeholder={view === 'resend_unlock' ? 'eg. abc@iris.com' : 'Email / Phone'}
                      className="w-full rounded-lg border border-sky-200 bg-white px-3.5 py-3 text-[0.98rem] outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                      required
                    />
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <label className="text-[0.94rem] font-bold text-slate-700">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full rounded-lg border border-sky-200 bg-white px-3.5 py-3 text-[0.98rem] outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                      required
                    />
                  </div>
                )}

                {view === 'login' && (
                  <label className="mt-1 inline-flex items-center gap-2 text-[0.95rem] text-slate-700" htmlFor="stay-logged">
                    <input id="stay-logged" type="checkbox" className="size-4 accent-sky-600" />
                    <span>Keep me logged in</span>
                  </label>
                )}

                <button
                  className="mt-4 rounded-lg bg-[#007ad9] px-3 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#0069ba]"
                  type="submit"
                >
                  {view === 'login'
                    ? 'Sign In'
                    : view === 'otp'
                      ? 'Get OTP'
                      : view === 'forgot'
                        ? 'Send reset password instructions'
                        : view === 'resend_confirmation'
                          ? 'Resend confirmation instructions'
                          : 'Resend unlock instructions'}
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
                  {(view === 'forgot' || view === 'resend_confirmation' || view === 'resend_unlock') && (
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      <p>
                        Already have an account? <span className="font-bold">Login here</span>
                      </p>
                    </button>
                  )}
                  {view === 'otp' && (
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Login with Password instead
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
                  {view === 'forgot' && (
                    <button
                      type="button"
                      onClick={() => setView('signup')}
                      className="text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                    >
                      Sign up
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
                </div>

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
              </form>
            </>
          ) : (
            <div className="animate-fade-in mx-auto w-full max-w-5xl">
              <div className="mb-10 text-center">
                <h1 className="font-sora bg-gradient-to-r from-slate-900 via-brand-blue to-slate-900 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
                  Channel Partner Registration
                </h1>
                <p className="mt-3 text-lg font-medium text-slate-500">
                  Join MP Developers and build the future with us.
                </p>
              </div>

              <form className="grid gap-10" onSubmit={handleSubmit} autoComplete="off">
                <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 backdrop-blur-md md:p-8">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-brand-blue font-sora text-lg font-bold text-white shadow-lg">
                      1
                    </div>
                    <h2 className="font-sora text-xl font-bold tracking-tight text-slate-800">Basic details</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="grid gap-2">
                      <label className={labelClass}>Title</label>
                      <select name="title" value={registerData.title} onChange={handleChange} className={inputClass}>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                      </select>
                    </div>
                    <div className="grid gap-2 md:col-span-1 lg:col-span-2">
                      <label className={labelClass}>Name *</label>
                      <input
                        name="name"
                        value={registerData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Phone *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">+91</span>
                        <input
                          name="phone"
                          value={registerData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className={`${inputClass} pl-14`}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={registerData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Alternate Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">+91</span>
                        <input
                          name="alternateNumber"
                          value={registerData.alternateNumber}
                          onChange={handleChange}
                          placeholder="81234 56789"
                          className={`${inputClass} pl-14`}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Aadhaar *</label>
                      <input
                        name="aadhaar"
                        value={registerData.aadhaar}
                        onChange={handleChange}
                        placeholder="Aadhaar Number"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>PAN Number *</label>
                      <input
                        name="pan"
                        value={registerData.pan}
                        onChange={handleChange}
                        placeholder="PAN Card Number"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Occupation</label>
                      <input
                        name="occupation"
                        value={registerData.occupation}
                        onChange={handleChange}
                        placeholder="Your Occupation"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>RERA Registration Number</label>
                      <input
                        name="rera"
                        value={registerData.rera}
                        onChange={handleChange}
                        placeholder="RERA Number"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>CP Company Name/ CP Name</label>
                      <input
                        name="company"
                        value={registerData.company}
                        onChange={handleChange}
                        placeholder="Company or CP Name"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* Address Section */}
                <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 backdrop-blur-md md:p-8">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-brand-orange font-sora text-lg font-bold text-white shadow-lg">
                      2
                    </div>
                    <h2 className="font-sora text-xl font-bold tracking-tight text-slate-800">Address Details</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <label className={labelClass}>House/Flat/Company</label>
                      <input
                        name="house"
                        value={registerData.house}
                        onChange={handleChange}
                        placeholder="Address Line 1"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Street</label>
                      <input
                        name="street"
                        value={registerData.street}
                        onChange={handleChange}
                        placeholder="Address Line 2"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Country</label>
                      <select name="country" value={registerData.country} onChange={handleChange} className={inputClass}>
                        <option value="">Select country</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>State / Region</label>
                      <select name="state" value={registerData.state} onChange={handleChange} className={inputClass}>
                        <option value="">-</option>
                        <option value="Maharashtra">Maharashtra</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>City</label>
                      <input
                        name="city"
                        value={registerData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className={labelClass}>Zip / Pin Code</label>
                      <input
                        name="zip"
                        value={registerData.zip}
                        onChange={handleChange}
                        placeholder="Pin Code"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                <div className="flex flex-col items-center gap-6 pb-8">
                  <button
                    type="submit"
                    className="group relative h-16 w-full max-w-md overflow-hidden rounded-2xl bg-brand-blue text-lg font-bold text-white shadow-[0_20px_40px_-15px_rgba(29,78,216,0.5)] transition-all hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(29,78,216,0.6)] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full"></div>
                    Register as Partner
                  </button>

                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="group flex items-center gap-2 text-[0.95rem] font-bold text-brand-blue transition-colors hover:text-brand-orange"
                  >
                    <span>Already have an account?</span>
                    <span className="font-bold underline decoration-2 underline-offset-4 group-hover:decoration-brand-orange">Login here</span>
                  </button>
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
