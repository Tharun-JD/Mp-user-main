import { useState } from 'react'

function Login({ onSignIn }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setErrorMessage('Please enter Name, Email, and Password.')
      return
    }
    onSignIn?.({ name: formData.name.trim(), email: formData.email.trim() })
  }

  return (
    <div className="page-bg-shell font-manrope grid grid-rows-[auto_1fr_auto]">
      <div aria-hidden="true" className="page-bg-orbs">
        <span className="page-bg-orb-left" />
        <span className="page-bg-orb-right" />
        <span className="page-bg-orb-bottom" />
      </div>

      <header className="relative z-10 flex items-center justify-between border-b border-slate-200 px-5 py-4 backdrop-blur md:px-14 md:py-5">
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
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Register as Channel Partner
          </button>
          <button
            type="button"
            className="rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Log in
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-[94vw] max-w-[1320px] gap-9 py-5 lg:grid-cols-[minmax(350px,540px)_1fr] lg:items-center">
        <section className="animate-rise relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/85 to-[#eef3ff]/85 p-4 shadow-[0_30px_70px_-35px_#1d2f68] backdrop-blur-xl md:p-7 lg:order-2 lg:ml-auto lg:w-full">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-14 -top-20 size-44 rounded-full bg-[#8fb7ff]/30 blur-2xl [animation:float_11s_ease-in-out_infinite]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 size-44 rounded-full bg-[#ffc997]/35 blur-2xl [animation:float_13s_ease-in-out_infinite]"
            style={{ animationDelay: '-2s' }}
          />
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

          <form className="grid gap-2.5" onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="name" className="text-[0.94rem] font-semibold tracking-[0.01em] text-slate-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-3 text-[0.98rem] shadow-[0_8px_20px_-18px_#1e3a8a] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />

            <label htmlFor="email" className="text-[0.94rem] font-semibold tracking-[0.01em] text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-3 text-[0.98rem] shadow-[0_8px_20px_-18px_#1e3a8a] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />

            <label htmlFor="password" className="text-[0.94rem] font-semibold tracking-[0.01em] text-slate-700">
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
              className="w-full rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-3 text-[0.98rem] shadow-[0_8px_20px_-18px_#1e3a8a] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />

            <label className="mt-1 inline-flex items-center gap-2 text-[0.95rem] text-slate-700" htmlFor="stay-logged">
              <input id="stay-logged" type="checkbox" className="size-4 accent-sky-600" />
              <span>Keep me logged in</span>
            </label>

            <button
              className="group relative mt-2 overflow-hidden rounded-xl bg-[#1e40af] px-3 py-3 text-base font-bold text-white shadow-[0_18px_35px_-20px_#1d4ed8] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_24px_45px_-20px_#1d4ed8]"
              type="submit"
            >
              <span className="pointer-events-none absolute -left-10 top-0 h-full w-8 -skew-x-12 bg-white/35 opacity-0 transition group-hover:left-[110%] group-hover:opacity-100 group-hover:duration-700" />
              Sign In
            </button>

            {errorMessage && <p className="text-sm font-semibold text-rose-600">{errorMessage}</p>}

            <div className="mt-3 grid gap-1">
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Login with OTP instead
              </a>
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Forgot your password?
              </a>
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Didn&apos;t receive confirmation instructions?
              </a>
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Didn&apos;t receive unlock instructions?
              </a>
            </div>

            <p className="mt-4 text-[0.95rem] text-brand-blue/80 font-bold">
              Don&apos;t have account ?{' '}
              <a href="#" className="font-bold text-brand-orange transition hover:text-brand-blue">
                Sign Up
              </a>
            </p>
          </form>
        </section>

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
      </main>

      {/* <footer className="relative z-10 flex flex-col gap-2 border-t border-slate-200 px-5 py-3 text-[0.88rem] text-slate-500 md:flex-row md:justify-between md:px-14 md:text-[0.95rem]">
        <span>MP Developers is registered &amp; is available on https://rera.tn.gov.in.</span>
        <span>English | Powered by Sell.do</span>
      </footer> */}
    </div>
  )
}

export default Login
