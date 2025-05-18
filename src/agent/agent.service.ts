import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { LocalDbService } from 'src/local-db/local-db.service';
import { v4 as uuidv4 } from 'uuid';
import { Agent } from './entities/agent.entity';

@Injectable()
export class AgentService {
  constructor(private readonly localDbService: LocalDbService) {}

  async create(createAgentDto: CreateAgentDto) {
    const agent = await this.localDbService.create({
      ...createAgentDto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return agent;
  }

  async findAll() {
    return await this.localDbService.findAll<Agent>();
  }

  async findOne(id: string) {
    return await this.localDbService
      .findAll<Agent>()
      .then((agents) => agents.find((agent) => agent.id === id));
  }

  async update(id: string, updateAgentDto: UpdateAgentDto) {
    const orginalAgent = await this.findOne(id);

    if (!orginalAgent) {
      throw new NotFoundException('Agent not found');
    }

    return await this.localDbService.updateByKey<Agent>('id', {
      ...orginalAgent,
      ...updateAgentDto,
      updatedAt: Date.now(),
    });
  }

  async remove(id: string) {
    const orginalAgent = await this.findOne(id);

    if (!orginalAgent) {
      throw new NotFoundException('Agent not found');
    }

    return await this.localDbService.deleteByKey<Agent>('id', orginalAgent);
  }
}
