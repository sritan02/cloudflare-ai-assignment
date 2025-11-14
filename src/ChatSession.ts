export interface Env {
  AI: any;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class ChatSession {
  state: DurableObjectState;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const { prompt } = body;

    if (!prompt) {
      return new Response('No prompt provided', { status: 400 });
    }

    let history = await this.state.storage.get<Message[]>('history') || [];

    if (history.length === 0) {
      history.push({ role: 'system', content: 'You are a helpful assistant.' });
    }

    history.push({ role: 'user', content: prompt });

    const aiResponse = await this.env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: history
    });

    history.push({ role: 'assistant', content: aiResponse.response });

    await this.state.storage.put('history', history);

    return Response.json(aiResponse);
  }
}
