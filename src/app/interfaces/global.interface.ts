export interface Animal {
  name: string;
  photo: string;
  photoadditional: string;
  age: number;
  medicalNote: string;
  vaccination: boolean;
  breed: string;
  description: string;
  id: string;
  gender:string;
  type:string;
}
export interface FilterOptions {
  gender: string;
  type: string;
  value: string;
}
