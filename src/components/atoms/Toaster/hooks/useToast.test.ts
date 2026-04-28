import { describe, expect, it } from "@jest/globals";

import { reducer } from "./useToast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeToast = (id: string, open = true): any => ({ id, title: `Toast ${id}`, open });

describe("useToast reducer", () => {
  const empty = { toasts: [] };

  describe("ADD_TOAST", () => {
    it("adds a toast to an empty list", () => {
      const next = reducer(empty, { type: "ADD_TOAST", toast: makeToast("1") });
      expect(next.toasts).toHaveLength(1);
      expect(next.toasts[0].id).toBe("1");
    });

    it("prepends the new toast and slices to TOAST_LIMIT (1)", () => {
      const state = { toasts: [makeToast("old")] };
      const next = reducer(state, { type: "ADD_TOAST", toast: makeToast("new") });
      expect(next.toasts).toHaveLength(1);
      expect(next.toasts[0].id).toBe("new");
    });
  });

  describe("UPDATE_TOAST", () => {
    it("merges updated fields into the matching toast", () => {
      const state = { toasts: [makeToast("1")] };
      const next = reducer(state, {
        type: "UPDATE_TOAST",
        toast: { id: "1", title: "Updated" },
      });
      expect(next.toasts[0].title).toBe("Updated");
      expect(next.toasts[0].open).toBe(true);
    });

    it("leaves toasts with a different id unchanged", () => {
      const state = { toasts: [makeToast("1")] };
      const next = reducer(state, {
        type: "UPDATE_TOAST",
        toast: { id: "999", title: "Nope" },
      });
      expect(next.toasts[0].title).toBe("Toast 1");
    });
  });

  describe("DISMISS_TOAST", () => {
    it("sets open to false for the given toast id", () => {
      const state = { toasts: [makeToast("1")] };
      const next = reducer(state, { type: "DISMISS_TOAST", toastId: "1" });
      expect(next.toasts[0].open).toBe(false);
    });

    it("sets open to false for all toasts when no id given", () => {
      const state = { toasts: [makeToast("1"), makeToast("2")] };
      const next = reducer(state, { type: "DISMISS_TOAST" });
      expect(next.toasts.every((t) => t.open === false)).toBe(true);
    });

    it("does not affect toasts with a different id", () => {
      const state = { toasts: [makeToast("1"), makeToast("2")] };
      const next = reducer(state, { type: "DISMISS_TOAST", toastId: "1" });
      expect(next.toasts.find((t) => t.id === "2")?.open).toBe(true);
    });
  });

  describe("REMOVE_TOAST", () => {
    it("removes a toast by id", () => {
      const state = { toasts: [makeToast("1"), makeToast("2")] };
      const next = reducer(state, { type: "REMOVE_TOAST", toastId: "1" });
      expect(next.toasts).toHaveLength(1);
      expect(next.toasts[0].id).toBe("2");
    });

    it("clears all toasts when no id given", () => {
      const state = { toasts: [makeToast("1"), makeToast("2")] };
      const next = reducer(state, { type: "REMOVE_TOAST" });
      expect(next.toasts).toHaveLength(0);
    });

    it("is a no-op for an id that does not exist", () => {
      const state = { toasts: [makeToast("1")] };
      const next = reducer(state, { type: "REMOVE_TOAST", toastId: "999" });
      expect(next.toasts).toHaveLength(1);
    });
  });
});
