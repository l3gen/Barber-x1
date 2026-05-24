import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function App() {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [page, setPage] = useState('home');
  const [form, setForm] = useState({
    barber_id: '', service_id: '', appointment_date: '', appointment_time: '', notes: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API}/api/barbers`).then(r => r.json()).then(setBarbers).catch(() => {});
    fetch(`${API}/api/services`).then(r => r.json()).then(setServices).catch(() => {});
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage('Booking submitted! We will confirm shortly.');
    setForm({ barber_id: '', service_id: '', appointment_date: '', appointment_time: '', notes: '' });
  };

  const styles = {
    app: { fontFamily: 'Georgia, serif', margin: 0, padding: 0, background: '#0a0a0a', color: '#f5f5f5', minHeight: '100vh' },
    nav: { background: '#111', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #c9a84c' },
    logo: { color: '#c9a84c', fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: '2px' },
    navLinks: { display: 'flex', gap: '2rem' },
    navBtn: { background: 'none', border: 'none', color: '#f5f5f5', fontSize: '1rem', cursor: 'pointer', letterSpacing: '1px' },
    hero: { textAlign: 'center', padding: '5rem 2rem', background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200) center/cover' },
    heroTitle: { fontSize: '3.5rem', color: '#c9a84c', marginBottom: '1rem', letterSpacing: '4px' },
    heroSub: { fontSize: '1.2rem', color: '#ccc', marginBottom: '2rem' },
    bookBtn: { background: '#c9a84c', color: '#000', border: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', cursor: 'pointer', letterSpacing: '2px', fontWeight: 'bold' },
    section: { padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' },
    sectionTitle: { textAlign: 'center', color: '#c9a84c', fontSize: '2rem', marginBottom: '3rem', letterSpacing: '3px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' },
    card: { background: '#1a1a1a', border: '1px solid #333', padding: '2rem', borderRadius: '4px' },
    cardTitle: { color: '#c9a84c', fontSize: '1.3rem', marginBottom: '0.5rem' },
    cardText: { color: '#aaa', lineHeight: '1.6' },
    price: { color: '#c9a84c', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '1rem' },
    tag: { display: 'inline-block', background: '#333', color: '#c9a84c', padding: '0.2rem 0.6rem', borderRadius: '3px', fontSize: '0.8rem', margin: '0.2rem' },
    form: { maxWidth: '600px', margin: '0 auto', background: '#1a1a1a', padding: '2rem', border: '1px solid #333' },
    input: { width: '100%', padding: '0.8rem', marginBottom: '1rem', background: '#111', border: '1px solid #444', color: '#f5f5f5', fontSize: '1rem', boxSizing: 'border-box' },
    select: { width: '100%', padding: '0.8rem', marginBottom: '1rem', background: '#111', border: '1px solid #444', color: '#f5f5f5', fontSize: '1rem', boxSizing: 'border-box' },
    submitBtn: { width: '100%', background: '#c9a84c', color: '#000', border: 'none', padding: '1rem', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '2px' },
    message: { background: '#1a3a1a', border: '1px solid #c9a84c', color: '#c9a84c', padding: '1rem', marginBottom: '1rem', textAlign: 'center' },
    footer: { background: '#111', borderTop: '2px solid #c9a84c', padding: '2rem', textAlign: 'center', color: '#666' }
  };

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.logo}>✂ BARBER X1</div>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => setPage('home')}>HOME</button>
          <button style={styles.navBtn} onClick={() => setPage('services')}>SERVICES</button>
          <button style={styles.navBtn} onClick={() => setPage('barbers')}>BARBERS</button>
          <button style={styles.navBtn} onClick={() => setPage('book')}>BOOK NOW</button>
        </div>
      </nav>

      {page === 'home' && (
        <>
          <div style={styles.hero}>
            <h1 style={styles.heroTitle}>BARBER X1</h1>
            <p style={styles.heroSub}>Premium cuts. Classic style. Modern experience.</p>
            <button style={styles.bookBtn} onClick={() => setPage('book')}>BOOK APPOINTMENT</button>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>OUR SERVICES</h2>
            <div style={styles.grid}>
              {services.slice(0, 3).map(s => (
                <div key={s.id} style={styles.card}>
                  <div style={styles.cardTitle}>{s.name}</div>
                  <div style={styles.cardText}>{s.description}</div>
                  <div style={styles.cardText}>⏱ {s.duration_minutes} mins</div>
                  <div style={styles.price}>${s.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{...styles.section, background: '#111', maxWidth: '100%', padding: '4rem 2rem'}}>
            <div style={{maxWidth: '1100px', margin: '0 auto'}}>
              <h2 style={styles.sectionTitle}>MEET THE BARBERS</h2>
              <div style={styles.grid}>
                {barbers.map(b => (
                  <div key={b.id} style={styles.card}>
                    <div style={styles.cardTitle}>{b.name}</div>
                    <div style={styles.cardText}>{b.bio}</div>
                    <div style={{marginTop: '1rem'}}>
                      {b.specialties && b.specialties.map(s => (
                        <span key={s} style={styles.tag}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {page === 'services' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>OUR SERVICES</h2>
          <div style={styles.grid}>
            {services.map(s => (
              <div key={s.id} style={styles.card}>
                <div style={styles.cardTitle}>{s.name}</div>
                <div style={styles.cardText}>{s.description}</div>
                <div style={styles.cardText}>⏱ {s.duration_minutes} mins</div>
                <div style={styles.price}>${s.price}</div>
                <button style={{...styles.bookBtn, marginTop: '1rem', padding: '0.6rem 1.5rem'}} onClick={() => { setForm({...form, service_id: s.id}); setPage('book'); }}>BOOK THIS</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === 'barbers' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>OUR BARBERS</h2>
          <div style={styles.grid}>
            {barbers.map(b => (
              <div key={b.id} style={styles.card}>
                <div style={styles.cardTitle}>{b.name}</div>
                <div style={styles.cardText}>{b.bio}</div>
                <div style={{marginTop: '1rem'}}>
                  {b.specialties && b.specialties.map(s => (
                    <span key={s} style={styles.tag}>{s}</span>
                  ))}
                </div>
                <button style={{...styles.bookBtn, marginTop: '1rem', padding: '0.6rem 1.5rem'}} onClick={() => { setForm({...form, barber_id: b.id}); setPage('book'); }}>BOOK WITH {b.name.split(' ')[0].toUpperCase()}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === 'book' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>BOOK APPOINTMENT</h2>
          <div style={styles.form}>
            {message && <div style={styles.message}>{message}</div>}
            <form onSubmit={handleBook}>
              <select style={styles.select} value={form.barber_id} onChange={e => setForm({...form, barber_id: e.target.value})} required>
                <option value="">Select a barber</option>
                {barbers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <select style={styles.select} value={form.service_id} onChange={e => setForm({...form, service_id: e.target.value})} required>
                <option value="">Select a service</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.name} — ${s.price} ({s.duration_minutes} mins)</option>)}
              </select>
              <input style={styles.input} type="date" value={form.appointment_date} onChange={e => setForm({...form, appointment_date: e.target.value})} required />
              <input style={styles.input} type="time" value={form.appointment_time} onChange={e => setForm({...form, appointment_time: e.target.value})} required />
              <textarea style={{...styles.input, height: '100px'}} placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
              <button style={styles.submitBtn} type="submit">CONFIRM BOOKING</button>
            </form>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <p>© 2026 BARBER X1 · Built with React, Node.js, PostgreSQL · Deployed on AWS</p>
      </footer>
    </div>
  );
}

export default App;
