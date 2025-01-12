import ethnicNames from './ethnicNames.json'

type Ethnicity = 'Indian' | 'Japanese' | 'Western' | 'Unknown'

export async function detectEthnicity(name: string): Promise<Ethnicity> {
  const lowerName = name.toLowerCase()
  
  for (const [ethnicity, names] of Object.entries(ethnicNames)) {
    if (names.includes(lowerName)) {
      return ethnicity as Ethnicity
    }
  }
  
  return 'Unknown'
}

export function generateNameMeaning(name: string, gender: string, ethnicity: Ethnicity): string {
  const adjectives = {
    male: ['confident', 'charismatic', 'witty', 'bold', 'daring'],
    female: ['charming', 'graceful', 'radiant', 'enchanting', 'captivating']
  }
  
  const traits = {
    male: ['humor', 'sarcasm', 'wit', 'charm', 'charisma'],
    female: ['kindness', 'warmth', 'compassion', 'joy', 'elegance']
  }
  
  const randomAdjective = adjectives[gender as keyof typeof adjectives][Math.floor(Math.random() * 5)]
  const randomTrait = traits[gender as keyof typeof traits][Math.floor(Math.random() * 5)]
  
  if (gender === 'male') {
    const indianMemeDialogues = [
      "Ek dum se waqt badal diye, jazbaat badal diye",
      "Apna time aayega",
      "Babu bhaiya, yeh kya ho raha hai?",
      "Hera Pheri ka Raju ban gaya tu toh!"
    ]
    const randomDialogue = indianMemeDialogues[Math.floor(Math.random() * indianMemeDialogues.length)]
    
    return `${name}, oh ${name}! Your name screams ${randomAdjective} with a side of ${randomTrait}. It's like someone said, "${randomDialogue}" and boom, you appeared. Your charm is so potent, it should come with a warning label.`
  } else {
    return `${name}, a name as ${randomAdjective} as a spring morning, carries the essence of ${randomTrait} in its melody. Those blessed with this name radiate warmth and joy, touching hearts with their innate grace and beauty.`
  }
}

export function generateValentinePrediction(ethnicity: Ethnicity, gender: string): string {
  const valentineNames = {
    Indian: { male: ['Aarav', 'Vivaan', 'Reyansh'], female: ['Aanya', 'Saanvi', 'Myra'] },
    Japanese: { male: ['Haruto', 'Yuto', 'Sota'], female: ['Aoi', 'Hina', 'Yui'] },
    Western: { male: ['Liam', 'Noah', 'Oliver'], female: ['Olivia', 'Emma', 'Ava'] },
    Unknown: { male: ['Alex', 'Sam', 'Jordan'], female: ['Taylor', 'Avery', 'Riley'] }
  }
  
  const name = valentineNames[ethnicity][gender][Math.floor(Math.random() * 3)]
  const traits = ['adventure', 'laughter', 'passion', 'harmony', 'excitement']
  const randomTrait = traits[Math.floor(Math.random() * traits.length)]
  
  return `Your soulmate ${name} will bring ${randomTrait} into your life, creating a love story for the ages.`
}

