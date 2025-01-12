const request = require('supertest');
const app = require('./vidinfo');
const { DynamoDBClient} = require("@aws-sdk/client-dynamodb");

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

    it("should return a list of videos on /videos", async () => {
        const mockResponse = {
            Items: [
                { video_id: { S: "1" }, video_title: { S: "Video 1" } },
                { video_id: { S: "2" }, video_title: { S: "Video 2" } }
            ]
        };
        mockClient.send.mockResolvedValue(mockResponse);

        const response = await request(app).get("/videos");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockResponse.Items);
    });

    it("should return a specific video on /video", async () => {
        const mockResponse = {
            Item: { video_id: { S: "1" }, video_title: { S: "Video 1" } }
        };
        mockClient.send.mockResolvedValue(mockResponse);

        const response = await request(app).get("/video?id=1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockResponse.Item);
    });

    it("should return an error if the video is not found", async () => {
        const mockResponse = { Item: null };
        mockClient.send.mockResolvedValue(mockResponse);

        const response = await request(app).get("/video?id=2");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ "error": "something went wrong" });
    });
});
