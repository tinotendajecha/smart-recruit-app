import { Company } from "./Company";
import { User } from "./User";

export interface Company_User {
  id: string;
  company: Company;
  company_id: string;
  user: User;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}
