import { http, HttpResponse } from "msw";

export const handlers = [
  // Games API
  http.get("/api/games", () => {
    return HttpResponse.json([
      { id: "1", name: "Catan", _count: { sessions: 5 } },
      { id: "2", name: "Ticket to Ride", _count: { sessions: 3 } },
    ]);
  }),

  http.post("/api/games", async ({ request }) => {
    const body = (await request.json()) as { name: string };

    if (!body.name) {
      return HttpResponse.json({ error: "Name is required" }, { status: 400 });
    }

    return HttpResponse.json({ id: "1", name: body.name });
  }),

  // Groups API
  http.get("/api/groups", () => {
    return HttpResponse.json([
      { id: "1", name: "Weekly Game Night" },
      { id: "2", name: "Family Games" },
    ]);
  }),

  http.post("/api/groups", async ({ request }) => {
    const body = (await request.json()) as { name: string };

    if (!body.name) {
      return HttpResponse.json({ error: "Name is required" }, { status: 400 });
    }

    return HttpResponse.json({ id: "1", name: body.name });
  }),

  http.get("/api/groups/:groupId/members", ({ params }) => {
    return HttpResponse.json([
      { id: "1", name: "Alice", email: "alice@test.com" },
      { id: "2", name: "Bob", email: "bob@test.com" },
    ]);
  }),

  // Users API
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: "1", name: "Alice", email: "alice@test.com", isGuest: false },
      { id: "2", name: "Bob", email: "bob@test.com", isGuest: false },
    ]);
  }),

  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as { name: string; email?: string };

    if (!body.name) {
      return HttpResponse.json({ error: "Name is required" }, { status: 400 });
    }

    return HttpResponse.json({
      id: "1",
      name: body.name,
      email: body.email || null,
      isGuest: false,
    });
  }),

  // Sessions API
  http.post("/api/sessions", async ({ request }) => {
    const body = (await request.json()) as any;

    return HttpResponse.json({
      id: "1",
      gameId: body.gameId,
      groupId: body.groupId,
      playedAt: body.playedAt,
      players: body.players,
    });
  }),

  // Templates API
  http.get("/api/games/:gameId/templates", ({ params }) => {
    return HttpResponse.json([
      {
        id: "1",
        name: "Base Game",
        fields: JSON.stringify([
          { key: "coins", label: "Coins", multiplier: 1 },
          { key: "cities", label: "Cities", multiplier: 2 },
        ]),
      },
    ]);
  }),
];
