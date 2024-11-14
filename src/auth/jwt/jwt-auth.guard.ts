import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
