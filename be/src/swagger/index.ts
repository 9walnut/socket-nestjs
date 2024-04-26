import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Swagger Socket')
      .setDescription('Socket Project Swagger API')
      .setVersion('1.0.0')
      .addTag('swagger')
      .build();
  }
}
