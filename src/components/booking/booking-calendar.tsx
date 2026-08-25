"use client";

import Cal from "@calcom/embed-react";
import { CalendarClock, Mail } from "lucide-react";
import { useEffect, useMemo } from "react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

type BookingCalendarProps = {
  provider?: "calcom";
};

function getCalLink(bookingUrl: string) {
  try {
    const url = new URL(bookingUrl);
    if (!url.hostname.endsWith("cal.com")) return "";
    return url.pathname.replace(/^\//, "").replace(/\/$/, "");
  } catch {
    return bookingUrl.replace(/^https?:\/\/cal\.com\//, "").replace(/\/$/, "");
  }
}

export function BookingCalendar({ provider = "calcom" }: BookingCalendarProps) {
  const calLink = useMemo(() => getCalLink(siteConfig.bookingUrl), []);

  useEffect(() => {
    if (calLink) trackEvent("booking_calendar_loaded", { provider });
  }, [calLink, provider]);

  if (!calLink) {
    return (
      <div className="flex min-h-[620px] flex-col items-center justify-center border border-line bg-panel p-8 text-center" data-testid="booking-fallback">
        <CalendarClock aria-hidden="true" className="text-accent" size={32} strokeWidth={1.5} />
        <h2 className="mt-7 text-2xl font-medium tracking-[-0.035em]">Calendar configuration pending</h2>
        <p className="mt-4 max-w-md leading-7 text-muted">Add a Cal.com booking URL to display the inline calendar. Until then, the conversation can begin by email.</p>
        <a className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" href={`mailto:${siteConfig.email}`}>
          <Mail aria-hidden="true" size={15} /> Email {siteConfig.email}
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-[720px] overflow-hidden border border-line bg-white" data-testid="booking-calendar">
      <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-accent" aria-hidden="true" />
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: "720px", overflow: "auto" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
