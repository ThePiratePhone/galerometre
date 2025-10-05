/// <reference types="vite/client" />

import type { pageType } from "@/types/request";
import { uid } from "./jsTools";

class RequestManager {
  private static instance: RequestManager;
  id: string;
  link: string;
  private dependancyQuestion = [];

  static getInstance(): RequestManager {
    if (!RequestManager.instance) {
      RequestManager.instance = new RequestManager();
    }
    return RequestManager.instance;
  }

  constructor() {
    if (typeof window.localStorage.getItem("id") == "string") {
      this.id = window.localStorage.getItem("id") || uid();
    } else {
      this.id = uid();
    }

    this.link = import.meta.env.VITE_API_URL ?? "127.0.0.1:8000";
  }

  async createAccont(
    location?: string,
    camp_id: string = "001",
    email?: string,
    phone?: string,
    activist?: boolean
  ) {
    window.localStorage.setItem("id", this.id);
    const response = await fetch(this.link + "/rest/respondent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resp_id: this.id,
        camp_id,
        email,
        phone,
        location,
        activist,
      }),
    });

    return response.status == 200;
  }

  async questions(
    language: string = "fr",
    pages: number = 1
  ): Promise<pageType> {
    const response = await fetch(
      this.link + `/rest/form/${language}/${pages}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return "error";
    }

    const result = await response.json();
    console.log(JSON.parse(result));
    return JSON.parse(result);
  }

  async dependancy() {
    const response = await fetch(this.link + `/rest/dependency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (response.status == 200) {
      this.dependancyQuestion = JSON.parse(result);
    }
  }

  async sendResponse(awnser: Array<{ id: number | string; answer: string }>) {
    for (const { id: questionId, answer } of awnser) {
      const response = await fetch(this.link + `/rest/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resp_id: this.id,
          qu_id: questionId,
          ans: answer,
        }),
      });

      if (response.status != 200) {
        return false;
      }
    }
    return true;
  }
}

export default RequestManager.getInstance();
