//Maybe add in the option of choosing the number of questions or the difficulty

import Groq from "groq-sdk"; //sdk is SOftware Development Kit... it's a pre-packaged toolkit that provides a variety or resources so that you don't need to write it yourself from scratch. The groq sdk has all of the APIs and the code needed to talk to Groq AI models.

const groq = new Groq({ //When I call this with my API key, it creates a little groq object that knows how to communicate with Groq's AI
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) { //handles the POST request (when I send something and look for a response back)
    const { question } = await request.json() //json is a method of the request object the reads the request and parses it as a JSON. The { question } is the destructuring; creates a variable called question that equals the value behind the question key in the JSON.

    const completion = await groq.chat.completions.create({ //chats with groq about creating a completion (a response) using the following information
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are an AI quiz generator. When given a topic, return ONLY a raw JSON object, no markdown, no backticks, no extra text, in this exact format:
                {
                  "questions": [
                    {
                      "question": "Question text here?",
                      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
                      "answer": "A) option1",
                      "explanation": explain why the answer is correct
                    }
                  ]
                }
                Rules:
                - Generate exactly 10 questions
                - Each question has exactly 4 options
                - answer must exactly match one of the options
                - No newlines or line breaks inside any string values
                - Raw JSON only, nothing else`,
            },
            {
                role: "user",
                content: `Quiz: ${question}`,
            },
        ],
        max_tokens: 2048,
    });

    const text = completion.choices[0].message.content ?? ""; //goes through the array of choices (should only be one element), and returns the message content... if there is no content, the ?? signal a fallback to an empty string.
    const cleaned = text.replace(/```json|```/g, "").trim(); //cleans up the text that is returned, replaces all instances/globally (g) of the "json" text with "", and trims it
    const parsed = JSON.parse(cleaned); //JSON.parse(text) turns the JSON string into a real JavaScript object, instead of just keys and values. Thus, it's easier to access data (like with the what-if situation, i can do result.timeline to access the data because it was converted into a Javascript object)
    return Response.json({ result: parsed}); //{ result: parsed } wraps the whole parsed variable (the object of the AI response) with a result key, so i can access the data by doing data.result. Response.json just converts it into a JSON string.
}