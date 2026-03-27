import { v2 as cloudinary } from "cloudinary";

const cloudinaryUrl = process.env.CLOUDINARY_API_URL;

if (cloudinaryUrl) {
  const url = new URL(
    cloudinaryUrl.replace("CLOUDINARY_URL=", "").replace("cloudinary://", "https://")
  );
  cloudinary.config({
    cloud_name: url.hostname,
    api_key: url.username,
    api_secret: url.password,
  });
}

export abstract class CloudinaryService {
  static generateSignature(folder = "portfolio/skills") {
    const timestamp = Math.round(Date.now() / 1000);

    const params: Record<string, string | number> = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      cloudinary.config().api_secret!
    );

    return {
      signature,
      timestamp,
      apiKey: cloudinary.config().api_key!,
      cloudName: cloudinary.config().cloud_name!,
      folder,
    };
  }

  static async uploadImage(file: File, folder = "portfolio/skills"): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, { folder });
    return result.secure_url;
  }

  static async deleteImage(publicId: string) {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  }

  static extractPublicId(imageUrl: string): string | null {
    const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    return match?.[1] ?? null;
  }
}
