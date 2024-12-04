const etapesProduction = [
    { id: 1, nom: "Préparation du sol", statut: "Terminé", dateDebut: "2024-05-01", dateFin: "2024-05-03" },
    { id: 2, nom: "Semis", statut: "En cours", dateDebut: "2024-05-04", dateFin: "2024-05-10" },
    // etc.
  ];

  interface Etape {
    id: number;
    nom: string;
    statut: "Terminé" | "En cours" | "Non commencé";
    dateDebut: string;
    dateFin: string;
  }
  
  interface EtapeProductionProps {
    etape: Etape;
  }
  
  function EtapeProduction({ etape }: EtapeProductionProps) {
    return (
      <div className="flex items-center space-x-4">
        <div
          className={`rounded-full h-8 w-8 flex items-center justify-center 
            ${etape.statut === "Terminé" ? "bg-green-500" : etape.statut === "En cours" ? "bg-yellow-500" : "bg-gray-300"}`}
        >
          {etape.statut === "Terminé" ? "✓" : etape.statut === "En cours" ? "⏳" : "•"}
        </div>
        <div>
          <h3 className="font-semibold">{etape.nom}</h3>
          <p className="text-sm text-gray-500">
            {etape.dateDebut} - {etape.dateFin}
          </p>
        </div>
      </div>
    );
  }
  
  export default EtapeProduction;
  

  export function TimelineProduction() {
    // Exemple de données d'étapes
    const etapesProduction: Etape[] = [
      { id: 1, nom: "Préparation du sol", statut: "Terminé", dateDebut: "2024-03-01", dateFin: "2024-03-03" },
      { id: 2, nom: "Semis", statut: "En cours", dateDebut: "2024-03-04", dateFin: "2024-03-10" },
      { id: 3, nom: "Germination", statut: "Non commencé", dateDebut: "2024-03-11", dateFin: "2024-03-15" },
      // Ajoute plus d'étapes si nécessaire
    ];
  
    return (
      <div className="space-y-4">
        {etapesProduction.map((etape) => (
          <EtapeProduction key={etape.id} etape={etape} />
        ))}
      </div>
    );
  }
