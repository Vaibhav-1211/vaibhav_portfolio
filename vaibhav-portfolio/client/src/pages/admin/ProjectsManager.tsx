import { useState } from 'react';
import { useProjects } from '../../hooks/queries';
import { useCreateProject, useUpdateProject, useDeleteProject } from '../../hooks/mutations';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ProjectsManager = () => {
  const { data: projects, isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stack: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });

  const resetForm = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setImageFile(null);
    setFormData({ title: '', description: '', stack: '', liveUrl: '', githubUrl: '', featured: false });
  };

  const handleEdit = (project: any) => {
    setIsEditing(true);
    setCurrentEditId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      stack: project.stack.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id, { onSuccess: () => toast.success('Deleted') });
    }
  };

  const handleSave = () => {
    const dataToSave = new FormData();
    dataToSave.append('title', formData.title);
    dataToSave.append('description', formData.description);
    dataToSave.append('stack', formData.stack); // server parses comma separated string
    dataToSave.append('featured', String(formData.featured));
    if (formData.liveUrl) dataToSave.append('liveUrl', formData.liveUrl);
    if (formData.githubUrl) dataToSave.append('githubUrl', formData.githubUrl);
    if (imageFile) dataToSave.append('image', imageFile);

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects Manager</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-200 dark:border-blue-900 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{currentEditId ? 'Edit' : 'Add'} Project</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm mb-1">Title</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">Stack (comma separated)</label><input value={formData.stack} onChange={e => setFormData({...formData, stack: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">Live URL</label><input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
            <div><label className="block text-sm mb-1">GitHub URL</label><input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" /></div>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium">Featured Project</span>
            </label>
            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 transition-colors ml-auto">
              <ImageIcon className="w-4 h-4 mr-2" />
              <span className="text-sm">{imageFile ? imageFile.name : 'Upload Image'}</span>
              <input type="file" className="hidden" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <div className="flex justify-end pt-4 border-t dark:border-gray-700">
            <button onClick={handleSave} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Save Project
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.map(project => (
          <div key={project._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
              {project.featured && <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">Featured</span>}
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500"><ImageIcon className="w-8 h-8 opacity-50" /></div>
              )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-bold text-lg mb-1">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="mt-auto flex justify-end space-x-2 pt-4 border-t dark:border-gray-700">
                <button onClick={() => handleEdit(project)} className="p-2 text-gray-500 hover:text-blue-500 bg-gray-50 dark:bg-gray-700 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(project._id)} className="p-2 text-gray-500 hover:text-red-500 bg-gray-50 dark:bg-gray-700 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
