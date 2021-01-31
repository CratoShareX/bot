import {Blueprint, Message} from "@dxz/blueprint";
import {FullConfig} from "../structures/Types";

export async function messageCreate(
    ref: Blueprint<FullConfig>,
    ctx: Message
): Promise<Message | void> {
    if (ctx.author.bot) return;
}
