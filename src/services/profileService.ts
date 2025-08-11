import { supabase } from '@/lib/supabase';

export type Profile = {
  id: string
  profile_id: string
  user_id: string
  username?: string
  home_currency?: string
  travel_preferences?: Record<string, unknown>
}

export const profileService = {
  async getOwn(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
    if (error) return null;
    return data as unknown as Profile;
  },

  async upsertOwn(profile: Partial<Omit<Profile, 'id' | 'user_id'>>): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Ensure there is a profile row; insert if missing, else update
    const { data: existing } = await supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle();
    if (!existing) {
      const insertRow = { ...profile, user_id: user.id } as any;
      const { data, error } = await supabase.from('profiles').insert([insertRow]).select().single();
      if (error) throw error;
      return data as Profile;
    }
    const { data, error } = await supabase.from('profiles').update(profile).eq('user_id', user.id).select().single();
    if (error) throw error;
    return data as Profile;
  },
};


