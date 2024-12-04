export default function DiagnosticForm() {
    return (
      <form className="bg-white p-4 rounded-lg shadow space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description du problème
          </label>
          <textarea
            id="description"
            // rows="4"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
  
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Photo du problème
          </label>
          <input
            id="image"
            type="file"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Envoyer la demande de diagnostic
        </button>
      </form>
    );
  }
  