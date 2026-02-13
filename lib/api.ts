import axios from "axios";

export async function GeneratePost(params: PostParams): Promise<string> {
  const response = await axios.post("/api/generate", params);
  if (response.data.success) {
    return response.data.post;
  } else {
    throw new Error(response.data.error || "Failed to generate post.");
  }
}
