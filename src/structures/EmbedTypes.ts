import {Message} from "@dxz/blueprint";

export async function dispatch_error_embed(
    message: Message,
    errorMessage: string,
    title?: string
): Promise<Message> {
    return await message.channel.createMessage({
        embed: {
            title: title ?? `${message.author.username}, an Error Occurred`,
            color: 0xf73f02,
            description: `${errorMessage} Try again!`,
        },
    });
}

export async function dispatch_success_embed(
    message: Message,
    successMessage: string,
    title?: string
): Promise<Message> {
    return await message.channel.createMessage({
        embed: {
            title: title ?? `${message.author.username}, successful operation!`,
            color: 0x03fc6b,
            description: `${successMessage}`,
        },
    });
}