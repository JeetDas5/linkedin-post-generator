import { openrouter } from "@/lib/openrouter";
import { NextRequest, NextResponse } from "next/server";
import { buildLinkedInPrompt } from "@/lib/prompt";
import { validateGenerateInput } from "@/lib/validator";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationError = validateGenerateInput(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { voice, audience, topic, length } = body;

    const prompt = buildLinkedInPrompt({
      voice,
      audience,
      topic,
      length,
    });

    const completion = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a world-class LinkedIn ghostwriter who writes viral, professional posts.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const post =
      completion.choices?.[0]?.message?.content || "Failed to generate post.";

    return NextResponse.json(
      {
        success: true,
        post,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Generation Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate LinkedIn post.",
      },
      { status: 500 }
    );
  }
}
