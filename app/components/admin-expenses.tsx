"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useBooking, ExpenseRequest } from '../lib/booking-context';
import { useToast } from '../lib/toast-context';

export default function AdminExpenses() {
  const { logExpense, saveExpenseDraft, expenseDraftToEdit, setExpenseDraftToEdit, deleteNotification } = useBooking();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draftIdToDelete, setDraftIdToDelete] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<ExpenseRequest>({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: 0,
    description: '',
    invoiceId: '',
    imageBase64: null
  });

  // Handle Draft Editing
  useEffect(() => {
    if (expenseDraftToEdit) {
      setIsEditMode(true);
      setDraftIdToDelete(expenseDraftToEdit.id);
      
      const data = expenseDraftToEdit.data;
      setFormData({
        date: data.date || new Date().toISOString().split('T')[0],
        amount: data.amount ? Math.abs(data.amount) : 0,
        category: data.category || '',
        description: data.description || '',
        invoiceId: data.invoiceId || '',
        imageBase64: data.imageBase64 || null
      });
      
      if (data.imageBase64) {
        setImagePreview(data.imageBase64);
      }
    }
  }, [expenseDraftToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      processImage(input.files[0]);
    }
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Use 'image/webp' for smaller file size
        const dataUrl = canvas.toDataURL('image/webp', 0.7);
        setImagePreview(dataUrl);
        setFormData(prev => ({ ...prev, imageBase64: dataUrl }));
      };
      img.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageBase64: null }));
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      amount: 0,
      description: '',
      invoiceId: '',
      imageBase64: null
    });
    setImagePreview(null);
    setIsEditMode(false);
    setDraftIdToDelete(null);
    setExpenseDraftToEdit(null);
  };

  const handleSaveDraft = async () => {
    if (!formData.category) {
       toast('Du skal som minimum vælge en kategori for at gemme en kladde.', 'error');
       return;
    }

    setIsSubmitting(true);

    try {
      await saveExpenseDraft({
        ...formData,
        description: formData.description || 'Kladde (Under konstruktion)'
      });

      toast('Fil gemt i Float med status "UNDER_CONSTRUCTION". Du kan finde den i din indbakke.', 'success');
      
      if (isEditMode && draftIdToDelete) {
         deleteNotification(draftIdToDelete);
      }
      
      resetForm();
    } catch (e) {
      toast('Fejl under lagring af kladde.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.description) {
      toast('Udfyld venligst dato, beløb, kategori og beskrivelse for at bogføre.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await logExpense(formData);
      if (res.status === 'success') {
        toast('Bilag bogført og gemt i loggen!', 'success');
        
        if (isEditMode && draftIdToDelete) {
           deleteNotification(draftIdToDelete);
        }
        
        resetForm();
      } else {
        toast('Der opstod en fejl.', 'error');
      }
    } catch (e) {
      toast('Der opstod en fejl.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-6 border-b border-slate-700 flex justify-between items-center">
             <div>
               <h2 className="text-xl font-bold text-white">Registrer Bilag</h2>
               <p className="text-slate-400 text-sm mt-1">Tilføj udgifter, udbetalinger eller skat.</p>
             </div>
             {isEditMode && (
               <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse uppercase tracking-wide">
                 Redigerer Kladde
               </div>
             )}
          </div>
          
          <div className="p-8">
             <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dato</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Beløb (DKK)</label>
                    <input 
                      type="number" 
                      name="amount"
                      value={formData.amount || ''}
                      onChange={handleInputChange}
                      placeholder="0.00" 
                      className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Faktura Nr.</label>
                  <input 
                    type="text" 
                    name="invoiceId"
                    value={formData.invoiceId}
                    onChange={handleInputChange}
                    placeholder="F.eks. 2024-105" 
                    className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Kategori</label>
                   <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-orange-500 focus:outline-none"
                   >
                     <option value="" disabled>Vælg kategori</option>
                     <optgroup label="Drift">
                       <option value="Materialer">Materialer</option>
                       <option value="Brændstof / Kørsel">Brændstof / Kørsel</option>
                       <option value="Værktøj">Værktøj</option>
                       <option value="Kontor / IT">Kontor / IT</option>
                       <option value="Forplejning">Forplejning</option>
                       <option value="Andet">Andet</option>
                     </optgroup>
                     <optgroup label="Finansielt">
                       <option value="Lønudbetaling">Lønudbetaling (Privat)</option>
                       <option value="Skat">Skat</option>
                     </optgroup>
                   </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Beskrivelse</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3} 
                    placeholder="Hvad er købt og hvorhenne?" 
                    className="w-full bg-slate-50 border border-slate-300 rounded p-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Upload Kvittering (Billede)</label>
                  
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 px-4 py-3 rounded text-sm font-bold transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>
                      {imagePreview ? 'Skift Billede' : 'Vælg Billede'}
                      <input type="file" onChange={onFileSelected} accept="image/*" className="hidden" />
                    </label>
                    {!imagePreview && <span className="text-xs text-slate-400">Ingen fil valgt (valgfri)</span>}
                  </div>

                  {imagePreview && (
                    <div className="mt-4 relative inline-block border border-slate-300 rounded p-1 bg-white shadow-sm">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={imagePreview} className="max-h-32 rounded" alt="Preview" />
                       <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 shadow">&times;</button>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                   <button 
                     type="button"
                     onClick={handleSaveDraft}
                     disabled={isSubmitting}
                     className="bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded shadow transition-colors flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                     </svg>
                     Gem til senere
                   </button>

                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="bg-orange-600 hover:bg-orange-500 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded shadow-lg transition-colors flex items-center gap-2">
                     {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                     ) : (
                        'Bogfør Nu'
                     )}
                   </button>
                </div>

             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
