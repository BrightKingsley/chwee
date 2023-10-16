import { UserClass } from "@/models";
import { ClientUser } from "@/types/models";
import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// REPLACE_ELEMENT_IN_STRING
export const replaceWith = ({
  string,
  character,
  replacement,
}: {
  string: string;
  character: string;
  replacement: string;
}): string => {
  if (!string) return "";
  let formattedString: string = string;
  if (formattedString.includes(character)) {
    formattedString = formattedString.replace(character, replacement);
  }
  return formattedString;
};

export function lettersAndNumbersOnly(inputString: string) {
  // Use a regular expression to remove non-alphanumeric characters
  const formattedString = inputString.replace(/[^a-zA-Z0-9]/g, "");
  return formattedString;
}

export function formatTag(tag: string): string {
  // Add the "@" symbol in front of the tag
  const userTag = `@${tag}`;
  return userTag;
}

// STRING_TO_OBJECT_ID
export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}

// DBtoClientUser
export function dbToClientUser(dbUser: UserClass) {
  const user: ClientUser = {
    _id: dbUser._id.toString(),
    chats: dbUser.chats,
    connections: dbUser.connections,
    groups: dbUser.groups,
    photo: dbUser.photo,
    tag: dbUser.tag,
    username: dbUser.username,
  };

  return user;
}

// FORMAT_LINK
export function formatLink({
  string,
  at,
  get,
}: {
  string: string;
  at: string;
  get: "first" | "last";
}): string {
  if (!string) return "";
  let formattedString: string = string;
  if (formattedString.includes(at)) {
    formattedString = string.split(at)[get === "first" ? 0 : 1];
  }
  return formattedString;
}

// LOCALSTORAGE
export const addItemToLocalStorage = ({
  name,
  item,
}: {
  name: string;
  item: any;
}) => {
  localStorage.setItem(name, item);
};

export const getItemFromLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};

export const removeItemFromLocalStorage = (name: string) => {
  console.log("removing");
  return localStorage.clear();
};
export const generatePassword = (length: number): string => {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const allCharacters = lowerCaseLetters + upperCaseLetters + numbers;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters.charAt(randomIndex);
  }

  return password;
};

export const comparePasswords = async ({
  password,
  compareWith,
}: {
  password?: string;
  compareWith?: string;
}): Promise<boolean> => {
  if (!password || !compareWith) return false;

  // const match = await bcrypt.compare(password, compareWith);

  // return match;
  return true;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface Person_ {
  [key: number]: number;
  id: number;
  name: string;
}

export function findMostFrequentId(
  arr: Person_[],
  property: string
): number | undefined {
  // Create an object to store the frequency of each id
  const frequencyMap: { [key: number]: number } = {};

  // Loop through the array and count the occurrences of each id
  arr.forEach((person) => {
    frequencyMap[person.id] = (frequencyMap[person.id] || 0) + 1;
  });

  // Find the id with the highest frequency
  let mostFrequentId: number | undefined;
  let highestFrequency = 0;

  for (const id in frequencyMap) {
    if (frequencyMap[id] > highestFrequency) {
      mostFrequentId = Number(id);
      highestFrequency = frequencyMap[id];
    }
  }

  return mostFrequentId;
}

////////////////////////////////////////////////////////////////////////////

export function findMostFrequentElement<T>(arr: T[]): T | undefined {
  // Create an object to store the frequency of each element
  const frequencyMap: { [key: string]: number } = {};

  // Loop through the array_ and count the occurrences of each element
  arr.forEach((element) => {
    const elementKey = JSON.stringify(element);
    frequencyMap[elementKey] = (frequencyMap[elementKey] || 0) + 1;
  });

  // Find the element with the highest frequency
  let mostFrequentElement: T | undefined;
  let highestFrequency = 0;

  for (const elementKey in frequencyMap) {
    const frequency = frequencyMap[elementKey];
    if (frequency > highestFrequency) {
      mostFrequentElement = JSON.parse(elementKey);
      highestFrequency = frequency;
    }
  }

  return mostFrequentElement;
}

////////////////////

export function findMostFrequentInObject(arr: any[], property: string): any {
  // Create an object to store the frequency of each id
  const frequencyMap: { [key: string]: number } = {};

  // Loop through the array and count the occurrences of each id
  arr.forEach((person) => {
    const idKey = String(person[property]);
    frequencyMap[idKey] = (frequencyMap[idKey] || 0) + 1;
  });

  // Find the id with the highest frequency
  let mostFrequentId: any;
  let highestFrequency = 0;

  for (const idKey in frequencyMap) {
    const frequency = frequencyMap[idKey];
    if (frequency > highestFrequency) {
      mostFrequentId = idKey;
      highestFrequency = frequency;
    }
  }

  return mostFrequentId;
}
