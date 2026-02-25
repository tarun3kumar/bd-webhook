import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const userText =
    req.body?.queryResult?.queryText || "Hello";

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a concise voice assistant." },
        { role: "user", content: userText },
      ],
    });

    res.status(200).json({
      fulfillmentText: response.choices[0].message.content,
    });
  } catch (e) {
    res.status(200).json({
      fulfillmentText: "Something went wrong.",
    });
  }
}
