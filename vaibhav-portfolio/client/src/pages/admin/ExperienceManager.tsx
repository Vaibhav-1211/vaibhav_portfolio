import { useState } from 'react';
import { useExperience } from '../../hooks/queries';
import { useCreateExperience, useUpdateExperience, useDeleteExperience } from '../../hooks/mutations';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ExperienceManager = () => {
  const { data: experience, isLoading } = useExperience();
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: 'Present',
    bullets: [''],
  });

  const resetForm = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData({ title: '', company: '', location: '', startDate: '', endDate: 'Present', bullets: [''] });
  };

  const handleEdit = (job: any) => {
    setIsEditing(true);
    setCurrentEditId(job._id);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      startDate: job.startDate,
      endDate: job.endDate,
      bullets: job.bullets.length ? job.bullets : [''],
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      deleteMutation.mutate(id, { onSuccess: () => toast.success('Deleted') });
    }
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      bullets: formData.bullets.filter(b => b.trim() !== ''),
      order: experience?.length || 0
    };

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Experience Manager</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Add Role
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-200 dark:border-blue-900 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{currentEditId ? 'Edit' : 'Add'} Role</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm mb-1">Title</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">Company</label><input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">Location</label><input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">Start Date</label><input value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">End Date (or Present)</label><input value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Bullets</label>
            {formData.bullets.map((bullet, idx) => (
              <div key={idx} className="flex mb-2">
                <textarea value={bullet} onChange={e => {
                  const newBullets = [...formData.bullets];
                  newBullets[idx] = e.target.value;
                  setFormData({...formData, bullets: newBullets});
                }} className="flex-grow px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 mr-2" rows={2} />
                <button onClick={() => setFormData({...formData, bullets: formData.bullets.filter((_, i) => i !== idx)})} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
              </div>
            ))}
            <button onClick={() => setFormData({...formData, bullets: [...formData.bullets, '']})} className="text-sm text-blue-600 hover:text-blue-700">+ Add Bullet</button>
          </div>
          <div className="flex justify-end pt-4 border-t dark:border-gray-700">
            <button onClick={handleSave} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Save Role
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {experience?.map(job => (
          <div key={job._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{job.company} • {job.startDate} - {job.endDate}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(job)} className="p-2 text-gray-500 hover:text-blue-500"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(job._id)} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;
