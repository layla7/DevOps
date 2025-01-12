const request = require('supertest');
const app = require('./watchlist');
const { DynamoDBClient, ScanCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");

jest.mock("@aws-sdk/client-dynamodb");

describe("API Tests", () => {
    let mockClient;

    beforeEach(() => {
        mockClient = new DynamoDBClient();
        DynamoDBClient.mockImplementation(() => mockClient);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return a user's watchlist videos", async () => {
        // Mock response for the user lookup
        const mockUserResponse = {
            Item: {
                user_id: { S: "user123" },
                watchlist: { SS: ["1", "2"] }
            }
        };
        mockClient.send.mockResolvedValueOnce(mockUserResponse);
    
        // Mock response for the batch get of videos
        const mockBatchResponse = {
            Responses: {
                Videos: [
                    { video_id: { S: "video1" }, video_title: { S: "Video Title 1" } },
                    { video_id: { S: "video2" }, video_title: { S: "Video Title 2" } }
                ]
            }
        };
        mockClient.send.mockResolvedValueOnce(mockBatchResponse);
    
        // Make request to the endpoint
        const response = await request(app).get("/watchlist?user_id=user123");
    
        // Assertions
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockBatchResponse.Responses);
        expect(mockClient.send).toHaveBeenCalledTimes(2);
    });

    it("should add a video to the user's watchlist", async () => {
        // Mock response for the user lookup
        const mockUserResponse = {
            Item: {
                user_id: { S: "user123" },
                watchlist: { SS: ["1"] }
            }
        };
        mockClient.send.mockResolvedValueOnce(mockUserResponse);
    
        // Mock response for the put operation
        mockClient.send.mockResolvedValueOnce({});
    
        // Request payload
        const payload = {
            user_id: "user123",
            video_id: "2"
        };
    
        // Make POST request to the endpoint
        const response = await request(app).post("/watchlist").send(payload);
    
        // Assertions
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("\"success!\"");
        expect(mockClient.send).toHaveBeenCalledTimes(2);
    });

    it("should not add a video to the watchlist if it's already present", async () => {
        // Mock response for the user lookup
        const mockUserResponse = {
            Item: {
                user_id: { S: "user123" },
                watchlist: { SS: ["1"] }
            }
        };
        mockClient.send.mockResolvedValueOnce(mockUserResponse);
    
        // Request payload with an already existing video
        const payload = {
            user_id: "user123",
            video_id: "1"
        };
    
        // Make POST request to the endpoint
        const response = await request(app).post("/watchlist").send(payload);
    
        // Assertions
        expect(response.statusCode).toBe(403);
        expect(response.text).toBe("\"Cannot add video to watchlist multiple times\"");
        expect(mockClient.send).toHaveBeenCalledTimes(1); // Only the get command is sent
    });

    it("should remove a video from the user's watchlist", async () => {
        // Mock response for the user lookup
        const mockUserResponse = {
            Item: {
                user_id: { S: "user123" },
                watchlist: { SS: ["1", "2"] }
            }
        };
        mockClient.send.mockResolvedValueOnce(mockUserResponse);
    
        // Mock response for the put operation
        mockClient.send.mockResolvedValueOnce({});
    
        // Request payload
        const payload = {
            user_id: "user123",
            video_id: "1"
        };
    
        // Make DELETE request to the endpoint
        const response = await request(app).delete("/watchlist").send(payload);
    
        // Assertions
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("\"success!\"");
        expect(mockClient.send).toHaveBeenCalledTimes(2);
    });

    it("should remove the last video from the user's watchlist and delete the watchlist attribute", async () => {
        // Mock response for the user lookup
        const mockUserResponse = {
            Item: {
                user_id: { S: "user123" },
                watchlist: { SS: ["1"] }
            }
        };
        mockClient.send.mockResolvedValueOnce(mockUserResponse);
    
        // Mock response for the put operation
        mockClient.send.mockResolvedValueOnce({});
    
        // Request payload
        const payload = {
            user_id: "user123",
            video_id: "1"
        };
    
        // Make DELETE request to the endpoint
        const response = await request(app).delete("/watchlist").send(payload);
    
        // Assertions
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("\"success!\"");
        expect(mockClient.send).toHaveBeenCalledTimes(2);
    });
    
    it("should return a 404 error if the user is not found", async () => {
        // Mock response for the user lookup
        mockClient.send.mockResolvedValueOnce({ Item: null });
    
        // Request payload
        const payload = {
            user_id: "nonexistent_user",
            video_id: "1"
        };
    
        // Make DELETE request to the endpoint
        const response = await request(app).delete("/watchlist").send(payload);
    
        // Assertions
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("\"user not found\"");
        expect(mockClient.send).toHaveBeenCalledTimes(1); // Only the get command is sent
    });
    
});
