import { useEffect, useMemo, useState } from 'react'

function classNames(...values) {
  return values.filter(Boolean).join(' ')
}

export default function IntakeForm() {
  const API_BASE = import.meta.env.VITE_API_BASE || '/api'
  const [step, setStep] = useState(0)
  const [appliances, setAppliances] = useState([])
  const [problemsMap, setProblemsMap] = useState({})
  const [selectedAppliances, setSelectedAppliances] = useState([])
  const [problem, setProblem] = useState('')
  const [problemOther, setProblemOther] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [timeWindows, setTimeWindows] = useState([])
  const [timeWindow, setTimeWindow] = useState('Morning')
  const [timePref, setTimePref] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [description, setDescription] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function bootstrap() {
      try {
        const [appliancesRes, timeRes] = await Promise.all([
          fetch(`${API_BASE}/appliances`),
          fetch(`${API_BASE}/time-windows`),
        ])
        const appliancesJson = await appliancesRes.json()
        const timeJson = await timeRes.json()
        setAppliances(appliancesJson)
        setTimeWindows(timeJson)
      } catch (err) {
        console.error(err)
        setError('Failed to load form options')
      }
    }
    bootstrap()
  }, [])

  useEffect(() => {
    async function loadProblems() {
      const map = {}
      for (const ap of selectedAppliances) {
        try {
          const res = await fetch(`${API_BASE}/problems?appliance=${encodeURIComponent(ap)}`)
          const json = await res.json()
          map[ap] = json
        } catch (e) {
          map[ap] = []
        }
      }
      setProblemsMap(map)
    }
    if (selectedAppliances.length > 0) {
      loadProblems()
    } else {
      setProblemsMap({})
    }
  }, [selectedAppliances])

  const problemOptions = useMemo(() => {
    if (selectedAppliances.length === 0) return []
    const first = selectedAppliances[0]
    return problemsMap[first] || []
  }, [problemsMap, selectedAppliances])

  const days = useMemo(() => {
    const out = []
    const fmt = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' })
    const dow = new Intl.DateTimeFormat(undefined, { weekday: 'short' })
    for (let i = 0; i < 21; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      out.push({
        key: d.toISOString().slice(0, 10),
        label: fmt.format(d),
        dow: dow.format(d),
      })
    }
    return out
  }, [])

  const timePrefs = [
    'Anytime',
    'Prefer Morning',
    'Prefer Afternoon',
    'Prefer Evening',
    'ASAP',
    'No preference',
  ]

  function mapPrefToWindow(pref) {
    switch (pref) {
      case 'Prefer Morning':
        return 'Morning'
      case 'Prefer Afternoon':
        return 'Afternoon'
      case 'Prefer Evening':
        return 'Evening'
      case 'Anytime':
      case 'ASAP':
      case 'No preference':
      default:
        return 'Flexible'
    }
  }

  function toggleAppliance(name) {
    setSelectedAppliances((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  function validateCurrentStep() {
    // step 0: choose appliance
    if (step === 0) {
      if (selectedAppliances.length === 0) {
        setError('Select at least one appliance')
        return false
      }
    }
    // step 1: problem selection
    if (step === 1) {
      if (!problem) {
        setError('Select a problem or choose Other')
        return false
      }
      if (problem === 'Other' && !problemOther.trim()) {
        setError('Describe the problem when selecting Other')
        return false
      }
    }
    // step 2: contact and address
    if (step === 2) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      if (!name.trim() || !emailValid) {
        setError('Enter a valid name and email')
        return false
      }
      if (!phone.trim() || !address.trim()) {
        setError('Enter phone and address')
        return false
      }
    }
    // step 3: scheduling
    if (step === 3) {
      if (!appointmentDate) {
        setError('Select a date')
        return false
      }
      if (!timePref) {
        setError('Choose a time preference')
        return false
      }
      // ensure backend field is set consistently with preference
      setTimeWindow(mapPrefToWindow(timePref))
    }
    setError('')
    return true
  }

  function nextStep() {
    if (validateCurrentStep()) {
      setStep((s) => Math.min(s + 1, 4))
    }
  }

  function prevStep() {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validateCurrentStep()) return
    setError('')
    setResult(null)

    if (selectedAppliances.length === 0) {
      setError('Select at least one appliance')
      return
    }
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid name and email')
      return
    }
    if (!phone || !address || !timeWindow || !appointmentDate || !problem) {
      setError('Please fill in all required fields')
      return
    }

    const payload = {
      appliance: selectedAppliances[0],
      problem,
      problem_other: problem === 'Other' ? problemOther : '',
      name,
      email,
      phone,
      address,
      time_window: timeWindow,
      appointment_date: appointmentDate,
      serial_number: serialNumber,
      description,
      notes,
    }

    try {
      setSubmitting(true)
      const res = await fetch(`${API_BASE}/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const contentType = res.headers.get('content-type') || ''
      const body = contentType.includes('application/json') ? await res.json() : await res.text()
      if (!res.ok) throw new Error(typeof body === 'string' ? body : (body.error || 'Submission failed'))
      setResult(typeof body === 'string' ? { message: body } : body)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Schedule Service</h2>
      <form onSubmit={onSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className={classNames('px-2 py-1 rounded', step === 0 && 'bg-blue-100 text-blue-800')}>1. Appliance</span>
          <span>›</span>
          <span className={classNames('px-2 py-1 rounded', step === 1 && 'bg-blue-100 text-blue-800')}>2. Problem</span>
          <span>›</span>
          <span className={classNames('px-2 py-1 rounded', step === 2 && 'bg-blue-100 text-blue-800')}>3. Contact</span>
          <span>›</span>
          <span className={classNames('px-2 py-1 rounded', step === 3 && 'bg-blue-100 text-blue-800')}>4. Schedule</span>
          <span>›</span>
          <span className={classNames('px-2 py-1 rounded', step === 4 && 'bg-blue-100 text-blue-800')}>5. Review</span>
        </div>

        {step === 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose an appliance</label>
            <div className="grid grid-cols-2 gap-2">
              {appliances.map((ap) => (
                <label key={ap.name} className={classNames(
                  'flex items-center gap-2 rounded border px-3 py-2 cursor-pointer',
                  selectedAppliances.includes(ap.name) ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                )}>
                  <input
                    type="radio"
                    name="appliance"
                    checked={selectedAppliances.includes(ap.name)}
                    onChange={() => setSelectedAppliances([ap.name])}
                  />
                  <span>{ap.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Problem</label>
            <select
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a problem</option>
              {problemOptions.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
              <option value="Other">Other</option>
            </select>
            {problem === 'Other' && (
              <input
                type="text"
                value={problemOther}
                onChange={(e) => setProblemOther(e.target.value)}
                placeholder="Describe the problem"
                className="mt-2 w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-2">1. Choose a date</label>
              <div role="radiogroup" aria-label="Choose a date" className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {days.map((d) => {
                  const selected = d.key === appointmentDate
                  return (
                    <button
                      key={d.key}
                      role="radio"
                      aria-checked={selected}
                      type="button"
                      onClick={() => setAppointmentDate(d.key)}
                      className={`min-w-[84px] rounded-xl border px-3 py-2 text-center focus:outline-none focus:ring-2 ${selected ? 'border-blue-600 ring-blue-200 font-semibold underline' : 'border-gray-300'}`}
                    >
                      <div className="text-xs uppercase tracking-wide">{d.dow}</div>
                      <div className="text-base">{d.label}</div>
                    </button>
                  )
                })}
              </div>
              <div className="mt-2 flex gap-2">
                <button type="button" className="px-2 py-1 text-sm rounded border" onClick={() => setAppointmentDate(days[0]?.key || '')}>Today</button>
                <button type="button" className="px-2 py-1 text-sm rounded border" onClick={() => setAppointmentDate(days[1]?.key || '')}>Tomorrow</button>
                <button type="button" className="px-2 py-1 text-sm rounded border" onClick={() => setAppointmentDate(days[0]?.key || '')}>Next available</button>
              </div>
            </section>

            <section>
              <label className="block text-sm font-medium text-gray-700 mb-2">2. Time preference</label>
              <div role="radiogroup" aria-label="Time preference" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timePrefs.map((t) => {
                  const selected = t === timePref
                  return (
                    <button
                      key={t}
                      role="radio"
                      aria-checked={selected}
                      type="button"
                      onClick={() => setTimePref(t)}
                      className={`rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${selected ? 'border-blue-600 ring-blue-200 font-semibold underline' : 'border-gray-300'}`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-gray-600 mt-2">Your handyman will email you with an exact arrival time after you submit your request.</p>
            </section>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="rounded border p-4 text-sm">
              <div className="font-medium mb-2">Review</div>
              <div>Appliance: {selectedAppliances[0]}</div>
              <div>Problem: {problem}{problem === 'Other' && problemOther ? ` — ${problemOther}` : ''}</div>
              <div>Name: {name}</div>
              <div>Email: {email}</div>
              <div>Phone: {phone}</div>
              <div>Address: {address}</div>
              <div>Time: {timeWindow} on {appointmentDate}</div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}
        {result && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
            {result.message} (Ticket: {result.ticket_id})
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={prevStep} disabled={step === 0} className={classNames(
            'rounded-md px-4 py-2', step === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'
          )}>Previous</button>
          {step < 4 ? (
            <button type="button" onClick={nextStep} className="rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700">Next</button>
          ) : (
            <button type="submit" disabled={submitting} className={classNames(
              'rounded-md px-4 py-2 text-white', submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            )}>{submitting ? 'Submitting...' : 'Submit Request'}</button>
          )}
        </div>
      </form>
    </div>
  )
}


