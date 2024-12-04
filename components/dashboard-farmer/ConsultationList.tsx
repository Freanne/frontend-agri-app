export default function ConsultationList() {
    const consultations = [
      { farmer: 'Jean', date: '2024-01-01', problem: 'Insectes sur maïs' },
      { farmer: 'Marie', date: '2024-02-10', problem: 'Problème de sol' },
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Agriculteur</th>
              <th className="py-2">Date</th>
              <th className="py-2">Problème</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{consultation.farmer}</td>
                <td className="py-2">{consultation.date}</td>
                <td className="py-2">{consultation.problem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  