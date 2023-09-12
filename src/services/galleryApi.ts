import { supabase } from './supabase';

export async function uploadImage(file: File) {
  // https://ymecappcpodzozqwmydb.supabase.co/storage/v1/object/public/gallery/WhatsApp%20Image%202023-04-21%20at%201.18.45%20PM.jpeg
  const imageName = `${Math.random()}-${file.name}`
    .replace(' ', '_')
    .replace('/', '');

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('images')
    .upload(imageName, file);

  if (uploadError) throw new Error(uploadError.message);

  const { data, error } = await supabase
    .from('gallery')
    .insert([
      {
        img: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/images/${uploadData.path}`,
        name: file.name,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getImages() {
  const { data, error } = await supabase.from('gallery').select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteImage({
  id,
  imageName,
}: {
  id: string;
  imageName: string;
}) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .match({ id })
    .select();

  if (error) throw new Error(error.message);

  const { error: DeleteError } = await supabase.storage
    .from('images')
    .remove([imageName]);

  if (DeleteError) throw new Error(DeleteError.message);
}

export async function downloadImage(imageName: string) {
  const { data, error } = await supabase.storage
    .from('images')
    .download(imageName);

  if (error) throw new Error(error.message);

  return data;
}
