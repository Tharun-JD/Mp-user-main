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

        <div className="hidden items-center gap-6 sm:flex">
          <button
            type="button"
            className="text-sm font-bold text-[#007ad9] transition-all hover:scale-105 hover:text-[#005fa8]"
          >
            Home
          </button>
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
        className={`relative z-10 mx-auto grid w-[94vw] max-w-[1320px] gap-9 py-8 ${view === 'login' || view === 'otp' || view === 'forgot' || view === 'signup' || view === 'resend_confirmation' || view === 'resend_unlock' ? 'lg:grid-cols-[minmax(350px,540px)_1fr] lg:items-center' : 'grid-cols-1'
          }`}
      >
        <section
          className={`animate-rise relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/85 to-[#eef3ff]/85 p-6 shadow-[0_30px_70px_-35px_#1d2f68] backdrop-blur-xl md:p-8 ${view === 'login' || view === 'otp' || view === 'forgot' || view === 'signup' || view === 'resend_confirmation' || view === 'resend_unlock' ? 'lg:order-2 lg:ml-auto lg:w-full' : 'mx-auto max-w-4xl w-full'
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
                    : view === 'resend_unlock'
                    ? 'Resend unlock instructions'
                    : 'Sign up'}
                </button>

                {errorMessage && <p className="text-sm font-semibold text-rose-600">{errorMessage}</p>}

                <div className="mt-4 flex flex-col items-start gap-1">
                  {(view === 'login' || view === 'forgot' || view === 'signup' || view === 'resend_confirmation' || view === 'resend_unlock') && (
                    <button
                      type="button"
                      onClick={() => setView(view === 'login' ? 'otp' : 'login')}
                      className="text-[0.9rem] text-slate-400 hover:underline"
                    >
                      {view === 'login' ? (
                        'Login with OTP instead'
                      ) : (
                        <p>
                          Already have an account? <span className="font-bold text-slate-600 underline">Login here</span>
                        </p>
                      )}
                    </button>
                  )}
                  {view === 'otp' && (
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-[0.9rem] text-slate-400 hover:underline"
                    >
                      Login with Password instead
                    </button>
                  )}
                  {view !== 'forgot' && view !== 'signup' && (
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-[0.9rem] text-slate-400 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  )}
                  {(view === 'forgot' || view === 'login' || view === 'resend_confirmation' || view === 'resend_unlock') && (
                    <button
                      type="button"
                      onClick={() => setView('signup')}
                      className="text-[0.9rem] text-slate-400 hover:underline"
                    >
                      Sign up
                    </button>
                  )}
                  {view !== 'signup' && view !== 'resend_confirmation' && (
                    <button
                      type="button"
                      onClick={() => setView('resend_confirmation')}
                      className="text-[0.9rem] text-slate-400 hover:underline"
                    >
                      Didn&apos;t receive confirmation instructions?
                    </button>
                  )}
                  {view !== 'signup' && view !== 'resend_unlock' && (
                    <button
                      type="button"
                      onClick={() => setView('resend_unlock')}
                      className="text-[0.9rem] text-slate-400 hover:underline"
                    >
                      Didn&apos;t receive unlock instructions?
                    </button>
                  )}
                </div>

                {view === 'login' && (
                  <p className="mt-4 text-[0.95rem] font-bold text-brand-blue/80">
                    Don&apos;t have account ?{' '}
                    <button
                      type="button"
                      onClick={() => setView('signup')}
                      className="font-bold text-brand-orange transition hover:text-brand-blue"
                    >
                      Sign Up
                    </button>
                  </p>
                )}
              </form>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="font-sora text-2xl font-bold text-sky-600">Welcome to the Channel Partner Login for MP Developers!</h1>
                <p className="mt-2 text-slate-600">
                  We value your partnership and are excited to provide you with the resources you need for successful collaboration.
                </p>
              </div>

              <form className="grid gap-8" onSubmit={handleSubmit} autoComplete="off">
                {/* Basic Details Section */}
                <div>
                  <div className="mb-5 rounded-lg bg-gradient-to-r from-sky-600 to-sky-400 px-5 py-3 text-lg font-bold text-white shadow-md">
                    Basic details
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Title</label>
                      <select name="title" value={registerData.title} onChange={handleChange} className={inputClass}>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Name *</label>
                      <input
                        name="name"
                        value={registerData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Phone *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">+91</span>
                        <input
                          name="phone"
                          value={registerData.phone}
                          onChange={handleChange}
                          placeholder="81234 56789"
                          className={`${inputClass} pl-12`}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={registerData.email}
                        onChange={handleChange}
                        placeholder="eg. abc@iris.com"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Alternate Number</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">+91</span>
                        <input
                          name="alternateNumber"
                          value={registerData.alternateNumber}
                          onChange={handleChange}
                          placeholder="81234 56789"
                          className={`${inputClass} pl-12`}
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Aadhaar *</label>
                      <input
                        name="aadhaar"
                        value={registerData.aadhaar}
                        onChange={handleChange}
                        placeholder="Aadhaar"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>PAN Number *</label>
                      <input
                        name="pan"
                        value={registerData.pan}
                        onChange={handleChange}
                        placeholder="eg. AAAPR1111A"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Occupation</label>
                      <input
                        name="occupation"
                        value={registerData.occupation}
                        onChange={handleChange}
                        placeholder="Occupation"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>RERA Registration Number</label>
                      <input
                        name="rera"
                        value={registerData.rera}
                        onChange={handleChange}
                        placeholder="RERA"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>CP Company Name/ CP Name</label>
                      <input
                        name="company"
                        value={registerData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <div className="mb-5 rounded-lg bg-gradient-to-r from-sky-600 to-sky-400 px-5 py-3 text-lg font-bold text-white shadow-md">
                    Address
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-1.5">
                      <label className={labelClass}>House/Flat/Company</label>
                      <input
                        name="house"
                        value={registerData.house}
                        onChange={handleChange}
                        placeholder="House/Flat/Company"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Street</label>
                      <input name="street" value={registerData.street} onChange={handleChange} placeholder="Street" className={inputClass} />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Country</label>
                      <select name="country" value={registerData.country} onChange={handleChange} className={inputClass}>
                        <option value="">Select country</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>State / Region</label>
                      <select name="state" value={registerData.state} onChange={handleChange} className={inputClass}>
                        <option value="">-</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Maharashtra">Maharashtra</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>City</label>
                      <input name="city" value={registerData.city} onChange={handleChange} placeholder="eg. Pune" className={inputClass} />
                    </div>
                    <div className="grid gap-1.5">
                      <label className={labelClass}>Zip / Pin Code</label>
                      <input name="zip" value={registerData.zip} onChange={handleChange} placeholder="eg. 4110045" className={inputClass} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <button
                    className="rounded-xl bg-sky-600 py-3.5 text-lg font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-sky-700"
                    type="submit"
                  >
                    Register
                  </button>
                  <p className="text-center text-[0.95rem] font-medium text-slate-600">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setView('login')} className="font-bold text-sky-600 hover:underline">
                      Login here
                    </button>
                  </p>
                </div>
              </form>
            </>
          )}
        </section>

        {view === 'login' && (
          <section aria-hidden="true" className="animate-fade-slide grid min-h-[320px] place-items-center lg:order-1 lg:min-h-[520px]">
            <div className="select-none text-center">
              <div className="flex items-end justify-center gap-2 leading-none md:gap-3">
                <span className="animate-rise font-sora text-[clamp(6.8rem,22vw,15rem)] font-bold tracking-[-0.06em] text-brand-blue [animation-delay:120ms]">
                  m
                </span>
                <span className="animate-rise font-sora translate-y-1 text-[clamp(6.2rem,20vw,13rem)] font-bold tracking-[-0.06em] text-brand-orange [animation-delay:220ms]">
                  P
                </span>
              </div>
              <div className="animate-rise font-sora mt-1 text-[clamp(2.1rem,6vw,5.4rem)] leading-[0.95] font-extrabold tracking-[-0.01em] text-[#3441a0] [animation-delay:320ms]">
                Developers
              </div>
              <div className="animate-rise font-sora mt-3 flex justify-center gap-4 text-[clamp(0.95rem,1.6vw,1.7rem)] font-bold tracking-[0.16em] md:gap-6 md:tracking-[0.22em] [animation-delay:420ms]">
                <span className="text-[#3342a8]">TRUST</span>
                <span className="text-brand-orange">FOREVER</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default Login
