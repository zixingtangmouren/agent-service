import { DynamicModule, Module } from '@nestjs/common';
import { LocalDbService } from './local-db.service';

export interface Options {
  name: string;
}

@Module({})
export class LocalDbModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: LocalDbModule,
      providers: [LocalDbService, { provide: 'OPTIONS', useValue: options }],
      exports: [LocalDbService],
    };
  }
}
