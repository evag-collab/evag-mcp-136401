export const setAuthToken = {
  definition: {
    function: {
      name: "set_auth_token",
      description: "Set or update the API authentication token used for all subsequent API calls",
      parameters: {
        type: "object",
        properties: {
          token: {
            type: "string",
            description: "The Bearer token to use for authentication",
          },
        },
        required: ["token"],
      },
    },
  },
  function: async ({ token }) => {
    global.setAuthToken(token);
    return { message: "✅ Authentication token updated successfully." };
  },
};
