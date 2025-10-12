export { QueueImpl as Queue } from "./queue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type { } from "./type";

// global에 할당
global.Queue = Queue as unknown as QueueConstructor;
