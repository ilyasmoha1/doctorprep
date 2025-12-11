import OpenAI from "openai"

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy_key_for_dev_change_me",
})
