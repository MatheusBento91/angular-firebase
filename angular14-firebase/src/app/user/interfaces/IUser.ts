export interface IUser {
  id: string,
  name: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  salaryExpectation: number,
  principalStack: string,
  level: string,
  technologies: ITechnologies[];
}

export interface ITechnologies {
  id: number,
  tech: string
}
