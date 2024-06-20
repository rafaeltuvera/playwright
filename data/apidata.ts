import { faker } from '@faker-js/faker';

const firstname = `${faker.person.firstName()}`;

export const validUserData = {
    email: `${firstname}@testmail.com`,
    firstName: firstname,
    lastName: `${faker.person.lastName()}@testmail.com`
};

// no email
export const invalidData ={
    email: `${firstname}@testmail.com`,
    firstName: firstname,
}