export type pageType = Promise<
  | "error"
  | {
      description: string;
      name: string;
      page_id: number;
      fields: Array<
        | {
            qu_format: "radio" | "number" | "text";
            qu_id: number;
            qu_text: string;
          }
        | {
            qu_format: "true_false" | "select";
            qu_text: string;
            qu_id: number;
            qu_issues: Array<{ [key: number]: string }>;
          }
      >;
    }
>;
