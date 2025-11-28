import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateGroupDialog } from "./create-group-dialog";

// Mock fetch globally
global.fetch = vi.fn();

describe("CreateGroupDialog", () => {
  beforeEach(() => {
    vi.resetAllMocks();
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
    const mockFetch = vi.mocked(fetch);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "1", name: "Test Group" }),
    } as Response);

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
          body: JSON.stringify({ name: "Test Group" }),
        })
      );
    });
  });

  it("should close dialog after successful submission", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "1", name: "Test Group" }),
    } as Response);

    render(<CreateGroupDialog />);

    await user.click(screen.getByRole("button", { name: /create group/i }));

    await waitFor(async () => {
      const input = screen.getByLabelText(/group name/i);
      await user.type(input, "Test Group");
    });

    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    // Dialog should close
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
