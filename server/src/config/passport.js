// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { PrismaClient } from '@prisma/client'; // Import PrismaClient
// import dotenv from 'dotenv';
// import passport from 'passport';

// dotenv.config();

// const prisma = new PrismaClient(); // Instantiate Prisma Client

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };

// passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
//   try {
//     // Use Prisma to find the user by ID
//     const user = await prisma.user.findUnique({
//       where: { id: jwt_payload.id },
//     });

//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false); // User not found
//     }
//   } catch (err) {
//     return done(err, false); // Error occurred during the lookup
//   }
// }));