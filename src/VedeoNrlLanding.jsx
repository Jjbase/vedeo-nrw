export default function VedeoNrlLanding() {
  const initialData = {
    name: "",
    phone: "",
    email: "",
    city: "",
    country: "Deutschland",
    role: "schueler",
    deo_from: "",
    deo_to: "",
    classes_attended: "",
    subjects_taught: "",
    dept: "",
    attending: "",
    companions: 0,
    future_interest: "",
    future_locations: "",
    consent: false,
  };

  const [data, setData] = React.useState(initialData);

  function toMailto() {
    const recipient = "zollnerjosef3@gmail.com";
    const ccRecipient = "AhmedShteiwey@gmail.com";
    const subject = encodeURIComponent("Anmeldung VEDEO NRW Treffen – 11.10.2025 – " + (data.name || ""));
    const body = encodeURIComponent(
      `Kontaktinformationen:\nName: ${data.name}\nTelefon: ${data.phone}\nE-Mail: ${data.email}\nAdresse: ${data.city}, ${data.country}\n\nStatus: ${data.role}\nZeitraum: ${data.deo_from} - ${data.deo_to}\nBegleiter: ${data.companions}\nInteresse an zukünftigen Treffen: ${data.future_interest}\nWeitere Orte: ${data.future_locations}`
    );
    const href = `mailto:${recipient}?cc=${ccRecipient}&subject=${subject}&body=${body}`;
    window.location.href = href;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">VEDEO NRW Treffen – Anmeldung</h1>
        <button onClick={toMailto} className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700">
          Als E-Mail öffnen
        </button>
      </div>
    </div>
  );
}