import {
  DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent,
} from "typeorm";
import { User } from "../entities/user";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
    event.entity.email = event.entity.email.toLowerCase()
  }

  beforeUpdate(event: UpdateEvent<User>) {
    console.log(`BEFORE USER UPDATED: `, event.entity);
  }
}
