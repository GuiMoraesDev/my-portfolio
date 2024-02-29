/* eslint-disable no-console */
"use client";

export const printInConsole = () => {
  if (process.env.NODE_ENV === "production") {
    console.clear();
  }

  console.log(`%c   __________________  `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c  |                 |  `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c  | Ah ah ah        |  `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c  | you didn't say  |  `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c  | the magic word! |  `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c  |_________________|  `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c          |            `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c       O  |            `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c      /|\\/            `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c       |               `, "color: #F2E2EC; font-size: 1.25em");
  console.log(`%c      / \\          🦖 `, "color: #F2E2EC; font-size: 1.25em");
};
