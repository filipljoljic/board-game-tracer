import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateGameDialog } from "./create-game-dialog";

// Mock fetch globally
global.fetch = vi.fn();

describe("CreateGameDialog", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render the trigger button", () => {
    render(<CreateGameDialog />);

    const button = screen.getByRole("button", { name: /add game/i });
    expect(button).toBeInTheDocument();
  });

  it("should open dialog when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateGameDialog />);

    const button = screen.getByRole("button", { name: /add game/i });
    await user.click(button);

    // Dialog should be open and show the form
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("should have a name input field", async () => {
    const user = userEvent.setup();
    render(<CreateGameDialog />);

    await user.click(screen.getByRole("button", { name: /add game/i }));

    await waitFor(() => {
      const input = screen.getByLabelText(/game name/i);
      expect(input).toBeInTheDocument();
    });
  });

  it("should call API when form is submitted with valid name", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "1", name: "Catan" }),
    } as Response);

    render(<CreateGameDialog />);

    // Open dialog
    await user.click(screen.getByRole("button", { name: /add game/i }));

    // Fill in form
    await waitFor(async () => {
      const input = screen.getByLabelText(/game name/i);
      await user.type(input, "Catan");
    });

    // Submit form
    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    // Verify API was called
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/games",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ name: "Catan" }),
        })
      );
    });
  });

  it("should not call API when name is empty", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.mocked(fetch);

    render(<CreateGameDialog />);

    // Open dialog
    await user.click(screen.getByRole("button", { name: /add game/i }));

    // Try to submit without filling name (or with empty name)
    await waitFor(async () => {
      const submitButton = screen.getByRole("button", { name: /create/i });
      await user.click(submitButton);
    });

    // Should not call API for empty name
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
