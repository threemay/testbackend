exports.handler = async (event) => {
    // Parse the body from the event
    const requestBody = JSON.parse(event.body);

    // Reverse the string in the body
    const reversedString = requestBody.message.split('').reverse().join('');

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: event.body, reversed: reversedString }),
    };
};
