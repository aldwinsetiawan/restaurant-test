
import { Controller, Request, Post, UseGuards, UnauthorizedException, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PlaceOrderDto } from './dto/place-order.dto';
import { TrackOrderDto } from './dto/track-order.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
        private appService: AppService
    ) {}

    @Post('login')
    async login(@Body() body: { username: string; pass: string }) {
        const user = await this.authService.validateUser(body.username, body.pass);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('place-order')
    async placeOrder(@Request() req: any, @Body() body: PlaceOrderDto) {
        console.log('[PlaceOrder] called at:', new Date().toISOString());
        return this.appService.placeOrder(body.orderData, req.user.userId);
    }

    @Get('track-order')
    async trackOrder(@Request() req: any, @Query() query: TrackOrderDto) {
        return this.appService.trackOrder(query.orderId);
    }
}
