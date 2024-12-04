export default function FarmList() {
    const farms = [
      { name: 'Ferme A', area: '20 hectares', location: 'Benin' },
      { name: 'Ferme B', area: '50 hectares', location: 'Nigeria' },
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Nom de la Ferme</th>
              <th className="py-2">Superficie</th>
              <th className="py-2">Localisation</th>
            </tr>
          </thead>
          <tbody>
            {farms.map((farm, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{farm.name}</td>
                <td className="py-2">{farm.area}</td>
                <td className="py-2">{farm.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  