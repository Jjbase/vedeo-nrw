import React from 'react'

export default function VedeoNrlLanding(){
  const initialData = {
    name: '', phone: '', email: '', city: '', country: 'Deutschland',
    role: 'schueler', deo_from: '', deo_to: '', classes_attended: '', subjects_taught: '', dept: '',
    attending: '', companions: 0, future_interest: '', future_locations: '', consent: false,
  };
  const [data,setData] = React.useState(initialData);
  const [errors,setErrors] = React.useState({});
  const [submitted,setSubmitted] = React.useState(false);

  const update = (f,v)=> setData(d=>({...d,[f]:v}));

  function validate(){
    const e = {};
    if(!data.name.trim()) e.name='Bitte Name eintragen.';
    if(!data.email.trim()) e.email='Bitte E-Mail eintragen.';
    else if(!/^\S+@\S+\.\S+$/.test(data.email)) e.email='Ungültige E-Mail-Adresse.';
    if(!data.city.trim()) e.city='Bitte Stadt/Ort eintragen.';
    if(!data.country.trim()) e.country='Bitte Land eintragen.';
    if(!data.deo_from) e.deo_from='Bitte Startmonat/-jahr angeben.';
    if(!data.deo_to) e.deo_to='Bitte Endmonat/-jahr angeben.';
    if(data.role==='schueler' && !data.classes_attended.trim()) e.classes_attended='Bitte besuchte Klassen eintragen.';
    if(data.role==='lehrer' && !data.subjects_taught.trim()) e.subjects_taught='Bitte Fächer & Klassen eintragen.';
    if(data.role==='verwaltung' && !data.dept.trim()) e.dept='Bitte Abteilung eintragen.';
    if(!data.attending) e.attending='Bitte auswählen, ob du kommst.';
    if(data.attending==='ja' && (isNaN(Number(data.companions)) || Number(data.companions)<0)) e.companions='Bitte Anzahl Begleiter (≥ 0).';
    if(!data.future_interest) e.future_interest='Bitte Auswahl treffen.';
    if(!data.consent) e.consent='Bitte Zustimmung zur Datenspeicherung erteilen.';
    setErrors(e);
    return Object.keys(e).length===0;
  }

  function onSubmit(ev){
    ev.preventDefault();
    if(!validate()){ setSubmitted(false); return; }
    setSubmitted(true);
  }

  function resetForm(){
    setData(initialData); setErrors({}); setSubmitted(false);
  }

  function downloadJSON(){
    const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vedeo-nrw-anmeldung-${(data.name||'unbekannt').replace(/\s+/g,'_')}.json`;
    a.click(); URL.revokeObjectURL(url);
  }

  function toMailto(){
    const recipient = "zollnerjosef3@gmail.com"; // Zieladresse
    const subject = encodeURIComponent('Anmeldung VEDEO NRW Treffen – 11.10.2025 – ' + (data.name||''));
    const lines = [
      'Kontaktinformationen:',
      `Name: ${data.name}`,
      `Telefon: ${data.phone}`,
      `E-Mail: ${data.email}`,
      `Adresse: ${data.city}, ${data.country}`,
      '',
      data.role==='schueler'
        ? `Ehemalige/r Schüler/in – DEO: von ${data.deo_from} bis ${data.deo_to}; Klassen: ${data.classes_attended}`
        : data.role==='lehrer'
        ? `Ehemalige/r Lehrer/in – DEO: von ${data.deo_from} bis ${data.deo_to}; Fächer & Klassen: ${data.subjects_taught}`
        : `Ehemalige/r Verwaltungsbeauftragte/r – DEO: von ${data.deo_from} bis ${data.deo_to}; Abteilung: ${data.dept}`,
      '',
      `Kommst Du zum Treffen? ${data.attending}`,
      data.attending==='ja' ? `Begleiter: ${data.companions}` : '',
      '',
      `Zukünftige VEDEO Treffen – Interesse in NRW: ${data.future_interest}`,
      `Weitere Orte: ${data.future_locations}`,
    ].filter(Boolean).join('\n');
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  const Field = ({id,label,required,children,error}) => (
    <div>
      <label htmlFor={id}>{label} {required && <span style={{color:'var(--flag-red)'}}>*</span>}</label>
      {children}
      {error && <div className="note" style={{color:'#b91c1c'}}>{error}</div>}
    </div>
  );

  return (
    <div className="container">
      <header className="hero">
        <div className="inner">
          <h1>VEDEO NRW – Anmeldung</h1>
          <p className="subtitle">Einladung zum VEDEO NRW Treffen am <b>Samstag, 11. Oktober 2025</b> in <b>Düsseldorf</b>.</p>
        </div>
      </header>

      <form onSubmit={onSubmit}>
        <div className="card">
          <h2 className="section underline">Kontaktinformationen</h2>
          <div className="row">
            <Field id="name" label="Name" required error={errors.name}>
              <input id="name" value={data.name} onChange={e=>update('name',e.target.value)} placeholder="Vor- und Nachname" />
            </Field>
            <Field id="phone" label="Telefon">
              <input id="phone" value={data.phone} onChange={e=>update('phone',e.target.value)} placeholder="+49 ..." />
            </Field>
            <Field id="email" label="E-Mail-Adresse" required error={errors.email}>
              <input id="email" type="email" value={data.email} onChange={e=>update('email',e.target.value)} placeholder="name@example.com" />
            </Field>
            <Field id="city" label="Adresse (Stadt/Ort)" required error={errors.city}>
              <input id="city" value={data.city} onChange={e=>update('city',e.target.value)} placeholder="z. B. Düsseldorf" />
            </Field>
            <Field id="country" label="Land" required error={errors.country}>
              <input id="country" value={data.country} onChange={e=>update('country',e.target.value)} placeholder="Deutschland" />
            </Field>
          </div>
        </div>

        <div className="card">
          <h2 className="section underline">Status an der DEO (ehemalig)</h2>
          <div className="radio-group">
            {['schueler','lehrer','verwaltung'].map(id=>(
              <label key={id}><input type="radio" name="role" value={id} checked={data.role===id} onChange={e=>update('role',e.target.value)} />{' '}
                {id==='schueler'?'Ehemalige/r Schüler/in':id==='lehrer'?'Ehemalige/r Lehrer/in':'Ehemalige/r Verwaltungsbeauftragte/r'}
              </label>
            ))}
          </div>
          <div className="row" style={{marginTop:8}}>
            <Field id="deo_from" label="Ab wann an der DEO" required error={errors.deo_from}>
              <input id="deo_from" type="month" value={data.deo_from} onChange={e=>update('deo_from',e.target.value)} />
            </Field>
            <Field id="deo_to" label="Bis wann an der DEO" required error={errors.deo_to}>
              <input id="deo_to" type="month" value={data.deo_to} onChange={e=>update('deo_to',e.target.value)} />
            </Field>
          </div>
          {data.role==='schueler' && (
            <Field id="classes_attended" label="Welche Klassen hast Du besucht?" required error={errors.classes_attended}>
              <textarea id="classes_attended" rows="3" value={data.classes_attended} onChange={e=>update('classes_attended',e.target.value)} placeholder="z. B. 5a–12b" />
            </Field>
          )}
          {data.role==='lehrer' && (
            <Field id="subjects_taught" label="Welche Fächer & Klassen hast Du gelehrt?" required error={errors.subjects_taught}>
              <textarea id="subjects_taught" rows="3" value={data.subjects_taught} onChange={e=>update('subjects_taught',e.target.value)} placeholder="z. B. Mathe (5–9), Physik (10–12)" />
            </Field>
          )}
          {data.role==='verwaltung' && (
            <Field id="dept" label="In welcher Abteilung hast Du gearbeitet?" required error={errors.dept}>
              <input id="dept" value={data.dept} onChange={e=>update('dept',e.target.value)} placeholder="z. B. Sekretariat, Verwaltung, Technik" />
            </Field>
          )}
        </div>

        <div className="card">
          <h2 className="section underline">Anmeldung zum VEDEO NRW Treffen</h2>
          <Field id="attending" label="Kommst Du zum Treffen?" required error={errors.attending}>
            <div className="radio-group">
              {['ja','nein','vielleicht'].map(opt=> (
                <label key={opt}><input type="radio" name="attending" value={opt} checked={data.attending===opt} onChange={e=>update('attending',e.target.value)} /> {opt}</label>
              ))}
            </div>
          </Field>
          {data.attending==='ja' && (
            <Field id="companions" label="Wer kommt noch mit (Anzahl der Begleiter)? " error={errors.companions}>
              <input id="companions" type="number" min="0" value={data.companions} onChange={e=>update('companions',e.target.value)} />
            </Field>
          )}
        </div>

        <div className="card">
          <h2 className="section underline">Zukünftige VEDEO Treffen</h2>
          <div className="row">
            <Field id="future_interest" label="Bist Du an zukünftigen Treffen in NRW interessiert?" required error={errors.future_interest}>
              <div className="radio-group">
                {['ja','nein'].map(opt=> (
                  <label key={opt}><input type="radio" name="future_interest" value={opt} checked={data.future_interest===opt} onChange={e=>update('future_interest',e.target.value)} /> {opt}</label>
                ))}
              </div>
            </Field>
            <Field id="future_locations" label="Wo sonst in der Welt sollte VEDEO Treffen organisieren?">
              <input id="future_locations" value={data.future_locations} onChange={e=>update('future_locations',e.target.value)} placeholder="z. B. Kairo, Berlin, Dubai …" />
            </Field>
          </div>
        </div>

        <div className="card">
          <h2 className="section underline">Datenschutz</h2>
        <label><input type="checkbox" checked={data.consent} onChange={e=>update('consent',e.target.checked)} /> Ich stimme zu, dass meine Angaben zur Organisation des Treffens gespeichert und verarbeitet werden.</label>
          {errors.consent && <div className="note" style={{color:'#b91c1c'}}>{errors.consent}</div>}
          <p className="note">Hinweis: Die Daten werden ausschließlich für Planung und Kommunikation zum VEDEO NRW Treffen verwendet.</p>
        </div>

        <div className="actions">
          <button type="submit" className="btn primary">Anmeldung absenden</button>
          <button type="button" className="btn" onClick={downloadJSON}>Daten als JSON herunterladen</button>
          <button type="button" className="btn" onClick={toMailto}>Als E-Mail öffnen</button>
          <button type="button" className="btn" onClick={resetForm}>Zurücksetzen</button>
        </div>
        {submitted && (<div className="success"><b>Danke!</b> Deine Angaben wurden geprüft. Sende sie per E‑Mail oder speichere sie als Datei.</div>)}
      </form>

      <footer>© {new Date().getFullYear()} VEDEO NRW – Treffen Düsseldorf, 11.10.2025</footer>
    </div>
  );
}
