"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkHelloWorldStack = void 0;
const cdk = require("aws-cdk-lib");
// Import Lambda L2 construct
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
class CdkHelloWorldStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Define the Lambda function resource
        const helloWorldFunction = new lambda.Function(this, "HelloWorldFunction", {
            runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
            code: lambda.Code.fromAsset("lambda"), // Points to the lambda directory
            handler: "hello.handler", // Points to the 'hello' file in the lambda directory
        });
        // Define the API Gateway resource
        const api = new apigateway.LambdaRestApi(this, "HelloWorldApi", {
            handler: helloWorldFunction,
            proxy: false,
        });
        // Define the '/hello' resource with a GET method
        const helloResource = api.root.addResource("hello");
        helloResource.addMethod("GET");
    }
}
exports.CdkHelloWorldStack = CdkHelloWorldStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLWhlbGxvLXdvcmxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLWhlbGxvLXdvcmxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyw2QkFBNkI7QUFDN0IsaURBQWlEO0FBRWpELHlEQUF5RDtBQUV6RCxNQUFhLGtCQUFtQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQy9DLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsc0NBQXNDO1FBQ3RDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN6RSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsdUNBQXVDO1lBQzVFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxpQ0FBaUM7WUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxxREFBcUQ7U0FDaEYsQ0FBQyxDQUFDO1FBRUgsa0NBQWtDO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQzlELE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFFSCxpREFBaUQ7UUFDakQsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUFyQkQsZ0RBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbi8vIEltcG9ydCBMYW1iZGEgTDIgY29uc3RydWN0XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcblxuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcblxuZXhwb3J0IGNsYXNzIENka0hlbGxvV29ybGRTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIERlZmluZSB0aGUgTGFtYmRhIGZ1bmN0aW9uIHJlc291cmNlXG4gICAgY29uc3QgaGVsbG9Xb3JsZEZ1bmN0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkhlbGxvV29ybGRGdW5jdGlvblwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMjBfWCwgLy8gQ2hvb3NlIGFueSBzdXBwb3J0ZWQgTm9kZS5qcyBydW50aW1lXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksIC8vIFBvaW50cyB0byB0aGUgbGFtYmRhIGRpcmVjdG9yeVxuICAgICAgaGFuZGxlcjogXCJoZWxsby5oYW5kbGVyXCIsIC8vIFBvaW50cyB0byB0aGUgJ2hlbGxvJyBmaWxlIGluIHRoZSBsYW1iZGEgZGlyZWN0b3J5XG4gICAgfSk7XG5cbiAgICAvLyBEZWZpbmUgdGhlIEFQSSBHYXRld2F5IHJlc291cmNlXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhUmVzdEFwaSh0aGlzLCBcIkhlbGxvV29ybGRBcGlcIiwge1xuICAgICAgaGFuZGxlcjogaGVsbG9Xb3JsZEZ1bmN0aW9uLFxuICAgICAgcHJveHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgLy8gRGVmaW5lIHRoZSAnL2hlbGxvJyByZXNvdXJjZSB3aXRoIGEgR0VUIG1ldGhvZFxuICAgIGNvbnN0IGhlbGxvUmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZShcImhlbGxvXCIpO1xuICAgIGhlbGxvUmVzb3VyY2UuYWRkTWV0aG9kKFwiR0VUXCIpO1xuICB9XG59XG4iXX0=