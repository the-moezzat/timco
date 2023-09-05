import { supabase } from './supabase';

export async function uploadImage(file: File) {
  // https://ymecappcpodzozqwmydb.supabase.co/storage/v1/object/public/gallery/WhatsApp%20Image%202023-04-21%20at%201.18.45%20PM.jpeg
  const imageName = `${Math.random()}-${file.name}`
    .replace(' ', '_')
    .replace('/', '');

  // const imagePath = `https://ymecappcpodzozqwmydb.supabase.co/storage/v1/object/public/gallery/${imageName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(imageName, file);

  if (uploadError) throw new Error(uploadError.message);

  const { data, error } = await supabase
    .from('images')
    .insert([
      {
        img: `https://ymecappcpodzozqwmydb.supabase.co/storage/v1/object/public/gallery/${uploadData.path}`,
        name: file.name,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getImages() {
  const { data, error } = await supabase.from('images').select();

  if (error) throw new Error(error.message);

  return data;
}
