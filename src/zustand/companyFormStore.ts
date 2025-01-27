import { create } from "zustand";
import {persist} from 'zustand/middleware'

interface Company {
  cityLocation: string;
  companyName: string;
  companyWebsite: string;
  countryLocation: string;
  organizationSize: string;
  servicesProvided: string;
  setFormStore: (formData: Object) => void;
  resetFormStore: () => void
}




export const useFormStore = create<Company>()(persist(
    (set) => ({
        cityLocation: "",
        companyName: "",
        companyWebsite: "",
        countryLocation: "",
        organizationSize: "",
        servicesProvided: "",
        setFormStore: (formData:any) => set({
            cityLocation: formData.cityLocation,
            companyName: formData.companyName,
            companyWebsite: formData.companyWebsite,
            countryLocation: formData.countryLocation,
            organizationSize: formData.organizationSize,
            servicesProvided: formData.servicesProvided,
        }),
        resetFormStore: () => set({
            cityLocation: "",
            companyName: "",
            companyWebsite: "",
            countryLocation: "",
            organizationSize: "",
            servicesProvided: "",
        })
    }),
    {
        name: 'company-form-store'
    }
),
)
