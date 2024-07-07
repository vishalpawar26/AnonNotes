const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function run() {
//   const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for diverse audience. Avoid personal or sensitive topics, focusing instead of universal themes that encourage friendly interactions. For example your output should be structured like this: 'What is hobby you have recently started?||If you could have dinner with any historical figure, who whould it be?||What is a simple thing that make you happy?', Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();

export async function POST(request: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for diverse audience. Avoid personal or sensitive topics, focusing instead of universal themes that encourage friendly interactions. For example your output should be structured like this: 'What is hobby you have recently started?||If you could have dinner with any historical figure, who whould it be?||What is a simple thing that make you happy?', Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. Avoid wrapping the response in double or single inverted commas.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    return Response.json(
      {
        success: true,
        messages: text,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("An unexpected error occured: ", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
