import ollama from 'ollama'
import type {Message} from 'ollama'

class Chat {
    private model = 'gemma3:12b'
    private messages:  Message[] = []

   async send(text: string) {
       this.messages.push({ role: 'user', content: text })

        const response = await ollama.chat({
            stream: true,
            model: this.model,
            messages: this.messages
        })

       let answer = "";
       for await (const part of response) {
           answer += part.message.content;
           process.stdout.write(part.message.content)
       }

       process.stdout.write("\n")

       this.messages.push({role: 'assistant', content: answer})
    }
}

async function main() {
    const chat = new Chat();

    for await (const line of console) {
        const input = line.trim();
        if (input === "exit") {
            break
        }

        await chat.send(input);
    }
}

main()