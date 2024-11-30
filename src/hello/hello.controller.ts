import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  async hello() {
    return 'Hello!';
  }
}
