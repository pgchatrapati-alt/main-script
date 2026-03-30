import { useState, useEffect, useRef } from 'react'

/* ─── Unsplash image URLs (free, no key needed) ─── */
const IMGS = {
  hero:    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&q=80',
  room1:   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  room2:   'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  room3:   'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  food1:   'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
  food2:   'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  food3:   'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  common:  'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
  outside: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
}

/* ─── Amenity data ─── */
const AMENITIES = [
  { icon: '🛏️', label: 'Fully Furnished', desc: 'Bed, mattress, pillow, wardrobe & personal locker' },
  { icon: '🍽️', label: '3 Meals/Day', desc: 'Breakfast, lunch & dinner freshly prepared' },
  { icon: '☕', label: 'Tea & Milk', desc: 'Morning & evening tea/milk included' },
  { icon: '❄️', label: 'Air Conditioning', desc: 'All rooms fully air-conditioned' },
  { icon: '📶', label: 'High-Speed WiFi', desc: 'Seamless internet connectivity' },
  { icon: '🚿', label: 'Geyser Attached', desc: 'Hot water geyser in every washroom' },
  { icon: '🧊', label: 'Refrigerator', desc: 'Shared refrigerator access' },
  { icon: '💧', label: '24/7 Water Supply', desc: 'RO filtered drinking water' },
  { icon: '🫧', label: 'Washing Machine', desc: 'Washing machine connection provided' },
  { icon: '🔒', label: 'CCTV Security', desc: '24-hour surveillance for your safety' },
  { icon: '🍳', label: 'Loaded Kitchen', desc: 'Full kitchen with utensils & LPG supply' },
  { icon: '🛡️', label: 'Bed Linen', desc: 'Fresh bed sheets & pillow covers provided' },
]

const ROOMS = [
  { type: 'Triple Sharing', price: '₹4,500', tag: 'Most Popular', img: IMGS.room1, features: ['3 residents', 'Wardrobe each', 'AC + WiFi', 'Attached geyser'] },
  { type: 'Double Sharing', price: '₹6,500', tag: 'Best Value', img: IMGS.room2, features: ['2 residents', 'Personal locker', 'AC + WiFi', 'Attached geyser'] },
  { type: 'Single Room', price: '₹9,500', tag: 'Premium', img: IMGS.room3, features: ['Private space', 'Full wardrobe', 'AC + WiFi', 'Attached geyser'] },
]

const FOOD_GALLERY = [
  { img: IMGS.food1, label: 'Home-style Lunch' },
  { img: IMGS.food2, label: 'Fresh Breakfast' },
  { img: IMGS.food3, label: 'Evening Snacks' },
  { img: IMGS.kitchen, label: 'Fully Loaded Kitchen' },
]

const TESTIMONIALS = [
  { name: 'Priya S.', role: 'Working Professional', text: 'Best PG in Fatehganj! Food is amazing, rooms are clean and the staff is very helpful. Feels exactly like home.', stars: 5 },
  { name: 'Rahul M.', role: 'College Student', text: 'Great value for money. WiFi is fast, AC works perfectly and the food is delicious. Highly recommend to anyone new to the city.', stars: 5 },
  { name: 'Anjali K.', role: 'MBA Student', text: 'Very safe for girls, CCTV everywhere and always clean. The wardrobe and locker system gives great privacy. Love it here!', stars: 5 },
]

/* ─── Intersection observer hook ─── */
function useVisible(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, visible] = useVisible()
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity .65s ${delay}ms ease, transform .65s ${delay}ms cubic-bezier(.22,1,.36,1)` }} className={className}>
      {children}
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Home', 'Rooms', 'Food', 'Amenities', 'Contact']
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,248,240,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      boxShadow: scrolled ? '0 2px 24px rgba(180,100,20,.12)' : 'none',
      transition: 'all .4s ease',
      padding: '0 5vw',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', height: 68, justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#c8763a,#e8a44a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(200,118,58,.35)' }}>🏠</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: scrolled ? '#2d1a0a' : '#fff', lineHeight: 1.1 }}>Chhatrapati PG</div>
            <div style={{ fontSize: 9, color: scrolled ? '#c8763a' : '#ffd9a0', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' }}>Premium Coliving</div>
          </div>
        </div>
        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 600, color: scrolled ? '#4a2c10' : '#fff', textDecoration: 'none', letterSpacing: '.04em', transition: 'color .2s', opacity: .9 }}
              onMouseEnter={e => e.target.style.color = '#c8763a'}
              onMouseLeave={e => e.target.style.color = scrolled ? '#4a2c10' : '#fff'}>
              {l}
            </a>
          ))}
          <a href="tel:9405334300" style={{ background: 'linear-gradient(135deg,#c8763a,#e8a44a)', color: '#fff', padding: '9px 20px', borderRadius: 30, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 16px rgba(200,118,58,.4)', transition: 'transform .2s, box-shadow .2s' }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(200,118,58,.5)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 16px rgba(200,118,58,.4)' }}>
            📞 Call Now
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* BG image */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMGS.hero})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.45)' }} />
      {/* Warm gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(60,20,5,.75) 0%,rgba(180,90,20,.35) 50%,rgba(0,0,0,.2) 100%)' }} />

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '10%', right: '8%', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,200,100,.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '15%', right: '12%', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(255,200,100,.15)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '120px 6vw 80px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,118,58,.25)', border: '1px solid rgba(232,164,74,.4)', borderRadius: 30, padding: '6px 16px', marginBottom: 24, backdropFilter: 'blur(8px)' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5c842', boxShadow: '0 0 8px #f5c842' }} />
          <span style={{ fontSize: 11, color: '#ffd9a0', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Fatehganj, Bareilly</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,6vw,76px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, marginBottom: 20, maxWidth: 700 }}>
          Your Home<br />
          <span style={{ background: 'linear-gradient(90deg,#f5c842,#e8a44a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Away from Home</span>
        </h1>

        <p style={{ fontSize: 'clamp(14px,1.8vw,18px)', color: 'rgba(255,255,255,.82)', maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
          Premium coliving spaces for males & females in the heart of Fatehganj. Fully furnished rooms with meals, AC & WiFi included.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 32, marginBottom: 44, flexWrap: 'wrap' }}>
          {[['₹4,500', 'Starting rent/mo'], ['3', 'Meals daily'], ['24/7', 'Security & Water'], ['100%', 'Furnished']].map(([val, lab]) => (
            <div key={lab}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#f5c842', fontFamily: "'Playfair Display', serif" }}>{val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', letterSpacing: '.05em', marginTop: 2 }}>{lab}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a href="tel:9405334300" style={{ background: 'linear-gradient(135deg,#c8763a,#f5c842)', color: '#2d1a0a', padding: '14px 32px', borderRadius: 50, fontSize: 15, fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 30px rgba(200,118,58,.5)', display: 'flex', alignItems: 'center', gap: 8, transition: 'transform .2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            📞 Call: 9405334300
          </a>
          <a href="https://wa.me/919405334300?text=Hi%20Chhatrapati%20PG!%20I%20want%20to%20enquire%20about%20rooms." target="_blank" rel="noreferrer"
            style={{ background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.35)', color: '#fff', padding: '14px 32px', borderRadius: 50, fontSize: 15, fontWeight: 700, textDecoration: 'none', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 8, transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}>
            💬 WhatsApp Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Scroll</div>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg,rgba(255,255,255,.5),transparent)' }} />
      </div>
    </section>
  )
}

/* ─── Rooms ─── */
function Rooms() {
  const [active, setActive] = useState(null)
  return (
    <section id="rooms" style={{ padding: '100px 6vw', background: '#fdf8f2' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, color: '#c8763a', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 12 }}>Choose Your Space</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#2d1a0a', marginBottom: 16 }}>Our Rooms</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#c8763a,#f5c842)', borderRadius: 4, margin: '0 auto' }} />
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28 }}>
          {ROOMS.map((r, i) => (
            <FadeIn key={r.type} delay={i * 120}>
              <div onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                style={{ borderRadius: 24, overflow: 'hidden', background: '#fff', boxShadow: active === i ? '0 24px 60px rgba(200,118,58,.22)' : '0 4px 24px rgba(0,0,0,.07)', transition: 'box-shadow .35s, transform .35s', transform: active === i ? 'translateY(-6px)' : 'translateY(0)', cursor: 'pointer' }}>
                {/* Room image */}
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img src={r.img} alt={r.type} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s', transform: active === i ? 'scale(1.06)' : 'scale(1)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(0,0,0,.5))' }} />
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'linear-gradient(135deg,#c8763a,#f5c842)', color: '#fff', padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, boxShadow: '0 4px 12px rgba(200,118,58,.4)' }}>{r.tag}</div>
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#2d1a0a' }}>{r.type}</div>
                      <div style={{ fontSize: 11, color: '#9a7a5a', marginTop: 2 }}>Per person / month</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 26, fontWeight: 900, color: '#c8763a', fontFamily: "'Playfair Display', serif" }}>{r.price}</div>
                      <div style={{ fontSize: 10, color: '#c8763a', fontWeight: 600 }}>+ light bill</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
                    {r.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fef0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8763a' }} />
                        </div>
                        <span style={{ fontSize: 13, color: '#5a3c20' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="tel:9405334300" style={{ display: 'block', textAlign: 'center', background: active === i ? 'linear-gradient(135deg,#c8763a,#f5c842)' : '#fdf0e0', color: active === i ? '#fff' : '#c8763a', padding: '12px', borderRadius: 14, fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'all .3s', border: '1.5px solid #e8c090' }}>
                    Book This Room →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={200}>
          <div style={{ textAlign: 'center', marginTop: 40, padding: '20px 24px', background: '#fef5e4', borderRadius: 16, border: '1px solid #f0d8a0', display: 'inline-block', width: '100%', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ fontSize: 13, color: '#7a5020', lineHeight: 1.6 }}>
              ⚡ <strong>Light bill excluded</strong> — All other utilities, food & amenities included in the rent.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Food Section ─── */
function Food() {
  return (
    <section id="food" style={{ padding: '100px 6vw', background: '#2d1a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,118,58,.15),transparent)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <FadeIn>
            <div>
              <div style={{ fontSize: 11, color: '#f5c842', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 12 }}>Ghar Jaisa Khana</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>
                3 Fresh Meals<br />Every Single Day
              </h2>
              <div style={{ width: 50, height: 3, background: 'linear-gradient(90deg,#c8763a,#f5c842)', borderRadius: 4, marginBottom: 28 }} />
              <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.85, marginBottom: 32 }}>
                We believe great living starts with great food. Our kitchen serves fresh, home-style Indian meals that will remind you of mom's cooking — breakfast, lunch & dinner included every day.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[['🌅', 'Breakfast', 'Fresh & energising start'], ['☀️', 'Lunch', 'Hot home-style meals'], ['☕', 'Tea/Milk', 'Morning & evening'], ['🌙', 'Dinner', 'Wholesome end to day']].map(([ic, title, sub]) => (
                  <div key={title} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 14, padding: '16px', border: '1px solid rgba(255,255,255,.08)', backdropFilter: 'blur(8px)' }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{ic}</div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>{title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {FOOD_GALLERY.map((f, i) => (
                <div key={i} style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', aspectRatio: i === 3 ? '2/1' : '1/1', gridColumn: i === 3 ? '1/-1' : undefined, boxShadow: '0 8px 30px rgba(0,0,0,.4)' }}>
                  <img src={f.img} alt={f.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(0,0,0,.7))' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 14, fontSize: 11, color: '#fff', fontWeight: 600, letterSpacing: '.05em' }}>{f.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Amenities ─── */
function Amenities() {
  return (
    <section id="amenities" style={{ padding: '100px 6vw', background: '#fdf8f2' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, color: '#c8763a', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 12 }}>Everything Included</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#2d1a0a', marginBottom: 16 }}>World-Class Amenities</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#c8763a,#f5c842)', borderRadius: 4, margin: '0 auto 16px' }} />
            <p style={{ color: '#9a7a5a', maxWidth: 480, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
              Everything you need for comfortable living — no extra charges, no surprises.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
          {AMENITIES.map((a, i) => (
            <FadeIn key={a.label} delay={i * 50}>
              <div style={{ background: '#fff', borderRadius: 18, padding: '24px 20px', border: '1px solid #f0e4d0', boxShadow: '0 2px 16px rgba(0,0,0,.04)', transition: 'all .3s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(200,118,58,.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#e8c090' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,.04)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#f0e4d0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontWeight: 700, color: '#2d1a0a', fontSize: 15, marginBottom: 6 }}>{a.label}</div>
                <div style={{ fontSize: 12, color: '#9a7a5a', lineHeight: 1.6 }}>{a.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Gallery ─── */
function Gallery() {
  const imgs = [IMGS.room1, IMGS.room2, IMGS.food1, IMGS.outside, IMGS.food2, IMGS.common]
  return (
    <section id="gallery" style={{ padding: '100px 6vw', background: '#1a0f05' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, color: '#f5c842', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 12 }}>See For Yourself</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Life at Chhatrapati PG</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#c8763a,#f5c842)', borderRadius: 4, margin: '0 auto' }} />
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,240px)', gap: 14 }}>
          {imgs.map((src, i) => (
            <FadeIn key={i} delay={i * 70}>
              <div style={{ borderRadius: 18, overflow: 'hidden', height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,.4)', gridColumn: i === 0 ? 'span 2' : undefined, gridRow: i === 0 ? 'span 1' : undefined }}>
                <img src={src} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s', display: 'block' }} loading="lazy"
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
function Testimonials() {
  return (
    <section style={{ padding: '100px 6vw', background: '#fdf8f2' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 11, color: '#c8763a', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 12 }}>Happy Residents</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#2d1a0a' }}>What Our Residents Say</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#c8763a,#f5c842)', borderRadius: 4, margin: '16px auto 0' }} />
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 100}>
              <div style={{ background: '#fff', borderRadius: 22, padding: '32px 28px', border: '1px solid #f0e4d0', boxShadow: '0 4px 24px rgba(0,0,0,.06)', position: 'relative' }}>
                <div style={{ fontSize: 48, color: '#f0d8a0', fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 16 }}>"</div>
                <p style={{ color: '#5a3c20', fontSize: 14, lineHeight: 1.85, marginBottom: 24, fontStyle: 'italic' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#c8763a,#f5c842)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#2d1a0a', fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#c8763a' }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#f5c842', fontSize: 13, letterSpacing: 1 }}>{'★'.repeat(t.stars)}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Location + Contact ─── */
function Contact() {
  return (
    <section id="contact" style={{ padding: '100px 6vw', background: '#2d1a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,200,66,.08),transparent)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, color: '#f5c842', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 12 }}>Get In Touch</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Visit Us Today</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#c8763a,#f5c842)', borderRadius: 4, margin: '0 auto' }} />
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <FadeIn>
            <div>
              {[
                { icon: '📍', title: 'Location', val: 'Fatehganj, Bareilly', link: 'https://maps.app.goo.gl/DZNesjYqhwrV4uEg9', linkText: 'Open in Google Maps →' },
                { icon: '📞', title: 'Call Us', val: '9405334300 / 8857009635', link: 'tel:9405334300', linkText: 'Call Now →' },
                { icon: '💬', title: 'WhatsApp', val: 'Chat with us for quick reply', link: 'https://wa.me/919405334300?text=Hi%20Chhatrapati%20PG!%20I%20want%20to%20enquire%20about%20rooms.', linkText: 'Open WhatsApp →' },
                { icon: '⏰', title: 'Visit Timing', val: '9:00 AM – 8:00 PM, All days', link: null },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 18, marginBottom: 32 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(200,118,58,.2)', border: '1px solid rgba(200,118,58,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{item.val}</div>
                    {item.link && <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#f5c842', textDecoration: 'none', fontWeight: 600 }}>{item.linkText}</a>}
                  </div>
                </div>
              ))}
              {/* For Male/Female badge */}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                {['👨 Males Welcome', '👩 Females Welcome'].map(t => (
                  <div key={t} style={{ background: 'rgba(245,200,66,.12)', border: '1px solid rgba(245,200,66,.25)', borderRadius: 30, padding: '8px 16px', fontSize: 12, color: '#f5c842', fontWeight: 600 }}>{t}</div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            {/* Map embed */}
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.08)' }}>
              <iframe
                src="https://maps.google.com/maps?q=Fatehganj,Bareilly,UP&output=embed"
                width="100%" height="360" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Chhatrapati PG Location" />
            </div>
            <a href="https://maps.app.goo.gl/DZNesjYqhwrV4uEg9" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 14, padding: '13px', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}>
              📍 Get Exact Directions
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <section style={{ padding: '80px 6vw', background: 'linear-gradient(135deg,#c8763a 0%,#e8a44a 40%,#f5c842 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,.1)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.08)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,42px)', fontWeight: 900, color: '#2d1a0a', marginBottom: 16 }}>Ready to Move In?</h2>
          <p style={{ fontSize: 16, color: 'rgba(45,26,10,.75)', marginBottom: 36, lineHeight: 1.7 }}>Rooms fill up fast! Call us now or drop a WhatsApp message and we'll get back to you within minutes.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:9405334300" style={{ background: '#2d1a0a', color: '#f5c842', padding: '15px 36px', borderRadius: 50, fontSize: 15, fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 30px rgba(45,26,10,.3)', display: 'flex', alignItems: 'center', gap: 8 }}>📞 9405334300</a>
            <a href="https://wa.me/919405334300?text=Hi%20Chhatrapati%20PG!%20I%20want%20to%20enquire%20about%20rooms." target="_blank" rel="noreferrer"
              style={{ background: '#25d366', color: '#fff', padding: '15px 36px', borderRadius: 50, fontSize: 15, fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 30px rgba(37,211,102,.35)', display: 'flex', alignItems: 'center', gap: 8 }}>💬 WhatsApp</a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: '#160c02', padding: '48px 6vw 32px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#c8763a,#e8a44a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>Chhatrapati PG</div>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', lineHeight: 1.8 }}>Premium coliving spaces for males & females in Fatehganj, Bareilly. PG like home. ✌️</p>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#f5c842', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Quick Links</div>
            {['Home', 'Rooms', 'Food', 'Amenities', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ display: 'block', color: 'rgba(255,255,255,.5)', fontSize: 13, textDecoration: 'none', marginBottom: 8, transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = '#f5c842'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.5)'}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#f5c842', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 2 }}>
              <div>📍 Fatehganj, Bareilly</div>
              <div>📞 9405334300</div>
              <div>📞 8857009635</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href="https://wa.me/919405334300" target="_blank" rel="noreferrer" style={{ width: 36, height: 36, background: '#25d366', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, textDecoration: 'none', transition: 'transform .2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>💬</a>
              <a href="tel:9405334300" style={{ width: 36, height: 36, background: '#c8763a', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, textDecoration: 'none', transition: 'transform .2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>📞</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>© 2025 Chhatrapati PG. All rights reserved.</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>Made with ❤️ for Fatehganj residents</div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Floating WhatsApp button ─── */
function FloatingWA() {
  return (
    <a href="https://wa.me/919405334300?text=Hi%20Chhatrapati%20PG!%20I%20want%20to%20enquire%20about%20rooms." target="_blank" rel="noreferrer"
      style={{ position: 'fixed', bottom: 28, right: 24, zIndex: 999, width: 58, height: 58, background: '#25d366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 6px 24px rgba(37,211,102,.5)', textDecoration: 'none', transition: 'transform .25s, box-shadow .25s', animation: 'wabounce 2.5s ease-in-out infinite' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(37,211,102,.6)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,.5)' }}>
      💬
    </a>
  )
}

/* ─── App ─── */
export default function App() {
  useEffect(() => {
    // Font import
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap'
    document.head.appendChild(link)

    // Global styles
    const style = document.createElement('style')
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'DM Sans', sans-serif; background: #fdf8f2; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #2d1a0a; }
      ::-webkit-scrollbar-thumb { background: #c8763a; border-radius: 4px; }
      @keyframes wabounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @media (max-width: 768px) {
        nav > div > div:last-child a:not(:last-child) { display: none !important; }
        section > div { grid-template-columns: 1fr !important; }
        .food-grid { grid-template-columns: 1fr 1fr !important; }
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(link); document.head.removeChild(style) }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Rooms />
      <Food />
      <Amenities />
      <Gallery />
      <Testimonials />
      <CTABanner />
      <Contact />
      <Footer />
      <FloatingWA />
    </>
  )
}
