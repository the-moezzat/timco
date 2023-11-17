import { supabase } from '@/services/supabase';

export async function removeAlbum(
  postTitle: string,
  targetAlbum: string[],
  originalAlbum: string[][]
) {
  const paths = targetAlbum.map((image) => image.split('/').at(-1)) as string[];

  const newAlbums = originalAlbum.filter(
    (album) => targetAlbum[0] !== album[0]
  );

  const { error: deleteError } = await supabase.storage
    .from('images')
    .remove(paths);

  if (deleteError) throw new Error(deleteError.message);

  const { error } = await supabase
    .from('blog')
    .update({ albums: newAlbums })
    .eq('title', postTitle)
    .select();

  if (error) throw new Error(error.message);
}
