function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Model did not return valid JSON.');
    return JSON.parse(match[0]);
  }
}

async function openAIChat({ system, user }) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ]
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || 'OpenAI request failed');
  }

  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from model');
  return safeJsonParse(text);
}

export async function generateStrategy(prompt, strategySystemPrompt) {
  return openAIChat({
    system: strategySystemPrompt,
    user: `حلل هذا الطلب كخبير صفحات هبوط وحوّله إلى استراتيجية تحويل منظمة:\n\n${prompt}`
  });
}

export async function generateCopy({ prompt, strategy, copySystemPrompt }) {
  return openAIChat({
    system: copySystemPrompt,
    user: `بناءً على الطلب التالي:\n${prompt}\n\nوهذه الاستراتيجية:\n${JSON.stringify(strategy, null, 2)}\n\nولّد Copy احترافي لصفحة هبوط.`
  });
}

export async function improveCopy({ copy, instruction, improveSystemPrompt }) {
  return openAIChat({
    system: improveSystemPrompt,
    user: `النسخة الحالية:\n${JSON.stringify(copy, null, 2)}\n\nالمطلوب:\n${instruction}`
  });
}
