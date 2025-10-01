const DataForm: Array<{
  PageId: string;
  name: string;
  description: string;
  fields: (
    | {
        type: "range";
        label: string;
        id: string;
        range: [number, number];
      }
    | {
        type: "input";
        inputType: "text" | "email" | "tel";
        label: string;
        id: string;
        placeholder: string;
      }
    | {
        type: "select";
        label: string;
        id: string;
        options: {
          label: string;
          value: string;
        }[];
      }
    | {
        type: "radio";
        label: string;
        id: string;
        options: {
          label: string;
        }[];
      }
  )[];
  next:
    | {
        pageId: number;
      }
    | Array<{
        pageId: number;
        ifawnserId: number;
        ifAwnser: number;
        default?: boolean;
      }>;
}> = [
  {
    id: "presentation",
    name: "presentation",
    description: "donne nous quelques informations sur toi",
    fields: [
      {
        type: "input",
        inputType: "text",
        label: "Ton prénom",
        id: "firstName",
        placeholder: "Léa",
      },
      {
        type: "input",
        inputType: "text",
        label: "Ton nom",
        id: "lastName",
        placeholder: "Martin",
      },
      {
        type: "select",
        label: "Ta ville",
        id: "city",
        options: [
          { label: "Paris", value: "paris" },
          { label: "Grenoble", value: "grenoble" },
        ],
      },
      {
        type: "radio",
        label: "tu est en crous ?",
        id: "crous",
        options: [{ label: "oui" }, { label: "non" }],
      },
      {
        type: "select",
        label: "Ton niveau d'étude",
        id: "studyLevel",
        options: [
          { label: "prepa", value: "B0" },
          { label: "L1", value: "B1" },
          { label: "L2", value: "B2" },
          { label: "L3", value: "B3" },
          { label: "M1", value: "B4" },
          { label: "M2", value: "B5" },
          { label: "Doctorat", value: "B6" },
          { label: "autre", value: "b-1" },
        ],
      },
    ],
  },
  {
    id: "presentation",
    name: "presentation",
    description: "donne nous quelques informations sur toi",
    fields: [
      {
        type: "input",
        inputType: "text",
        label: "Ton prénom",
        id: "firstName",
        placeholder: "Léa",
      },
      {
        type: "input",
        inputType: "text",
        label: "Ton nom",
        id: "lastName",
        placeholder: "Martin",
      },
      {
        type: "input",
        inputType: "email",
        label: "Ton email",
        id: "email",
        placeholder: "lea.martin@mail.com",
      },
      {
        type: "input",
        inputType: "tel",
        label: "Ton téléphone",
        id: "phone",
        placeholder: "+33 6 12 34 56 78",
      },
    ],
  },
];

export default DataForm;
