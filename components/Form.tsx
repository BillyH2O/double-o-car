export default function Form() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md">
      <div className="flex justify-around mb-4">
        <button className="px-4 py-2 rounded-t-lg bg-black text-white">
          Lieu de retour identique
        </button>
        <button className="px-4 py-2 rounded-t-lg bg-gray-200 text-black">
          lieu de retour différent 
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Lieu de départ</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Entrez le lieu de départ" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lieu de retour</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Entrez le lieu de retour" />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded">Rechercher une voiture</button>
      </div>
    </div>
  );
}
  