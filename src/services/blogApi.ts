import { supabase } from './supabase';

async function uploadAlbums(albums: FileList[]) {
  const albumsPath: string[][] = [];

  for (let i = 0; i < albums.length; i++) {
    albumsPath[i] = [];
    for (let j = 0; j < albums[i].length; j++) {
      const imageName = `${Math.random()}-${albums[i].item(j)?.name}`
        .replace(' ', '-')
        .replace('/', '');
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(imageName, albums[i].item(j) as File);

      if (uploadError) throw new Error(uploadError.message);

      albumsPath[i].push(
        `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/${
          uploadData.path
        }`
      );
    }
  }

  return albumsPath;
}

export async function AddPost({
  title,
  draft,
  content,
  category,
  thumbnail,
  albums,
}: {
  title: string;
  content: string;
  thumbnail: FileList;
  category: string;
  draft: boolean;
  albums: FileList[];
}) {
  const imageName = `${Math.random()}-${thumbnail[0].name}`
    .replace(' ', '-')
    .replace('/', '');

  const albumsPath: string[][] = await uploadAlbums(albums);

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
        category,
        draft,
        thumbnail: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/images/${uploadData.path}`,
        albums: albumsPath,
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

export async function getAllPosts({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  const { data, error } = await supabase
    .from('blog')
    .select('*')
    .ilike('title', `%${title}%`)
    .ilike('category', `%${category}%`);

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

  const albums = data[0].albums as string[][];

  for (let i = 0; i < albums?.length; i++) {
    for (let j = 0; j < albums[i].length; j++) {
      const { error: deleteError } = await supabase.storage
        .from('images')
        .remove([albums[i][j].split('/').at(-1) as string]);

      if (deleteError) throw new Error(deleteError.message);
    }
  }

  const { error: DeleteError } = await supabase.storage
    .from('images')
    .remove([data[0].thumbnail?.split('/').at(-1) as string]);

  if (DeleteError) throw new Error(DeleteError.message);
}

export async function updatePost({
  id,
  draft,
  title,
  content,
  category,
  thumbnail,
  oldAlbumsOrder,
  newAlbums,
}: {
  id: string;
  draft: boolean;
  title: string;
  content: string;
  category: string;
  thumbnail: FileList | string;
  oldAlbumsOrder: string[][];
  newAlbums: FileList[];
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

    thumbnailPath = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/images/${uploadData.path}`;
  }

  const albumsPath = await uploadAlbums(newAlbums);

  const albums = [...oldAlbumsOrder, ...albumsPath];

  const { data, error } = await supabase
    .from('blog')
    .update({
      title,
      content,
      thumbnail: thumbnailPath,
      draft,
      category,
      albums,
    })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function draftPost({ id, draft }: { id: string; draft: boolean }) {
  const { data, error } = await supabase
    .from('blog')
    .update({ draft })
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
