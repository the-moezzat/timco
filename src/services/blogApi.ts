import { supabase } from './supabase';

export async function AddPost({
  title,
  content,
  thumbnail,
}: {
  title: string;
  content: string;
  thumbnail: FileList;
}) {
  const imageName = `${Math.random()}-${thumbnail[0].name}`
    .replace(' ', '_')
    .replace('/', '');

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('images')
    .upload(imageName, thumbnail[0]);

  if (uploadError) throw new Error(uploadError.message);

  const { data, error } = await supabase
    .from('blog')
    .insert([
      {
        title,
        content,
        thumbnail: `https://ymecappcpodzozqwmydb.supabase.co/storage/v1/object/public/images/${uploadData.path}`,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getPostById(id: string) {
  const { data, error } = await supabase.from('blog').select().eq('id', id);

  if (error) throw new Error(error.message);

  return data;
}

export async function getAllPosts() {
  const { data, error } = await supabase.from('blog').select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deletePost(id: string) {
  const { error, data } = await supabase
    .from('blog')
    .delete()
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  const { error: DeleteError } = await supabase.storage
    .from('images')
    .remove([data[0].thumbnail?.split('/').at(-1) as string]);

  if (DeleteError) throw new Error(DeleteError.message);
}

export async function updatePost({
  id,
  title,
  content,
  thumbnail,
}: {
  id: string;
  title: string;
  content: string;
  thumbnail: FileList | string;
}) {
  let thumbnailPath = thumbnail as string;

  if (typeof thumbnail === 'object') {
    const imageName = `${Math.random()}-${thumbnail[0].name}`
      .replace(' ', '_')
      .replace('/', '');

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(imageName, thumbnail[0]);

    if (uploadError) throw new Error(uploadError.message);

    thumbnailPath = `https://ymecappcpodzozqwmydb.supabase.co/storage/v1/object/public/images/${uploadData.path}`;
  }

  const { data, error } = await supabase
    .from('blog')
    .update({ title, content, thumbnail: thumbnailPath })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
