// Function to append new QA pairs to the chat history by posting to a PHP endpoint
import { postChatHistoryEndpoint } from "./_endpoints.js";

// TODO: fix this when npm i works ???
// import {v4 as uuidv4} from "uuid";

export default async function appendChathistory(question, answer) {
    // TODO: Add when npm i works
    // const id = uuidv4();
    const id = Date.now();

    let msg = {
        id: id,
        question: question,
        answer: answer
    }

    // Post to PHP endpoint, update chat history
    fetch(postChatHistoryEndpoint, {
        method: "POST",
        body: JSON.stringify(msg),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from PHP endpoint
        console.log(data);
    });
}