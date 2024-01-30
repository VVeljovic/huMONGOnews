import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Document } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  async getPing(): Promise<Document> {
    const mongoClient = await this.connection.getClient();

    await mongoClient.connect();

    return (await mongoClient.db().command({
      ping: 1,
    })) as Document;
  }
}
