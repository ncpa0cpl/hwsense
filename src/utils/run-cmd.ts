import GLib from "gi://GLib";

export class Command {
  private options: string[];
  constructor(private command: string, ...options: string[]) {
    this.options = this.sanitizeOptions(options);
  }

  private sanitizeOptions(options: string[]): string[] {
    return options.map((option) => {
      if (
        option.includes(" ") &&
        !option.startsWith('"') &&
        !option.endsWith('"')
      ) {
        return option.replace(/\s/g, "\\ ");
      }

      return option;
    });
  }

  private uint8ArrayToString(bytes: Uint8Array): string {
    let result = "";

    for (let i = 0; i < bytes.byteLength; i++) {
      result += String.fromCharCode(bytes[i]!);
    }

    return result;
  }

  public run() {
    const [, stdout, stderr, status] = GLib.spawn_command_line_sync(
      this.command + " " + this.options.join(" ")
    );

    if (status !== 0) {
      throw new Error(stderr ? this.uint8ArrayToString(stderr) : "");
    }

    return stdout ? this.uint8ArrayToString(stdout) : "";
  }
}
