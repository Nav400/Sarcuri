import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
    const { question } = await request.json();

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are a historian who writes like a novelist. You write in a gripping, human voice — like you're telling a story to a friend who loves history, not writing an essay for a professor. 
        
                 Rules you must follow:
                - Never use phrases like "certainly", "absolutely", "it's important to note", or "in conclusion"
                - Never start a sentence with "Furthermore" or "Moreover"
                - Write in short punchy paragraphs, not long walls of text
                - Use specific names, dates, and places — not vague generalities
                - Show consequences dramatically — what would ordinary people have felt?
                - Write exactly 3 paragraphs, no headers, no bullet points
                - Sound like a human who is genuinely excited about this topic`,
            },
            {
                role: "user",
                content: question,
            },
        ],
        max_tokens: 1024,
    });

    const result = completion.choices[0].message.content;
    return Response.json({ result });
}