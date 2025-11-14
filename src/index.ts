export { ChatSession } from './ChatSession';

export interface Env {
  CHAT_SESSIONS: DurableObjectNamespace;
  AI: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const id = env.CHAT_SESSIONS.idFromName('DEMO_SESSION');
    const stub = env.CHAT_SESSIONS.get(id);
    const response = await stub.fetch(request);

    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    return newResponse;
  },
};
