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

  questions(language: string = "fr", pages: number = 1): pageType | undefined {
    const request = new XMLHttpRequest();
    request.open("GET", this.link + `/rest/form/${language}/${pages}`, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    if (request.status != 200) {
      return;
    }

    const result = JSON.parse(JSON.parse(request.responseText));
    const dependency = this.dependencyQuestion;

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

  sendResponse(
    answers: Array<{ id: number | string; answer: string | undefined }>
  ): boolean {
    for (const { id: questionId, answer } of answers) {
      if (!answer) continue;

      const request = new XMLHttpRequest();
      request.open("POST", this.link + `/rest/answer`, false);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(
        JSON.stringify({
          resp_id: this.id,
          qu_id: questionId,
          ans: answer,
        })
      );

      if (request.status != 200) {
        return false;
      }
    }
    return true;
  }
}

export default RequestManager.getInstance();
