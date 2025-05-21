import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      currency
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

export type Country = {
  code: string;
  name: string;
  currency: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
};
