export function buildLinkedInPrompt({
  voice,
  audience,
  topic,
  length,
}: PromptParams) {
  const lengthMap = {
    short: "100-150 words",
    medium: "180-220 words",
    long: "250-300 words",
  };

  const selectedLength =
    lengthMap[length as keyof typeof lengthMap] || "180-220 words";

  return `
You are an expert LinkedIn content strategist.

Write a high-quality LinkedIn post with the following parameters:

Voice/Tone: ${voice}
Target Audience: ${audience}
Topic/Trend: ${topic}
Length: ${selectedLength}

Strict Guidelines:
- Start with a strong 1-2 line hook
- Use natural LinkedIn-style formatting (short paragraphs)
- Make it insightful and valuable (not generic)
- Clearly match the requested voice and audience
- Avoid emojis spam (max 2)
- Add a thoughtful closing line
- Don't make it sound like AI-generated content
- Don't make incomplete sentences or leave hanging thoughts
- Optional: 2-3 relevant hashtags at the end

Important:
Return ONLY the LinkedIn post text.
Do not include explanations or metadata.
`;
}
