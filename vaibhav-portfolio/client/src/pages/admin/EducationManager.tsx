import { useState } from 'react';
import { useEducation } from '../../hooks/queries';
import { useCreateEducation, useUpdateEducation, useDeleteEducation } from '../../hooks/mutations';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const EducationManager = () => {
  const { data: education, isLoading } = useEducation();
  const createMutation = useCreateEducation();
  const updateMutation = useUpdateEducation();
  const deleteMutation = useDeleteEducation();

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    cgpa: '',
    startYear: '',
    endYear: '',
  });

  const resetForm = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData({ degree: '', institution: '', cgpa: '', startYear: '', endYear: '' });
  };

  const handleEdit = (edu: any) => {
    setIsEditing(true);
    setCurrentEditId(edu._id);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      cgpa: edu.cgpa,
      startYear: edu.startYear,
      endYear: edu.endYear,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      deleteMutation.mutate(id, { onSuccess: () => toast.success('Deleted') });
    }
  };

  const handleSave = () => {
    const dataToSave = { ...formData, order: education?.length || 0 };

    if (currentEditId) {
      updateMutation.mutate({ id: currentEditId, data: dataToSave }, {
        onSuccess: () => { toast.success('Updated'); resetForm(); }
      });
    } else {
      createMutation.mutate(dataToSave, {
        onSuccess: () => { toast.success('Created'); resetForm(); }
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Education Manager</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Add Education
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-200 dark:border-blue-900 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{currentEditId ? 'Edit' : 'Add'} Education</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2"><label className="block text-sm mb-1">Degree / Course</label><input value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div className="md:col-span-2"><label className="block text-sm mb-1">Institution</label><input value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">Start Year</label><input value={formData.startYear} onChange={e => setFormData({...formData, startYear: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">End Year</label><input value={formData.endYear} onChange={e => setFormData({...formData, endYear: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">CGPA / Grade</label><input value={formData.cgpa} onChange={e => setFormData({...formData, cgpa: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
          </div>
          <div className="flex justify-end pt-4 border-t dark:border-gray-700">
            <button onClick={handleSave} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Save Education
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {education?.map(edu => (
          <div key={edu._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{edu.degree}</h3>
              <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
              <p className="text-sm text-gray-500 mt-1">Class of {edu.endYear} • CGPA: {edu.cgpa}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(edu)} className="p-2 text-gray-500 hover:text-blue-500"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(edu._id)} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManager;
