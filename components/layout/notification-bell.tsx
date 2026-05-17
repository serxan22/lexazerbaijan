"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { markAllNotificationsReadAction, markNotificationReadAction } from "@/lib/actions/notifications";
import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type NotificationItem = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  href: string | null;
  readAt: string | null;
  createdAt: string;
};

export function NotificationBell({
  userId,
  initialNotifications
}: {
  userId: string;
  initialNotifications: NotificationItem[];
}) {
  const supabase = createClient();
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.readAt).length,
    [notifications]
  );

  useEffect(() => {
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          const item = payload.new as any;

          setNotifications((current) => [
            {
              id: item.id,
              type: item.type,
              title: item.title,
              body: item.body,
              href: item.href,
              readAt: item.read_at,
              createdAt: item.created_at
            },
            ...current
          ].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount ? (
            <form action={markAllNotificationsReadAction}>
              <button type="submit" className="text-xs font-normal text-[#8a612f] hover:underline dark:text-[#f1d79d]">
                Mark all read
              </button>
            </form>
          ) : null}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {notifications.length ? (
          notifications.map((item) => (
            <DropdownMenuItem key={item.id} asChild>
              <Link
                href={item.href ?? "#"}
                className={item.readAt ? "block whitespace-normal p-3" : "block whitespace-normal bg-[#f5efe5] p-3 dark:bg-[#172033]"}
                onClick={() => {
                  if (!item.readAt) {
                    const formData = new FormData();
                    formData.set("notificationId", item.id);
                    markNotificationReadAction(formData);
                    setNotifications((current) =>
                      current.map((notification) =>
                        notification.id === item.id
                          ? { ...notification, readAt: new Date().toISOString() }
                          : notification
                      )
                    );
                  }
                }}
              >
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                {item.body ? <p className="mt-1 text-xs text-slate-500">{item.body}</p> : null}
              </Link>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-sm text-slate-500">No notifications yet.</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
