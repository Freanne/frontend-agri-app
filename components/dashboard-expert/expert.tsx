import PendingConsultations from './PendingConsultation'
import AvailabilityToggle from './AvalabilityToggle';

export default function ExpertDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Expert Agricole</h1>

      {/* Disponibilité */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Votre Disponibilité</h2>
        <AvailabilityToggle />
      </section>

      {/* Consultations en attente */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Consultations en Attente</h2>
        <PendingConsultations />
      </section>
    </div>
  );
}
