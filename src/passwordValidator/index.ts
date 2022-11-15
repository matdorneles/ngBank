import passwordValidator from "password-validator";

export const schema = new passwordValidator();

schema
    .is().min(8)
    .has().digits(1)
    .has().uppercase(1)