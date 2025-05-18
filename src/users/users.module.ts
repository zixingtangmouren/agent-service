import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LocalDbModule } from 'src/local-db/local-db.module';

@Module({
  imports: [LocalDbModule.forRoot({ name: 'users.json' })],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
