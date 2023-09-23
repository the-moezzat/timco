import { supabase } from './supabase';

export async function AddAlbum(images: string[]) {
  const { data, error } = await supabase
    .from('album')
    .insert([
      {
        images,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getAlbum(id: number) {
  const { data: album, error } = await supabase
    .from('album')
    .select('*')
    .eq('id', id);

  if (error) throw new Error(error.message);

  return album;
}
