"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAuthUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // get the current user from Supabase
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
}
