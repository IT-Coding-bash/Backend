import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('WeBUS Backend API')
        .setDescription('WeBUS Backend API documentation using Swagger')
        .setVersion('1.0.0')
        .addTag('Backend')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}