"use client";

import { useCallback, useSyncExternalStore } from "react";
import { FAVORITES_STORAGE_KEY } from "@/lib/constants";
import type { FavoriteItem } from "@/types/rick-morty";

const EMPTY: FavoriteItem[] = [];
let cachedRaw: string | null = null;
let cachedValue: FavoriteItem[] = EMPTY;
const listeners = new Set<() => void>();

function getSnapshot(): FavoriteItem[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedValue = raw ? (JSON.parse(raw) as FavoriteItem[]) : EMPTY;
    }
  } catch {
    cachedValue = EMPTY;
  }
  return cachedValue;
}

const getServerSnapshot = () => EMPTY;

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback); // sincroniza entre pestañas
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function save(items: FavoriteItem[]) {
  try {
    const raw = JSON.stringify(items);
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedValue = items;
  } catch {
    /* localStorage no disponible */
  }
  listeners.forEach((listener) => listener());
}

const subscribeNoop = () => () => {};

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // false en el servidor y en la hidratación, true ya en el cliente
  const ready = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const isFavorite = useCallback(
    (key: string) => favorites.some((f) => f.key === key),
    [favorites],
  );

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    const current = getSnapshot();
    const next = current.some((f) => f.key === item.key)
      ? current.filter((f) => f.key !== item.key)
      : [...current, item];
    save(next);
  }, []);

  return { favorites, ready, isFavorite, toggleFavorite };
}
