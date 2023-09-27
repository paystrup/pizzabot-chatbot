
# PizzaBot API Documentation 🍕🤖

Welcome to the PizzaBot API documentation! This API allows you to interact with PizzaBot, a chatbot that provides information about pizza. Whether you want to read chat messages, create new chat messages, access default responses, or manage chat history, this API has got you covered.

The API is located at `/api`, and it provides the following endpoints:

## Read Chat Messages

### Endpoint: `/api/messages/read`

- **Method:** GET
- **Description:** This endpoint allows you to retrieve all chat messages, answers and keywords.
- **Usage:**

   Send a GET request to `/api/messages/read` to retrieve the chat messages.
   
- **Response:**
   - If successful, it returns a JSON array of chat messages.
   - If the JSON file is not found, it returns a 404 error.
   - If the request method is not GET, it returns a 405 error.

## Create Chat Messages

### Endpoint: `/api/messages/create`

- **Method:** POST
- **Description:** Use this endpoint to create new chat messages and interact with PizzaBot. This endpoint will accept a question and return an answer and add the QA pair to the Chat History.
- **Usage:**

   Send a POST request to `/api/messages/create` with a JSON payload containing a `"question"` field in the request body to interact with PizzaBot. The API will respond with the bot's answer and save the conversation history.

   Example JSON payload:
   ```json
   {
       "question": "What's the best pizza topping?"
   }

- **Response:**
   -  If successful, it returns a JSON object with the user's question, PizzaBot's answer, a timestamp, and a chat ID.
   - If the JSON data is invalid, it returns a 400 (Bad Request) error.
   - If the question field is missing or empty, it returns a 400 (Bad Request) error.

## Read Default Chat Responses

### Endpoint: `/api/defaultMessages/read`

-   **Method:** GET
    
-   **Description:** Retrieve default chat responses from PizzaBot. Can be used to display various unique error messages.
    
-   **Usage:**
    
    Send a GET request to `/api/defaultMessages/read` to retrieve the default chat responses.
    
-   **Response:**
    
    -   If successful, it returns a JSON array of default chat responses.
    -   If the JSON file is not found, it returns a 404 error.

## Read Chat History

### Endpoint: `/api/chatHistory/read`

-   **Method:** GET
    
-   **Description:** Retrieve the chat history of interactions with PizzaBot.
    
-   **Usage:**
    
    Send a GET request to `/api/chatHistory/read` to retrieve the chat history.
    
-   **Response:**
    
    -   If successful, it returns a JSON array containing the chat history.
    -   If there is no chat history, it returns an empty array.
    -   If the request method is not GET, it returns a 405 (Method Not Allowed) error.

## Delete Chat History

### Endpoint: `/api/chatHistory/delete`

-   **Method:** DELETE
    
-   **Description:** Delete the chat history of interactions with PizzaBot.
    
-   **Usage:**
    
    Send a DELETE request to `/api/chatHistory/delete` to delete the chat history.
    
-   **Response:**
    
    -   If successful, it returns a 205 (Reset Content) response, indicating that the chat history has been deleted.
    -   If there is no chat history to delete, it returns a 404 (Not Found) error.
    -   If the request method is not DELETE, it returns a 405 (Method Not Allowed) error.

That's all you need to know to interact with the PizzaBot API! Enjoy your pizza-related conversations.