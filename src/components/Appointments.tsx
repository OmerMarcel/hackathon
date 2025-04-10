import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarDays, Clock } from 'lucide-react';

function NewAppointmentModal({ isOpen, setIsOpen, onAddAppointment }: { 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
  onAddAppointment: (appointment: any) => void;
}) {
  const [patientName, setPatientName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState('pending')

  const handleSubmit = () => {
    if (!patientName || !date || !time || !reason) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const newAppointment = {
      id: Date.now().toString(),
      patientName,
      date: new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      time,
      reason,
      status
    }

    onAddAppointment(newAppointment)
    
    // Reset form
    setPatientName('')
    setDate('')
    setTime('')
    setReason('')
    setStatus('pending')
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-green-800 mb-4">Nouveau rendez-vous</Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700">Patient</label>
              <select
                className="w-full mt-1 rounded-md border border-secondary-200 p-2 focus:ring-green-500 focus:border-green-500"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              >
                <option value="">Sélectionner un patient</option>
                <option value="Martin Robert">Martin Robert</option>
                <option value="Dubois Marie">Dubois Marie</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full mt-1 rounded-md border border-secondary-200 p-2 pr-10 focus:ring-green-500 focus:border-green-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <CalendarDays className="absolute right-3 top-3 text-secondary-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700">Heure</label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full mt-1 rounded-md border border-secondary-200 p-2 pr-10 focus:ring-green-500 focus:border-green-500"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <Clock className="absolute right-3 top-3 text-secondary-400" size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700">Motif</label>
              <textarea
                className="w-full mt-1 rounded-md border border-secondary-200 p-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700">Statut</label>
              <select
                className="w-full mt-1 rounded-md border border-secondary-200 p-2 focus:ring-green-500 focus:border-green-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button 
                className="px-4 py-2 text-sm text-secondary-600 rounded-md hover:bg-secondary-50" 
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </button>
              <button 
                className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
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

return (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-green-800">Rendez-vous</h1>
        <p className="text-sm text-secondary-600">Gérez vos rendez-vous et consultations</p>
      </div>
      <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
        + Nouveau rendez-vous
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Rechercher un rendez-vous..."
        className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <select
        className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">Tous les statuts</option>
        <option value="confirmed">Confirmé</option>
        <option value="pending">En attente</option>
        <option value="cancelled">Annulé</option>
      </select>

      <select
        className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      >
        <option value="">Toutes les dates</option>
        <option value="today">Aujourd'hui</option>
        <option value="tomorrow">Demain</option>
        <option value="week">Cette semaine</option>
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAppointments.map((appointment, idx) => (
        <div key={idx} className="bg-white rounded-lg p-4 shadow-md space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-green-800">{appointment.patientName}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {appointment.status === 'confirmed' ? 'Confirmé' :
               appointment.status === 'pending' ? 'En attente' :
               'Annulé'}
            </span>
          </div>
          <p className="text-sm text-secondary-500">📅 {appointment.date}</p>
          <p className="text-sm text-secondary-500">⏰ {appointment.time}</p>
          <p className="text-sm text-secondary-700">{appointment.reason}</p>
          <div className="flex justify-end space-x-2 pt-2">
            <button 
              className="text-secondary-600 hover:text-secondary-800"
              onClick={() => handleEdit(appointment)}
            >
              Modifier
            </button>
            <button 
              className="text-danger-600 hover:text-danger-800"
              onClick={() => handleDelete(appointment.id)}
            >
              Annuler
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
); 