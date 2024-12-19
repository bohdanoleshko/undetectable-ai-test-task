import openai from "./openai-client";

export async function summarizeText(inputText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: `Summarize the following text: ${inputText}`,
        },
      ],
    });

    const summary = response.choices[0].message.content;

    return summary;
  } catch (error) {
    throw new Error(`Failed to summarize text: ${error}`);
  }
}
