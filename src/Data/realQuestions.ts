export type Quiz = {
  id: string;
  name: string;
  questions: quest[];
}[];

export type quest = {
  id: number;
  question: string;
  answer: string;
  options: {
    [key: string]: string;
  }[];
};

export type answers = {
  scripts: answerScripts[];
  exam_id: string;
};

export type answerScripts = {
  id: number;
  question: string;
  selectedAnswer: string;
};

export const Questions: Quiz = [
  {
    id: "the_plisters",
    name: "The Plisters",
    questions: [
      {
        id: 1,
        question: "In what kind of world does the story take place?",
        answer: "D",
        options: [
          { A: "Futuristic city" },
          { B: "Medieval village" },
          { C: "Utopian paradise?" },
          { D: "Post-apocalyptic wasteland" },
        ],
      },
      {
        id: 2,
        question: "Who is the leader of the Plisters?",
        answer: "D",
        options: [
          {
            A: "Jules",
          },
          { B: "Jeffrey" },
          { C: "Jaden" },
          {
            D: "Jayla",
          },
        ],
      },
      {
        id: 3,
        question: "Who were the Plisters?",
        answer: "B",
        options: [
          { A: "A team of explorers" },
          { B: "A band of rebels" },
          { C: "A group of politicians" },
          { D: "A team of scientists" },
        ],
      },
      {
        id: 4,
        question: "What was the code of ethics that the Plisters lived by?",
        answer: "C",
        options: [
          {
            A: "Killing without reason",
          },
          {
            B: "Taking advantage of the weak and helpless",
          },
          { C: "Never stealing from the poor or harming innocents." },
          { D: "Stealing from the rich and powerful" },
        ],
      },
      {
        id: 5,
        question: "How did Jayla and her team prepare for their mission?",
        answer: "B",
        options: [
          {
            A: "by seeking the help of a hacker",
          },
          {
            B: "by studying the facility's layout and training for combat",
          },
          { C: "by researching their target's personal life" },
          { D: "by bribing government officials" },
        ],
      },
      {
        id: 6,
        question:
          "What did the Plisters do when they were confronted by the soldiers?",
        answer: "C",
        options: [
          { A: "Fled from the scene" },
          { B: "Surrendered immediately" },
          { C: "Fought with all their might to defend themselves" },
          {
            D: "Asked for negotiations",
          },
        ],
      },
      {
        id: 7,
        question: "What did the Plisters do after their victory?",
        answer: "D",
        options: [
          { A: "Destroyed the supplies that they had acquired" },
          { B: "Continued the battle with the soldiers" },
          { C: "Became complacent and stopped fighting" },
          { D: "Inspired more and more people to join their cause" },
        ],
      },
      {
        id: 8,
        question: "What did the Plisters become?",
        answer: "A",
        options: [
          { A: "A beacon of hope" },
          { B: "A criminal syndicate" },
          { C: "A political party" },
          { D: "A terrorist organization" },
        ],
      },
      {
        id: 9,
        question:
          "Why did politicians launch a counterattack against the Plisters?",
        answer: "C",
        options: [
          { A: "They wanted to negotiate with them" },
          { B: "They were inspired by their cause" },
          {
            C: "They saw them as a real threat",
          },
          { D: "They wanted to join forces with them" },
        ],
      },
      {
        id: 10,
        question: "What did the Plisters become known for?",
        answer: "D",
        options: [
          { A: "Fear and cowardice" },
          { B: "Corruption and greed" },
          { C: "Betraying their fellow rebels" },
          { D: "Bravery and selflessness in the face of adversity" },
        ],
      },
    ],
  },
];

