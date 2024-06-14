import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for diverse audience. Avoid personal or sensitive topics, focusing instead of universal themes that encourage friendly interactions. For example your output should be structured like this: 'What is hobby you have recently started?||If you could have dinner with any historical figure, who whould it be?||What is a simple thing that make you happy?', Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openAi.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 200,
      stream: true,
      prompt,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.error("An unexpected error occured ", error);
      throw error;
    }
  }
}
