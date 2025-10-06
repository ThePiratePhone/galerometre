/// <reference types="vite/client" />

import type { pageType } from "@/types/request";
import { getLocalResponse, uid } from "./jsTools";

class RequestManager {
  private static instance: RequestManager;
  id: string;
  link: string;
  private dependencyQuestion: Array<{
    questionToShowID: number;
    ifAnswer: string;
    ifQuestion: number;
  }> = [];

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

    this.link =
      import.meta.env.VITE_API_URL ?? "https://api.precariscore.qamp.fr";
    this.createAccont();
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

    this.dependency();
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

    const result = JSON.parse(await response.json());
    const dependency = await this.dependency();

    console.log(result.fields, dependency);
    const filter = result.fields.filter((res: { qu_id: number }) => {
      return dependency?.every((d) => {
        if (d.questionToShowID === res.qu_id) {
          const answer = getLocalResponse(d.ifQuestion);
          return answer == d.ifAnswer;
        } else {
          return true;
        }
      });
    });
    result.fields = filter;
    return result;
  }

  async dependency() {
    if (this.dependencyQuestion.length > 0) return this.dependencyQuestion;

    const response = await fetch(this.link + `/rest/dependency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (response.status == 200) {
      this.dependencyQuestion = JSON.parse(result);
      return this.dependencyQuestion;
    }
  }

  async sendResponse(answers: Array<{ id: number | string; answer: string }>) {
    for (const { id: questionId, answer } of answers) {
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
