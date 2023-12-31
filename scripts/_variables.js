// TODO: implement this in a DB / CMS
export const botName = "pizzabot";
export const userName = "You";
export const defaultErrorMsg =
  "Oops, something went wrong. Please try again and send me another message.";
export const maxCharCount = 500;
export const emptyStateMsg_HistoryBanner = "Start asking me a question";

// DOM elements to be used in multiple files (imported)
export const chatOutput = document.querySelector(".chatHistory_messages");
export const chatInput = document.querySelector("#inputField");
export const charCount = document.querySelector("#charCount");
export const submitBtn = document.querySelector("#askButton");
export const inputField = document.querySelector("#inputField");
export const resetChatForm = document.querySelector("#newChatForm");
export const bottomInput = document.querySelector(".clientInput");

export const chatHistoryBanner = document.querySelector("#chatHistory_banner");
export const chatHistoryBannerBox = document.querySelector(
  ".chatHistory_heading"
);

export const scrollBtn = document.querySelector("#scrollBtn");
