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
    affiliation?: string,
    location?: string,
    camp_id: string = "001",
    name?: string,
    lastname?: string,
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
        name,
        lastname,
        email,
        phone,
        camp_id,
        location,
        activist,
        id_from: affiliation,
      }),
    });

    this.dependency();
    return response.status == 200;
  }

  updateAccount(
    location?: string,
    email?: string,
    phone?: string,
    name?: string,
    lastname?: string,
    activist?: string,
    camp_id: string = "001"
  ) {
    window.localStorage.setItem("id", this.id);

    const request = new XMLHttpRequest();
    request.open("PUT", this.link + "/rest/respondent");
    request.setRequestHeader("Content-Type", "application/json");

    const body = JSON.stringify({
      camp_id,
      resp_id: this.id,
      email,
      phone,
      name,
      lastname,
      location,
      activist,
    });

    request.send(body);
    return request.status === 200;
  }

  questions(
    language: string = "fr",
    pages: number = 1
  ):
    | {
        question: pageType;
        localDependency: {
          questionToShowID: number;
          conditions: { ifAnswer: string; ifQuestion: number };
        }[];
      }
    | undefined {
    const request = new XMLHttpRequest();
    request.open("GET", this.link + `/rest/form/${language}/${pages}`, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    if (request.status != 200) {
      return;
    }

    const result = JSON.parse(JSON.parse(request.responseText));
    const dependency = this.dependencyQuestion;
    // consolidate dependencies
    const localDependency: {
      questionToShowID: number;
      conditions: { ifAnswer: string; ifQuestion: number };
    }[] = [];
    const consolidatedDependencies: {
      questionToShowID: number;
      conditions: Array<{ ifAnswer: string; ifQuestion: number }>;
    }[] = [];

    dependency.forEach((dep) => {
      if (
        Math.floor(dep.questionToShowID / 100) == pages &&
        Math.floor(dep.ifQuestion / 100) == pages
      ) {
        localDependency.push({
          questionToShowID: dep.questionToShowID,
          conditions: { ifAnswer: dep.ifAnswer, ifQuestion: dep.ifQuestion },
        });
        result.fields.find(
          (q: { qu_id: number }) => q.qu_id === dep.questionToShowID
        ).isVisible = false;
      } else {
        const existing = consolidatedDependencies.find(
          (c) => c.questionToShowID === dep.questionToShowID
        );
        if (existing) {
          existing.conditions.push({
            ifAnswer: dep.ifAnswer,
            ifQuestion: dep.ifQuestion,
          });
        } else {
          consolidatedDependencies.push({
            questionToShowID: dep.questionToShowID,
            conditions: [
              { ifAnswer: dep.ifAnswer, ifQuestion: dep.ifQuestion },
            ],
          });
        }
      }
    });

    // Filter questions based on dependencies and local responses
    // if dependency is not in answered questions, show it
    // if dependency is on answered questions, check if the answer is the same as the one in dependency
    const filter = result.fields.filter((res: { qu_id: number }) => {
      const dependency = consolidatedDependencies.find(
        (dep) => dep.questionToShowID === res.qu_id
      );
      if (!dependency) return true;

      // All conditions must be satisfied for the question to be shown expect if tow conditions are on the same question. in this case, only one needs to be satisfied

      // Group conditions by ifQuestion
      const conditionsByQuestion = dependency.conditions.reduce(
        (acc, cond) => {
          if (!acc[cond.ifQuestion]) acc[cond.ifQuestion] = [];
          acc[cond.ifQuestion].push(cond.ifAnswer);
          return acc;
        },
        {} as Record<number, string[]>
      );

      // For each ifQuestion, at least one answer must match
      return Object.entries(conditionsByQuestion).every(
        ([ifQuestion, answers]) => {
          const response = getLocalResponse(Number(ifQuestion));
          if (response === null) return true;
          return answers.includes(response);
        }
      );
    });

    result.fields = filter;
    return { question: result, localDependency };
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
    answers: Array<{ id: number | string; answer: string | undefined }>,
    method: string = "POST"
  ): boolean {
    for (const { id: questionId, answer } of answers) {
      if (!answer) continue;

      const request = new XMLHttpRequest();
      request.open(method, this.link + `/rest/answer`, false);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(
        JSON.stringify({
          resp_id: this.id,
          qu_id: questionId,
          ans: answer,
        })
      );

      if (request.status == 403 && method != "PUT") {
        return this.sendResponse(answers, "PUT");
      } else if (request.status != 200) {
        return false;
      }
    }
    return true;
  }

  score() {
    const request = new XMLHttpRequest();
    request.open("GET", this.link + `/rest/score/${this.id}`, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    if (request.status != 200) {
      return -1;
    }

    return JSON.parse(JSON.parse(request.responseText));
  }
}

export default RequestManager.getInstance();
