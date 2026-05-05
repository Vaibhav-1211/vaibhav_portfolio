import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { IProfile, ISkill, IExperience, IProject, IEducation, IContactMessage } from '../types';

export const useProfile = () => useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    const { data } = await api.get<IProfile>('/profile');
    return data;
  }
});

export const useSkills = () => useQuery({
  queryKey: ['skills'],
  queryFn: async () => {
    const { data } = await api.get<ISkill[]>('/skills');
    return data;
  }
});

export const useExperience = () => useQuery({
  queryKey: ['experience'],
  queryFn: async () => {
    const { data } = await api.get<IExperience[]>('/experience');
    return data;
  }
});

export const useProjects = () => useQuery({
  queryKey: ['projects'],
  queryFn: async () => {
    const { data } = await api.get<IProject[]>('/projects');
    return data;
  }
});

export const useEducation = () => useQuery({
  queryKey: ['education'],
  queryFn: async () => {
    const { data } = await api.get<IEducation[]>('/education');
    return data;
  }
});

// Admin Queries
export const useMessages = () => useQuery({
  queryKey: ['messages'],
  queryFn: async () => {
    const { data } = await api.get<IContactMessage[]>('/admin/messages');
    return data;
  }
});
