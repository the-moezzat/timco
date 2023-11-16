import { supabase } from '@/services/supabase';

export async function removeAlbums(album: string[], newAlbums: string[][]) {
  const paths = album.map((image) => image.split('/').at(-1)) as string[];

  const { error: deleteError } = await supabase.storage
    .from('images')
    .remove(paths);

  if (deleteError) throw new Error(deleteError.message);

  const { error } = await supabase
    .from('blog')
    .update({ albums: newAlbums })
    .select();

  if (error) throw new Error(error.message);
}
