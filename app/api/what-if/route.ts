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
                content: `You are a historian. When given a what-if scenario, return ONLY a JSON object with no extra text, in this exact format:
                {
                "summary": "2-3 sentence overview of this alternate history",
                "timeline": [
                    {
                    "year": "1947",
                    "event": "What actually happened or would have happened",
                    "type": "changed"
                    }
                ]
                }
        
                Rules:
                - Include 5-7 timeline events
                - type must be either "real" (actual history) or "changed" (alternate history)
                - Start with 1-2 real events as context, then show how history diverges
                - Be specific with years and events, and give interesting takes on how major historical events would have changed, and namely how our world today would look
                - Sound dramatic and human, not like a textbook`,
            },
            {
                role: "user",
                content: `What if: ${question}`,
            },
        ],
        max_tokens: 1024,
    });

    const text = completion.choices[0].message.content ?? "";
    const parsed = JSON.parse(text);
    return Response.json({ result: parsed });
}