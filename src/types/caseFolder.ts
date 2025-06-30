// src/types/caseFolder.ts
import { ParamsDictionary } from "express-serve-static-core";

export interface CaseFolderParams extends ParamsDictionary {
  id: string;
}

export interface CreateCaseFolderBody {
  title: string;
  caseNumber: string;
  clientName: string;
  caseType: string;
  court: string;
  status: string;
  userId: string;
  description: string;
}

export interface UpdateCaseFolderBody {
  title?: string;
  caseNumber?: string;
  clientName?: string;
  caseType?: string;
  court?: string;
  status?: string;
  description?: string;
}
