import {Blueprint, Message, BaseConfig} from "@dxz/blueprint";

export async function messageCreate(
    ref: Blueprint<BaseConfig>,
    ctx: Message
): Promise<Message | void> {
    if (ctx.author.bot) return;
}
