const inquirer = require("inquirer");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
let adminInfo = {};

const questions = [
    {
        type: "input",
        name: "first",
        message: "first name?",
    },
    {
        type: "input",
        name: "last",
        message: "last name?",
    },
    {
        type: "input",
        name: "email",
        message: "email?",
        validate: async (answer) => {
            if (!answer) return "email required";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(answer)) {
                return "invalid email";
            }
            const user = await prisma.user.findUnique({
                where: {
                    email: answer,
                },
            });
            if (user) return "user with this email exist";
            return true;
        },
    },
    {
        type: "input",
        name: "phone_number",
        message: "phone_number?",
        validate: async (answer) => {
            if (!answer) return "phone_number required";
            if (isNaN(answer)) return "invalid phone_number";
            const user = await prisma.user.findUnique({
                where: {
                    phone_number: answer,
                },
            });
            if (user) return "user with this email exist";
            return true;
        },
    },
    {
        type: "password",
        name: "password1",
        message: "password?",
        mask: "*",
        validate: (answer) => {
            if (!answer) return "password required";
            adminInfo.password1 = answer;
            return true;
        },
    },
    {
        type: "password",
        name: "password2",
        message: "password(again)?",
        mask: "*",
        validate: (answer) => {
            if (!answer) return "confirm password required";
            adminInfo.password2 = answer;
            if (answer !== adminInfo.password1) {
                return "passwords not match";
            }
            return true;
        },
    },
];

inquirer.prompt(questions).then(async (answers) => {
    adminInfo = { ...answers, ...adminInfo };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(adminInfo.password1, salt);

    const newAdmin = await prisma.user.create({
        data: {
            first: adminInfo.first,
            last: adminInfo.last,
            password: hashPassword,
            email: adminInfo.email,
            phone_number: adminInfo.phone_number,
            is_active: true,
            is_admin: true,
            is_staff: true,
        },
    });
    const newcostomer = await prisma.costomer.create({
        data: {
            id: newAdmin.id,
            first: newAdmin.first,
            last: newAdmin.last,
            email: newAdmin.email,
            phone_number: newAdmin.phone_number,
        },
    });
    console.log(newAdmin);
});
