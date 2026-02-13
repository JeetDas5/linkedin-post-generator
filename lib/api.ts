import axios from "axios";

export async function GeneratePost(params: PromptParams): Promise<string> {
  const response = await axios.post("/api/generate", params);
  if (response.data.success) {
    return response.data.post;
  } else {
    return Promise.reject(new Error(response.data.error));
  }
}
