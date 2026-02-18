import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateGroupDialog } from "./create-group-dialog";

const mockFetch = vi.fn();
global.fetch = mockFetch;

function mockFetchResponses(responses: Record<string, unknown>) {
  mockFetch.mockImplementation((url: string) => {
    const data = responses[url] ?? [];
    return Promise.resolve({
      ok: true,
      json: async () => data,
    } as Response);
  });
}

describe("CreateGroupDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchResponses({
      "/api/users": [
        { id: "1", name: "Alice", email: "alice@test.com" },
        { id: "2", name: "Bob", email: "bob@test.com" },
      ],
    });
  });

  it("should render the trigger button", () => {
    render(<CreateGroupDialog />);

    const button = screen.getByRole("button", { name: /create group/i });
    expect(button).toBeInTheDocument();
  });

  it("should open dialog when clicked", async () => {
    const user = userEvent.setup();
    render(<CreateGroupDialog />);

    await user.click(screen.getByRole("button", { name: /create group/i }));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("should have name input", async () => {
    const user = userEvent.setup();
    render(<CreateGroupDialog />);

    await user.click(screen.getByRole("button", { name: /create group/i }));

    await waitFor(() => {
      const input = screen.getByLabelText(/group name/i);
      expect(input).toBeInTheDocument();
    });
  });

  it("should submit form and create group", async () => {
    const user = userEvent.setup();

    mockFetch.mockImplementation((url: string, options?: RequestInit) => {
      if (url === "/api/users") {
        return Promise.resolve({
          ok: true,
          json: async () => [],
        } as Response);
      }
      if (url === "/api/groups" && options?.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ id: "1", name: "Test Group" }),
        } as Response);
      }
      return Promise.resolve({ ok: true, json: async () => ({}) } as Response);
    });

    render(<CreateGroupDialog />);

    await user.click(screen.getByRole("button", { name: /create group/i }));

    await waitFor(async () => {
      const input = screen.getByLabelText(/group name/i);
      await user.type(input, "Test Group");
    });

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/groups",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    const groupsCall = mockFetch.mock.calls.find(
      (call: unknown[]) => call[0] === "/api/groups"
    );
    expect(groupsCall).toBeDefined();
    const body = JSON.parse(groupsCall![1].body);
    expect(body.name).toBe("Test Group");
  });

  it("should close dialog after successful submission", async () => {
    const user = userEvent.setup();

    mockFetch.mockImplementation((url: string, options?: RequestInit) => {
      if (url === "/api/users") {
        return Promise.resolve({
          ok: true,
          json: async () => [],
        } as Response);
      }
      if (url === "/api/groups" && options?.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ id: "1", name: "Test Group" }),
        } as Response);
      }
      return Promise.resolve({ ok: true, json: async () => ({}) } as Response);
    });

    render(<CreateGroupDialog />);

    await user.click(screen.getByRole("button", { name: /create group/i }));

    await waitFor(async () => {
      const input = screen.getByLabelText(/group name/i);
      await user.type(input, "Test Group");
    });

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
