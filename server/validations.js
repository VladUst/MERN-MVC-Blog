import {body} from 'express-validator';

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля меньше 5 символов').isLength({min: 5}),
];

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Длина пароля меньше 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите имя более 3 символов').isLength({min: 3}),
    body('avatarUrl', "Неверная ссылка на аватарку").optional().isURL(),
];

export const postCreateValidator = [
    body('title', 'Введите заголовок').isLength({min : 3}).isString(),
    body('text', 'Введите текст').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тегов').optional().isString(),
    body('imageUrl', "Неверная ссылка на изображение").optional().isString(),
];