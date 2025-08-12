## Log Object

### Attributes
level: str - INFO, WARN, ERROR, DEBUG
message: str - The message for the log
timestamp: timestamp - timestamp of the log

## Insight Object

### Attributes
observation: str - observation related to insight


1. Use Fast API server
2. Have two routes

    - Get logs
    Route Request Path - /logs
    Route Request Method - GET
    Route Request Body - filter for getting logs
    Route Response Body - Array of `Log` object

    - Get logs insights
    Route Request Path - /logs/insight
    Route Request Method - GET
    Route Request Body - 
    Route Response Body - Array of `Insight` object


# Agent based insight extraction
Use google ADK to generate an agent which can take in a list of logs in the form of array of `Log` and provide insights in the form of array of `Insight`







