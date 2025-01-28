import { create } from "zustand";
import { persist } from "zustand/middleware";

interface questionnaireStore {
  purpose: string;
  source: string;
  setQuestionnaireAnswers: (questionnaireAnswers: object) => void;
  resetQuestionnaireStore: () => void
}

export const useQuestionnaireStore = create<questionnaireStore>()(
  persist(
    (set) => ({
      purpose: "",
      source: '',
      setQuestionnaireAnswers: (questionnaireAnswers: any) => set({ 
        purpose: questionnaireAnswers.purpose,
        source: questionnaireAnswers.source
       }),
       resetQuestionnaireStore: () => set({
        purpose: '',
        source: ''
       })
    }),
    {
      name: "questionnaire-store",
    }
  )
);
