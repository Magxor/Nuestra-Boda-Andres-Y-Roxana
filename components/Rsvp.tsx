
import React, { useState, useMemo } from 'react';
import { RsvpFormData, Guest, GuestType, TransportType, AccommodationType, WishStyle } from '../types';
import { Loader2, CheckCircle, Trash2, Plus, Copy, MessageCircle, Car, Bike, Users, XCircle, X, Tent, Building, MapPin, Phone, AlertCircle, ExternalLink } from 'lucide-react';

const Rsvp: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([
    { 
      id: '1', 
      fullName: '', 
      contact: '', 
      type: 'adult', 
      openBar: false, 
      dietaryRestrictions: '',
      transport: 'none',
      accommodationType: 'none',
      accommodationName: ''
    }
  ]);
  
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'debit' | 'credit' | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Pricing Constants
  const COST_ADULT = 39000;
  const COST_CHILD_PAID = 19500;
  const COST_OPEN_BAR = 15000;

  // Accommodation Data
  const CAMPING_OPTIONS = [
    { name: "Patio de los Novios", details: "Hay un Patio disponible para acampar en dónde se hospedan los Novios.", contact: "Consultar con Novios", waNumber: "5493584835320" },
    { name: "Camping Tenis Club Correa", details: "Duchas agua caliente, parrilleros, seguridad 24hs $10.000/Persona.", contact: "Administración", waNumber: "5493417202056" },
     ];

  const HOTEL_OPTIONS = [
    { name: "Quedate Apart Hotel (Correa)", details: "Cabañas dobles/triples, cochera, desayuno. $85.000 x 3 Personas aprox", contact: "Recepción", waNumber: "5493471688696" },
    { name: "Hotel Verdesole (Cañada)", details: "Hotel de 2 Estrellas. $65.000/Persona aprox Cochera semi techada", contact: "Reservas", waNumber: "5493471315579" }
  ];

  const handleGuestChange = (id: string, field: keyof Guest, value: any) => {
    setGuests(prev => prev.map(g => {
      if (g.id !== id) return g;

      // Logic to reset openBar and set transport if changing to child type
      if (field === 'type') {
        if (value !== 'adult') {
          // If child (paid or free), reset openBar AND set transport to 'passenger'
          return { ...g, [field]: value, openBar: false, transport: 'passenger', accommodationType: 'none', accommodationName: '' };
        }
      }
      
      // If transport changes to something other than moto, reset accommodation
      if (field === 'transport' && value !== 'moto') {
          return { ...g, [field]: value, accommodationType: 'none', accommodationName: '' };
      }

      // If accommodation type changes, reset the specific name selection
      if (field === 'accommodationType') {
          return { ...g, [field]: value, accommodationName: '' };
      }

      return { ...g, [field]: value };
    }));
  };

  const addGuest = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setGuests(prev => [...prev, { 
      id: newId, 
      fullName: '', 
      contact: '', 
      type: 'adult', 
      openBar: false, 
      dietaryRestrictions: '',
      transport: 'none',
      accommodationType: 'none',
      accommodationName: ''
    }]);
  };

  const removeGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const totalCost = useMemo(() => {
    return guests.reduce((total, guest) => {
      let guestCost = 0;
      if (guest.type === 'adult') guestCost += COST_ADULT;
      if (guest.type === 'child_paid') guestCost += COST_CHILD_PAID;
      if (guest.openBar) guestCost += COST_OPEN_BAR;
      return total + guestCost;
    }, 0);
  }, [guests]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Alias copiado al portapapeles');
  };

  const buildWhatsAppMessage = () => {
    let msg = `Hola Andres y Roxana! 👋 Quiero confirmar mi asistencia a su boda.\n\n`;
    
    msg += `*INVITADOS:* (${guests.length})\n`;
    guests.forEach((g, i) => {
      const typeLabel = g.type === 'adult' ? 'Adulto' : (g.type === 'child_paid' ? 'Niño (4-7)' : 'Niño (1-3)');
      
      let transportLabel = 'Sin vehículo';
      if (g.transport === 'auto') transportLabel = 'Auto 🚗';
      if (g.transport === 'moto') transportLabel = 'Moto 🏍';
      if (g.transport === 'passenger') transportLabel = 'Acompañante 🤝';

      msg += `\n👤 *Invitado ${i + 1}:* ${g.fullName}`;
      if (g.type === 'adult') {
        msg += `\n   📞 Contacto: ${g.contact}`;
      }
      msg += `\n   🎟 Entrada: ${typeLabel}`;
      msg += `\n   🚗 Transporte: ${transportLabel}`;

      if (g.transport === 'moto' && g.accommodationType && g.accommodationType !== 'none') {
         const accLabel = g.accommodationType === 'camping' ? 'Camping ⛺' : 'Hotel 🏨';
         msg += `\n   🛏 Alojamiento: ${accLabel}`;
         if (g.accommodationName) {
            msg += ` (${g.accommodationName})`;
         }
      }
      
      if (g.type === 'adult') {
         msg += `\n   🍹 Barra Libre: ${g.openBar ? 'SÍ' : 'NO'}`;
      }
      
      if (g.dietaryRestrictions) msg += `\n   🥗 Restricciones: ${g.dietaryRestrictions}`;
      msg += `\n`;
    });

    msg += `\n💰 *TOTAL A PAGAR:* $${totalCost.toLocaleString()}`;
    
    const payMethodLabel = paymentMethod === 'transfer' ? 'Transferencia' : (paymentMethod === 'debit' ? 'Tarjeta de Débito' : 'Tarjeta de Crédito');
    msg += `\n💳 *Forma de Pago:* ${payMethodLabel}`;
    
    if (message) {
      msg += `\n\n💌 *Mensaje:* ${message}`;
    }

    return encodeURIComponent(msg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Small delay to show loading state
    setTimeout(() => {
      const waLink = `https://wa.me/5493584835320?text=${buildWhatsAppMessage()}`;
      window.open(waLink, '_blank');
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const openAccommodationChat = (number: string, placeName: string) => {
     const text = encodeURIComponent(`Hola! Me gustaría consultar disponibilidad el dia 17 de enero en ${placeName}.`);
     window.open(`https://wa.me/${number}?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="glass-card p-4 sm:p-8 rounded-3xl shadow-2xl border border-white/60 max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wedding-royal via-blue-300 to-wedding-royal"></div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-8">
            {guests.map((guest, index) => (
              <div key={guest.id} className="bg-white/70 p-4 sm:p-6 rounded-2xl border border-blue-100 relative animate-fade-in shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-blue-100 pb-2">
                   <h4 className="font-cinzel font-bold text-wedding-royal text-lg">Invitado #{index + 1}</h4>
                   {guests.length > 1 && (
                     <button type="button" onClick={() => removeGuest(guest.id)} className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-full">
                       <Trash2 className="w-5 h-5" />
                     </button>
                   )}
                </div>

                {/* 1. TIPO DE ENTRADA (First as requested) */}
                <div className="mb-5">
                    <label className="text-xs font-bold text-wedding-royal uppercase tracking-wider mb-2 block">Seleccioná el tipo de Tarjeta</label>
                    <div className="relative">
                        <select
                          value={guest.type}
                          onChange={(e) => handleGuestChange(guest.id, 'type', e.target.value as GuestType)}
                          className="w-full px-4 py-3 rounded-xl bg-blue-50/50 border border-blue-200 focus:border-wedding-royal outline-none appearance-none cursor-pointer text-slate-800 font-medium transition-all hover:bg-blue-50"
                        >
                          <option value="adult">Adulto ($39.000)</option>
                          <option value="child_free">Menor (1-3 años) - Gratis</option>
                          <option value="child_paid">Menor (4-12 años) - $19.500</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-4 h-4 text-wedding-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* 2. NOMBRE */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nombre y Apellido</label>
                    <input
                      required
                      type="text"
                      value={guest.fullName}
                      onChange={(e) => handleGuestChange(guest.id, 'fullName', e.target.value)}
                      className="w-full px-3 py-3 rounded-lg bg-white border border-slate-200 focus:border-wedding-royal outline-none text-slate-800 transition-shadow focus:shadow-md"
                      placeholder="Nombre completo"
                    />
                  </div>
                  
                  {/* 3. CONTACTO (Hidden for children) */}
                  {guest.type === 'adult' && (
                    <div className="space-y-1 animate-fade-in">
                      <label className="text-xs font-bold text-slate-500 uppercase">Contacto (Tel/Email)</label>
                      <input
                        required
                        type="text"
                        value={guest.contact}
                        onChange={(e) => handleGuestChange(guest.id, 'contact', e.target.value)}
                        className="w-full px-3 py-3 rounded-lg bg-white border border-slate-200 focus:border-wedding-royal outline-none text-slate-800 transition-shadow focus:shadow-md"
                        placeholder="WhatsApp o Email"
                      />
                    </div>
                  )}
                </div>

                {/* 4. RESTRICCIONES */}
                <div className="mb-4 space-y-1">
                   <label className="text-xs font-bold text-slate-500 uppercase">Restricciones Alimentarias</label>
                   <input
                      type="text"
                      value={guest.dietaryRestrictions}
                      onChange={(e) => handleGuestChange(guest.id, 'dietaryRestrictions', e.target.value)}
                      className="w-full px-3 py-3 rounded-lg bg-white border border-slate-200 focus:border-wedding-royal outline-none text-slate-800 placeholder-slate-300"
                      placeholder="Celiaco, Vegano, Alergias..."
                    />
                </div>

                {/* 5. BARRA LIBRE (Conditionally Rendered for Adults only) */}
                {guest.type === 'adult' && (
                  <div className="mb-6 animate-fade-in">
                    <div className="flex items-center gap-3 bg-blue-50/80 p-3 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                      <input
                        type="checkbox"
                        id={`bar-${guest.id}`}
                        checked={guest.openBar}
                        onChange={(e) => handleGuestChange(guest.id, 'openBar', e.target.checked)}
                        className="w-5 h-5 rounded text-wedding-royal focus:ring-wedding-royal cursor-pointer"
                      />
                      <label htmlFor={`bar-${guest.id}`} className="text-sm text-slate-700 cursor-pointer select-none flex-1 font-medium">
                        Incluir Barra Libre (+$15.000) (Cerveza, Vino, Fernet, Gancia)
                      </label>
                    </div>
                  </div>
                )}

                {/* 6. TRANSPORTE (Per guest) */}
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase block text-center sm:text-left">¿Asistirás en vehículo?</label>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {/* Adult Options */}
                      {guest.type === 'adult' && (
                        <>
                          <label className={`cursor-pointer border rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all ${guest.transport === 'auto' ? 'bg-wedding-royal text-white border-wedding-royal shadow-md scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}>
                              <input type="radio" name={`transport-${guest.id}`} className="hidden" value="auto" onChange={() => handleGuestChange(guest.id, 'transport', 'auto')} checked={guest.transport === 'auto'} />
                              <Car className="w-5 h-5" />
                              <span className="text-[10px] font-bold uppercase">Auto</span>
                          </label>
                          <label className={`cursor-pointer border rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all ${guest.transport === 'moto' ? 'bg-wedding-royal text-white border-wedding-royal shadow-md scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}>
                              <input type="radio" name={`transport-${guest.id}`} className="hidden" value="moto" onChange={() => handleGuestChange(guest.id, 'transport', 'moto')} checked={guest.transport === 'moto'} />
                              <Bike className="w-5 h-5" />
                              <span className="text-[10px] font-bold uppercase">Moto</span>
                          </label>
                          <label className={`cursor-pointer border rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all ${guest.transport === 'passenger' ? 'bg-wedding-royal text-white border-wedding-royal shadow-md scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}>
                              <input type="radio" name={`transport-${guest.id}`} className="hidden" value="passenger" onChange={() => handleGuestChange(guest.id, 'transport', 'passenger')} checked={guest.transport === 'passenger'} />
                              <Users className="w-5 h-5" />
                              <span className="text-[10px] font-bold uppercase text-center leading-none">Acompañante</span>
                          </label>
                          <label className={`cursor-pointer border rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all ${guest.transport === 'none' ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}>
                              <input type="radio" name={`transport-${guest.id}`} className="hidden" value="none" onChange={() => handleGuestChange(guest.id, 'transport', 'none')} checked={guest.transport === 'none'} />
                              <XCircle className="w-5 h-5" />
                              <span className="text-[10px] font-bold uppercase">No</span>
                          </label>
                        </>
                      )}

                      {/* Minor Options (Only Passenger) */}
                      {guest.type !== 'adult' && (
                        <label className={`col-span-2 sm:col-span-4 cursor-pointer border rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all bg-wedding-royal text-white border-wedding-royal shadow-md opacity-80 cursor-not-allowed`}>
                            <input type="radio" name={`transport-${guest.id}`} className="hidden" value="passenger" checked={true} readOnly />
                            <Users className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase text-center leading-none">Acompañante</span>
                        </label>
                      )}
                   </div>
                </div>

                {/* 7. ACCOMMODATION FOR MOTOS (Conditional) */}
                {guest.type === 'adult' && guest.transport === 'moto' && (
                  <div className="mt-6 animate-fade-in bg-blue-50/50 p-4 rounded-xl border border-blue-200">
                     <p className="text-xs font-bold text-wedding-royal uppercase tracking-wider mb-3 flex items-center gap-2">
                       <Tent className="w-4 h-4" /> Opciones para Viajeros en Moto
                     </p>
                     
                     {/* Category Selection */}
                     <div className="grid grid-cols-2 gap-3 mb-4">
                        <label className={`cursor-pointer p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${guest.accommodationType === 'camping' ? 'border-wedding-royal bg-white shadow-md' : 'border-slate-200 hover:border-blue-300'}`}>
                           <input type="radio" name={`acc-${guest.id}`} className="hidden" value="camping" onChange={() => handleGuestChange(guest.id, 'accommodationType', 'camping')} checked={guest.accommodationType === 'camping'} />
                           <Tent className={`w-6 h-6 ${guest.accommodationType === 'camping' ? 'text-wedding-royal' : 'text-slate-400'}`} />
                           <span className="text-sm font-bold text-slate-700">Quiero Acampar</span>
                        </label>
                        <label className={`cursor-pointer p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${guest.accommodationType === 'hotel' ? 'border-wedding-royal bg-white shadow-md' : 'border-slate-200 hover:border-blue-300'}`}>
                           <input type="radio" name={`acc-${guest.id}`} className="hidden" value="hotel" onChange={() => handleGuestChange(guest.id, 'accommodationType', 'hotel')} checked={guest.accommodationType === 'hotel'} />
                           <Building className={`w-6 h-6 ${guest.accommodationType === 'hotel' ? 'text-wedding-royal' : 'text-slate-400'}`} />
                           <span className="text-sm font-bold text-slate-700">Busco Hotel</span>
                        </label>
                     </div>

                     {/* Camping Warning */}
                     {guest.accommodationType === 'camping' && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-4 animate-fade-in flex gap-3">
                           <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                           <div className="text-xs text-yellow-800">
                             <span className="font-bold">Recordatorio importante:</span> Debes traer tu carpa y todos los artículos necesarios para acampar cómodamente.
                           </div>
                        </div>
                     )}

                     {/* Specific List Selection */}
                     {guest.accommodationType === 'camping' && (
                       <div className="space-y-3 animate-fade-in-up">
                         {CAMPING_OPTIONS.map((opt, i) => (
                           <div 
                              key={i} 
                              onClick={() => handleGuestChange(guest.id, 'accommodationName', opt.name)}
                              className={`bg-white p-3 rounded-lg border-2 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 cursor-pointer transition-all ${guest.accommodationName === opt.name ? 'border-wedding-royal ring-1 ring-wedding-royal' : 'border-blue-100 hover:border-blue-300'}`}
                           >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center ${guest.accommodationName === opt.name ? 'bg-wedding-royal border-wedding-royal' : 'bg-white'}`}>
                                    {guest.accommodationName === opt.name && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                  </div>
                                  <p className="font-bold text-slate-800 text-sm">{opt.name}</p>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 ml-6">{opt.details}</p>
                              </div>
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); openAccommodationChat(opt.waNumber, opt.name); }}
                                className="ml-6 sm:ml-0 text-xs font-medium text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors z-10"
                              >
                                <MessageCircle className="w-3 h-3" /> Contactar
                              </button>
                           </div>
                         ))}
                       </div>
                     )}

                     {guest.accommodationType === 'hotel' && (
                       <div className="space-y-3 animate-fade-in-up">
                         {HOTEL_OPTIONS.map((opt, i) => (
                           <div 
                              key={i} 
                              onClick={() => handleGuestChange(guest.id, 'accommodationName', opt.name)}
                              className={`bg-white p-3 rounded-lg border-2 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 cursor-pointer transition-all ${guest.accommodationName === opt.name ? 'border-wedding-royal ring-1 ring-wedding-royal' : 'border-blue-100 hover:border-blue-300'}`}
                           >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                   <div className={`w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center ${guest.accommodationName === opt.name ? 'bg-wedding-royal border-wedding-royal' : 'bg-white'}`}>
                                    {guest.accommodationName === opt.name && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                  </div>
                                  <p className="font-bold text-slate-800 text-sm">{opt.name}</p>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 ml-6">{opt.details}</p>
                              </div>
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); openAccommodationChat(opt.waNumber, opt.name); }}
                                className="ml-6 sm:ml-0 text-xs font-medium text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors z-10"
                              >
                                <MessageCircle className="w-3 h-3" /> Contactar
                              </button>
                           </div>
                         ))}
                       </div>
                     )}
                  </div>
                )}

              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={addGuest}
              className="flex items-center gap-2 text-wedding-royal font-bold hover:bg-blue-50 px-6 py-3 rounded-full transition-colors border-2 border-transparent hover:border-blue-100"
            >
              <Plus className="w-5 h-5" /> Añadir otro Invitado
            </button>
          </div>

          <div className="border-t border-slate-200 my-6"></div>

          <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center text-xl font-cinzel mb-6">
              <span>Total a Pagar</span>
              <span className="text-2xl text-blue-400 font-bold">${totalCost.toLocaleString()}</span>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-bold uppercase tracking-wider text-slate-400">Forma de Pago</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'transfer' ? 'bg-wedding-royal text-white border-wedding-royal scale-105 shadow-lg' : 'border-slate-600 hover:border-slate-400'}`}>
                  <input type="radio" name="payment" className="hidden" value="transfer" onChange={() => setPaymentMethod('transfer')} checked={paymentMethod === 'transfer'} />
                  <span className="font-bold text-sm">Transferencia</span>
                </label>
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'debit' ? 'bg-white text-slate-900 border-white scale-105 shadow-lg' : 'border-slate-600 hover:border-slate-400'}`}>
                  <input type="radio" name="payment" className="hidden" value="debit" onChange={() => setPaymentMethod('debit')} checked={paymentMethod === 'debit'} />
                  <span className="font-bold text-sm">T. Débito</span>
                </label>
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'credit' ? 'bg-white text-slate-900 border-white scale-105 shadow-lg' : 'border-slate-600 hover:border-slate-400'}`}>
                  <input type="radio" name="payment" className="hidden" value="credit" onChange={() => setPaymentMethod('credit')} checked={paymentMethod === 'credit'} />
                  <span className="font-bold text-sm">T. Crédito</span>
                </label>
              </div>

              {/* Info de Transferencia INLINE */}
              {paymentMethod === 'transfer' && (
                 <div className="bg-wedding-royal/20 border border-wedding-royal/30 p-4 rounded-xl mt-4 animate-fade-in flex flex-col items-center">
                    <p className="text-slate-300 text-xs mb-2 uppercase tracking-widest">Alias para transferir:</p>
                    <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/10">
                       <span className="font-mono text-xl text-white font-bold tracking-wider">andresmunini</span>
                       <button 
                         type="button"
                         onClick={() => copyToClipboard('andresmunini')} 
                         className="text-blue-300 hover:text-white transition-colors"
                       >
                          <Copy className="w-5 h-5" />
                       </button>
                    </div>
                    <p className="text-slate-400 text-[10px] mt-2">Copia el alias y realiza el pago en tu app bancaria.</p>
                 </div>
              )}
              
              {(paymentMethod === 'debit' || paymentMethod === 'credit') && (
                 <div className="text-center text-sm text-slate-300 bg-slate-700/50 p-2 rounded mt-2 animate-fade-in">
                   Podrás abonar con tarjeta al llegar al evento.
                 </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2 gap-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Mensaje para los novios (Opcional)</label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 focus:border-wedding-royal outline-none resize-none transition-all"
                  placeholder="Déjanos tus buenos deseos..."
                />
              </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || paymentMethod === null}
            className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-cinzel text-lg tracking-widest shadow-lg hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 relative overflow-hidden group"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="relative flex items-center gap-2 font-sans font-bold">
                <MessageCircle className="w-6 h-6" /> ENVIAR POR WHATSAPP
              </span>
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative shadow-2xl transform animate-fade-in-up border-4 border-blue-50">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
               <div className="w-20 h-20 bg-wedding-royal rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                 <CheckCircle className="w-10 h-10 text-white" />
               </div>
            </div>
            <button 
              onClick={() => setShowSuccessModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mt-8">
              <h3 className="font-cinzel font-bold text-2xl text-slate-800 mb-4">¡Gracias por confirmar su asistencia!</h3>
              <p className="text-slate-600 font-serif italic text-lg mb-6">
                Los esperamos ansiosos!.
              </p>
              <p className="text-wedding-royal font-bold text-sm tracking-widest uppercase mb-8">
                ¡Gracias por ser Parte!
              </p>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-wedding-royal text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rsvp;
