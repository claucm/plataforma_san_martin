import { Module } from './module.model';

export interface Submodule {
  id?: number;
  name: string;
  description?: string;
  route?: string;
  module?: Module;
  status?: number;
  createdAt?: Date;
} 