import { supabase } from '@/services/supabase';

export async function getSections() {
  const { data: current_sections, error } = await supabase
    .from('current_sections')
    .select('*');

  if (error) throw new Error(error.message);

  return current_sections;
}

export async function deleteSection(id: number) {
  const { data, error } = await supabase
    .from('current_sections')
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  return data;
}

export async function addSection(title: string) {
  const { data, error } = await supabase
    .from('current_sections')
    .insert([{ title }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function editSection({
  title,
  id,
}: {
  title: string;
  id: number;
}) {
  const { data, error } = await supabase
    .from('current_sections')
    .update({ title })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getItems(sectionId: number) {
  // get all items for from section id from newest to latest

  const { data: current_sections, error } = await supabase
    .from('current_items')
    .select('*')
    .eq('section_id', sectionId)
    .order('id', { ascending: false });

  if (error) throw new Error(error.message);

  return current_sections;
}

export async function deleteItem(id: number) {
  const { data, error } = await supabase
    .from('current_items')
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  return data;
}

export async function addItem({
  title,
  section_id,
  description,
  link,
}: {
  title: string;
  section_id: number;
  description?: string;
  link?: string;
}) {
  const { data, error } = await supabase
    .from('current_items')
    .insert([{ title, section_id, description, link }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function editItem({
  id,
  title,
  description,
  link,
}: {
  id: number;
  title: string;
  description: string;
  link: string;
}) {
  const { data, error } = await supabase
    .from('current_items')
    .update({ title, description, link })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
