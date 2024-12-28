// src/components/PainAssessment.js
import { CheckCircle } from "@mui/icons-material";
import React, { useState } from "react";

const painLevels = [
  {
    level: 0,
    label: "No Pain",
    description: "No Pain",
    color: "bg-green-200",
    emoji: "😊",
  },
  {
    level: 1,
    label: "Mild Pain",
    description: "Annoying\nPain is present but does not limit activity",
    color: "bg-yellow-200",
    emoji: "🙂",
  },
  {
    level: 2,
    label: "Moderate Pain",
    description:
      "Nagging Pain\nUncomfortable Troublesome\nCan do most Activities with rest periods",
    color: "bg-yellow-300",
    emoji: "😐",
  },
  {
    level: 3,
    label: "Moderate Pain",
    description: "More Description",
    color: "bg-orange-300",
    emoji: "😐",
  },
  {
    level: 4,
    label: "Moderate Pain",
    description: "More Description",
    color: "bg-orange-400",
    emoji: "😕",
  },
  {
    level: 5,
    label: "Severe Pain",
    description: "More Description",
    color: "bg-red-200",
    emoji: "😣",
  },
  {
    level: 6,
    label: "Severe Pain",
    description: "More Description",
    color: "bg-red-300",
    emoji: "😖",
  },
  {
    level: 7,
    label: "Severe Pain",
    description: "More Description",
    color: "bg-red-400",
    emoji: "😫",
  },
  {
    level: 8,
    label: "Severe Pain",
    description: "More Description",
    color: "bg-red-500",
    emoji: "😭",
  },
  {
    level: 9,
    label: "Severe Pain",
    description: "More Description",
    color: "bg-red-600",
    emoji: "😵",
  },
  {
    level: 10,
    label: "Severe Pain",
    description: "More Description",
    color: "bg-red-700",
    emoji: "😵",
  },
];

const PainAssessment = () => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const handleSelectedLevel = (level) => {
    setSelectedLevel(level);
  };
  return (
    <div className='lg:p-4'>
      <h1 className='lg:text-2xl font-bold font-main text-pry text-center mb-4'>
        Universal Pain Assessment
      </h1>
      <p className='text-center font-main text-pry mb-4'>
        This pain assessment tool is intended to help patient care providers
        assess patient needs. Explain and use 0-10 Scale for patient self
        assessment. Use patient's own words and non-verbal observations to
        interpret expressed pain when patient cannot communicate verbally.
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-11 gap-2'>
        {painLevels.map((level) => (
          <div className='flex flex-col gap items-center w-full'>
            <div
              onClick={() => handleSelectedLevel(level.level)}
              key={level.level}
              className={`p-2 border w-full rounded ${level.color} text-center`}
            >
              <div className='text-xl'>{level.emoji}</div>
              <div className='font-bold font-main'>{level.level}</div>
            </div>
            <p className='text-green-500'>
              {" "}
              {selectedLevel === level.level && <CheckCircle />}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PainAssessment;
