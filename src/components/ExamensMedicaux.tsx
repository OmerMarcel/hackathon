// app/examens/page.tsx
'use client'

import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { Dialog } from '@headlessui/react'

function NewExamModal({ isOpen, setIsOpen, onAddExam }: { 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
  onAddExam: (exam: any) => void;
}) {
  const [patient, setPatient] = useState('')
  const [examType, setExamType] = useState('')
  const [date, setDate] = useState('')
  const [results, setResults] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (!patient || !examType || !date || !results) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const newExam = {
      type: examType,
      date: new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      patient,
      results,
      comment
    }

    onAddExam(newExam)
    
    // Reset form
    setPatient('')
    setExamType('')
    setDate('')
    setResults('')
    setComment('')
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">Nouvel examen</Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient</label>
              <select
                className="w-full mt-1 rounded-md border border-gray-200 p-2 focus:ring-green-500 focus:border-green-500"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              >
                <option value="">Sélectionner un patient</option>
                <option value="1">Martin Robert</option>
                <option value="2">Dubois Marie</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full mt-1 rounded-md border border-gray-200 p-2 pr-10 focus:ring-green-500 focus:border-green-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <CalendarDays className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type d'examen</label>
                <select
                  className="w-full mt-1 rounded-md border border-gray-200 p-2 focus:ring-green-500 focus:border-green-500"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                >
                  <option value="">Sélectionner</option>
                  <option value="sanguin">Analyses sanguines</option>
                  <option value="echo">Échographie rénale</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Résultats</label>
              <textarea
                className="w-full mt-1 rounded-md border border-gray-200 p-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                value={results}
                onChange={(e) => setResults(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Commentaire (optionnel)</label>
              <textarea
                className="w-full mt-1 rounded-md border border-gray-200 p-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button 
                className="px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-50" 
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </button>
              <button 
                className="px-4 py-2 text-sm text-white bg-green-700 rounded-md hover:bg-green-800"
                onClick={handleSubmit}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

const ExamCard = ({ type, date, patient, results, comment }: any) => (
  <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
    <h3 className="text-lg font-semibold text-primary-800">{type}</h3>
    <p className="text-sm text-secondary-500">📅 {date}</p>
    <p><strong>Patient :</strong> {patient}</p>
    <div>
      <p className="font-semibold">Résultats :</p>
      <div className="text-sm text-secondary-700 whitespace-pre-line">{results}</div>
    </div>
    <div>
      <p className="font-semibold">Commentaire :</p>
      <p className="text-sm text-secondary-700">{comment}</p>
    </div>
  </div>
)

export default function ExamsPage() {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPatient, setFilterPatient] = useState('')
  const [exams, setExams] = useState([
    {
      type: 'Analyses sanguines',
      date: '15 mai 2023',
      patient: 'Martin Robert',
      results: 'Créatinine : 85 µmol/L\nDFG : 72 ml/min/1,73 m²\nUrée : 6,2 mmol/L\nProtéinurie : 0,1 g/24h',
      comment: 'Fonction rénale stable par rapport au dernier contrôle.'
    },
    {
      type: 'Échographie rénale',
      date: '18 mai 2023',
      patient: 'Dubois Marie',
      results: 'Rein droit : 11,2 cm\nRêne gauche : 10,8 cm\nKystes : Multiples kystes corticaux\nDilatation : Absence de dilatation pyélocalicielle',
      comment: 'Compatibles avec une polykystose rénale autosomique dominante.'
    },
    {
      type: 'Analyses sanguines',
      date: '20 mai 2023',
      patient: 'Bernard Julie',
      results: 'Créatinine : 155 µmol/L\nDFG : 35 ml/min/1,73 m²\nUrée : 12,5 mmol/L\nProtéinurie : 0,6 g/24h\nHémoglobine : 11,2 g/dL',
      comment: 'Dégradation légère de la fonction rénale. À surveiller.'
    },
  ])

  const handleAddExam = (newExam: any) => {
    setExams([newExam, ...exams])
    setShowModal(false)
  }

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         exam.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === '' || exam.type === filterType
    const matchesPatient = filterPatient === '' || exam.patient === filterPatient
    return matchesSearch && matchesType && matchesPatient
  })

  const uniqueTypes = [...new Set(exams.map(exam => exam.type))]
  const uniquePatients = [...new Set(exams.map(exam => exam.patient))]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Examens Médicaux</h1>
          <p className="text-sm text-gray-500">Consultez et gérez les examens des patients</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Nouvel examen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Rechercher un examen..."
          className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Tous les types</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
        >
          <option value="">Tous les patients</option>
          {uniquePatients.map(patient => (
            <option key={patient} value={patient}>{patient}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredExams.map((exam, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-md space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{exam.type}</h3>
            <p className="text-sm text-gray-500">📅 {exam.date}</p>
            <p><strong>Patient :</strong> {exam.patient}</p>
            <div>
              <p className="font-semibold">Résultats :</p>
              <div className="text-sm text-gray-700 whitespace-pre-line">{exam.results}</div>
            </div>
            <div>
              <p className="font-semibold">Commentaire :</p>
              <p className="text-sm text-gray-700">{exam.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <NewExamModal isOpen={showModal} setIsOpen={setShowModal} onAddExam={handleAddExam} />
    </div>
  )
}
