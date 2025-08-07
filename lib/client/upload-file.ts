import { supabase } from "./supabase";
import { nanoid } from "nanoid";

export async function uploadFile(file: File) {
  // Get the file extension
  const extension = file.name.split(".").pop();
  // Generate a unique file name with nanoid and correct extension
  const fileName = `${nanoid()}.${extension}`;
  
  // Upload to the bucket with the generated file name
  const { error } = await supabase.storage
    .from("learnway-attachment")
    .upload(fileName, file);

  if (error) {
    return { error };
  }

  // Get the public URL for the uploaded file
  const { data: urlData } = supabase.storage
    .from("learnway-attachment")
    .getPublicUrl(fileName);

  return { url: urlData.publicUrl, error: null };
}
