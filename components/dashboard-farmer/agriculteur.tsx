import FarmList from './FarmList';
import ConsultationList from './ConsultationList'
import DiagnosticForm from './DiagnosticForm';

export default function AgriculteurDashboard() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Hello Anna !</h1>

      {/* Section Fermes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Fermes Enregistrées</h2>
        <FarmList />
      </section>

      {/* Section Demande de Diagnostic */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Demander un Diagnostic</h2>
        <DiagnosticForm />
      </section>

      {/* Section Suivi des Consultations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Consultations en Cours</h2>
        <ConsultationList />
      </section>
    </div>
  );
}
