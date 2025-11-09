/**
 * Function to fetch currency details from the MCP server.
 *
 * @param {Object} args - Arguments for the currency fetch.
 * @param {string} [args.currencyType] - Optional currency type to filter results.
 * @returns {Promise<Object>} - The result of the currency fetch.
 */
const executeFunction = async ({ currencyType } = {}) => {
  const url = ''; // will be provided by the user
  const token = process.env.EVAG_MCP_TEST_API_KEY;
  try {
    // Construct the URL
    const apiUrl = new URL(`https://${url}/api/GetCurrency`);
    
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching currency details:', error);
    return {
      error: `An error occurred while fetching currency details: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching currency details from the MCP server.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_currencies',
      description: 'Fetch currency details from the MCP server.',
      parameters: {
        type: 'object',
        properties: {
          currencyType: {
            type: 'string',
            description: 'Optional currency type to filter results.'
          }
        }
      }
    }
  }
};

export { apiTool };