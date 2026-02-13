export function validateGenerateInput(body: any) {
  const { voice, audience, topic, length } = body;

  if (!voice || typeof voice !== "string") {
    return "Voice is required and must be a string.";
  }

  if (!audience || typeof audience !== "string") {
    return "Target audience is required and must be a string.";
  }

  if (!topic || typeof topic !== "string") {
    return "Topic is required and must be a string.";
  }

  if (length && typeof length !== "string") {
    return "Length must be a string.";
  }

  if (length && !["short", "medium", "long"].includes(length)) {
    return "Length must be short, medium, or long.";
  }

  return null;
}
