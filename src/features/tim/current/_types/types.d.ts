import { Database } from '@/types/schema';

export type Section = Database['public']['Tables']['current_sections']['Row'];
export type Item = Database['public']['Tables']['current_items']['Row'];
