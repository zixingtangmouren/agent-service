import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { LocalDbModule } from 'src/local-db/local-db.module';

@Module({
  imports: [LocalDbModule.forRoot({ name: 'agents.json' })],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
