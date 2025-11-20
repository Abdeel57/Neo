import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    // Usar IP del cliente como identificador
    // Priorizar x-forwarded-for para proxies (Railway, Netlify, etc.)
    const forwardedFor = req.headers?.['x-forwarded-for'];
    if (forwardedFor && typeof forwardedFor === 'string') {
      // x-forwarded-for puede tener múltiples IPs, tomar la primera
      return forwardedFor.split(',')[0].trim();
    }
    
    // Intentar obtener IP de diferentes fuentes
    return (
      req.ip ||
      (req as any).connection?.remoteAddress ||
      (req as any).socket?.remoteAddress ||
      req.headers?.['cf-connecting-ip'] || // Cloudflare
      req.headers?.['x-real-ip'] || // Nginx
      'unknown'
    );
  }

  protected async generateKey(context: ExecutionContext, tracker: string, throttler: string): Promise<string> {
    const request = context.switchToHttp().getRequest<Request>();
    const route = request.route?.path || request.url || '';
    const method = request.method;

    // Crear clave única basada en IP, ruta y método
    // Esto permite diferentes límites por tipo de endpoint
    return `${tracker}:${method}:${route}:${throttler}`;
  }
}

