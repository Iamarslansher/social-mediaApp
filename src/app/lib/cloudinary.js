import imageCompression from "browser-image-compression";

export const uploadToCloudinary = async (file) => {
  let optimizedFile = file;

  if (file.type.startsWith("image")) {
    optimizedFile = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    });
  }

  const formData = new FormData();

  formData.append("file", optimizedFile);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    type: file.type.startsWith("video") ? "video" : "image",
    name: file.name,
  };
};
