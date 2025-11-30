import { Router } from "express";
import authModule from "./auth";
import adminModule from "./admin";
import petsModule from "./pets";

export interface ModuleDefinition {
  name: string;
  basePath: string;
  router: Router;
}

const modules: ModuleDefinition[] = [authModule, adminModule, petsModule];

export default modules;
