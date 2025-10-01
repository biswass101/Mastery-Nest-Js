import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    sharedSecretKey: process.env.SECRET_KEY
}))