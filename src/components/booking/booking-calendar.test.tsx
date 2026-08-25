import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BookingCalendar } from "@/components/booking/booking-calendar";

vi.mock("@calcom/embed-react", () => ({ default: () => <div data-testid="calcom-embed" /> }));

describe("BookingCalendar", () => {
  it("renders an actionable fallback when no booking URL is configured", () => {
    render(<BookingCalendar />);
    expect(screen.getByTestId("booking-fallback")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", "mailto:hello@example.com");
  });
});
