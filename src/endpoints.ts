const BASE_URL = "http://178.63.13.157:8090/mock-api/api";

export const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  PROJECTS: `${BASE_URL}/projects`,
  GATEWAYS: `${BASE_URL}/gateways`,
  REPORT: `${BASE_URL}/report`,
};

interface APIResponse {
  code: string; // 200
  error: null; // "Bad request"
}

export interface UserResponse extends APIResponse {
  data: {
    userId: string; // "rahej"
    firstName: string; // "John"
    lastName: string; // "Doe"
    email: string; // "john.doe@email.com"
  }[];
}

export interface ProjectResponse extends APIResponse {
  data: {
    projectId: string; // "bgYhx"
    userIds: string[]; // [ "rahej" ]
    rule: string; // "Manual Selection"
    gatewayIds: string[]; // [ "gDJ2s" ]
    structure: string; // Sole proprietorship
    industry: string; // "IT"
    website: string; // "https://mvpmatch.co/""
    description: string; // "Sit amet luctus venenatis lectus magna fringilla urna porttitor."
    image: string; // "https://mvpmatch.co/images/logo.svg"
    name: string; // "Project 2"
  }[];
}

export interface GatewayResponse extends APIResponse {
  data: {
    gatewayId: string; // "i6ssp"
    userIds: string[]; // ["rahej"]
    name: string; // "Gateway 1"
    type: string; // "Stripe"
    apiKey: string; // "sk_test_6eC49HqLyjWDarjtT1zdp7dc"
    secondaryApiKey: string; // "sk_test_6eC49HqLyjWDarjtT1zdp7dc"
    description: string; // "Sit amet luctus venenatis lectus magna fringilla urna porttitor."
  }[];
}

export interface ReportResponse extends APIResponse {
  data: {
    paymentId: string; // "6149cf567833e57669e60455"
    amount: number; // 2663.69
    projectId: string; // "ERdPQ"
    gatewayId: string; // "i6ssp"
    userIds: string[]; // ["rahej"]
    modified: string; // "2021-09-20"
    created: string; // "2021-04-11"
  }[];
}
