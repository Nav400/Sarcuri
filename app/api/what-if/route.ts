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
                content: `You are a historian and storyteller specializing in alternative history. When given a what-if scenario, write a compelling, summarized 1 paragraph essay that is historically grounded, specific, and imaginative. Reference real historical figures, events, and consequences where relevant. Go far into the future with this alternative history. Tell how major history events would have been different and (if applicable) how the modern world would be different`,
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