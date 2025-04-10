import React, { useState } from "react";
import { User, HeartPulse, Droplets, Syringe, Pill, ShieldPlus, Baby, Hospital, History, Bug, Cross } from "lucide-react";

type PatientCaseFormProps = {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
};

export default function PatientCaseForm({ onSubmit, onCancel, initialData }: PatientCaseFormProps) {
  const [formData, setFormData] = useState({
    patientId: initialData?.patientId || '',
    heartDisease: initialData?.heartDisease || '',
    foodAllergies: initialData?.foodAllergies || '',
    diabetic: initialData?.diabetic || '',
    hypertension: initialData?.hypertension || '',
    accident: initialData?.accident || '',
    surgery: initialData?.surgery || '',
    familyHistory: initialData?.familyHistory || '',
    other: initialData?.other || '',
    pregnancy: initialData?.pregnancy || '',
    currentMedications: initialData?.currentMedications || '',
    healthInsurance: initialData?.healthInsurance || '',
    breastfeeding: initialData?.breastfeeding || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-purple-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-green-800 mb-6">
          {initialData ? 'Modifier une étude de cas' : 'Ajouter une étude de cas de patient'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Sélectionner un patient <span className="text-red-600">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-green-800" size={16} />
                <select 
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded shadow-sm"
                  required
                >
                  <option value="">Sélectionner un patient</option>
                  {/* TODO: Ajouter la liste des patients */}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Maladie cardiaque</label>
              <div className="relative">
                <HeartPulse className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="heartDisease"
                  value={formData.heartDisease}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Maladie cardiaque" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Allergie alimentaire</label>
              <div className="relative">
                <Bug className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="foodAllergies"
                  value={formData.foodAllergies}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Allergie alimentaire" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Diabétique</label>
              <div className="relative">
                <Droplets className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="diabetic"
                  value={formData.diabetic}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Diabétique" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Hypertension artérielle</label>
              <div className="relative">
                <Droplets className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="hypertension"
                  value={formData.hypertension}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Hypertension artérielle" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Accident</label>
              <div className="relative">
                <Cross className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="accident"
                  value={formData.accident}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Accident" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Chirurgie</label>
              <div className="relative">
                <Syringe className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="surgery"
                  value={formData.surgery}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Chirurgie" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Médecine familiale Histoire</label>
              <div className="relative">
                <History className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Antécédents médicaux familiaux" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Autrui</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="other"
                  value={formData.other}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Autrui" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Grossesse</label>
              <div className="relative">
                <Baby className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="pregnancy"
                  value={formData.pregnancy}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Grossesse" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Médicaments actuels</label>
              <div className="relative">
                <Pill className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Médicaments actuels" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Assurance maladie</label>
              <div className="relative">
                <ShieldPlus className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="healthInsurance"
                  value={formData.healthInsurance}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Assurance maladie" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Allaitement</label>
              <div className="relative">
                <Hospital className="absolute left-3 top-2.5 text-green-800" size={16} />
                <input 
                  name="breastfeeding"
                  value={formData.breastfeeding}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded" 
                  placeholder="Allaitement" 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button 
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
              Envoyer
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="bg-gray-100 border px-6 py-2 rounded hover:bg-gray-200"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 