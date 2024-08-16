import mongoose from 'mongoose';
import User from '../models/userModel.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const createUser = async (numUsers) => {
    try {
        const userPromises = [];

        for (let i = 0; i < numUsers; i++) {
            const hashedPassword = await bcrypt.hash("password", 10); // Hash the password

            const tempUser = User.create({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                username: faker.internet.userName(),
                bio: faker.lorem.sentence(10), // Shorten to fit within 200 characters
                password: hashedPassword,
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName()
                },
                coverImage: {
                    url: faker.image.avatar(), // Using the same avatar function for cover image
                    public_id: faker.datatype.uuid() // Using a UUID as a placeholder for public_id
                },
                email: faker.internet.email(), // Ensure a valid email is created
                mobile: parseInt(faker.phone.number('##########'), 10), // Generate a fake phone number and cast to number
                address: faker.location.streetAddress() // Generate a fake address using location
            });
            userPromises.push(tempUser);
        }

        // Await all promises
        await Promise.all(userPromises);

        console.log(`${numUsers} users created successfully.`);
        process.exit(0); // Exit with success
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit with error
    }
};




export default createUser;
