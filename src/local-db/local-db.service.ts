import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Options } from './local-db.module';

@Injectable()
export class LocalDbService {
  private dbPath: string;

  constructor(@Inject('OPTIONS') private options: Options) {
    this.dbPath = path.join(process.cwd(), this.options.name);
    this.initDbFile();
  }

  private async initDbFile() {
    try {
      await fs.access(this.dbPath);
    } catch {
      await fs.writeFile(this.dbPath, '[]', 'utf-8');
    }
  }

  async findAll<T>(): Promise<T[]> {
    const data = await fs.readFile(this.dbPath, 'utf-8');
    return JSON.parse(data) as T[];
  }

  async findOneByKey<T>(key: string, value: string): Promise<T | undefined> {
    const allData = await this.findAll<T>();
    return allData.find((item) => item[key] === value);
  }

  async create<T>(data: T): Promise<T> {
    const allData = await this.findAll<T>();
    allData.push(data);
    await fs.writeFile(this.dbPath, JSON.stringify(allData, null, 2));
    return data;
  }

  async updateByKey<T>(key: string, data: T): Promise<T> {
    const allData = await this.findAll<T>();
    const index = allData.findIndex((item) => item[key] === data[key]);
    allData[index] = data;
    await fs.writeFile(this.dbPath, JSON.stringify(allData, null, 2));
    return data;
  }

  async deleteByKey<T>(key: string, data: T): Promise<T> {
    const allData = await this.findAll<T>();
    const index = allData.findIndex((item) => item[key] === data[key]);
    allData.splice(index, 1);
    await fs.writeFile(this.dbPath, JSON.stringify(allData, null, 2));
    return data;
  }
}
